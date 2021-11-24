import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { BagRule } from './BagRule';

(async () => {
  const rules = (await loadInput(join(__dirname, 'input.txt')))
    .map((r) => BagRule.fromString(r))
    .reduce((all, r) => all.set(r.outerBag, r), new Map<string, BagRule>());

  const shinyBag = rules.get('shiny gold');
  answer(shinyBag.countContents(rules) - 1);
})().catch(console.error);
