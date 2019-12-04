import { Point } from '../../shared/grid';

export interface Segment {
  readonly start: Point;
  readonly end: Point;
}

export type direction = 'U' | 'D' | 'R' | 'L';

function isDirection(raw: any): raw is direction {
  return raw === 'U' || raw === 'D' || raw === 'R' || raw === 'L';
}

export interface Instruction {
  readonly direction: direction;
  readonly count: number;
}

export class InvalidInstruction extends Error {
  constructor(raw: string) {
    super(`Invalid instruction: "${raw}"`);
  }
}

export function parseInstruction(raw: string): Instruction {
  if (raw.length < 1) {
    throw new InvalidInstruction(raw);
  }
  const d = raw[0];
  if (!isDirection(d)) {
    throw new InvalidInstruction(raw);
  }
  const c = raw.slice(1);
  if (/[^0-9]/.test(c)) {
    throw new InvalidInstruction(raw);
  }
  return {
    direction: d,
    count: parseInt(c, 10)
  };
}

export function pointsFromInstructionList(
  start: Point,
  instructions: Instruction[]
): Point[] {
  const points: Point[] = [];
  let previous = start;
  instructions.forEach(i => {
    points.push(...pointsFromInstruction(previous, i));
    previous = points[points.length - 1];
  });
  return points;
}

export function pointsFromInstruction(
  start: Point,
  instruction: Instruction
): Point[] {
  const points: Point[] = [];
  let previous = start;
  for (let count = 0; count < instruction.count; count++) {
    previous = move(previous, instruction.direction);
    points.push(previous);
  }
  return points;
}

export function followInstructionList(
  start: Point,
  instructions: Instruction[]
): Segment[] {
  return instructions.reduce((segments: Segment[], instruction) => {
    let s: Point;
    if (segments.length > 0) {
      s = segments[segments.length - 1].end;
    } else {
      s = start;
    }
    return [...segments, ...followInstruction(s, instruction)];
  }, []);
}

export function followInstruction(
  start: Point,
  instruction: Instruction
): Segment[] {
  const segments: Segment[] = [];
  let a = start;
  let b = start;
  for (let count = 0; count < instruction.count; count++) {
    b = move(a, instruction.direction);
    segments.push({ start: a, end: b });
    a = b;
  }
  return segments;
}

function move(point: Point, direction: direction): Point {
  switch (direction) {
    case 'D':
      return { x: point.x, y: point.y - 1 };
    case 'L':
      return { x: point.x - 1, y: point.y };
    case 'R':
      return { x: point.x + 1, y: point.y };
    case 'U':
      return { x: point.x, y: point.y + 1 };
  }
}

function coincide(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

function segmentIntersections(a: Segment[], b: Segment[]): Point[] {
  const result = [];
  a.forEach(segA => {
    b.forEach(segB => {
      if (coincide(segA.end, segB.end)) {
        result.push(segA.end);
      }
    });
  });
  return result;
}

function pointIntersections(a: Point[], b: Point[]): Point[] {
  const aMap: { [x: number]: { [y: number]: Point } } = a.reduce((m, p) => {
    if (m[p.x] === undefined) {
      m[p.x] = { [p.y]: p };
      return m;
    }
    m[p.x][p.y] = p;
    return m;
  }, {});

  return b.filter(p => aMap[p.x] !== undefined && aMap[p.x][p.y] !== undefined);
}

export function closestIntersection(a: string[], b: string[]): number {
  const lineA = pointsFromInstructionList(
    { x: 0, y: 0 },
    a.map(parseInstruction)
  );
  const lineB = pointsFromInstructionList(
    { x: 0, y: 0 },
    b.map(parseInstruction)
  );
  return Math.min(
    ...pointIntersections(lineA, lineB).map(p => Math.abs(p.x) + Math.abs(p.y))
  );
}

export function leastPath(a: string[], b: string[]): number {
  const lineA = pointsFromInstructionList(
    { x: 0, y: 0 },
    a.map(parseInstruction)
  );
  const lineB = pointsFromInstructionList(
    { x: 0, y: 0 },
    b.map(parseInstruction)
  );
  return Math.min(
    ...pointIntersections(lineA, lineB).map(p => {
      const aJumps = 1 + lineA.findIndex(pa => coincide(pa, p));
      const bJumps = 1 + lineB.findIndex(pa => coincide(pa, p));
      return aJumps + bJumps;
    })
  );
}
