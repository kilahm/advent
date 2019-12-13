import { SIFImage } from './SIFImage';

describe('SIFImage', () => {
  test('signature', () => {
    const raw = [0, 0, 0, 1, 1, 1, 2, 2, 3, 1, 1, 1];
    const width = 3;
    const height = 2;
    const expectedSignature = 6;
    const sif = new SIFImage(width, height, raw);
    expect(sif.signature()).toBe(expectedSignature);
  });

  test('renderer', () => {
    const raw = [0, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 0, 0, 0, 0];
    const rendered = ' O\nO ';
    expect((new SIFImage(2, 2, raw)).render()).toEqual(rendered);
  });
});
