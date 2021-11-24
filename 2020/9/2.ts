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

  let invalidNumber = 0;
  for (let index = 0; index < input.length; ++index) {
    if (!cypher.next(input[index])) {
      invalidNumber = input[index];
      break;
    }
  }

  for (let lowerIndex = 0; lowerIndex < input.length - 1; ++lowerIndex) {
    for (
      let upperIndex = lowerIndex + 1;
      upperIndex < input.length;
      ++upperIndex
    ) {
      const testSlice = input.slice(lowerIndex, upperIndex + 1);
      const rangeSum = testSlice.reduce((t, v) => t + v, 0);
      if (rangeSum === invalidNumber) {
        answer(Math.min(...testSlice) + Math.max(...testSlice), true);
      }
      if (rangeSum > invalidNumber) {
        break;
      }
    }
  }
})().catch(console.error);
