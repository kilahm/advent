import { Computer } from './computer';
import { fromArray } from 'rxjs/internal/observable/fromArray';
import { cold } from 'jest-marbles';

const testPrograms = [
  {
    program: [1, 0, 0, 0, 99],
    result: [2, 0, 0, 0, 99],
    input: [],
    output: []
  },
  {
    program: [2, 3, 0, 3, 99],
    result: [2, 3, 0, 6, 99],
    input: [],
    output: []
  },
  {
    program: [2, 4, 4, 5, 99, 0],
    result: [2, 4, 4, 5, 99, 9801],
    input: [],
    output: []
  },
  {
    program: [1, 1, 1, 4, 99, 5, 6, 0, 99],
    result: [30, 1, 1, 4, 2, 5, 6, 0, 99],
    input: [],
    output: []
  },
  {
    program: [1002, 4, 3, 4, 33],
    result: [1002, 4, 3, 4, 99],
    input: [],
    output: []
  },
  {
    program: [3, 0, 4, 0, 99],
    result: [10, 0, 4, 0, 99],
    input: [10],
    output: [10]
  },
  {
    program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
    input: [10],
    output: [0]
  },
  {
    program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8],
    input: [8],
    output: [1]
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
    input: [6],
    output: [1]
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
    input: [8],
    output: [0]
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
    input: [10],
    output: [0]
  },
  {
    program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
    input: [10],
    output: [0]
  },
  {
    program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1108, 1, 8, 3, 4, 3, 99],
    input: [8],
    output: [1]
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
    input: [8],
    output: [0]
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
    input: [5],
    output: [1]
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
    input: [9],
    output: [0]
  },
  {
    program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    result: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 1, 1, 1, 9],
    input: [1],
    output: [1]
  },
  {
    program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    result: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 0, 0, 1, 9],
    input: [0],
    output: [0]
  }
];
describe('Computer', () => {
  testPrograms.forEach(({ program, result, input, output }, programNumber) => {
    test(`Program ${programNumber}`, async () => {
      const input$ = fromArray(input);
      const c = new Computer(program, input$);
      let actualOutput = [];
      c.output$.subscribe(value => actualOutput.push(value));
      const finalMemory = await c.execute();
      expect(finalMemory).toEqual(result);
      expect(actualOutput).toEqual(output);
    });
  });
});
