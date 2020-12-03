import { Point3D } from '../../shared/vector3d';
import { combinations } from '../../shared/permutations';
import { Mutable } from '../../shared/utility_types';

export interface Body {
  position: Mutable<Point3D>;
  velocity: Mutable<Point3D>;
}

function potentialEnergy(body: Body): number {
  return (
    Math.abs(body.position.x) +
    Math.abs(body.position.y) +
    Math.abs(body.position.z)
  );
}

function kineticEnergy(body: Body): number {
  return (
    Math.abs(body.velocity.x) +
    Math.abs(body.velocity.y) +
    Math.abs(body.velocity.z)
  );
}

export class Nbody {
  private readonly bodyData: Body[];
  private readonly bodyPairs: [Body, Body][];

  constructor(bodyData: Body[]) {
    this.bodyData = [...bodyData];
    this.bodyPairs = combinations(
      Array.from(bodyData.keys()),
      2
    ).map(indexes => [this.bodyData[indexes[0]], this.bodyData[indexes[1]]]);
  }

  static fromSerializedPositions(data: string[]) {
    const parsePattern = /x=(?<x>-?\d+), y=(?<y>-?\d+), z=(?<z>-?\d+)/;
    const bodyData = data.map(raw => {
      const parts = raw.match(parsePattern);
      if (parts === null || parts === undefined) {
        throw new Error(`Invalid position: '${raw}'`);
      }
      return {
        position: {
          x: parseInt(parts.groups['x'], 10),
          y: parseInt(parts.groups['y'], 10),
          z: parseInt(parts.groups['z'], 10)
        },
        velocity: { x: 0, y: 0, z: 0 }
      };
    });
    return new Nbody(bodyData);
  }

  bodies(): Body[] {
    return [...this.bodyData];
  }

  totalEnergy(): number {
    return this.bodyData.reduce(
      (totalEnergy, body) =>
        totalEnergy + kineticEnergy(body) * potentialEnergy(body),
      0
    );
  }

  stepPeriod(): number {
    const states = new Set<string>();
    while (!states.has(this.toString())) {
      states.add(this.toString());
      this.run(1);
    }
    return states.size;
  }

  run(steps: number): this {
    while (steps > 0) {
      this.step();
      steps--;
    }
    return this;
  }

  private step(): void {
    this.bodyData.forEach(b => this.accelerate(b));
    this.bodyData.forEach(b => Nbody.move(b));
  }

  private accelerate(body: Body): void {
    this.bodyData.forEach(other => {
      if (other === body) {
        return;
      }
      const {
        position: { x: xa, y: ya, z: za },
        velocity: velocitya
      } = body;
      const {
        position: { x: xb, y: yb, z: zb }
      } = other;
      if (xa < xb) {
        velocitya.x += 1;
      }
      if (xa > xb) {
        velocitya.x -= 1;
      }
      if (ya < yb) {
        velocitya.y += 1;
      }
      if (ya > yb) {
        velocitya.y -= 1;
      }
      if (za < zb) {
        velocitya.z += 1;
      }
      if (za > zb) {
        velocitya.z -= 1;
      }
    });
  }

  private static move(body: Body): void {
    body.position.x += body.velocity.x;
    body.position.y += body.velocity.y;
    body.position.z += body.velocity.z;
  }

  toString(): string {
    return this.bodyData.reduce((encoded, body) => {
      return `${encoded}_${encodeBody(body)}`;
    }, '');
  }
}

function encodeBody(body: Body): string {
  return [
    body.position.x,
    body.position.y,
    body.position.z,
    body.velocity.x,
    body.velocity.y,
    body.velocity.z
  ].join(':');
}
