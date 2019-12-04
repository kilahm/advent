import { Password } from './Password';
import { writeFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const writeFilePromised = promisify(writeFile);

(async () => {
  const code = ['export const validPasswords = ['];

  console.log();
  Array.from({ length: 120000 }, (v, i) => {
    const num = (i + 222222).toString(10);
    if (Password.fromString(num).valid) {
      code.push(`'${num}',`);
    }
  });

  code.push('];\n');
  await writeFilePromised(
    join(__dirname, 'validPasswords.ts'),
    code.join('\n')
  );
})();
