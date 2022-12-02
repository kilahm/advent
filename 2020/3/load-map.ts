import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';
import { Map } from '../../shared/map';
import { Bounds } from '../../shared/grid';

export async function loadMap() {
  const data = createReadStream(join(__dirname, 'input.txt'));
  const reader = createInterface({ input: data, crlfDelay: Infinity });
  const mapData: Array<Array<string>> = [];
  for await (const line of reader) {
    mapData.push(line.split(''));
  }

  const treeMap = new Map(
    new Bounds(
      { x: 0, y: 0 },
      {
        x: mapData[0].length - 1,
        y: mapData.length - 1,
      }
    ),
    (p) => mapData[p.y][p.x] === '#'
  );
  return treeMap;
}
