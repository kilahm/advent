import { gravityProgram } from './gravity_assist_program';

const target = 19690720;

for(let noun = 0; noun <= 99; noun++) {
  for(let verb = 0; verb <= 99; verb++) {
    if(gravityProgram(noun, verb) === target) {
      console.log(noun, verb);
    }
  }
}
console.log('exhausted all possibilities');
