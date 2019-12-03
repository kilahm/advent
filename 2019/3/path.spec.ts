import {
  closestIntersection,
  followInstruction,
  followInstructionList,
  Instruction,
  InvalidInstruction,
  leastPath,
  parseInstruction,
  Segment
} from './path';

describe('followInstruction', () => {
  test('left 1 from (-3, 4)', () => {
    const expected: Segment[] = [
      {
        start: { x: -3, y: 4 },
        end: { x: -4, y: 4 }
      }
    ];
    expect(
      followInstruction({ x: -3, y: 4 }, { direction: 'L', count: 1 })
    ).toEqual(expected);
  });

  test('down 2 from (3, 4)', () => {
    const expected: Segment[] = [
      {
        start: { x: 3, y: 4 },
        end: { x: 3, y: 3 }
      },
      {
        start: { x: 3, y: 3 },
        end: { x: 3, y: 2 }
      }
    ];
    expect(
      followInstruction({ x: 3, y: 4 }, { direction: 'D', count: 2 })
    ).toEqual(expected);
  });

  test('up 4 from origin', () => {
    const expected: Segment[] = [
      {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 1 }
      },
      {
        start: { x: 0, y: 1 },
        end: { x: 0, y: 2 }
      },
      {
        start: { x: 0, y: 2 },
        end: { x: 0, y: 3 }
      },
      {
        start: { x: 0, y: 3 },
        end: { x: 0, y: 4 }
      }
    ];
    expect(
      followInstruction({ x: 0, y: 0 }, { direction: 'U', count: 4 })
    ).toEqual(expected);
  });
});

describe('followInstructionList', () => {
  test('left 1 down 2 from (2, -1)', () => {
    const expected: Segment[] = [
      {
        start: { x: 2, y: -1 },
        end: { x: 1, y: -1 }
      },
      {
        start: { x: 1, y: -1 },
        end: { x: 1, y: -2 }
      },
      {
        start: { x: 1, y: -2 },
        end: { x: 1, y: -3 }
      }
    ];
    const instructions: Instruction[] = [
      {
        direction: 'L',
        count: 1
      },
      {
        direction: 'D',
        count: 2
      }
    ];
    expect(followInstructionList({ x: 2, y: -1 }, instructions)).toEqual(
      expected
    );
  });
});

describe('parseInstruction', () => {
  test('R5', () => {
    const actual = parseInstruction('R5');
    const expected: Instruction = {
      direction: 'R',
      count: 5
    };
    expect(actual).toEqual(expected);
  });

  test('R6a', () => {
    expect(() => parseInstruction('R6a')).toThrow(
      new InvalidInstruction('R6a')
    );
  });
});

describe('closest intersection', () => {
  [
    {
      a: ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      b: ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
      distance: 159
    },
    {
      a: [
        'R98',
        'U47',
        'R26',
        'D63',
        'R33',
        'U87',
        'L62',
        'D20',
        'R33',
        'U53',
        'R51'
      ],
      b: ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'],
      distance: 135
    }
  ].forEach(({ a, b, distance }, pathIndex) => {
    test(`Path ${pathIndex}`, () => {
      expect(closestIntersection(a, b)).toBe(distance);
    });
  });
});

describe('least path', () => {
  [
    {
      a: ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      b: ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
      distance: 610
    },
    {
      a: [
        'R98',
        'U47',
        'R26',
        'D63',
        'R33',
        'U87',
        'L62',
        'D20',
        'R33',
        'U53',
        'R51'
      ],
      b: ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'],
      distance: 410
    }
  ].forEach(({ a, b, distance }, pathIndex) => {
    test(`Path ${pathIndex}`, () => {
      expect(leastPath(a, b)).toBe(distance);
    });
  });
});
