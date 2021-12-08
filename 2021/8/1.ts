import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  answer(
    input
      .map((line) => line.split('|')[1].trimEnd().split(' '))
      .reduce(
        (uniqueSignalCount, signals) =>
          uniqueSignalCount +
          signals
            .map((s) => s.length)
            .filter((count) => [2, 3, 4, 7].includes(count)).length,
        0
      )
  );
})().catch(console.error);
