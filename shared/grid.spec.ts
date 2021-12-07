import { LineSegment, Point, quadrant } from './grid';

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
    { point: { x: -1, y: 1 }, quad: 4 },
  ].forEach(({ point, quad }) => {
    test(`Point ${JSON.stringify(point)} is in quadrant ${quad}`, () => {
      expect(quadrant(point)).toBe(quad);
    });
  });
});

describe('LineSegment', () => {
  it.each([
    [
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
      ],
    ],
    [
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 },
      ],
    ],
    [
      { x: 1, y: 0 },
      { x: -2, y: 6 },
      [
        { x: -2, y: 6 },
        { x: -1, y: 4 },
        { x: 0, y: 2 },
        { x: 1, y: 0 },
      ],
    ],
  ])(
    `should list included points for %j to %j`,
    (start: Point, end: Point, included: Point[]) => {
      const segment = new LineSegment(start, end);
      expect(segment.gridPoints()).toEqual(included);
    }
  );

  it.each([
    [{ x: 0, y: 0 }, { x: 3, y: 0 }, true],
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, false],
    [{ x: -1, y: 0 }, { x: 0, y: 1 }, false],
  ])(
    'should recognize horizontal line segments for %j to %j',
    (start: Point, end: Point, isHorizontal: boolean) => {
      const segment = new LineSegment(start, end);
      expect(segment.isHorizontal()).toBe(isHorizontal);
    }
  );
});
