import { Bounds, Point } from '../../shared/grid';

export type InstructionType = 'turn on' | 'turn off' | 'toggle';

export class Instruction {
  private static readonly parseRegex = /^(?<type>turn on|turn off|toggle) (?<startx>\d+),(?<starty>\d+) through (?<endx>\d+),(?<endy>\d+)$/;

  constructor(readonly type: InstructionType, private bounds: Bounds) {}

  pointList(): Point[] {
    return this.bounds.allPoints();
  }

  static parse(raw: string): Instruction {
    const matches = raw.match(Instruction.parseRegex);
    if (matches === null || matches.groups === undefined) {
      throw new Error(`Invalid instruction: ${raw}`);
    }
    return new Instruction(
      matches.groups['type'] as InstructionType,
      new Bounds(
        {
          x: parseInt(matches.groups['startx'], 10),
          y: parseInt(matches.groups['starty'], 10)
        },
        {
          x: parseInt(matches.groups['endx'], 10),
          y: parseInt(matches.groups['endy'], 10)
        }
      )
    );
  }
}
