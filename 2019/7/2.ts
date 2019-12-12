import { join } from 'path';
import { loadInput } from '../../shared/input';
import { answer } from '../../shared/answer';
import { maximizeAmps } from './ampCircuit';

(async () => {
  const program = (await loadInput(join(__dirname, 'input.txt')))[0]
    .split(',')
    .map(i => parseInt(i, 10));
  answer(await maximizeAmps(program, [5, 6, 7, 8, 9]));
})();
