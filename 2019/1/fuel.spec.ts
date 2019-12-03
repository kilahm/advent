import { fuelForMass, totalFuelForMass } from "./fuel";

describe("fuel for mass", () => {
  [
    { mass: 12, fuel: 2 },
    { mass: 14, fuel: 2 },
    { mass: 1969, fuel: 654 },
    { mass: 100756, fuel: 33583 }
  ].forEach(({ mass, fuel }) => {
    test(`Mass of ${mass} should need fuel of ${fuel}`, () => {
      expect(fuelForMass(mass)).toBe(fuel);
    });
  });
});

describe("total fuel for mass", () => {
  [
    { mass: 14, fuel: 2 },
    { mass: 1969, fuel: 966 },
    { mass: 100756, fuel: 50346 }
  ].forEach(({ mass, fuel }) => {
    test(`Mass of ${mass} should need total fuel of ${fuel}`, () => {
      expect(totalFuelForMass(mass)).toBe(fuel);
    });
  });
});
