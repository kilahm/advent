import { Box } from './Box';
import { BoxList } from './BoxList';

const data: Array<{
  dimensions: [number, number, number];
  paperNeeded: number;
  ribbonNeeded: number;
}> = [
  { dimensions: [2, 3, 4], paperNeeded: 58, ribbonNeeded: 34 },
  { dimensions: [1, 1, 10], paperNeeded: 43, ribbonNeeded: 14 },
  { dimensions: [11, 17, 3], paperNeeded: 575, ribbonNeeded: 589 }
];
describe('Box', () => {
  data.forEach(({ dimensions, paperNeeded, ribbonNeeded }, boxIndex) => {
    test(`Box ${boxIndex} needs ${paperNeeded} paper`, () => {
      const b = new Box(...dimensions);
      expect(b.paperNeeded).toBe(paperNeeded);
    });

    test(`Box ${boxIndex} needs ${ribbonNeeded} ribbon`, () => {
      const b = new Box(...dimensions);
      expect(b.ribbonNeeded).toBe(ribbonNeeded);
    });
  });
});

test('BoxList sums paper', () => {
  const bl = new BoxList(data.map(d => new Box(...d.dimensions)));
  expect(bl.paperNeeded).toBe(676);
});
test('BoxList sums ribbon', () => {
  const bl = new BoxList(data.map(d => new Box(...d.dimensions)));
  expect(bl.ribbonNeeded).toBe(637);
});
