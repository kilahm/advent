import { gravityProgram } from './gravity_assist_program';
import { banner } from '../../shared/display';
import { answer } from '../../shared/answer';

const target = 19690720;

(async () => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if ((await gravityProgram(noun, verb)) === target) {
        console.log(noun, verb);
        answer(noun.toString() + verb.toString());
        process.exit(0);
      }
    }
  }
  banner('exhausted all possibilities');
  process.exit(1);
})();
