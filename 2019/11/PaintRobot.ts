import { Computer } from '../../shared/computer';
import { Point, pointSum } from '../../shared/vector2d';
import { Subject } from 'rxjs';

enum NextAction {
  paint,
  move
}

export class PaintRobot {
  private position: Point = { x: 0, y: 0 };
  private heading: Point = { x: 0, y: 1 };
  private tiles: Map<string, { position: Point; value: number }> = new Map();
  private paintValuesRead = new Subject<number>();

  private nextAction: NextAction = NextAction.paint;

  constructor(private computer: Computer, startingColor: number) {
    this.setPaint(startingColor);
    computer.addInput(this.paintValuesRead);
  }

  async run(): Promise<string> {
    this.paintValuesRead.next(this.readPaintAt(this.position));
    this.computer.output$.subscribe(v => this.handleInstruction(v));
    await this.computer.execute();
    return this.render();
  }

  paintedPanels(): number {
    return this.tiles.size;
  }

  private handleInstruction(instruction: number) {
    switch (this.nextAction) {
      case NextAction.move:
        this.move(instruction);
        this.paintValuesRead.next(this.readPaintAt(this.position));
        this.nextAction = NextAction.paint;
        return;
      case NextAction.paint:
        this.setPaint(instruction);
        this.nextAction = NextAction.move;
        return;
    }
  }

  private move(direction: number): void {
    if (direction !== 0 && direction !== 1) {
      throw new Error(`Unknown direction code ${direction}`);
    }
    if (direction === 0) {
      this.turnLeft();
    }
    if (direction === 1) {
      this.turnRight();
    }
    this.advance();
  }

  private turnLeft(): void {
    if (Math.abs(this.heading.y) === 1) {
      this.heading = { x: -Math.sign(this.heading.y), y: 0 };
      return;
    }
    this.heading = { x: 0, y: Math.sign(this.heading.x) };
  }

  private turnRight(): void {
    if (Math.abs(this.heading.y) === 1) {
      this.heading = { x: Math.sign(this.heading.y), y: 0 };
      return;
    }
    this.heading = { x: 0, y: -Math.sign(this.heading.x) };
  }

  private advance(): void {
    this.position = pointSum(this.position, this.heading);
  }

  private setPaint(value: number): void {
    if (value !== 0 && value !== 1) {
      throw new Error(`Unknown paint code ${value}`);
    }
    this.tiles.set(this.encodeLocation(this.position), {
      value,
      position: { ...this.position }
    });
  }

  private readPaintAt(location: Point): number {
    const tile = this.tiles.get(this.encodeLocation(location));
    if (tile === undefined) {
      return 0;
    }
    return tile.value;
  }

  private encodeLocation(p: Point): string {
    return JSON.stringify(p);
  }

  private render(): string {
    let b = {min: {x:0, y: 0}, max: {x: 0, y: 0}};
    this.tiles.forEach(({position}) => {
      b.min.x = Math.min(b.min.x, position.x);
      b.min.y = Math.min(b.min.y, position.y);
      b.max.x = Math.max(b.max.x, position.x);
      b.max.y = Math.max(b.max.y, position.y);
    });

    return Array.from({length: b.max.y - b.min.y + 1}, (_, yIndex) => {
      const y = yIndex + b.min.y;
      return Array.from({length: b.max.x - b.min.x + 1}, (_, xIndex) => {
        const x = xIndex + b.min.x;
        if(this.readPaintAt({x, y}) === 1) {
          return '#';
        }
        return ' ';
      }).join('')
    }).reverse().join('\n');
  }
}
