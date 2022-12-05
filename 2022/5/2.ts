import { join } from 'path';
import { answer } from '../../shared/answer';
import { fatal } from '../../shared/display';
import { loadInput } from '../../shared/input';

const moveRegex = /move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/;

(async () => {
  const stacks = (await loadInput(join(__dirname, 'initial.txt'))).reduce(
    (s, line) => {
      [
        line[1],
        line[5],
        line[9],
        line[13],
        line[17],
        line[21],
        line[25],
        line[29],
        line[33],
      ].forEach((item, idx) => {
        if (item !== ' ') {
          s[idx].unshift(item);
        }
      });
      return s;
    },
    [[], [], [], [], [], [], [], [], []] as string[][]
  );
  (await loadInput(join(__dirname, 'instructions.txt'))).forEach(
    (instruction, instructionIndex) => {
      const parsed = moveRegex.exec(instruction);
      if (parsed === null) {
        fatal(`Invalid instruction: ${instruction}`);
      }
      if (
        parsed.groups?.count === undefined ||
        parsed.groups?.from === undefined ||
        parsed.groups?.to === undefined
      ) {
        fatal(`Invalid instruction: ${instruction}`);
      }
      const count = parseInt(parsed.groups?.count, 10);
      const from = parseInt(parsed.groups?.from, 10);
      const to = parseInt(parsed.groups?.to, 10);

      const items = stacks[from - 1].splice(-count, count);
      if (items.length !== count) {
        fatal(
          `Cannot remove ${count} from stack ${from} on instruction ${
            instructionIndex + 1
          }`
        );
      }
    
      stacks[to - 1].push(...items)
    }
  );
  answer(stacks.reduce((ans, stack) => ans + stack[stack.length - 1], ''));
})().catch(console.error);
