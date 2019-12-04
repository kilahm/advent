import { Instruction } from './Instruction';
import { Point } from '../../shared/grid';

export class AncientLightArray {
  private lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );

  brigness(): number {
    return this.lights.reduce(
      (arrayTotal, row) =>
        arrayTotal + row.reduce((rowTotal, l) => rowTotal + l, 0),
      0
    );
  }

  instruct(i: Instruction): void {
    i.pointList().forEach(p => {
      checkRange(p);
      switch (i.type) {
        case 'turn on':
          this.lights[p.x][p.y] = this.lights[p.x][p.y] + 1;
          break;
        case 'turn off':
          this.lights[p.x][p.y] = Math.max(0, this.lights[p.x][p.y] - 1);
          break;
        case 'toggle':
          this.lights[p.x][p.y] = this.lights[p.x][p.y] + 2;
          break;
      }
    });
  }
}

export class LightArray {
  private lights = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => false)
  );

  onCount(): number {
    return this.lights.reduce((c, row) => c + row.filter(l => l).length, 0);
  }

  instruct(i: Instruction): void {
    i.pointList().forEach(p => {
      checkRange(p);
      switch (i.type) {
        case 'turn on':
          this.lights[p.x][p.y] = true;
          break;
        case 'turn off':
          this.lights[p.x][p.y] = false;
          break;
        case 'toggle':
          this.lights[p.x][p.y] = !this.lights[p.x][p.y];
          break;
      }
    });
  }
}

function checkRange(p: Point): void {
  if (0 > p.x || p.x > 999 || 0 > p.y || p.y > 999) {
    throw new Error(`Got instruction for out of bounds point: ${p}`);
  }
}
