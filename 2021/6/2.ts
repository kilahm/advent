import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { LanternFishSchool } from './LanternFishSchool';

(async() => {
  const ages = (await loadInput(join(__dirname, 'input.txt')))[0].split(',').map(n => parseInt(n, 10));
  const school = new LanternFishSchool(ages);
  answer(school.countAfter(256));
})().catch(console.error);