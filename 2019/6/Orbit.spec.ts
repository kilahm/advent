import { assert } from 'console';
import { OrbitSet, parseOrbit } from './Orbit';

test(`Orbit count`, () => {
  const orbits = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L'
  ];
  const expectedOrbitCount = 42;
  const orbitSet = new OrbitSet();
  orbits.map(parseOrbit).forEach(o => orbitSet.addOrbit(o.parent, o.object));
  expect(orbitSet.totalOrbits()).toBe(expectedOrbitCount);
});

test(`Orbital transfer`, () => {
  const orbits = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
    'K)YOU',
    'I)SAN'
  ];
  const expectedTransfers = 4;
  const orbitSet = new OrbitSet();
  orbits.map(parseOrbit).forEach(o => orbitSet.addOrbit(o.parent, o.object));
  const you = orbitSet.get('YOU');
  const san = orbitSet.get('SAN');
  if(you === undefined || san === undefined) {
    throw new Error();
  }
  const commonParent = you.commonParent(san);
  const transfers = you.orbitCount(commonParent) + san.orbitCount(commonParent) - 2;
  expect(transfers).toBe(expectedTransfers);
});
