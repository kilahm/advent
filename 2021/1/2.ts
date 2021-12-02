import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';

(async () => {
  const measurements = (await loadInput(join(__dirname, 'input.txt'))).map(
    (line) => parseInt(line, 10)
  );
  console.dir(measurements);
  const testMeasurements = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
  answer(
    measurements.reduce((increases, current, index, list) => {
      if (index < 3) {
        return increases;
      }
      if (current > list[index - 3]) {
        return increases + 1;
      }
      return increases;
    }, 0)
  );
})().catch(console.error);
