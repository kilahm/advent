import { writeFileSync } from 'fs';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { parseNumber } from '../../shared/numbers';

(async () => {
  const input = (await loadInput(join(__dirname, 'input.txt'))).map(
    parseNumber
  );
  input.sort((a,b) => a - b);
  const diffCounts = new Map<number, number>();
  diffCounts.set(3, 1);
  input.forEach((_, index, list) => {
    if (index === 0) {
        diffCounts.set(list[index], (diffCounts.get(list[index]) ?? 0) + 1);
        return;
    }
    const diff = list[index] - list[index - 1];
    if(diff < 1 || 3 < diff) {
        throw new Error(`Diff out of range: list[${index}] - list[${index - 1}] = ${diff}`)
    }
    diffCounts.set(diff, (diffCounts.get(diff) ?? 0) + 1);
  });
  console.dir(diffCounts);
  answer(diffCounts.get(1) * diffCounts.get(3));
})().catch(console.error);
