import { Computer } from './computer';
import { EMPTY, from } from 'rxjs';

const testProgramsWithoutIO = [
  {
    program: [1, 0, 0, 0, 99],
    result: [2, 0, 0, 0, 99]
  },
  {
    program: [2, 3, 0, 3, 99],
    result: [2, 3, 0, 6, 99]
  },
  {
    program: [2, 4, 4, 5, 99, 0],
    result: [2, 4, 4, 5, 99, 9801]
  },
  {
    program: [1, 1, 1, 4, 99, 5, 6, 0, 99],
    result: [30, 1, 1, 4, 2, 5, 6, 0, 99]
  },
  {
    program: [1002, 4, 3, 4, 33],
    result: [1002, 4, 3, 4, 99],
  }
];
const testProgramsWithIO = [
  {
    program: [3, 0, 4, 0, 99],
    input: [10],
    output: [10]
  },
  {
    program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    input: [10],
    output: [0]
  },
  {
    program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    input: [8],
    output: [1]
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    input: [6],
    output: [1]
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    input: [8],
    output: [0]
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    input: [10],
    output: [0]
  },
  {
    program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    input: [10],
    output: [0]
  },
  {
    program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    input: [8],
    output: [1]
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    input: [8],
    output: [0]
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    input: [5],
    output: [1]
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    input: [9],
    output: [0]
  },
  {
    program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    input: [1],
    output: [1]
  },
  {
    program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    input: [0],
    output: [0]
  },
  {
    program: [1102, 34915192, 34915192, 7, 4, 7, 99, 0],
    input: [],
    output: [1219070632396864]
  },
  {
    program: [104, 1125899906842624, 99],
    input: [],
    output: [1125899906842624]
  },
  {
    program: [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99
    ],
    input: [],
    output: [
      109,
      1,
      204,
      -1,
      1001,
      100,
      1,
      100,
      1008,
      100,
      16,
      101,
      1006,
      101,
      0,
      99
    ]
  }
];
describe('Computer', () => {
  testProgramsWithoutIO.forEach(({ program, result }, programNumber) => {
    test(`Program without IO ${programNumber}`, async () => {
      const c = new Computer(program, EMPTY);
      let actualOutput = [];
      c.output$.subscribe(value => actualOutput.push(value));
      const finalMemory = await c.execute();
      expect(finalMemory).toEqual(result);
    });
  });
  testProgramsWithIO.forEach(({ program, input, output }, programNumber) => {
    test(`Program with IO ${programNumber}`, async () => {
      const input$ = from(input);
      const c = new Computer(program, input$);
      const actualOutput: number[] = [];
      c.output$.subscribe(value => actualOutput.push(value));
      const finalMemory = await c.execute();
      expect(actualOutput).toEqual(output);
    });
  });
});
