import * as readline from 'readline';
import * as fs from 'fs';

export async function loadInput(path: string): Promise<string[]> {
  return new Promise(async resolve => {
    const lines = [];
    const reader = readline.createInterface({
      input: await fs.createReadStream(path),
      terminal: false
    });
    reader.on('line', l => lines.push(l));
    reader.on('close', () => resolve(lines));
  });
}
