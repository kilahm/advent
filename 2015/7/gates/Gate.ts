import { Source } from '../Source';
import { WireMap } from '../WireMap';
import { isIntegerString } from '../../../shared/numbers';

export abstract class Gate implements Source {
  constructor(
    private inA: string,
    private inB: string,
    private wires: WireMap
  ) {}
  protected inputs(): [number, number] {
    const results: [number, number] = [0,0];
    if(isIntegerString(this.inA)) {
      results[0] = parseInt(this.inA);
    } else {
      results[0] = this.wires.get(this.inA).result()[0];
    }
    if(isIntegerString(this.inB)) {
      results[1] = parseInt(this.inB);
    } else {
      results[1] = this.wires.get(this.inB).result()[0];
    }
    return results;
  }
  abstract result(): Uint16Array;

}
