import { Source } from './Source';

export class Wire implements Source {
  constructor(private input: Uint16Array | Source) {}

  result(): Uint16Array {
    if (this.input instanceof Uint16Array) {
      return Uint16Array.from(this.input);
    }
    return this.input.result();
  }
}
