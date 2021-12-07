import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

(async () => {
  const startingPositions = (await loadInput(join(__dirname, 'input.txt')))[0]
  // const startingPositions = '16,1,2,0,4,2,7,1,2,14'
    .split(',')
    .map((n) => parseInt(n, 10));
  const mean =
    startingPositions.reduce((t, n) => (t = n), 0) / startingPositions.length;
  let target = mean % 1 > 0.5 ? Math.ceil(mean) : Math.floor(mean);

  spentFuel(startingPositions, 2);

  let targetFuel = spentFuel(startingPositions, target);
  let leftFuel = spentFuel(startingPositions, target - 1);
  let rightFuel = spentFuel(startingPositions, target + 1);

  while (leftFuel < targetFuel || rightFuel < targetFuel) {
    if (leftFuel < rightFuel) {
      target -= 1;
      rightFuel = targetFuel;
      targetFuel = leftFuel;
      leftFuel = spentFuel(startingPositions, target - 1);
    } else {
      target += 1;
      leftFuel = targetFuel;
      targetFuel = rightFuel;
      rightFuel = spentFuel(startingPositions, target + 1);
    }
  }

  console.log(target);
  answer(targetFuel);
})().catch(console.error);

function spentFuel(startingPositions: number[], target: number): number {
  return startingPositions.reduce(
    (total, position) => total + Math.abs(position - target),
    0
  );
}
