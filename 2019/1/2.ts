import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { totalFuelForMass } from './fuel';
import { answer } from "../../shared/answer";

(async () => {
  let totalFuel = 0;
  const reader = readline.createInterface({
    input: await fs.createReadStream(path.join(__dirname, 'data')),
    terminal: false
  });
  let lines = 0;
  reader.on('line', l => {
    lines++;
    totalFuel += totalFuelForMass(parseInt(l, 10));
  });
  reader.on('close', () => {
    console.log(`lines: ${lines}`);
    console.log(`fuel: ${totalFuel}`);
    answer(totalFuel);
  });
})();
