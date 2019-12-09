import { FeedbackComputer } from './FeedbackComputer';
import { permutations } from '../../shared/permutations';

export async function amplify(
  phases: number[],
  program: number[]
): Promise<number> {
  const fbc = new FeedbackComputer(
    program,
    phases.length,
    (outputs, iteration) => {
      const fromPrevious = outputs === undefined ? 0 : outputs[0];
      return [phases[iteration], fromPrevious];
    }
  );
  const result = await fbc.execute();
  return result[0];
}

export async function maximizeAmps(program: number[]): Promise<number> {
  const values = [];
  const phaseList = permutations([0, 1, 2, 3, 4]);
  await Promise.all(phaseList.map(async phases => {
    values.push(await amplify(phases, program));
  }));
  return Math.max(...values);
}
