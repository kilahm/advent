const primeSet = [2, 3];

export function primes(max: number): number[] {
  if (max < 2) {
    throw new Error(`There are no primes less than ${max}`);
  }
  if (max <= primeSet[primeSet.length - 1]) {
    return primeSet.filter(p => p <= max);
  }

  for (
    let potential = primeSet[primeSet.length - 1] + 2;
    potential <= max;
    potential += 2
  ) {
    if (primeSet.every(p => potential % p !== 0)) {
      primeSet.push(potential);
      factorStore[potential] = [potential, 1];
    }
  }
  return [...primeSet];
}

const factorStore: { [value: number]: number[] } = {
  1: [1],
  2: [2, 1],
  3: [3, 1]
};

export function factors(value: number): number[] {
  if (value < 1) {
    throw new Error('Factors only makes sense for integers > 0');
  }
  if (factorStore[value] !== undefined) {
    return [...factorStore[value]];
  }

  const ps = primes(value);

  if (factorStore[value] !== undefined) {
    return [...factorStore[value]];
  }

  const factor = ps.find(p => value % p === 0);
  factorStore[value] = [factor, ...factors(Math.floor(value / factor))];
  return [...factorStore[value]];
}

export function commonFactors(a: number, b: number): Array<number> {
  const common: number[] = [];
  const aFactors = factors(a);
  factors(b).forEach(f => {
    if (f === 1) {
      return;
    }
    const i = aFactors.indexOf(f);
    if (i !== -1) {
      common.push(f);
      aFactors.splice(i, 1);
    }
  });
  return common;
}

export function greatestCommonFactor(a: number, b: number): number {
  const absA = Math.abs(a);
  const absB = Math.abs(b);

  if (absA === 0 || absB === 0) {
    throw new Error('Unable to factor 0');
  }
  if (absA === 1 || absB === 1) {
    return 1;
  }
  return commonFactors(absA, absB).reduce((gcf, f) => gcf * f, 1);
}

export function reduce(a: number, b: number): [number, number] {
  const gcf = greatestCommonFactor(a, b);
  return [Math.floor(a / gcf), Math.floor(b / gcf)];
}
