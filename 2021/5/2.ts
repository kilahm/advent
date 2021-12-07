import { join } from 'path';
import { answer } from '../../shared/answer';
import { LineSegment, Point } from '../../shared/grid';
import { loadInput } from '../../shared/input';

const pattern = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;
function parseLine(line: string): [Point, Point] {
  const result = pattern.exec(line);
  if (result === null) {
    throw new Error(`Unable to parse ${line}`);
  }
  const { x1, y1, x2, y2 } = result.groups ?? {};
  return [
    { x: parseInt(x1), y: parseInt(y1) },
    { x: parseInt(x2), y: parseInt(y2) },
  ];
}

(async () => {
  let count = 0;
  (await loadInput(join(__dirname, 'input.txt')))
    .map(parseLine)
    .map(([a, b]) => new LineSegment(a, b))
    .reduce((pointMap, segment) => {
      segment.gridPoints().forEach((p) => {
        const inner = pointMap.get(p.x) ?? new Map<number, number>();
        const thisCount = (inner.get(p.y) ?? 0) + 1;
        if (thisCount === 2) {
          count++;
        }
        inner.set(p.y, thisCount);
        pointMap.set(p.x, inner);
      });
      return pointMap;
    }, new Map<number, Map<number, number>>());
  answer(count);
})().catch(console.error);
