export function isIntegerString(value: string): boolean {
  return /^[+-]?[0-9]+$/.test(value);
}

export function parseNumber(value: string): number {
  const result = parseInt(value);
  if (Number.isFinite(result)) {
    return result;
  }
  throw new Error(`Unable to parse string as a number: "${value}"`);
}

export function almostEqual(
  a: number,
  b: number,
  tolerance: number = 10 ** -8
): boolean {
  return tolerance >= a - b;
}

