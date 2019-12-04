import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Instruction } from './Instruction';
import { AncientLightArray, LightArray } from './LightArray';
import { answer } from '../../shared/answer';

(async () => {
  const instructions = (await loadInput(join(__dirname, 'input.txt'))).map(line => Instruction.parse(line));
  const la = new AncientLightArray();
  instructions.forEach(i => la.instruct(i));
  answer(la.brigness());
})();
