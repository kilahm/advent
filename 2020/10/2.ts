import { writeFileSync } from 'fs';
import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { parseNumber } from '../../shared/numbers';

class AdapterBag {
  constructor(private adapters: number[]) {
    this.adapters.sort((a, b) => a - b);
    this.adapters.push(this.adapters[this.adapters.length - 1] + 3);
    this.adapters.unshift(0);
  }

  nextPointers(pointer: number): number[] {
    if(pointer > this.adapters.length - 1) {
      throw new RangeError(`${pointer} is not a valid adapter index`);
    }

    if(this.isDevice(pointer)) {
      return undefined;
    }

    const nextPointers: number[] = [];
    for(let nextIndex = pointer + 1; this.adapters[nextIndex] - this.adapters[pointer] < 4; ++nextIndex) {
      nextPointers.push(nextIndex);
    }
    return nextPointers;
  }

  isDevice(pointer: number): boolean {
    return pointer === this.adapters.length - 1;
  }
}

(async () => {
  const bag = new AdapterBag(
    (await loadInput(join(__dirname, 'input.txt'))).map(parseNumber)
  );

  let pointers: number[] = [0];
  while(!pointers.every(p => bag.isDevice(p))) {
    const nextPointers: number[] = [];
    pointers.forEach(p => {
      nextPointers.push(...(bag.nextPointers(p) ?? [p]));
    });
    pointers = nextPointers;
  }

  answer(pointers.length);
})().catch(console.error);
