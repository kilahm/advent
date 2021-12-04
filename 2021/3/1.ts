import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

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
  // const readings = (data).map((line) =>
  //   line.split('').map((n) => parseInt(n, 10))
  // );
  const readings = (await loadInput(join(__dirname, 'input.txt'))).map((line) =>
    line.split('').map((n) => parseInt(n, 10))
  );
  const counts = new Map<number, Map<number, number>>();
  readings.forEach((reading) => {
    reading.forEach((bit, col) => {
      const colmap = counts.get(col) ?? new Map();
      colmap.set(bit, (colmap.get(bit) ?? 0) + 1);
      counts.set(col, colmap);
    });
  });
  const gamma: number[] = [];
  const epsilon: number[] = [];
  counts.forEach((bits, col) => {
    const zeroCount = bits.get(0) ?? 0;
    const oneCount = bits.get(1) ?? 0;
    if (zeroCount > oneCount) {
      gamma[col] = 0;
      epsilon[col] = 1;
    } else {
      gamma[col] = 1;
      epsilon[col] = 0;
    }
  });

  const gammaReading = parseInt(gamma.join(''), 2);
  const epsilonReading = parseInt(epsilon.join(''), 2);
  answer(gammaReading * epsilonReading);
})().catch(console.error);
