import { join } from 'path';
import { answer } from '../../shared/answer';
import { fatal } from '../../shared/display';
import { loadInput } from '../../shared/input';
import { parseNumber } from '../../shared/numbers';
import { XmasCypher } from './XmasCypher';

(async () => {
  const input = (await loadInput(join(__dirname, 'input.txt'))).map((l) =>
    parseNumber(l)
  );
  const cypher = new XmasCypher(25);

  for (let index = 0; index < input.length; ++index) {
    if (!cypher.next(input[index])) {
      answer(input[index]);
      process.exit(0);
    }
  }

  fatal('Unable to find invalid number');
})().catch(console.error);
