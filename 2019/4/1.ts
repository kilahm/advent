import { Password } from './Password';
import { answer } from '../../shared/answer';

let pw = Password.fromString('236491');

const validPasswords = [];
while (true) {
  pw = pw.next();
  if(parseInt(pw.toString(), 10) > 713787) {
    break;
  }
  validPasswords.push(pw.toString());
}

answer(validPasswords.length);
