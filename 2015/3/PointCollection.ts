import { Point } from '../../shared/grid';

export class PointCollection {
  private pointMap: { [x: number]: { [y: number]: Point } } = {};
  private _pointCount: number = 0;

  addPoint(p: Point): void {
    if (this.pointMap[p.x] === undefined) {
      this.pointMap[p.x] = {};
    }
    if (this.pointMap[p.x][p.y] === undefined) {
      this.pointMap[p.x][p.y] = p;
      this._pointCount++;
    }
  }

  get pointCount(): number {
    return this._pointCount;
  }

  static fromMap(map: string, travellerCount = 1): PointCollection {
    const pc = new PointCollection();
    const positions: Point[] = [];
    for (let i = 0; i < travellerCount; i++) {
      positions.push({ x: 0, y: 0 });
    }
    pc.addPoint({x: 0, y: 0});
    map.split('').forEach((dir, dirIndex) => {
      const travellerIndex = dirIndex % travellerCount;
      let position = positions[travellerIndex];
      switch (dir) {
        case '>':
          position = { x: position.x + 1, y: position.y };
          break;
        case '^':
          position = { x: position.x, y: position.y + 1 };
          break;
        case '<':
          position = { x: position.x - 1, y: position.y };
          break;
        case 'v':
          position = { x: position.x, y: position.y - 1 };
          break;
        default:
          throw new Error(`Invalid direction: "${dir}"`);
      }
      pc.addPoint(position);
      positions[travellerIndex] = position;
    });
    return pc;
  }
}
