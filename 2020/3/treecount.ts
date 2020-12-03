import { Map } from '../../shared/map';
import { Point, pointSum } from '../../shared/grid';

export function treeCount(treeMap: Map<boolean>, delta: Point): number {
  let currentPosition: Point = { x: 0, y: 0 };

  currentPosition = pointSum(currentPosition, delta);

  let treeCount = 0;
  while (currentPosition.y <= treeMap.bounds.yRange()[1]) {
    if (treeMap.value(currentPosition)) {
      console.log(`found a tree at ${JSON.stringify(currentPosition)}`);
      treeCount++;
    } else {
      console.log(`found a space at ${JSON.stringify(currentPosition)}`);
    }
    currentPosition = pointSum(currentPosition, delta);
    if (currentPosition.x > treeMap.bounds.xRange()[1]) {
      currentPosition.x -= treeMap.bounds.xRange()[1] + 1;
    }
  }
  return treeCount;
}
