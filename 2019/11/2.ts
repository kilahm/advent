import { PaintRobot } from './PaintRobot';
import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Computer } from '../../shared/computer';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const computer = Computer.fromString(input[0]);
  const robot = new PaintRobot(computer, 1);
  console.log(await robot.run());
})();
