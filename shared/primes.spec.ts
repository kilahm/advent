import { thousandPrimes } from './primes.1000';
import { commonFactors, factors, primes, reduce } from './primes';

test('first 1000 primes', () => {
  expect(primes(7919)).toEqual(thousandPrimes);
});

describe('Max primes', () => {
  Array.from({ length: 500 }, (_, i) => i + 2).forEach(max => {
    test(`Max prime ${max}`, () => {
      const p = primes(max);
      expect(p[p.length - 1]).toBeLessThanOrEqual(max);
    });
  });
});

test('prime factors', () => {
  const expected = [2, 2, 3, 5, 7, 7, 13, 1];
  const value = expected.reduce((v, d) => v * d, 1);
  expect(factors(value)).toEqual(expected);
});

test('common factors', () => {
  const a = [2, 2, 3, 5, 7, 7, 13].reduce((v, d) => v * d, 1);
  const b = [2, 2, 19].reduce((v, d) => v * d, 1);
  expect(commonFactors(a, b)).toEqual([2, 2]);
});

describe('reduce', () => {
  const data: { pair: [number, number]; reduced: [number, number] }[] = [
    { pair: [3, 6], reduced: [1, 2] },
    { pair: [-3, 6], reduced: [-1, 2] },
    { pair: [3, -6], reduced: [1, -2] },
    { pair: [-3, -6], reduced: [-1, -2] },
    { pair: [11, 5], reduced: [11, 5] },
    { pair: [12, 66], reduced: [2, 11] },
    { pair: [66, 12], reduced: [11, 2] },
    { pair: [18, 66], reduced: [3, 11] },
    { pair: [6, 35], reduced: [6, 35] } // 2 3 : 5 7
  ];
  data.forEach(({ pair, reduced }) => {
    test(`Reduce ${JSON.stringify(pair)} to ${JSON.stringify(reduced)}`, () => {
      expect(reduce(...pair)).toEqual(reduced);
    });
  });
});
