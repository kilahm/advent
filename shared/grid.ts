export interface Point {
  x: number;
  y: number;
}

export class Bounds {
  constructor(private a: Point, private b: Point) {}

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
}
