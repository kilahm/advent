export class Orbit {
  parent: Orbit | undefined;

  constructor(readonly name: string) {}

  toString(): string {
    return this.name + String(this.parent);
  }

  orbitCount(parent?: Orbit): number {
    if (this.parent === undefined) {
      return 0;
    }

    const myParents = new Set<Orbit>();
    let o: Orbit = this;
    while (o.parent !== undefined) {
      if (myParents.has(o.parent)) {
        console.error(myParents);
        throw new Error('Circular reference');
      }
      myParents.add(o.parent);
      if (o.parent === parent) {
        return myParents.size;
      }
      o = o.parent;
    }
    return myParents.size;
  }

  parents(): Set<Orbit> {
    const myParents = new Set<Orbit>();
    let o: Orbit = this;
    while (o.parent !== undefined) {
      if (myParents.has(o.parent)) {
        console.error(myParents);
        throw new Error('Circular reference');
      }
      myParents.add(o.parent);
      o = o.parent;
    }
    return myParents;
  }

  commonParent(other: Orbit | undefined): Orbit | undefined {
    if (this.parent === undefined || other === undefined) {
      return undefined;
    }
    const otherParents = other.parents();
    let o: Orbit = this;
    let current = o.parent;
    while (current !== undefined) {
      if (otherParents.has(current)) {
        return current;
      }
      current = current.parent;
    }
    return o.parent;
  }
}

export class OrbitSet {
  private orbitMap: { [name: string]: Orbit } = {};

  addOrbit(parent: string, object: string): void {
    const p = this.add(parent);
    const o = this.add(object);
    o.parent = p;
  }

  totalOrbits(): number {
    return Object.keys(this.orbitMap).reduce(
      (total, name) => total + this.orbitMap[name].orbitCount(),
      0
    );
  }

  get(orbitName: string): Orbit | undefined {
    return this.orbitMap[orbitName];
  }

  private add(orbitName: string) {
    if (!(this.orbitMap[orbitName] instanceof Orbit)) {
      this.orbitMap[orbitName] = new Orbit(orbitName);
    }
    return this.orbitMap[orbitName];
  }
}

export function parseOrbit(raw: string): { parent: string; object: string } {
  const parts = raw.split(')');
  if (parts.length !== 2) {
    throw new Error(`Invalid orbit definition: ${raw}`);
  }
  return { parent: parts[0], object: parts[1] };
}
