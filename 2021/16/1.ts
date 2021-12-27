import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

(async () => {
  const lines = (await loadInput(join(__dirname, 'input.txt'))).map(line => line);
  answer();
})().catch(console.error);
