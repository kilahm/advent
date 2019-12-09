export function permutations(values: number[]): number[][] {
  if(values.length < 2) {
    return [values];
  }
  const result = [];
  values.forEach((v, i) => {
    const rest = values.filter((_, filterI) => i !== filterI);
    permutations(rest).forEach(restpermutation => {
      result.push([v, ...restpermutation])
    });
  });
  return result;
}
