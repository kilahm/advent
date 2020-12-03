import { combinations, permutations } from './permutations';

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

test('combine 1, 3, 4 pick 2', () => {
  const expected = [
    [1, 3],
    [1, 4],
    [3, 4]
  ];
  expect(combinations([1, 3, 4], 2)).toEqual(expected);
});
