import { mine } from './mine';

[
  { salt: 'abcdef', num: 609043 },
  { salt: 'pqrstuv', num: 1048970 }
].forEach(({ salt, num }) => {
  test(`Mining ${salt} produces ${num}`, () => {
    expect(mine(salt)).toBe(num);
  });
});
