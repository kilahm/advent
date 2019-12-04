import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { nice } from './nice';

(async () => {
  answer((await loadInput(join(__dirname, 'input.txt'))).filter(nice).length);
})();
