export function permutations<T>(values: T[]): T[][] {
  if(values.length === 0) {
    return [];
  }
  if(values.length === 1) {
    return [values];
  }
  const result: T[][] = [];
  values.forEach((v, i) => {
    const rest = values.filter((_, filterI) => i !== filterI);
    permutations(rest).forEach(restpermutation => {
      result.push([v, ...restpermutation])
    });
  });
  return result;
}
