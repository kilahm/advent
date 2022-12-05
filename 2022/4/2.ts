import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

(async () => {
  const rangePairs = (await loadInput(join(__dirname, 'input.txt'))).map(
    (line) =>
      line
        .split(',')
        .map((range) => range.split('-').map((num) => parseInt(num, 10)))
  );
  const ans = rangePairs.reduce((count, [rangeLeft, rangeRight]) => {
    if (rangeLeft[1] >= rangeRight[0] && rangeLeft[0] <= rangeRight[1]) {
      return count + 1;
    }
    return count;
  }, 0);
  answer(ans);
})().catch(console.error);
