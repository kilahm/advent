import { Matrix } from '../../shared/Matrix';

interface BingoSpace {
  value: number;
  marked: boolean;
}
export class BingoBoard {
  private state: Matrix<BingoSpace>;
  private transpose: Matrix<BingoSpace>;
  constructor(private readonly layout: Iterable<Iterable<number>>) {
    this.state = new Matrix(
      [...layout].map((row) =>
        [...row].map((value) => ({ value, marked: false }))
      )
    );
    this.transpose = this.state.transpose();
  }

  mark(value: number): void {
    this.state.forEach((space) => {
      if (space.value === value) {
        space.marked = true;
      }
    });
  }

  winner(withDiagonals: boolean): boolean {
    if ([...this.state.rows()].some((row) => [...row].every((v) => v.marked))) {
      return true;
    }
    if (
      [...this.transpose.rows()].some((row) => [...row].every((v) => v.marked))
    ) {
      return true;
    }
    if(!withDiagonals) {
      return false;
    }

    let diagonalWin = true;
    for (let i = 0; i < this.state.height(); ++i) {
      if (this.state.get({ row: i, column: i })?.marked === false) {
        diagonalWin = false;
        break;
      }
    }

    if (diagonalWin) {
      return true;
    }

    diagonalWin = true;
    for (let row = this.state.height() - 1; row >= 0; --row) {
      for (let column = 0; column < this.state.height(); ++column) {
        if (this.state.get({ row, column })?.marked === false) {
          diagonalWin = false;
          break;
        }
      }
    }
    return diagonalWin;
  }
  score(winningNumber: number): number {
    return (
      winningNumber *
      this.state.reduce((sum, v) => sum + (v.marked ? 0 : v.value), 0)
    );
  }
}
