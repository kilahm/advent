import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { QuestionGroup } from './QuestionGroup';

(async () => {
  const input = await loadInput(join(__dirname, 'input.txt'));
  const groups = QuestionGroup.fromLedger(input);
  answer(groups.reduce((total, group) => total + group.everyYesQuesitonCount(), 0));
})().catch(console.error.bind(console));
