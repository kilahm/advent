import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { gameScore, parseEntry2 } from './rps';

(async () => {
  const total = (await loadInput(join(__dirname, 'input.txt'))).reduce(
    (score, line) => score + gameScore(parseEntry2(line)),
    0
  );
  answer(total);
})().catch(console.error);
