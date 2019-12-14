import { loadInput } from '../../shared/input';
import { join } from 'path';
import { AsteroidMap } from './AsteroidMap';
import { answer } from '../../shared/answer';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const map = AsteroidMap.parse(input);
  const base = map.baseSite();
  const target = map.vaporizeFrom(base.location)[199];
  answer(target.x * 100 + target.y);
})();
