import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { Nbody } from './Nbody';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  answer(Nbody.fromSerializedPositions(input).run(1000).totalEnergy());
})();
