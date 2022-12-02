import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';

(async () => {
  const sums: number[] = [];
  (await loadInput(join(__dirname, 'input.txt'))).reduce((sum, line) => {
    if (line === '') {
      sums.push(sum);
      return 0;
    }
    return sum + parseInt(line);
  }, 0);
  answer(
    sums
      .sort((a, b) => (a > b ? -1 : 1))
      .slice(0, 3)
      .reduce((total, sum) => total + sum, 0)
  );
})().catch(console.error);
