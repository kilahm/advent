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
  equals = 'equals',
  moveMemoryPointer = 'move memory pointer'
}

enum Mode {
  address = 'address',
  value = 'value',
  relative = 'relative'
}

export class Computer {
  private readonly memory: number[];
  private pointer = 0;
  private memoryPointer = 0;
  private readWaiters: Array<(number) => void> = [];
  private readBuffer: number[] = [];
  private readonly output = new Subject<number>();
  readonly output$: Observable<number>;
  debug = false;
  private logs: string[] = [];
  private inputCount = 0;
  private opCount = 1;

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
      const [op] = this.advance(1, false);
      const { modes, operation } = this.parseInstruction(op);
      this.log('');
      this.log(`==== OP ${this.opCount++}: ${operation} ====\n${modes}`);
      try {
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
            await this.query(modes);
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
          case Operation.moveMemoryPointer:
            this.moveMemoryPointer(modes);
            break;
          case Operation.exit:
            this.output.complete();
            return [...this.memory];
        }
      } finally {
        this.renderLog();
      }
    }
  }

  private add(modes: ModeSet): void {
    this.log('Raw');
    const [va, vb, address] = this.advance(3);
    this.log('Parameters');
    const [valueA, valueB] = this.read([va, vb], modes);
    const value = valueA + valueB;
    this.log(`${valueA} + ${valueB} => ${value}`);
    this.write(value, address, modes.modeForPosition(2));
  }

  private mult(modes: ModeSet): void {
    this.log('Raw');
    const [va, vb, address] = this.advance(3);
    this.log('Parameters');
    const [valueA, valueB] = this.read([va, vb], modes);
    const value = valueA * valueB;
    this.log(`${valueA} * ${valueB} => ${value}`);
    this.write(value, address, modes.modeForPosition(2));
  }

  private print(modes: ModeSet): void {
    this.log('Raw');
    const [v] = this.advance(1);
    this.log('Parameters');
    const [value] = this.read([v], modes);
    this.log(`Sending ${value} to output`);
    this.output.next(value);
  }

  private async query(modes: ModeSet): Promise<void> {
    this.log('Raw');
    const [destination] = this.advance(1);
    const value = await this.readInput();
    this.log(`Input ${++this.inputCount} => ${value}`);
    this.write(value, destination, modes.modeForPosition(0));
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
    this.log('Raw');
    const [v, d] = this.advance(2);
    this.log('Parameters');
    const [value, destination] = this.read([v, d], modes);
    const test = value !== 0;
    this.log(`Test value is ${test ? 'true' : 'false'}`);
    if (test) {
      this.jump(destination);
      return;
    }
    this.log(`Skipping jump`);
  }

  private jumpWhenFalse(modes: ModeSet): void {
    this.log('Raw');
    const [v, d] = this.advance(2);
    this.log('Parameters');
    const [value, destination] = this.read([v, d], modes);
    const test = value !== 0;
    this.log(`Test value is ${test ? 'true' : 'false'}`);
    if (test) {
      this.log(`Skipping jump`);
      return;
    }
    this.jump(destination);
  }

  private lessThan(modes: ModeSet): void {
    this.log('Raw');
    const [va, vb, address] = this.advance(3);
    this.log('Parameters');
    const [valueA, valueB] = this.read([va, vb], modes);
    const value = valueA < valueB ? 1 : 0;
    this.log(`${valueA} < ${valueB} => ${value} written to ${address}`);
    this.write(value, address, modes.modeForPosition(2));
  }

  private equals(modes: ModeSet): void {
    this.log('Raw');
    const [va, vb, address] = this.advance(3);
    this.log('Parameters');
    const [valueA, valueB] = this.read([va, vb], modes);
    const value = valueA === valueB ? 1 : 0;
    this.log(`${valueA} === ${valueB} => ${value} written to ${address}`);
    this.write(value, address, modes.modeForPosition(2));
  }

  private moveMemoryPointer(modes: ModeSet): void {
    this.log('Raw');
    const [v] = this.advance(1);
    this.log('Parameters');
    const [val] = this.read([v], modes);
    const originalmempointer = this.memoryPointer;
    this.memoryPointer += val;
    this.log(
      `Moving memory pointer ${originalmempointer} + ${val} => ${this.memoryPointer}`
    );
  }

  private advance(count: number, log: boolean = true): number[] {
    if (log) {
      this.log(`Advance ${count} starting at ${this.pointer}`);
    }
    const out = [];
    while (count > 0) {
      out.push(...this.read([this.pointer], new ModeSet(0), log));
      this.pointer++;
      count--;
    }
    return out;
  }

  private read(
    values: number[],
    modes: ModeSet,
    log: boolean = true
  ): number[] {
    return values.map((v, i) => {
      const mode = modes.modeForPosition(i);
      let actualAddress;
      switch (mode) {
        case Mode.value:
          actualAddress = null;
          break;
        case Mode.relative:
          actualAddress = v + this.memoryPointer;
          break;
        case Mode.address:
          actualAddress = v;
          break;
        default:
          throw new Error(`Unknown read mode: ${mode}`);
      }
      if (actualAddress < 0) {
        throw new Error(`Unable to read from address ${actualAddress}`);
      }
      let value;
      if (actualAddress === null) {
        value = v;
      } else {
        value = this.memory[actualAddress];
      }
      if (value === undefined) {
        value = 0;
      }
      if (log) {
        this.log(
          `\tRead ${v} [${mode}] ${
            mode === Mode.value ? '' : `memory[${actualAddress}] `
          }=> ${value}`
        );
      }
      return value;
    });
  }

  private write(value: number, address: number, mode: Mode): void {
    const actualAddress =
      mode === Mode.relative ? address + this.memoryPointer : address;
    this.log(
      `\tWrite ${value} to ${address} [${mode}] | ${value} => ${actualAddress}`
    );
    if (mode === Mode.value) {
      throw new Error('Unable to write in value mode');
    }
    if (actualAddress < 0) {
      throw new Error(`Unable to write to address ${actualAddress}`);
    }
    this.memory[actualAddress] = value;
  }

  private jump(destination: number): void {
    this.log(`Jump to ${destination}`);
    this.pointer = destination;
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
      case 9:
        return Operation.moveMemoryPointer;
      case 99:
        return Operation.exit;
      default:
        throw new Error(`Unknown op: ${value} at address ${this.pointer - 1}`);
    }
  }

  private log(message: string): void {
    this.logs.push(message);
  }

  private renderLog(): void {
    if (!this.debug) {
      return;
    }
    if (this.logs.length > 0) {
      console.log(this.logs.join('\n'));
      this.logs = [];
    }
  }
}

class ModeSet {
  private readonly modeCodes: string[];

  constructor(modes: number) {
    this.modeCodes = modes.toString(10).split('').reverse();
  }

  modeForPosition(position: number): Mode {
    let modeCode = this.modeCodes[position];
    if (modeCode === undefined) {
      modeCode = '0';
    }
    switch (modeCode) {
      case '0':
        return Mode.address;
      case '1':
        return Mode.value;
      case '2':
        return Mode.relative;
      default:
        throw new Error(`Invalid mode code ${this.modeCodes}[${position}]`);
    }
  }

  toString(): string {
    return '[' + [0, 1, 2].map(i => this.modeForPosition(i)).join(',') + ']';
  }
}
