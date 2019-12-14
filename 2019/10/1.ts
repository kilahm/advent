import { loadInput } from '../../shared/input';
import { join } from 'path';
import { AsteroidMap } from './AsteroidMap';
import { answer } from '../../shared/answer';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const map = AsteroidMap.parse(input);
  answer(map.baseSite().asteroidCount);
})();
