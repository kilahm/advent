import { Computer } from './computer';

const testPrograms = [
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
  }
];
describe('Computer', () => {
  testPrograms.forEach(({ program, result }, programNumber) => {
    test(`Program ${programNumber}`, () => {
      const c = new Computer(program);
      expect(c.result()).toEqual(result);
    });
  });
});
