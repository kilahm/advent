import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { Seat } from './Seat';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));

  const ids = input.map((code) => new Seat(code).id).sort((a, b) => a - b);
  ids.forEach((_, index) => {
    if (index === 0) {
      return;
    }
    if (ids[index] - ids[index - 1] !== 1) {
      answer(ids[index] - 1);
    }
  });
})();
