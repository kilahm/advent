import { loadInput } from '../../shared/input';
import { join } from 'path';
import { OrbitSet, parseOrbit } from './Orbit';
import { answer } from '../../shared/answer';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const os = new OrbitSet();
  input.map(parseOrbit).forEach(o => os.addOrbit(o.parent, o.object));
  answer(os.totalOrbits());
})();
