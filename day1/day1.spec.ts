import { fuelForMass } from "./day1";

describe('day 1', () => {
  [{mass: 12, fuel: 2},
  ].forEach(({mass, fuel}) => {
    test(`Mass of ${mass} should need fuel ${fuel}`, () => {
      expect(fuelForMass(mass)).toBe(fuel);
    })
  })
});
