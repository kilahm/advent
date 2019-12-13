import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { SIFImage } from './SIFImage';

(async () => {
  const rawData = (await loadInput(join(__dirname, 'input.txt')))[0]
    .split('')
    .map(v => parseInt(v, 10));
  answer(new SIFImage(25, 6, rawData).signature());
})();
