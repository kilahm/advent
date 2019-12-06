import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Circuit } from './Circuit';
import { answer } from '../../shared/answer';

(async() => {
  const instructions = await loadInput(join(__dirname, 'input.txt'));
  const c = new Circuit(instructions);
  answer(c.measure('a'));
})();
