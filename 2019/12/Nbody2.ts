import {
  Point3D,
  vectorDifference3D,
  vectorSum3D
} from '../../shared/vector3d';

export class Nbody2 {
  private nextPositions: Point3D[];
  private currentPositions: Point3D[];
  private currentVelocities: Point3D[];

  constructor(bodyData: Point3D[]) {
    this.currentPositions = bodyData;
    const initialVelocities = this.acceleration(bodyData);
    this.nextPositions = this.currentPositions.map((x, i) =>
      vectorSum3D(x, initialVelocities[i])
    );
    this.currentVelocities = bodyData.map(_ => ({ x: 0, y: 0, z: 0 }));
  }

  static fromSerializedPositions(data: string[]) {
    const parsePattern = /x=(?<x>-?\d+), y=(?<y>-?\d+), z=(?<z>-?\d+)/;
    const bodyData = data.map(raw => {
      const parts = raw.match(parsePattern);
      if (parts === null || parts === undefined) {
        throw new Error(`Invalid position: '${raw}'`);
      }
      return {
        x: parseInt(parts.groups['x'], 10),
        y: parseInt(parts.groups['y'], 10),
        z: parseInt(parts.groups['z'], 10)
      };
    });
    return new Nbody2(bodyData);
  }

  run(steps: number) {
    while (steps > 0) {
      this.currentVelocities = this.nextPositions.map((posNext, i) =>
        vectorDifference3D(posNext, this.currentPositions[i])
      );
      const next = this.step();
      this.currentPositions = this.nextPositions;
      this.nextPositions = next;
      steps--;
    }
  }

  private step(): Point3D[] {
    return this.acceleration(this.nextPositions).map((a, i) => {
      return {
        x: a.x + 2 * this.nextPositions[i].x - this.currentPositions[i].x,
        y: a.y + 2 * this.nextPositions[i].y - this.currentPositions[i].y,
        z: a.z + 2 * this.nextPositions[i].z - this.currentPositions[i].z
      };
    });
  }

  private acceleration(state: Point3D[]): Point3D[] {
    return state.map(xa =>
      state.reduce(
        (a, xb) => {
          return {
            x: a.x + Math.sign(-xa.x + xb.x),
            y: a.y + Math.sign(-xa.y + xb.y),
            z: a.z + Math.sign(-xa.z + xb.z)
          };
        },
        { x: 0, y: 0, z: 0 }
      )
    );
  }

  toString(): string {
    return JSON.stringify([
      ...this.currentPositions,
      // ...this.currentVelocities
    ]);
  }

  totalEnergy(): number {
    return this.currentPositions.reduce((totalEnergy, currentPos, i) => {
      return (
        totalEnergy +
        this.energy(currentPos) * this.energy(this.currentVelocities[i])
      );
    }, 0);
  }

  private energy(vector: Point3D): number {
    return Math.abs(vector.x) + Math.abs(vector.y) + Math.abs(vector.z);
  }

  state(): Point3D[] {
    return [...this.currentPositions];
  }

  positionPeriod() {
    const repeats = [];
    const history = new Set<string>();
    let serializedState = this.toString();
    while (true) {
      history.add(serializedState);
      this.run(1);
      serializedState = this.toString();
      if (history.has(serializedState)) {
        console.log(history.size);
        if(repeats.indexOf(history.size) !== -1) {
          break;
        }
        repeats.push(history.size);
        history.clear();
      }
    }
    console.log(JSON.stringify(repeats));

    return history.size;
  }
}
