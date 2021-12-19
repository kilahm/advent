import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { bin } from '../../shared/lists';
import { numericSort } from '../../shared/numbers';

(async () => {
  const lines = await loadInput(join(__dirname, 'input.txt'));
  const startingPattern = lines.shift();
  if (typeof startingPattern !== 'string') {
    throw new Error('Unable to load starting pattern');
  }

  const insertionRules: { left: string; right: string; insert: string }[] =
    lines.slice(1).map((line) => {
      const [pair, insert] = line.split(' -> ');
      if (typeof pair !== 'string' || pair.length !== 2) {
        throw new Error(`Invalid rule: ${line} (pair is not length 2)`);
      }
      if (typeof insert !== 'string' || insert.length !== 1) {
        throw new Error(`Invalid rule: ${line} (insert is not length 1)`);
      }
      return { left: pair[0], right: pair[1], insert };
    });

  let finalPattern = startingPattern;
  for (let i = 0; i < 10; ++i) {
    finalPattern = applyPatterns(finalPattern, insertionRules);
  }

  const counts = [...bin(finalPattern.split('')).values()].sort(numericSort);
  answer(counts[counts.length - 1] - counts[0]);
})().catch(console.error);
function applyPatterns(
  pattern: string,
  insertionRules: { left: string; right: string; insert: string }[]
): string {
  const nextPattern: string[] = [pattern[0]];
  pattern.split('').forEach((letter, index, splitPattern) => {
    if (index === splitPattern.length - 1) {
      return;
    }
    const ruleApplies = insertionRules.some((rule) => {
      if (letter === rule.left && splitPattern[index + 1] === rule.right) {
        nextPattern.push(rule.insert, rule.right);
        return true;
      }
    });
    if (!ruleApplies) {
      nextPattern.push(splitPattern[index + 1]);
    }
  });
  return nextPattern.join('');
}
