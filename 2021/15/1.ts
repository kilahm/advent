import chalk from 'chalk';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { Matrix } from '../../shared/Matrix';

(async () => {
  const map = new Matrix<number>(
    (await loadInput(join(__dirname, 'input.txt'))).map((line) =>
      line.split('').map((n) => parseInt(n, 10))
    )
  );
  answer(
    map.findPathRectilinear(
      { column: 0, row: 0 },
      { column: map.width() - 1, row: map.height() - 1 },
      (_, to) => to.value
    ).cost
  );
})().catch(console.error);
