import { Point, pointDifference, pointEqual, pointSum, quadrant, reduceDirection } from '../../shared/grid';

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

  vaporizeFrom(base: Point): Point[] {
    const zapped = [];
    while (this.asteroids.length > 1) {
      const sortedVisible = this.visibleAsteroids(base)
        .map(p => {
          const invertedPoint = pointDifference(p, base);
          return { x: invertedPoint.x, y: -invertedPoint.y };
        })
        .sort(clockwise2)
        .map(p => {
          const invertedPoint = { x: p.x, y: -p.y };
          return pointSum(invertedPoint, base);
        });
      zapped.push(...sortedVisible);
      sortedVisible.forEach(p => this.zapAsteroid(p));
    }
    return zapped;
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

  private zapAsteroid(location: Point): void {
    if (this.map[location.y][location.x] === false) {
      return;
    }
    this.map[location.y][location.x] = false;
    this.asteroids.splice(
      this.asteroids.findIndex(a => pointEqual(a, location)),
      1
    );
  }

  private directionsToAllAsteroids(origin: Point): Point[] {
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
}

function clockwise2(a: Point, b: Point): number {
  const angleA = ((5 / 2) * Math.PI - Math.atan2(a.y, a.x)) % (2 * Math.PI);
  const angleB = ((5 / 2) * Math.PI - Math.atan2(b.y, b.x)) % (2 * Math.PI);
  if (angleA > angleB) {
    return 1;
  }
  if (angleA < angleB) {
    return -1;
  }
  return 0;
}

function clockwise(a: Point, b: Point): number {
  const quadA = quadrant(a);
  const quadB = quadrant(b);
  if (quadA > quadB) {
    return 1;
  }
  if (quadA < quadB) {
    return -1;
  }

  if (a.y === 0 && b.y === 0) {
    return 0;
  }
  if (a.x === 0 && b.x === 0) {
    return 0;
  }

  let angleA;
  let angleB;
  switch (quadA) {
    case 1:
    case 3:
      if (a.y === 0) {
        return 1;
      }
      if (b.y === 0) {
        return -1;
      }
      angleA = Math.atan(a.x / a.y);
      angleB = Math.atan(b.x / b.y);
      break;
    case 2:
    case 4:
      if (a.x === 0) {
        return 1;
      }
      if (b.x === 0) {
        return -1;
      }
      angleA = Math.atan(-a.y / a.x);
      angleB = Math.atan(-b.y / b.x);
      break;
    default:
      throw new Error(`Unknown quadrant: ${quadA}`);
  }

  if (angleA > angleB) {
    return 1;
  }
  if (angleA < angleB) {
    return -1;
  }
  return 0;
}
