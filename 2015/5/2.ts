import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { supernice } from './nice';

(async () => {
  answer(
    (await loadInput(join(__dirname, 'input.txt'))).filter(supernice).length
  );
})();
