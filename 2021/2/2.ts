import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

class Sub {
  private static readonly instructionPatterm =
    /(?<direction>forward|down|up) (?<magnitude>\d+)/;
  readonly position: { aim: number; depth: number; distance: number } = {
    aim: 0,
    depth: 0,
    distance: 0,
  };
  executeInstruction(instruction: string): void {
    const result = Sub.instructionPatterm.exec(instruction);
    if (result === null) {
      throw new Error(`Invalid instruction: ${instruction}`);
    }
    const { direction, magnitude } = result.groups ?? {};
    if (direction === undefined || magnitude === undefined) {
      throw new Error(`Unable to parse instruction: ${instruction}`);
    }
    const magnitudeNumber = parseInt(magnitude, 10);
    switch (direction) {
      case 'forward':
        this.position.distance += magnitudeNumber;
        this.position.depth += this.position.aim * magnitudeNumber;
        break;
      case 'down':
        this.position.aim += magnitudeNumber;
        break;
      case 'up':
        this.position.aim -= magnitudeNumber;
        break;
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }
  }
}
(async () => {
  const sub = new Sub();
  (await loadInput(join(__dirname, 'input.txt'))).forEach((i) =>
    sub.executeInstruction(i)
  );
  answer(sub.position.depth * sub.position.distance);
})().catch(console.error);
