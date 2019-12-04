import { Mapper } from './Mapper';

describe('Mapper', () => {
  [
    { map: '(())', floor: 0 },
    { map: '()()', floor: 0 },
    { map: '(((', floor: 3 },
    { map: '(()(()(', floor: 3 },
    { map: '))(((((', floor: 3 },
    { map: '())', floor: -1 },
    { map: '))(', floor: -1 },
    { map: ')))', floor: -3 },
    { map: ')())())', floor: -3 },
  ].forEach(({ map, floor }, mapIndex) => {
    test(`Map ${mapIndex} ends on floor ${floor}`, () => {
      expect(new Mapper(map).finalFloor()).toBe(floor);
    });
  });

  [
    { map: ')', step: 1 },
    { map: '()())', step: 5 },
  ].forEach(({ map, step}, mapIndex) => {
    test(`Map ${mapIndex} goes into basement on step ${step}`, () => {
      expect(new Mapper(map).firstStepInBasement()).toBe(step);
    });
  });
});
