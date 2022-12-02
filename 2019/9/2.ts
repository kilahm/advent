import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Computer } from '../../shared/computer';
import { of } from 'rxjs';
import { answer } from '../../shared/answer';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const program = input[0].split(',').map((i) => parseInt(i, 10));
  const c = new Computer(program, of(2));
  const out: number[] = [];
  c.output$.subscribe((v) => out.push(v));
  try {
    await c.execute();
  } catch (err) {
    console.error(err);
  }
  console.log(out);
  answer(out[0]);
})();
