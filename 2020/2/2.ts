import { createInterface } from 'readline';
import { createReadStream } from 'fs';
import { join } from 'path';
import { MinMaxPolicy, PositionalPolicy } from './password-policy';
import { answer } from '../../shared/answer';

(async () => {
  const data = createReadStream(join(__dirname, 'input.txt'));
  const reader = createInterface({ input: data, crlfDelay: Infinity });
  let validCount = 0;
  for await(const line of reader) {
      const [policy, password] = line.split(': ');
      if(PositionalPolicy.fromString(policy).validate(password)) {
          validCount++;
      }
  }
  answer(validCount);

})().catch((error) => console.error(error));
