export class Computer {
  private readonly memory: number[];
  private pointer = 0;

  constructor(memory: number[]) {
    this.memory = [...memory];
    while (true) {
      let op;
      try {
        [op] = this.advance(1);
      } catch {
        throw new Error('Program never halted');
      }
      // console.log(`performing op ${op} at address ${this.pointer - 1}`);
      if (this.doOp(op)) {
        return;
      }
    }
  }

  result(): number[] {
    return [...this.memory];
  }

  private doOp(op: number): boolean {
    switch (op) {
      case 1:
        this.add();
        return false;
      case 2:
        this.mult();
        return false;
      case 99:
        return true;
      default:
        throw new Error(`Unknown op: ${op} at address ${this.pointer}`);
    }
  }

  private add() {
    const [a, b, target] = this.advance(3);
    this.write(this.read(a) + this.read(b), target);
  }

  private mult() {
    const [a, b, target] = this.advance(3);
    this.write(this.read(a) * this.read(b), target);
  }

  private advance(count: number): number[] {
    const out = [];
    while (count > 0) {
      out.push(this.read(this.pointer));
      this.pointer++;
      count--;
    }
    return out;
  }

  private read(address: number): number {
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
}
