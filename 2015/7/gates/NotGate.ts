import { Source } from '../Source';
import { WireMap } from '../WireMap';

export class NotGate implements Source {
  constructor(private inName: string, private wires: WireMap) {}

  result(): Uint16Array {
    return Uint16Array.of(~this.wires.get(this.inName).result()[0]);
  }
}
