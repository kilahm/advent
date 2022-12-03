import { join } from 'path';
import { answer } from '../../shared/answer';
import { fatal } from '../../shared/display';
import { loadInput } from '../../shared/input';
import { itemPriority, Rucksack, RucksackGroup } from './ruckack';

(async () => {
  const sacks = (await loadInput(join(__dirname, 'input.txt'))).map((line) =>
    Rucksack.fromString(line)
  );
  const groups = RucksackGroup.fromIterable(sacks);

  answer(groups.reduce((sum, group) => sum + itemPriority(group.badge()), 0));
})().catch(console.error);
