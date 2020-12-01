import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { answer } from '../../shared/answer';

(async () => {
  const amounts: number[] = [];
  const data = createReadStream(join(__dirname, 'input.txt'));
  const reader = createInterface({ input: data, crlfDelay: Infinity });
  for await (const line of reader) {
    amounts.push(parseInt(line, 10));
  }

  amounts.sort((a, b) => a - b);
  for (const firstIndex in amounts) {
    const first = amounts[firstIndex];
    for (const secondIndex in amounts) {
      if (firstIndex === secondIndex) {
        continue;
      }
      const second = amounts[secondIndex];
      const total = first + second;
      if (total > 2020) {
        break;
      }
      if (total === 2020) {
        answer(first * second);
        return;
      }
    }
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
