import { topN } from './numbers';

describe('topN', () => {
  it('should handle an empty set', () => {
    expect(topN([], 1)).toEqual([]);
  });

  it('should return full set when N is equal to or greater than size of set', () => {
    expect(topN([1, 2, 3], 4)).toEqual([1, 2, 3]);
  });

  it('should find the highest at the end', () => {
    expect(topN([1, 0, 5, 4, 6], 3)).toEqual(expect.arrayContaining([5, 4, 6]));
  });

  it('should find the highest at the start', () => {
    expect(topN([5, 4, 6, 1, -2], 3)).toEqual(
      expect.arrayContaining([5, 4, 6])
    );
  });

  it('should find the highest in the middle', () => {
    expect(topN([5, 1, 4, 6, -2], 3)).toEqual(
      expect.arrayContaining([5, 4, 6])
    );
  });

  it('should find highest multi digit numbers', () => {
    expect(topN([5, 42, 44, 60, -200], 3)).toEqual(
      expect.arrayContaining([60,42,44])
    );
  });
});
