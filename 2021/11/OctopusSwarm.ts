import { Matrix, MatrixIndex, sameMatrixIndex } from '../../shared/Matrix';

export class OctopusSwarm {
  private flashes = 0;
  private state: Matrix<number>;
  private flashedThisEvolution: MatrixIndex[] = [];
  constructor(readings: number[][]) {
    this.state = new Matrix(readings);
  }

  flashesAfter(stepCount: number): number {
    for (let step = 0; step < stepCount; ++step) {
      this.evolve();
    }
    return this.flashes;
  }

  stepsToSynchronous(): number {
    let steps = 0;
    while(this.flashedThisEvolution.length < this.state.height() * this.state.width()) {
      ++steps;
      this.evolve();
    }
    return steps;
  }

  resetFlashCount(): void {
    this.flashes = 0;
  }

  evolve(): void {
    this.flashedThisEvolution = [];

    this.state.forEach((_, index) => this.energize(index));
    this.flashes += this.flashedThisEvolution.length;
    this.flashedThisEvolution.forEach(i => this.state.set(i, 0))
  }

  private energize(index: MatrixIndex): void {
    const value = this.state.get(index);
    if (value === undefined) {
      throw new Error(`Invalid index while energizing: ${index}`);
    }
    const newValue = value + 1;
    this.state.set(index, newValue);
    if (newValue < 10 ||
      this.flashedThisEvolution.some((i) => sameMatrixIndex(i, index))) {
      return;
    }
    this.flashedThisEvolution.push(index);
    [...this.state.neighbors(index)].forEach(({ index: i }) => this.energize(i)
    );
  }
}
