import { Wire } from './Wire';
import { DuplicateWire } from './DuplicateWire';
import { WireNotDefined } from './WireNotDefined';

export class WireMap {
  private store: { [name: string]: Wire } = {};

  add(name: string, w: Wire): void {
    if (this.store[name] !== undefined) {
      throw new DuplicateWire(name);
    }
    this.store[name] = w;
  }

  get(name: string): Wire {
    if (this.store[name] === undefined) {
      throw new WireNotDefined(name);
    }
    return this.store[name];
  }
}
