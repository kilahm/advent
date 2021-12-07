import { parseNumber } from '../../shared/numbers';

export class GamingComputer {
  private state: Readonly<GamingComputerState>;
  private visitedInstructions = new Set<number>();
  constructor(
    private readonly program: Instruction[],
    initialState: Readonly<GamingComputerState> = {
      accumulator: 0,
      executionPointer: 0,
    }
  ) {
    this.state = initialState;
  }

  getState(): Readonly<GamingComputerState> {
    return { ...this.state };
  }

  isComplete(): boolean {
    return this.state.executionPointer === this.program.length;
  }
  step(): void {
    if (this.state.executionPointer === this.program.length) {
      return;
    }
    const instruction = this.program[this.state.executionPointer];
    if (instruction === undefined) {
      throw new Error(
        `Invalid execution pointer: ${this.state.executionPointer}. Program length: ${this.program.length}`
      );
    }
    this.visitedInstructions.add(this.state.executionPointer);
    this.state = operations[instruction.operation](
      this.state,
      instruction.argument
    );
  }

  hasVisited(instructionPointer: number): boolean {
    return this.visitedInstructions.has(instructionPointer);
  }

  static fromCode(code: string[]) {
    return new GamingComputer(
      code.map((line) => {
        const [operation, arg] = line.split(' ', 2);
        if (arg === undefined) {
          throw new InvalidInstruction(line, 'Missing op/arg separator');
        }
        if (operations[operation] === undefined) {
          throw new InvalidInstruction(line, 'Invalid operation');
        }
        try {
          return { operation, argument: parseNumber(arg) };
        } catch (err) {
          throw new InvalidInstruction(line, err instanceof Error ? err.message : String(err));
        }
      })
    );
  }
}

interface GamingComputerState {
  accumulator: number;
  executionPointer: number;
}

const operations: Record<
  string,
  (
    state: Readonly<GamingComputerState>,
    arg: number
  ) => Readonly<GamingComputerState>
> = {
  acc: (state, arg) => {
    return {
      ...state,
      executionPointer: state.executionPointer + 1,
      accumulator: state.accumulator + arg,
    };
  },
  nop: (state) => {
    return { ...state, executionPointer: state.executionPointer + 1 };
  },
  jmp: (state, arg) => {
    return { ...state, executionPointer: state.executionPointer + arg };
  },
} as const;

interface Instruction {
  operation: keyof typeof operations;
  argument: number;
}

class InvalidInstruction extends Error {
  constructor(readonly rawInstruction: string, readonly reason: string) {
    super(`Invalid instruction (${rawInstruction}): ${reason}`);
  }
}
