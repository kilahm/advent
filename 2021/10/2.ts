import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { numericSort } from '../../shared/numbers';
import { incompleteErrorScore } from './incompleteErrorScore';

(async () => {
  const scores = (await loadInput(join(__dirname, 'input.txt')))
    .map(incompleteErrorScore)
    .filter((score) => score > 0)
    .sort(numericSort);

  answer(scores[Math.floor(scores.length / 2)]);
})().catch(console.error);
