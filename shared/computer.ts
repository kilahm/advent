import { createInterface, Interface } from 'readline';

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
  private inLine = 0;
  private outLine = 0;

  constructor(
    memory: number[],
    private readerWriter: Reader & Writer
  ) {
    this.memory = [...memory];
  }

  async execute(): Promise<number[]> {
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

  private async print(modes: ModeSet): Promise<void> {
    const [v] = this.advance(1);
    await this.readerWriter.writeLine(`Out ${this.outLine}:`);
      await this.readerWriter.writeLine(this.read(v, modes.modeForPosition(0)).toString(10));
    this.outLine++;
  }

  private async query(): Promise<void> {
    const [v] = this.advance(1);
    let value = await this.readerWriter.readLine(`In ${this.inLine}> `);
    while (/[^0-9]/.test(value)) {
      await this.readerWriter.writeLine('Input must be an integer');
      value = await this.readerWriter.readLine(`In ${this.inLine}> `);
    }
    this.write(parseInt(value, 10), v);
    this.inLine++;
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

export interface Reader {
  readLine(query: string): Promise<string>;
}

export interface Writer {
  writeLine(value: string): Promise<void>;
}

export interface Closer {
  close(): void;
}

export class ConsoleReaderWriter implements Reader, Writer, Closer {
  private rl: Interface;

  constructor() {
    this.rl = createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  readLine(query: string): Promise<string> {
    return new Promise(resolve => {
      this.rl.question(query, resolve);
    });
  }

  writeLine(message: string): Promise<void> {
    return new Promise(resolve => {
      console.log(message);
      resolve();
    });
  }

  close(): void {
    this.rl.close();
  }
}

export class ArrayReaderWriter implements Reader, Writer {
  private computerOutput: string[] = [];
  private _tee: undefined | Writer;

  constructor(private computerInput: string[]) {}

  state(): { in: string[]; out: string[] } {
    return {
      in: [...this.computerInput],
      out: [...this.computerOutput]
    };
  }

  readLine(query: string): Promise<string> {
    if (this.computerInput.length === 0) {
      throw new Error('Exhausted input from array');
    }
    return Promise.resolve(this.computerInput.shift());
  }

  async writeLine(value: string): Promise<void> {
    this.computerOutput.push(value);
    if(this._tee) {
      await this._tee.writeLine(value);
    }
    return Promise.resolve();
  }

  tee(writer: Writer) {
    this._tee = writer;
  }
}
