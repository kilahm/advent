import { Box } from './Box';

export class BoxList {
  constructor(private boxes: Box[]) {}

  get paperNeeded(): number {
    return this.boxes.reduce((t, b) => t + b.paperNeeded, 0);
  }

  get ribbonNeeded(): number {
    return this.boxes.reduce((t, b) => t + b.ribbonNeeded, 0);
  }
}
