import { AsteroidMap } from './AsteroidMap';
import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Point } from '../../shared/vector2d';

describe(`Map 1`, () => {
  let map: AsteroidMap;
  beforeAll(async () => {
    map = AsteroidMap.parse(await loadInput(join(__dirname, 'map1.txt')));
  });
  test('Parses correctly', () => {
    const asteroids = [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 }
    ];
    expect(map.asteroidSites()).toEqual(asteroids);
  });

  test('Detects visible asteroids', () => {
    const expectedVisible = [
      { x: 1, y: 0 },
      { x: 4, y: 0 },
      { x: 1, y: 2 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 4 }
    ];

    expect(map.visibleAsteroids({ x: 0, y: 2 })).toEqual(expectedVisible);
  });
  test('Asteroid Base', () => {
    const base = map.baseSite();
    expect(base.asteroidCount).toBe(8);
    expect(base.location).toEqual({ x: 3, y: 4 });
  });
});

[
  {
    fileName: 'map2.txt',
    base: { asteroidCount: 33, location: { x: 5, y: 8 } }
  },
  {
    fileName: 'map3.txt',
    base: { asteroidCount: 35, location: { x: 1, y: 2 } }
  },
  {
    fileName: 'map4.txt',
    base: { asteroidCount: 41, location: { x: 6, y: 3 } }
  },
  {
    fileName: 'map5.txt',
    base: { asteroidCount: 210, location: { x: 11, y: 13 } },
    vaporizeOrder: {
      0: { x: 11, y: 12 },
      1: { x: 12, y: 1 },
      2: { x: 12, y: 2 },
      9: { x: 12, y: 8 },
      19: { x: 16, y: 0 },
      49: { x: 16, y: 9 },
      99: { x: 10, y: 16 },
      198: { x: 9, y: 6 },
      199: { x: 8, y: 2 },
      200: { x: 10, y: 9 },
      298: { x: 11, y: 1 }
    }
  }
].forEach(({ fileName, base, vaporizeOrder }) => {
  describe(fileName, () => {
    let map: AsteroidMap;
    beforeAll(async () => {
      map = AsteroidMap.parse(await loadInput(join(__dirname, fileName)));
    });

    test('Asteroid base', () => {
      expect(map.baseSite()).toEqual(base);
    });
    if (vaporizeOrder !== undefined) {
      describe('VaporizeOrder', function() {
        let vaporized: Point[];
        beforeAll(() => {
          const base = map.baseSite().location;
          vaporized = map.vaporizeFrom(base);
        });

        test(`Vaporized count is 299`, () => {
          expect(vaporized.length).toBe(299);
        });

        Object.keys(vaporizeOrder).forEach(vaporizeIndex => {
          test(`Vaporize index ${vaporizeIndex} is at ${JSON.stringify(
            vaporizeOrder[vaporizeIndex]
          )}`, () => {
            expect(vaporized[vaporizeIndex]).toEqual(
              vaporizeOrder[vaporizeIndex]
            );
          });
        });
      });
    }
  });
});
