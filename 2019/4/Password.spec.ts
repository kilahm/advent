import { Password } from './Password';
import { validPasswords } from './validPasswords';
import { invalidPasswords } from './invalidPasswords';

describe('Password', () => {
  [
    { p: '111111', isPass: true },
    { p: '223450', isPass: false },
    { p: '123789', isPass: false }
  ].forEach(({ p, isPass }) => {
    test(`Password ${p} is${!isPass ? ' not' : ''} valid`, () => {
      expect(Password.fromString(p).valid).toBe(isPass);
    });
  });

  validPasswords.forEach((pwTo, passwordIndex) => {
    if (passwordIndex === 0) {
      return;
    }
    const pwFrom = validPasswords[passwordIndex - 1];
    test(`${pwFrom} -> ${pwTo}`, () => {
      expect(Password.fromString(pwFrom).next().toString()).toBe(pwTo);
    });
  });

  const nextValidPw = '123333';
  invalidPasswords.forEach(pw => {
    test(`${pw} -> ${nextValidPw}`, () => {
      expect(Password.fromString(pw).next().toString()).toBe(nextValidPw);
    });
  });
});


