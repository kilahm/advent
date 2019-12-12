import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

enum Operation {
  add = 'add',
  multiply = 'multiply',
  exit = 'exit',
  query = 'query',
  print = 'print',
  jumpWhenTrue = 'jump when true',
  jumpWhenFalse = 'jump when false',
  lessThan = 'less than',
  equals = 'equals'
}

enum Mode {
  address = 'address',
  value = 'value'
}

export class Computer {
  private readonly memory: number[];
  private pointer = 0;
  private readWaiters: Array<(number) => void> = [];
  private readBuffer: number[] = [];
  private readonly output = new Subject<number>();
  readonly output$: Observable<number>;

  constructor(
    memory: number[],
    inputs: Observable<number>,
    private readonly readTimeoutInSeconds = 1
  ) {
    this.output$ = this.output.pipe(shareReplay());
    this.memory = [...memory];
    inputs.subscribe(value => {
      if (this.readWaiters.length > 0) {
        this.readWaiters.shift()(value);
        return;
      }
      this.readBuffer.push(value);
    });
  }

  async execute(): Promise<number[]> {
    if (this.output.closed) {
      throw new Error('A computer can only run once');
    }
    while (true) {
      let op;
      try {
        // console.log(`reading op at ${this.pointer}`);
        // console.log(`memory: ${this.memory}`);
        [op] = this.advance(1);
      } catch {
        throw new Error('Program never halted');
      }
      const { modes, operation } = this.parseInstruction(op);
      switch (operation) {
        case Operation.add:
          this.add(modes);
          break;
        case Operation.multiply:
          this.mult(modes);
          break;
        case Operation.print:
          await this.print(modes);
          break;
        case Operation.query:
          await this.query();
          break;
        case Operation.jumpWhenTrue:
          this.jumpWhenTrue(modes);
          break;
        case Operation.jumpWhenFalse:
          this.jumpWhenFalse(modes);
          break;
        case Operation.lessThan:
          await this.lessThan(modes);
          break;
        case Operation.equals:
          await this.equals(modes);
          break;
        case Operation.exit:
          this.output.complete();
          return [...this.memory];
      }
    }
  }

  private add(modes: ModeSet): void {
    const [a, b, target] = this.advance(3);
    this.write(
      this.read(a, modes.modeForPosition(0)) +
        this.read(b, modes.modeForPosition(1)),
      target
    );
  }

  private mult(modes: ModeSet): void {
    const [a, b, target] = this.advance(3);
    this.write(
      this.read(a, modes.modeForPosition(0)) *
        this.read(b, modes.modeForPosition(1)),
      target
    );
  }

  private print(modes: ModeSet): void {
    const [v] = this.advance(1);
    const value = this.read(v, modes.modeForPosition(0));
    this.output.next(value);
  }

  private async query(): Promise<void> {
    const [v] = this.advance(1);
    this.write(await this.readInput(), v);
  }

  private async readInput(): Promise<number> {
    if (this.readBuffer.length > 0) {
      return this.readBuffer.shift();
    }
    return new Promise<number>((resolve, reject) => {
      const timeoutTimer = setTimeout(() => {
        reject(new Error('Timeout while waiting for input on bridge'));
      }, this.readTimeoutInSeconds * 1000);
      this.readWaiters.push(value => {
        clearTimeout(timeoutTimer);
        resolve(value);
      });
    });
  }

  private jumpWhenTrue(modes: ModeSet): void {
    const [addr, value] = this.advance(2);
    if (this.read(addr, modes.modeForPosition(0)) === 0) {
      return;
    }
    this.pointer = this.read(value, modes.modeForPosition(1));
  }

  private jumpWhenFalse(modes: ModeSet): void {
    const [addr, value] = this.advance(2);
    if (this.read(addr, modes.modeForPosition(0)) === 0) {
      this.pointer = this.read(value, modes.modeForPosition(1));
    }
  }

  private lessThan(modes: ModeSet): void {
    const [a, b, address] = this.advance(3);
    const [aVal, bVal] = [a, b].map((v, i) =>
      this.read(v, modes.modeForPosition(i))
    );
    const value = aVal < bVal ? 1 : 0;
    this.write(value, address);
  }

  private equals(modes: ModeSet): void {
    const [a, b, address] = this.advance(3);
    const [aVal, bVal] = [a, b].map((v, i) =>
      this.read(v, modes.modeForPosition(i))
    );
    const value = aVal === bVal ? 1 : 0;
    this.write(value, address);
  }

  private advance(count: number): number[] {
    const out = [];
    while (count > 0) {
      out.push(this.read(this.pointer, Mode.address));
      this.pointer++;
      count--;
    }
    return out;
  }

  private read(address: number, mode: Mode): number {
    if (mode === Mode.value) {
      return address;
    }
    if (this.memory[address] === undefined) {
      throw new Error(`Unable to read from address ${address}`);
    }
    return this.memory[address];
  }

  private write(value: number, address: number): void {
    if (this.memory.length <= address) {
      throw new Error(`Unable to write to address ${address}`);
    }
    this.memory[address] = value;
  }

  private parseInstruction(
    value: number
  ): { modes: ModeSet; operation: Operation } {
    return {
      modes: new ModeSet(Math.floor(value / 100)),
      operation: this.parseOperation(value % 100)
    };
  }

  private parseOperation(value: number): Operation {
    switch (value) {
      case 1:
        return Operation.add;
      case 2:
        return Operation.multiply;
      case 3:
        return Operation.query;
      case 4:
        return Operation.print;
      case 5:
        return Operation.jumpWhenTrue;
      case 6:
        return Operation.jumpWhenFalse;
      case 7:
        return Operation.lessThan;
      case 8:
        return Operation.equals;
      case 99:
        return Operation.exit;
      default:
        throw new Error(`Unknown op: ${value} at address ${this.pointer - 1}`);
    }
  }
}

class ModeSet {
  constructor(private modes: number) {}

  modeForPosition(position: number): Mode {
    const modeCode =
      position === 0 ? this.modes : Math.floor(this.modes / (10 * position));
    switch (modeCode % 10) {
      case 0:
        return Mode.address;
      case 1:
        return Mode.value;
      default:
        throw new Error(
          `Invalid mode number ${this.modes}. Unknown mode at position ${position}.`
        );
    }
  }
}
