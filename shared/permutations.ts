export function permutations(values: number[]): number[][] {
  if (values.length === 0) {
    return [];
  }
  if (values.length === 1) {
    return [values];
  }
  const result = [];
  values.forEach((v, i) => {
    const rest = values.filter((_, filterI) => i !== filterI);
    permutations(rest).forEach(restpermutation => {
      result.push([v, ...restpermutation]);
    });
  });
  return result;
}

export function combinations<T>(
  valueSpace: Array<T>,
  pick: number
): Array<Array<T>> {
  return memoizedCombineIndexes(0, valueSpace.length - 1, pick)
    .filter(combo => combo.length === pick)
    .map(combo => combo.map(i => valueSpace[i]));
}

const memoizedCombos = new Map<string, number[][]>();

function memoizedCombineIndexes(
  currentIndex: number,
  maxIndex: number,
  pick: number
): Array<Array<number>> {
  const key = `${currentIndex}:${maxIndex}:${pick}`;
  if (!memoizedCombos.has(key)) {
    memoizedCombos.set(key, combineIndexes(currentIndex, maxIndex, pick));
  }
  return memoizedCombos.get(key);
}

function combineIndexes(
  currentIndex: number,
  maxIndex: number,
  pick: number
): Array<Array<number>> {
  if (currentIndex === maxIndex) {
    return [[currentIndex], []];
  }
  const rest = combineIndexes(currentIndex + 1, maxIndex, pick);
  const withCurrent = rest.map(c => [currentIndex, ...c]).filter(c => c.length <= pick);
  return [...withCurrent, ...rest];
}
