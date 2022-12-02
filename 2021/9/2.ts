import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { Matrix, MatrixIndex, sameMatrixIndex } from '../../shared/Matrix';
import { topN } from '../../shared/numbers';
import chalk from 'chalk';

(async () => {
  const map = new Matrix<number>(
    (await loadInput(join(__dirname, 'input.txt')))
      .map((line) => line.split('').map((n) => parseInt(n, 10)))
      .reduce((data, row) => {
        data.push(row);
        return data;
      }, [] as number[][])
  );

  const mins: MatrixIndex[] = map.reduce((minimums, height, index) => {
    if ([...map.rectiliniearNeighbors(index)].every((n) => n.value > height)) {
      minimums.push(index);
    }
    return minimums;
  }, [] as MatrixIndex[]);

  const basins = mins.map((min) => basin(min, map));
  visualize(basins, map);
  const topThreeBasinSizes = topN(
    basins.map((b) => b.length),
    3
  );
  answer(topThreeBasinSizes.reduce((acc, size) => acc * size, 1));
})().catch(console.error);

function basin(min: MatrixIndex, map: Matrix<number>): MatrixIndex[] {
  let basinNodes: MatrixIndex[] = [min];
  let toVisit: Set<MatrixIndex> = new Set([min]);
  while (toVisit.size > 0) {
    const next = new Set<MatrixIndex>();
    toVisit.forEach((i) => {
      const thisHeight = map.get(i);
      if (thisHeight === undefined) {
        throw new Error('Unable to find height while scanning a basin');
      }
      [...map.rectiliniearNeighbors(i)].forEach((neighbor) => {
        if (neighbor.value === 9 || neighbor.value <= thisHeight) {
          return;
        }
        if (basinNodes.some((bn) => sameMatrixIndex(bn, neighbor.index))) {
          return;
        }
        basinNodes.push(neighbor.index);
        next.add(neighbor.index);
      });
    });
    toVisit = next;
  }
  return basinNodes;
}
function visualize(basins: MatrixIndex[][], map: Matrix<number>) {
  function inBasin(i: MatrixIndex): boolean {
    return basins.some((b) => b.some((j) => sameMatrixIndex(i, j)));
  }

  [...map.rows()].forEach((values, row) => {
    const visualRow = [...values]
      .map((value, column) =>
        inBasin({ row, column }) ? chalk.bgRed(value) : value
      )
      .join('');
    console.log(visualRow);
  });
}
