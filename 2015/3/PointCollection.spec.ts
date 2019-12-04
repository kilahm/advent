import { PointCollection } from './PointCollection';

describe('PointCollection', () => {
  [
    { map: '>', pointCount: 2 },
    { map: '^>v<', pointCount: 4 },
    { map: '^v^v^v^v^v', pointCount: 2 }
  ].forEach(({ map, pointCount }, mapIndex) => {
    test(`Map ${mapIndex} should have ${pointCount} points`, () => {
      expect(PointCollection.fromMap(map).pointCount).toBe(pointCount);
    });
  });

  [
    { map: '^v', pointCount: 3 },
    { map: '^>v<', pointCount: 3 },
    { map: '^v^v^v^v^v', pointCount: 11 }
  ].forEach(({ map, pointCount }, mapIndex) => {
    test(`Map ${mapIndex} with 2 travellers should have ${pointCount} points`, () => {
      expect(PointCollection.fromMap(map, 2).pointCount).toBe(pointCount);
    });
  });
});
