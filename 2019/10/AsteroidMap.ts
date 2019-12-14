import {
  Point,
  pointDifference,
  pointSum,
  reduceDirection
} from '../../shared/grid';

export class AsteroidMap {
  private readonly asteroids: Point[] = [];

  constructor(private readonly map: boolean[][]) {
    if (!map.every(m => m.length === map.length)) {
      throw new Error('Map must be square');
    }
    this.map.forEach((row, y) =>
      row.forEach((hasAsteroid, x) => {
        if (hasAsteroid) {
          this.asteroids.push({ x, y });
        }
      })
    );
  }

  baseSite(): { asteroidCount: number; location: Point } {
    const result = { asteroidCount: 0, location: undefined };
    this.asteroidSites().forEach(p => {
      const thisCount = this.visibleAsteroids(p).length;
      if (thisCount > result.asteroidCount) {
        result.asteroidCount = thisCount;
        result.location = p;
      }
    });
    return result;
  }

  asteroidSites(): Point[] {
    return [...this.asteroids];
  }

  visibleAsteroids(origin: Point): Point[] {
    if (!this.onMap(origin)) {
      throw new Error(`Point ${origin} is outside the bounds of the map`);
    }
    const asteroidMap: { [key: string]: Point } = {};
    this.directionsToAllAsteroids(origin).forEach(asteroidDirection => {
      const encountered = this.encounter(
        origin,
        reduceDirection(asteroidDirection)
      );
      if (encountered !== null) {
        asteroidMap[JSON.stringify(encountered)] = encountered;
      }
    });
    return Object.values(asteroidMap);
  }

  directionsToAllAsteroids(origin: Point): Point[] {
    return this.asteroids
      .map(asteroidLocation => pointDifference(asteroidLocation, origin))
      .filter(p => !(p.x === 0 && p.y === 0));
  }

  private encounter(origin: Point, direction: Point): null | Point {
    let pointer = pointSum(origin, direction);
    while (this.onMap(pointer)) {
      if (this.map[pointer.y][pointer.x]) {
        return pointer;
      }
      pointer = pointSum(pointer, direction);
    }
    return null;
  }

  private onMap(point: Point) {
    return (
      0 <= point.x &&
      point.x < this.map.length &&
      0 <= point.y &&
      point.y < this.map.length
    );
  }

  static parse(map: string[]) {
    return new AsteroidMap(map.map(row => row.split('').map(c => c === '#')));
  }

  vaporizeFrom(base: Point): Point[] {
    return [];
  }
}
