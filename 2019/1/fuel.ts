export function fuelForMass(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function totalFuelForMass(mass: number): number {
  let total = 0;
  let next = fuelForMass(mass);
  while (next > 0) {
    total += next;
    next = fuelForMass(next);
  }
  return total;
}
