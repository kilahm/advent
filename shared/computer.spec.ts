import { ArrayReaderWriter, Computer } from './computer';

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
    input: ['abc', '10'],
    output: ['Input must be an integer', 'Out 0:', '10']
  },
  {
    program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 8, 9, 10, 9, 4, 9, 99, 0, 8],
    input: ['10'],
    output: ['Out 0:', '0']
  },
  {
    program: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 8, 9, 10, 9, 4, 9, 99, 1, 8],
    input: ['8'],
    output: ['Out 0:', '1']
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 7, 9, 10, 9, 4, 9, 99, 1, 8],
    input: ['6'],
    output: ['Out 0:', '1']
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
    input: ['8'],
    output: ['Out 0:', '0']
  },
  {
    program: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
    result: [3, 9, 7, 9, 10, 9, 4, 9, 99, 0, 8],
    input: ['10'],
    output: ['Out 0:', '0']
  },
  {
    program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1108, 0, 8, 3, 4, 3, 99],
    input: ['10'],
    output: ['Out 0:', '0']
  },
  {
    program: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1108, 1, 8, 3, 4, 3, 99],
    input: ['8'],
    output: ['Out 0:', '1']
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
    input: ['8'],
    output: ['Out 0:', '0']
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1107, 1, 8, 3, 4, 3, 99],
    input: ['5'],
    output: ['Out 0:', '1']
  },
  {
    program: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
    result: [3, 3, 1107, 0, 8, 3, 4, 3, 99],
    input: ['9'],
    output: ['Out 0:', '0']
  },
  {
    program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    result: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 1, 1, 1, 9],
    input: ['1'],
    output: ['Out 0:', '1']
  },
  {
    program: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
    result: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, 0, 0, 1, 9],
    input: ['0'],
    output: ['Out 0:', '0']
  }
];
describe('Computer', () => {
  testPrograms.forEach(({ program, result, input, output }, programNumber) => {
    test(`Program ${programNumber}`, async () => {
      const rw = new ArrayReaderWriter([...input]);
      const c = new Computer(program, rw);
      const actualResult = await c.execute();
      expect(actualResult).toEqual(result);
      expect(rw.state()).toEqual({ in: [], out: output });
    });
  });
});