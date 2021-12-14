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

  const result = folds.reduce(foldPaper, dots);
  const gridForm = result.reduce((grid, dot) => {
    const row = grid.get(dot.x) ?? new Set<number>();
    row.add(dot.y);
    return grid.set(dot.x, row);
  }, new Map<number, Set<number>>());

  answer(visualizeGrid(gridForm));
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

function visualizeGrid(gridForm: Map<number, Set<number>>): string {
  let width = 0;
  let height = 0;
  gridForm.forEach((row, x) => {
    width = Math.max(width, x);
    row.forEach((y) => {
      height = Math.max(height, y);
    });
  });

  const result: string[][] = [];
  for (let x = width; x >= 0; --x) {
    const row = gridForm.get(x) ?? new Set();
    result[x] = [];
    for (let y = height; y >= 0; --y) {
      result[x][y] = row.has(y) ? '#' : '.';
    }
  }

  return '\n' + result.reverse().map((row) => row.join('')).join('\n') + '\n';
}
