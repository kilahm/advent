import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { OctopusSwarm } from './OctopusSwarm';

(async () => {
  const readings = (await loadInput(join(__dirname, 'input.txt'))).map((line) =>
    line.split('').map((c) => parseInt(c, 10))
  );

  const swarm = new OctopusSwarm(readings);
  answer(swarm.stepsToSynchronous());
})().catch(console.error);


