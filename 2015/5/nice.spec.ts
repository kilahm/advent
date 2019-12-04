import { nice, supernice } from './nice';

[
  { word: 'ugknbfddgicrmopn', isNice: true },
  { word: 'aaa', isNice: true },
  { word: 'jchzalrnumimnmhp', isNice: false },
  { word: 'haegwjzuvuyypxyu', isNice: false },
  { word: 'dvszwmarrgswjxmb', isNice: false }
].forEach(({ word, isNice }) => {
  test(`${word} is${isNice ? '' : ' not'} nice`, () => {
    expect(nice(word)).toBe(isNice);
  });
});

[
  { word: 'qjhvhtzxzqqjkmpb', isNice: true },
  { word: 'xxyxx', isNice: true },
  { word: 'uurcxstgmygtbstg', isNice: false },
  { word: 'ieodomkazucvgmuy', isNice: false },
].forEach(({ word, isNice }) => {
  test(`${word} is${isNice ? '' : ' not'} super nice`, () => {
    expect(supernice(word)).toBe(isNice);
  });
});
