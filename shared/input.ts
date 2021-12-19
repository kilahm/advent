import * as readline from 'readline';
import * as fs from 'fs';
const { stdin } = process;

export async function loadInput(path: string): Promise<string[]> {
  return new Promise(async (resolve) => {
    const lines: string[] = [];
    const reader = readline.createInterface({
      input: await fs.createReadStream(path),
      terminal: false,
    });
    reader.on('line', (l) => lines.push(l));
    reader.on('close', () => resolve(lines));
  });
}

export async function waitForUser(): Promise<void> {
  stdin.resume();
  return new Promise((resolve) => {
    stdin.on('data', () => {
      stdin.pause();
      resolve();
    });
  });
}
