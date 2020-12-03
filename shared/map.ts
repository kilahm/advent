/**
 * Arbitrary values assigned to grid points
 */
import { Bounds, Point } from './grid';
import { Memoize } from 'typescript-memoize';

export class Map<T> {
  constructor(public readonly bounds: Bounds, private valueMap: (point: Point) => T) {
  }

  @Memoize(p => JSON.stringify(p))
  value(point: Point): T  {
    if(!this.bounds.contains(point)) {
      throw new Error(`point ${JSON.stringify(point)} is not on the map`);
    }
    return this.valueMap(point);
  }
}
