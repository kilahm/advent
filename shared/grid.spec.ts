import { quadrant } from './vector2d';

describe('quadrant', () => {
  [
    { point: { x: 0, y: 0 }, quad: 1 },
    { point: { x: 0, y: 1 }, quad: 1 },
    { point: { x: 1, y: 0 }, quad: 1 },
    { point: { x: 0, y: -1 }, quad: 2 },
    { point: { x: -1, y: 0 }, quad: 4 },
    { point: { x: 1, y: 1 }, quad: 1 },
    { point: { x: 1, y: -1 }, quad: 2 },
    { point: { x: -1, y: -1 }, quad: 3 },
    { point: { x: -1, y: 1 }, quad: 4 }
  ].forEach(({ point, quad }) => {
    test(`Point ${JSON.stringify(point)} is in quadrant ${quad}`, () => {
      expect(quadrant(point)).toBe(quad);
    });
  });
});
