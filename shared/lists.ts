export function bin<T>(input: T[]): Map<T, number> {
  return input.reduce((bins, value) => 
    bins.set(value, (bins.get(value) ?? 0) + 1)
  , new Map<T, number>())
}