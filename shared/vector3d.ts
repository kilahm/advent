export interface Point3D {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export function vectorSum3D(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  };
}

export function vectorDifference3D(a: Point3D, b: Point3D): Point3D {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  };
}

export function pointEqual3D(a: Point3D, b: Point3D): boolean {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}
