import { reduce } from './primes';

export interface Point {
  x: number;
  y: number;
}

export class Bounds {
  constructor(private a: Point, private b: Point) {
  }

  xRange(): [number, number] {
    return [Math.min(this.a.x, this.b.x), Math.max(this.a.x, this.b.x)];
  }

  yRange(): [number, number] {
    return [Math.min(this.a.y, this.b.y), Math.max(this.a.y, this.b.y)];
  }

  allPoints(): Point[] {
    const points: Point[] = [];
    const xr = this.xRange();
    const yr = this.yRange();
    for (let x = xr[0]; x <= xr[1]; x++) {
      for (let y = yr[0]; y <= yr[1]; y++) {
        points.push({ x, y });
      }
    }
    return points;
  }

  contains(point: Point): boolean {
    const [xmin, xmax] = this.xRange();
    const [ymin, ymax] = this.yRange();
    return xmin <= point.x && point.x <= xmax && ymin <= point.y && point.y <= ymax;
  }
}

export function reduceDirection(direction: Point): Point {
  if (direction.x === 0) {
    return { x: 0, y: Math.sign(direction.y) };
  }
  if (direction.y === 0) {
    return { x: Math.sign(direction.x), y: 0 };
  }
  if (Math.abs(direction.x) === 1 || Math.abs(direction.y) === 1) {
    return { ...direction };
  }
  const [x, y] = reduce(direction.x, direction.y);
  return { x, y };
}

export function pointDifference(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function pointSum(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function pointEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export function quadrant(p: Point): number {
  const encoded = `${Math.sign(p.x)}:${Math.sign(p.y)}`;
  switch (encoded) {
    case '1:1':
    case '0:1':
    case '0:0':
    case '1:0':
      return 1;
    case '1:-1':
    case '0:-1':
      return 2;
    case '-1:-1':
      return 3;
    case '-1:1':
    case '-1:0':
      return 4;
    default:
      throw new Error(`Unable to determine quadrant of ${JSON.stringify(p)}`);
  }
}
