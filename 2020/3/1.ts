import { answer } from '../../shared/answer';
import { treeCount } from './treecount';
import { loadMap } from './load-map';

(async () => {
  const treeMap = await loadMap();
  answer(treeCount(treeMap, {x: 3, y: 1}))
})().catch(e => console.error(e));
