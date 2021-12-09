import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { Matrix } from '../../shared/Matrix';

(async () => {
  const map = new Matrix<number>(
    (await loadInput(join(__dirname, 'input.txt')))
      .map((line) => line.split('').map((n) => parseInt(n, 10)))
      .reduce((data, row) => {
        data.push(row);
        return data;
      }, [] as number[][])
  );

  answer(
    map.reduce((riskLevel, height, index) => {
      if ([...map.rectiliniearNeighbors(index)].every((n) => n.value > height)) {
        return riskLevel + height + 1;
      }
      return riskLevel;
    }, 0)
  );
})().catch(console.error);
