import { OrbitSet, parseOrbit } from './Orbit';
import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';

(async () => {
  const orbits = await loadInput(join(__dirname, 'input.txt'));
  const orbitSet = new OrbitSet();
  orbits.map(parseOrbit).forEach(o => orbitSet.addOrbit(o.parent, o.object));
  const you = orbitSet.get('YOU');
  const san = orbitSet.get('SAN');
  const commonParent = you.commonParent(san);
  answer(you.orbitCount(commonParent) + san.orbitCount(commonParent) - 2);
})();
