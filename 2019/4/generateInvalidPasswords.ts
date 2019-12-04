import { Password } from './Password';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const writeFilePromised = promisify(writeFile);

(async () => {
  const code = ['export const invalidPasswords = ['];

  for(let i = 123210; true; i++) {
    code.push(`'${i}',`);
    if (Password.fromString(i.toString(10)).valid) {
      break;
    }
  }

  code.push('];\n');
  await writeFilePromised(join(__dirname, 'invalidPasswords.ts') , code.join('\n'));
})();
