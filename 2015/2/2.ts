import { answer } from '../../shared/answer';
import { BoxList } from './BoxList';
import { boxes } from './boxes';

(async () => {
  answer(new BoxList(boxes).ribbonNeeded);
})();
