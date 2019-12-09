import { ArrayReaderWriter, Computer } from '../../shared/computer';

export class FeedbackComputer {
  private readonly program: number[];

  constructor(
    program: number[],
    private iterations: number,
    private inputFactory: (
      outputs: undefined | number[],
      iteration: number
    ) => number[]
  ) {
    this.program = [...program];
  }

  async execute(): Promise<number[]> {
    let result: number[] = undefined;
    for (let i = 0; i < this.iterations; i++) {
      const inputs = this.inputFactory(result, i);
      const rw = new ArrayReaderWriter(inputs);
      const c = new Computer(this.program, rw);
      try {
        await c.execute();
      } catch (err) {
        throw new Error(`Error on iteration ${i}: ${err.message()}`);
      }
      result = rw.state().out;
      // console.log(`Iteration ${i}: ${JSON.stringify(inputs)} -> ${result}`);
    }
    return result;
  }
}
