export class Range {
  private min: number;
  private max: number;
  constructor(a: number, b: number) {
    this.min = Math.min(a, b);
    this.max = Math.max(a, b);
  }

  overlaps(other: Range): boolean {
    return this.max >= other.min && this.min <= other.max;
  }
}
