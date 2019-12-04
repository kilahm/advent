export function isValidPassword(pw: number): boolean {
  if (pw < 0 || pw > 999999) {
    return false;
  }
  const pwString = pw.toString(10).padStart(6, '0');
  const groupSizes = sizeGroups(pwString);
  if (!groupSizes.reduce((hasPair, size) => hasPair || size === 2, false)) {
    return false;
  }
  return pwString
    .split('')
    .map(d => parseInt(d, 10))
    .reduce((ascending, d, index, list) => {
      if (index === 0) {
        return ascending;
      }
      return ascending && d >= list[index - 1];
    }, true);
}

function sizeGroups(pw: string): number[] {
  let i = 1;
  let size = 1;
  const groups: number[] = [];
  while (i < pw.length) {
    if (pw[i] === pw[i - 1]) {
      size++;
    } else {
      groups.push(size);
      size = 1;
    }
    i++;
  }
  groups.push(size);
  return groups;
}
