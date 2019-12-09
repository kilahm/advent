import { loadInput } from '../../shared/input';
import { join } from 'path';
import { ArrayReaderWriter, Computer, ConsoleWriter } from '../../shared/computer';
import { answer } from '../../shared/answer';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const program = input[0].split(',').map(i => parseInt(i, 10));
  const consolerw = new ConsoleWriter();
  const rw = new ArrayReaderWriter(['1']);
  rw.tee(consolerw);
  const c = new Computer(program, rw);
  await c.execute();
  consolerw.close();
  const output = rw.state().out;
  answer(output[output.length - 1]);
})();
