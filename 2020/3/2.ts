import { treeCount } from './treecount';
import { loadMap } from './load-map';
import { answer } from '../../shared/answer';

(async () => {
  const treeMap = await loadMap();
  answer([{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 }, { x: 7, y: 1 }, {
    x: 1,
    y: 2
  }].reduce((total, delta) => total * treeCount(treeMap, delta), 1));
})().catch(e => console.error(e));

