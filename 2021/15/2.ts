import { writeFileSync } from 'fs';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { Matrix } from '../../shared/Matrix';

(async () => {
  const mapSection = (await loadInput(join(__dirname, 'input.txt'))).map(
    (line) => line.split('').map((n) => parseInt(n, 10))
  );
  const mapRow: number[][] = [];
  for (let columnDoubles = 0; columnDoubles < 5; ++columnDoubles) {
    mapSection.forEach((sectionRow, row) => {
      mapRow[row] = mapRow[row] ?? [];
      mapRow[row].push(
        ...sectionRow.map((v) => ((v - 1 + columnDoubles) % 9) + 1)
      );
    });
  }
  const fullMap: number[][] = [];
  for (let rowDoubles = 0; rowDoubles < 5; ++rowDoubles) {
    mapRow.forEach((row) =>
      fullMap.push(row.map((v) => ((v - 1 + rowDoubles) % 9) + 1))
    );
  }
  const map = new Matrix<number>(fullMap).map((v) => v % 10);
  writeFileSync(join(__dirname, 'fullresult.txt'), map.toString());
  answer(
    map.findPathRectilinear(
      { column: 0, row: 0 },
      { column: map.width() - 1, row: map.height() - 1 },
      (_, to) => to.value
    ).cost
  );
})().catch(console.error);
