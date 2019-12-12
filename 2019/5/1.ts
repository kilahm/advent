import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Computer } from '../../shared/computer';
import { answer } from '../../shared/answer';
import { of } from 'rxjs';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const program = input[0].split(',').map(i => parseInt(i, 10));
  const c = new Computer(program, of(1));
  let result = -1;
  c.output$.subscribe(v => result = v);
  await c.execute();
  answer(result);
})();
