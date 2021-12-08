import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { SegmentedDisplay } from './SegmentedDisplay';

(async () => {
  answer(
    (await loadInput(join(__dirname, 'input.txt')))
      .map((line) => {
        const [rawSignals, rawOutput] = line.split(' | ');
        if (rawSignals === undefined || rawOutput === undefined) {
          throw new Error(`Unable to parse line: ${line}`);
        }

        const display = SegmentedDisplay.fromSignalList(rawSignals.split(' '));
        const output = rawOutput
          .split(' ')
          .map((signal) => display.numeralFromSignal(signal))
          .join('');
        return parseInt(output, 10);
      })
      .reduce((acc, out) => acc + out, 0)
  );
})().catch(console.error);
