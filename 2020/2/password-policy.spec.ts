import { PositionalPolicy } from './password-policy';

describe('positional password policy', () => {
  [
    { policy: '1-3 a', password: 'abcde', valid: true },
    { policy: '1-3 b', password: 'cdefg', valid: false },
    { policy: '2-9 c', password: 'ccccccccc', valid: false },
  ].forEach(({ policy, password, valid }) => {
    test(`${policy} ${
      valid ? 'matches' : 'does not match'
    } ${password}`, () => {
      expect(PositionalPolicy.fromString(policy).validate(password)).toBe(
        valid
      );
    });
  });
});
