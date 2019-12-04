export class Box {
  readonly paperNeeded: number;
  readonly ribbonNeeded: number;

  constructor(readonly l, readonly w, readonly h) {
    const volume = l * w * h;
    const minPerimiter = 2 * (l + w + h - Math.max(l, w, h));
    const sideAreas = [l * w, w * h, h * l];
    const areaOfSmallestSide = Math.min(...sideAreas);
    const totalSurfaceArea = 2 * sideAreas.reduce((t, a) => t + a, 0);

    this.paperNeeded = totalSurfaceArea + areaOfSmallestSide;
    this.ribbonNeeded = minPerimiter + volume;
  }

  static fromString(raw: string): Box {
    if (!/\d+x\d+x\d+/.test(raw)) {
      throw new Error(`Invalid box definition: ${raw}`);
    }
    const dimensions = raw.split('x');
    return new Box(dimensions[0], dimensions[1], dimensions[2]);
  }
}
