export function isIntegerString(value: string): boolean {
  return /^[+-]?[0-9]+$/.test(value);
}

export function parseNumber(value: string): number {
  const result = parseInt(value);
  if(Number.isFinite(result)) {
    return result;
  }
  throw new Error(`Unable to parse string as a number: "${value}"`);
}

