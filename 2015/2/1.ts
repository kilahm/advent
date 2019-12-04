import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { join } from 'path';
import { Box } from './Box';
import { BoxList } from './BoxList';

(async () => {
  answer(
    new BoxList(
      (await loadInput(join(__dirname, 'boxes.txt'))).map(Box.fromString)
    ).paperNeeded
  );
})();
