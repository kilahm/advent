import { join } from 'path';
import { answer } from '../../shared/answer';
import { Point } from '../../shared/grid';
import { loadInput } from '../../shared/input';

(async () => {
  const dots: Array<Point> = [];
  const folds: Array<{ axis: 'x' | 'y'; value: number }> = [];
  let inputPoints = true;
  (await loadInput(join(__dirname, 'input.txt'))).forEach((line) => {
    if (line === '') {
      inputPoints = false;
      return;
    }

    if (inputPoints) {
      const [x, y] = line.split(',').map((n) => parseInt(n, 10));
      dots.push({ x, y });
      return;
    }

    const [rest, value] = line.split('=');
    const axis = rest[rest.length - 1];
    if (axis === 'x' || axis === 'y') {
      folds.push({ axis, value: parseInt(value, 10) });
    }
  });

  const result = folds.reduce((currentDots, fold, index) => {
    if (index > 0) {
      return currentDots;
    }
    return foldPaper(currentDots, fold);
  }, dots);
  const gridForm = result.reduce((grid, dot) => {
    const row = grid.get(dot.x) ?? new Set<number>();
    row.add(dot.y);
    return grid.set(dot.x, row);
  }, new Map<number, Set<number>>());

  answer([...gridForm.values()].reduce((acc, row) => acc + row.size, 0));
})().catch(console.error);

function foldPaper(
  currentDots: Point[],
  fold: { axis: 'x' | 'y'; value: number }
): Point[] {
  return currentDots.map((dot) => {
    if (fold.axis === 'x' && dot.x > fold.value) {
      return { x: 2 * fold.value - dot.x, y: dot.y };
    }
    if (fold.axis === 'y' && dot.y > fold.value) {
      return { x: dot.x, y: 2 * fold.value - dot.y };
    }
    return dot;
  });
}
