import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { corruptedSyntaxErrorScore } from './corruptedSyntaxErrorScore';

(async () => {
  answer(
    (await loadInput(join(__dirname, 'input.txt')))
      .map(corruptedSyntaxErrorScore)
      .reduce((acc, score) => acc + score, 0)
  );
})().catch(console.error);
