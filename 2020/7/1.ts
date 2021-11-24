import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { BagRule } from './BagRule';

(async () => {
  const rules = (await loadInput(join(__dirname, 'input.txt'))).map((r) =>
    BagRule.fromString(r)
  );

  const containingBags = new Set<string>(['shiny gold']);

  let initialCount = 0;
  while (initialCount < containingBags.size) {
    initialCount = containingBags.size;
    rules.forEach((rule) => {
      containingBags.forEach((bag) => {
        if (rule.innerBags.has(bag)) {
          containingBags.add(rule.outerBag);
        }
      });
    });
  }
  answer(containingBags.size - 1);
})().catch(console.error);
