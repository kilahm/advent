import { Circuit } from './Circuit';

describe('Test Circuit', () => {
  const circuit = new Circuit([
    '123 -> x',
    '456 -> y',
    'x AND y -> d',
    'x OR y -> e',
    'x LSHIFT 2 -> f',
    'y RSHIFT 2 -> g',
    'NOT x -> h',
    'NOT y -> i'
  ]);

  [
    { name: 'd', value: 72 },
    { name: 'e', value: 507 },
    { name: 'f', value: 492 },
    { name: 'g', value: 114 },
    { name: 'h', value: 65412 },
    { name: 'i', value: 65079 },
    { name: 'x', value: 123 },
    { name: 'y', value: 456 }
  ].forEach(({ name, value }) => {
    test(`wire ${name}`, () => {
      expect(circuit.measure(name)).toBe(value);
    });
  });
});
