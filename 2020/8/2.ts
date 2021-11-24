import { join } from 'path';
import { answer } from '../../shared/answer';
import { banner } from '../../shared/display';
import { loadInput } from '../../shared/input';
import { GamingComputer } from './GamingComputer';

function checkProgram(program: string[]): void {
  const computer = GamingComputer.fromCode(program);
  while (
    !computer.hasVisited(computer.getState().executionPointer) &&
    !computer.isComplete()
  ) {
    computer.step();
  }
  if (computer.isComplete()) {
    answer(computer.getState().accumulator);
    process.exit(0);
  }
}
(async () => {
  (await loadInput(join(__dirname, 'input.txt'))).forEach(
    (line, index, program) => {
      if (line.includes('nop')) {
        const fixedProgram = [...program];
        fixedProgram[index] = line.replace('nop', 'jmp');
        checkProgram(fixedProgram);
      }
      if (line.includes('jmp')) {
        const fixedProgram = [...program];
        fixedProgram[index] = line.replace('jmp', 'nop');
        checkProgram(fixedProgram);
      }
    }
  );
  banner('Unable to fix the program');
  process.exit(1);
})().catch(console.error);
