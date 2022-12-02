import { OrbitSet, parseOrbit } from './Orbit';
import { loadInput } from '../../shared/input';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { fatal } from '../../shared/display';

(async () => {
  const orbits = await loadInput(join(__dirname, 'input.txt'));
  const orbitSet = new OrbitSet();
  orbits.map(parseOrbit).forEach((o) => orbitSet.addOrbit(o.parent, o.object));
  const you = orbitSet.get('YOU');
  const san = orbitSet.get('SAN');
  const commonParent = you?.commonParent(san);
  if (you === undefined || san === undefined || commonParent === undefined) {
    fatal('One of the orbits is undefined');
  }
  answer(you.orbitCount(commonParent) + san.orbitCount(commonParent) - 2);
})();
