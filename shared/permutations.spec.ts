import { permutations } from './permutations';

test('permute 1, 3, 4', () => {
  const expected = [
    [1, 3, 4],
    [1, 4, 3],
    [3, 1, 4],
    [3, 4, 1],
    [4, 1, 3],
    [4, 3, 1]
  ];
  expect(permutations([1, 3, 4])).toEqual(expected);
});

