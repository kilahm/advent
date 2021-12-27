import { Computer } from '../../shared/computer';
import { concat, Observable, Subject } from 'rxjs';
import { from } from 'rxjs';

export class FeedbackComputer {
  private readonly program: number[];

  constructor(program: number[], private readonly initialInputs: number[][]) {
    this.program = [...program];
  }

  async execute(): Promise<number[]> {
    const bridge = new Subject<number>();
    const computers: Computer[] = this.initialInputs.reduce(
      (computerList, initialInput) => {
        let input: Observable<number> = from(initialInput);
        if (computerList.length > 0) {
          input = concat(input, computerList[computerList.length - 1].output$);
        } else {
          input = concat(input, bridge);
        }
        const c = new Computer(this.program, input);
        computerList.push(c);
        return computerList;
      },
      [] as Computer[]
    );

    const output: number[] = [];
    const lastComputer = computers[computers.length - 1];
    lastComputer.output$.subscribe(value => {
      bridge.next(value);
      output.push(value);
    });
    await Promise.all(computers.map(c => c.execute()));
    return output;
  }
}
