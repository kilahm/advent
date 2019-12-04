import { isValidPassword } from './brute';

const passwords: { [pw: number]: boolean } = {
  '112233': true,
  '123444': false,
  '111122': true
};
Object.keys(passwords).forEach(pw => {
  const isValid = passwords[pw];
  test(`${pw} is${isValid ? '' : ' not'} valid`, () => {
    expect(isValidPassword(parseInt(pw, 10))).toBe(isValid);
  });
});
