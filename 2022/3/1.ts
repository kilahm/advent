import { join } from 'path';
import { answer } from '../../shared/answer';
import { fatal } from '../../shared/display';
import { loadInput } from '../../shared/input';
import { itemPriority, Rucksack } from './ruckack';

(async () => {
  const sacks = (await loadInput(join(__dirname, 'input.txt'))).map((line) =>
    Rucksack.fromString(line)
  );

  answer(sacks.reduce((sum, sack) => sum + itemPriority(sack.commonItem()), 0));
})().catch(console.error);
