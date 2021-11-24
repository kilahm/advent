import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { GamingComputer } from './GamingComputer';

(async () => {
  const computer = GamingComputer.fromCode(
    await loadInput(join(__dirname, 'input.txt'))
  );
  while (!computer.hasVisited(computer.getState().executionPointer)) {
    computer.step();
  }
  answer(computer.getState().accumulator);
})().catch(console.error);
