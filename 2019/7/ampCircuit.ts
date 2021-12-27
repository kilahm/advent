import { FeedbackComputer } from './FeedbackComputer';
import { permutations } from '../../shared/permutations';

export async function amplify(
  phases: number[],
  program: number[]
): Promise<number> {
  const inputs = phases.map(p => [p]);
  inputs[0].push(0);
  const fbc = new FeedbackComputer(
    program, inputs
  );
  const result = await fbc.execute();
  return result[result.length - 1];
}

export async function maximizeAmps(program: number[], phaseSpace: number[]): Promise<number> {
  const values: number[] = [];
  const phaseList = permutations(phaseSpace);
  await Promise.all(phaseList.map(async phases => {
    values.push(await amplify(phases, program));
  }));
  return Math.max(...values);
}
