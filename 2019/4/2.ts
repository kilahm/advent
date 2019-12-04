import { isValidPassword } from './brute';
import { answer } from '../../shared/answer';

const validPw = [];
for(let i = 236491; i <= 713787; i++) {
  if(isValidPassword(i)) {
    validPw.push(i);
  }
}
answer(validPw.length);
