import { Source } from './Source';
import { WireMap } from './WireMap';

export class LazyWire implements Source {
  constructor(private name: string, private wires: WireMap) {
  }

  result(): Uint16Array {
    return this.wires.get(this.name).result();
  }
}
