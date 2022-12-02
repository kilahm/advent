import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';

(async () => {
  let max = 0;
  (await loadInput(join(__dirname, 'input.txt'))).reduce((sum, line) => {
    if (line === '') {
      max = Math.max(max, sum);
      return 0;
    }
    return sum + parseInt(line);
  }, 0);
  answer(max);
})().catch(console.error);
