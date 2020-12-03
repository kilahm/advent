import { Nbody } from './Nbody';
import { Nbody2 } from './Nbody2';

describe('Nbody position and velocity', () => {
  const initialBodyData = [
    { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
    { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
  ];
  const bodyDataPerStep = [
    [
      { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
    ],
    [
      { position: { x: 2, y: -1, z: 1 }, velocity: { x: 3, y: -1, z: -1 } },
      { position: { x: 3, y: -7, z: -4 }, velocity: { x: 1, y: 3, z: 3 } },
      { position: { x: 1, y: -7, z: 5 }, velocity: { x: -3, y: 1, z: -3 } },
      { position: { x: 2, y: 2, z: 0 }, velocity: { x: -1, y: -3, z: 1 } }
    ],
    [
      { position: { x: 5, y: -3, z: -1 }, velocity: { x: 3, y: -2, z: -2 } },
      { position: { x: 1, y: -2, z: 2 }, velocity: { x: -2, y: 5, z: 6 } },
      { position: { x: 1, y: -4, z: -1 }, velocity: { x: 0, y: 3, z: -6 } },
      { position: { x: 1, y: -4, z: 2 }, velocity: { x: -1, y: -6, z: 2 } }
    ],
    [
      { position: { x: 5, y: -6, z: -1 }, velocity: { x: 0, y: -3, z: 0 } },
      { position: { x: 0, y: 0, z: 6 }, velocity: { x: -1, y: 2, z: 4 } },
      { position: { x: 2, y: 1, z: -5 }, velocity: { x: 1, y: 5, z: -4 } },
      { position: { x: 1, y: -8, z: 2 }, velocity: { x: 0, y: -4, z: 0 } }
    ],
    [
      { position: { x: 2, y: -8, z: 0 }, velocity: { x: -3, y: -2, z: 1 } },
      { position: { x: 2, y: 1, z: 7 }, velocity: { x: 2, y: 1, z: 1 } },
      { position: { x: 2, y: 3, z: -6 }, velocity: { x: 0, y: 2, z: -1 } },
      { position: { x: 2, y: -9, z: 1 }, velocity: { x: 1, y: -1, z: -1 } }
    ],
    [
      { position: { x: -1, y: -9, z: 2 }, velocity: { x: -3, y: -1, z: 2 } },
      { position: { x: 4, y: 1, z: 5 }, velocity: { x: 2, y: 0, z: -2 } },
      { position: { x: 2, y: 2, z: -4 }, velocity: { x: 0, y: -1, z: 2 } },
      { position: { x: 3, y: -7, z: -1 }, velocity: { x: 1, y: 2, z: -2 } }
    ],
    [
      { position: { x: -1, y: -7, z: 3 }, velocity: { x: 0, y: 2, z: 1 } },
      { position: { x: 3, y: 0, z: 0 }, velocity: { x: -1, y: -1, z: -5 } },
      { position: { x: 3, y: -2, z: 1 }, velocity: { x: 1, y: -4, z: 5 } },
      { position: { x: 3, y: -4, z: -2 }, velocity: { x: 0, y: 3, z: -1 } }
    ],
    [
      { position: { x: 2, y: -2, z: 1 }, velocity: { x: 3, y: 5, z: -2 } },
      { position: { x: 1, y: -4, z: -4 }, velocity: { x: -2, y: -4, z: -4 } },
      { position: { x: 3, y: -7, z: 5 }, velocity: { x: 0, y: -5, z: 4 } },
      { position: { x: 2, y: 0, z: 0 }, velocity: { x: -1, y: 4, z: 2 } }
    ],
    [
      { position: { x: 5, y: 2, z: -2 }, velocity: { x: 3, y: 4, z: -3 } },
      { position: { x: 2, y: -7, z: -5 }, velocity: { x: 1, y: -3, z: -1 } },
      { position: { x: 0, y: -9, z: 6 }, velocity: { x: -3, y: -2, z: 1 } },
      { position: { x: 1, y: 1, z: 3 }, velocity: { x: -1, y: 1, z: 3 } }
    ],
    [
      { position: { x: 5, y: 3, z: -4 }, velocity: { x: 0, y: 1, z: -2 } },
      { position: { x: 2, y: -9, z: -3 }, velocity: { x: 0, y: -2, z: 2 } },
      { position: { x: 0, y: -8, z: 4 }, velocity: { x: 0, y: 1, z: -2 } },
      { position: { x: 1, y: 1, z: 5 }, velocity: { x: 0, y: 0, z: 2 } }
    ],
    [
      { position: { x: 2, y: 1, z: -3 }, velocity: { x: -3, y: -2, z: 1 } },
      { position: { x: 1, y: -8, z: 0 }, velocity: { x: -1, y: 1, z: 3 } },
      { position: { x: 3, y: -6, z: 1 }, velocity: { x: 3, y: 2, z: -3 } },
      { position: { x: 2, y: 0, z: 4 }, velocity: { x: 1, y: -1, z: -1 } }
    ]
  ];

  const nbody = new Nbody(initialBodyData);
  bodyDataPerStep.forEach((_, stepNumber) => {
    test(`Position and velocity after step ${stepNumber}`, () => {
      expect(nbody.bodies()).toEqual(bodyDataPerStep[stepNumber]);
      nbody.run(1);
    });
  });
});

describe('nbody2 steps', () => {
  const initialBodyData = [
    { x: -1, y: 0, z: 2 },
    { x: 2, y: -10, z: -7 },
    { x: 4, y: -8, z: 8 },
    { x: 3, y: 5, z: -1 }
  ];
  const bodyDataPerStep = [
    [
      { x: -1, y: 0, z: 2 },
      { x: 2, y: -10, z: -7 },
      { x: 4, y: -8, z: 8 },
      { x: 3, y: 5, z: -1 }
    ],
    [
      { x: 2, y: -1, z: 1 },
      { x: 3, y: -7, z: -4 },
      { x: 1, y: -7, z: 5 },
      { x: 2, y: 2, z: 0 }
    ],
    [
      { x: 5, y: -3, z: -1 },
      { x: 1, y: -2, z: 2 },
      { x: 1, y: -4, z: -1 },
      { x: 1, y: -4, z: 2 }
    ],
    [
      { x: 5, y: -6, z: -1 },
      { x: 0, y: 0, z: 6 },
      { x: 2, y: 1, z: -5 },
      { x: 1, y: -8, z: 2 }
    ],
    [
      { x: 2, y: -8, z: 0 },
      { x: 2, y: 1, z: 7 },
      { x: 2, y: 3, z: -6 },
      { x: 2, y: -9, z: 1 }
    ],
    [
      { x: -1, y: -9, z: 2 },
      { x: 4, y: 1, z: 5 },
      { x: 2, y: 2, z: -4 },
      { x: 3, y: -7, z: -1 }
    ],
    [
      { x: -1, y: -7, z: 3 },
      { x: 3, y: 0, z: 0 },
      { x: 3, y: -2, z: 1 },
      { x: 3, y: -4, z: -2 }
    ],
    [
      { x: 2, y: -2, z: 1 },
      { x: 1, y: -4, z: -4 },
      { x: 3, y: -7, z: 5 },
      { x: 2, y: 0, z: 0 }
    ],
    [
      { x: 5, y: 2, z: -2 },
      { x: 2, y: -7, z: -5 },
      { x: 0, y: -9, z: 6 },
      { x: 1, y: 1, z: 3 }
    ],
    [
      { x: 5, y: 3, z: -4 },
      { x: 2, y: -9, z: -3 },
      { x: 0, y: -8, z: 4 },
      { x: 1, y: 1, z: 5 }
    ],
    [
      { x: 2, y: 1, z: -3 },
      { x: 1, y: -8, z: 0 },
      { x: 3, y: -6, z: 1 },
      { x: 2, y: 0, z: 4 }
    ]
  ];
  const nbody = new Nbody2(initialBodyData);
  bodyDataPerStep.forEach((_, stepNumber) => {
    test(`Position and velocity after step ${stepNumber}`, () => {
      expect(nbody.state()).toEqual(bodyDataPerStep[stepNumber]);
      nbody.run(1);
    });
  });
});

describe('nbody energy', () => {
  test('after 10 steps', () => {
    const initialBodyData = [
      { position: { x: -1, y: 0, z: 2 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 2, y: -10, z: -7 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 4, y: -8, z: 8 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 3, y: 5, z: -1 }, velocity: { x: 0, y: 0, z: 0 } }
    ];
    const nbody = new Nbody(initialBodyData);
    nbody.run(10);
    expect(nbody.totalEnergy()).toBe(179);
  });
  test('after 100 steps', () => {
    const initialBodyData = [
      { position: { x: -8, y: -10, z: 0 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 5, y: 5, z: 10 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 2, y: -7, z: 3 }, velocity: { x: 0, y: 0, z: 0 } },
      { position: { x: 9, y: -8, z: -3 }, velocity: { x: 0, y: 0, z: 0 } }
    ];
    const nbody = new Nbody(initialBodyData);
    nbody.run(100);
    expect(nbody.totalEnergy()).toBe(1940);
  });
});

describe('nbody2 energy', () => {
  test('after 10 steps', () => {
    const initialBodyData = [
      { x: -1, y: 0, z: 2 },
      { x: 2, y: -10, z: -7 },
      { x: 4, y: -8, z: 8 },
      { x: 3, y: 5, z: -1 }
    ];
    const nbody = new Nbody2(initialBodyData);
    nbody.run(10);
    expect(nbody.totalEnergy()).toBe(179);
  });
  test('after 100 steps', () => {
    const initialBodyData = [
      { x: -8, y: -10, z: 0 },
      { x: 5, y: 5, z: 10 },
      { x: 2, y: -7, z: 3 },
      { x: 9, y: -8, z: -3 }
    ];
    const nbody = new Nbody2(initialBodyData);
    nbody.run(100);
    expect(nbody.totalEnergy()).toBe(1940);
  });
});

describe('nbody period', () => {
  [
    // {
    //   initial: [
    //     { x: -1, y: 0, z: 2 },
    //     { x: 2, y: -10, z: -7 },
    //     { x: 4, y: -8, z: 8 },
    //     { x: 3, y: 5, z: -1 }
    //   ],
    //   period: 2772
    // },
    {
      initial: [
        { x: -8, y: -10, z: 0 },
        { x: 5, y: 5, z: 10 },
        { x: 2, y: -7, z: 3 },
        { x: 9, y: -8, z: 3 }
      ],
      period: 4686774924
    }
  ].forEach(({ initial, period }, index) => {
    test(`Dataset ${index}`, () => {
      const nbody = new Nbody2(initial);
      expect(nbody.positionPeriod()).toBe(period);
    });
  });
});
