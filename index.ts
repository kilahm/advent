import * as util from 'util';
import * as fs from 'fs';
import * as path from 'path';
import { banner } from './shared/display';

const stat = util.promisify(fs.stat);

function usage(): never {
  console.log('npm start <year>.<day>.<part>');
  process.exit(1);
}

(async () => {
  const args = process.argv.slice(
    process.argv.findIndex(p => p === __filename) + 1
  );

  if (args.length !== 1 || !/\d+\.\d+\.\d+/.test(args[0])) {
    usage();
  }

  const [year, day, part] = args[0].split('.');
  banner(`Year ${year} day ${day} part ${part}`);

  let scriptPath = path.join(__dirname, ...args[0].split('.'));
  scriptPath += '.ts';

  const scriptStat = await stat(scriptPath);
  if (!scriptStat.isFile()) {
    console.error(`${scriptPath} is not a script`);
    usage();
  }

  require(scriptPath);
})();
