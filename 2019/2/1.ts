import { gravityProgram } from './gravity_assist_program';
import { answer } from '../../shared/answer';

(async () => {
  answer(await gravityProgram(12, 2));
})();
