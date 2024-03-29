import { Wire } from './Wire';
import { NotGate } from './gates/NotGate';
import { WireMap } from './WireMap';
import { AndGate } from './gates/AndGate';
import { OrGate } from './gates/OrGate';
import { LeftShift } from './gates/LeftShift';
import { RightShift } from './gates/RightShift';
import { LazyWire } from './LazyWire';

const setWire = /^(?<value>\d+) -> (?<name>[a-z]+|\d+)$/;
const notGate = /^NOT (?<nameIn>[a-z]+|\d+) -> (?<nameOut>[a-z]+|\d+)$/;
const andGate = /^(?<nameA>[a-z]+|\d+) AND (?<nameB>[a-z]+|\d+) -> (?<nameOut>[a-z]+|\d+)$/;
const orGate = /^(?<nameA>[a-z]+|\d+) OR (?<nameB>[a-z]+|\d+) -> (?<nameOut>[a-z]+|\d+)$/;
const lShift = /^(?<nameIn>[a-z]+|\d+) LSHIFT (?<count>\d+) -> (?<nameOut>[a-z]+|\d+)$/;
const rShift = /^(?<nameIn>[a-z]+|\d+) RSHIFT (?<count>\d+) -> (?<nameOut>[a-z]+|\d+)$/;
const passThrough = /^(?<nameIn>[a-z]+|\d+) -> (?<nameOut>[a-z]+|\d+)$/;

export class Circuit {
  private wires = new WireMap();

  constructor(connections: string[]) {
    connections.forEach(c => this.addConnection(c));
  }

  measure(wireName: string): number {
    return this.wires.get(wireName).result()[0];
  }

  private addConnection(connection: string): void {
    switch (true) {
      case setWire.test(connection):
        return this.setWire(connection);
      case notGate.test(connection):
        return this.notGate(connection);
      case andGate.test(connection):
        return this.andGate(connection);
      case orGate.test(connection):
        return this.orGate(connection);
      case lShift.test(connection):
        return this.lShift(connection);
      case rShift.test(connection):
        return this.rShift(connection);
      case passThrough.test(connection):
        return this.passThrough(connection);
      default:
        throw new Error(`unknown instruction: ${connection}`);
    }
  }

  private setWire(connection: string): void {
    const result = connection.match(setWire);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { name, value } = result.groups ?? {}; 
    this.wires.add(name, new Wire(Uint16Array.of(parseInt(value, 10))));
  }

  private notGate(connection: string): void {
    const result = connection.match(notGate);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { nameIn, nameOut } = result.groups ?? {}; 
    this.wires.add(nameOut, new Wire(new NotGate(nameIn, this.wires)));
  }

  private andGate(connection: string): void {
    const result = connection.match(andGate);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { nameA, nameB, nameOut } = result.groups ?? {}; 
    this.wires.add(nameOut, new Wire(new AndGate(nameA, nameB, this.wires)));
  }

  private orGate(connection: string): void {
    const result = connection.match(orGate);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { nameA, nameB, nameOut } = result.groups ?? {}; 
    this.wires.add(nameOut, new Wire(new OrGate(nameA, nameB, this.wires)));
  }

  private lShift(connection: string): void {
    const result = connection.match(lShift);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { nameIn, count, nameOut } = result.groups ?? {}; 
    this.wires.add(
      nameOut,
      new Wire(new LeftShift(nameIn, count, this.wires))
    );
  }

  private rShift(connection: string): void {
    const result = connection.match(rShift);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { nameIn, count, nameOut } = result.groups ?? {}; 
    this.wires.add(
      nameOut,
      new Wire(new RightShift(nameIn, count, this.wires))
    );
  }

  private passThrough(connection: string): void {
    const result = connection.match(passThrough);
    if(result === null) {
      throw new Error(`Invalid connection string: "${connection}"`)
    }
    const { nameIn, nameOut } = result.groups ?? {}; 
    this.wires.add(nameOut, new Wire(new LazyWire(nameIn, this.wires)));
  }
}
