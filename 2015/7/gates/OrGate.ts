import { Gate } from './Gate';

export class OrGate extends Gate {
  result(): Uint16Array {
    const values = this.inputs();
    return Uint16Array.of(values[0] | values[1]);
  }
}
