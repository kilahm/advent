import { join } from 'path';
import { map } from '../../2015/1/map';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

function getCounts(data: number[][]): Map<number, Map<number, number>> {
  const counts = new Map<number, Map<number, number>>();
  data.forEach((reading) => {
    reading.forEach((bit, col) => {
      const colmap = counts.get(col) ?? new Map();
      colmap.set(bit, (colmap.get(bit) ?? 0) + 1);
      counts.set(col, colmap);
    });
  });
  return counts;
}

function filterNumberSet(
  data: number[][],
  rule: (
    zeroCount: number,
    oneCount: number,
    col: number,
    num: number[]
  ) => boolean
): number[] {
  if (data.length < 1) {
    throw new Error('empty data set');
  }
  let result = [...data];
  for (let col = 0; result.length !== 1 && col < result[0].length; ++col) {
    const counts = getCounts(result);
    const zeroCount = counts.get(col)?.get(0) ?? 0;
    const oneCount = counts.get(col)?.get(1) ?? 0;
    result = result.filter((num) => rule(zeroCount, oneCount, col, num));
  }
  if (result.length !== 1) {
    throw new Error('unable to filter to one number');
  }
  return result[0];
}

(async () => {
  const data = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010',
  ];
  // const readings = data.map((line) =>
  //   line.split('').map((n) => parseInt(n, 10))
  // );
  const readings = (await loadInput(join(__dirname, 'input.txt'))).map((line) =>
    line.split('').map((n) => parseInt(n, 10))
  );
  const o2 = filterNumberSet(
    readings,
    (zeroCount: number, oneCount: number, col: number, num: number[]) => {
      if(zeroCount > oneCount) {
        return num[col] === 0;
      }
      return num[col] === 1;
    }
  );
  const co2 = filterNumberSet(
    readings,
    (zeroCount: number, oneCount: number, col: number, num: number[]) => {
      if(zeroCount > oneCount) {
        return num[col] === 1;
      }
      return num[col] === 0;
    }
  );

  const o2Reading = parseInt(o2.join(''), 2);
  const co2Reading = parseInt(co2.join(''), 2);
  answer(o2Reading * co2Reading);
})().catch(console.error);
