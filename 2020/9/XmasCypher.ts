export class XmasCypher {
  private history: number[] = [];

  constructor(private prefixLength: number) {}
  next(value: number): boolean {
    if (this.history.length < this.prefixLength) {
      this.history.push(value);
      return true;
    }
    if (this.isValid(value)) {
      this.history.push(value);
      this.history.shift();
      return true;
    }
    return false;
  }

  private isValid(value: number): boolean {
    const sorted = [...this.history];
    sorted.sort((a, b) => a - b);

    for (let lowerIndex = 0; lowerIndex < sorted.length - 1; ++lowerIndex) {
      if (sorted[lowerIndex] > value) {
        return false;
      }

      for (let upperIndex = lowerIndex + 1; upperIndex < sorted.length; ++upperIndex) {
          if(sorted[lowerIndex] + sorted[upperIndex] === value) {
              return true;
          }
          if(sorted[lowerIndex] + sorted[upperIndex] > value) {
              break;
          }
      }
    }
    return false;
  }
}
