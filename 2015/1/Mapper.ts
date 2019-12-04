type step = 'up' | 'down';

function parse(map: string): step[] {
  return map.split('').map(char => {
    switch (char) {
      case '(':
        return 'up';
      case ')':
        return 'down';
      default:
        throw new Error(`Invalid step in map: ${char}`);
    }
  });
}

export class Mapper {
  private steps: step[];

  constructor(map: string) {
    this.steps = parse(map);
  }

  finalFloor(): number {
    return this.steps.reduce((f, s) => {
      if (s === 'down') {
        return f - 1;
      }
      return f + 1;
    }, 0);
  }

  firstStepInBasement(): number {
    let floor = 0;
    let finalStep = -1;
    this.steps.some((s, i) => {
      if (s === 'down') {
        floor--;
      }
      if (s === 'up') {
        floor++;
      }
      if (floor < 0) {
        finalStep = i + 1;
        return true;
      }
      return false;
    });
    return finalStep;
  }
}
