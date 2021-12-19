import chalk from 'chalk';

export interface MatrixIndex {
  row: number;
  column: number;
}

export interface MatrixEntry<T> {
  index: MatrixIndex;
  value: T;
}

export function sameMatrixIndex(a: MatrixIndex, b: MatrixIndex): boolean {
  return a.column === b.column && a.row === b.row;
}

export class Matrix<T> {
  private values: T[][];
  private rowCount: number = 0;
  private columnCount: number = 0;
  constructor(values: Iterable<Iterable<T>>) {
    this.values = [...values].map((rowValues) => [...rowValues]);
    this.rowCount = this.values.length;
    this.columnCount = this.values[0]?.length ?? 0;
    this.values.forEach((row) => {
      if (row.length !== this.columnCount) {
        console.dir(values);
        throw new Error(
          'Every row of a matrix must have the same number of columns'
        );
      }
    });
  }

  height(): number {
    return this.rowCount;
  }

  width(): number {
    return this.columnCount;
  }

  row(index: number): Iterable<T> | undefined {
    return this.values[index];
  }

  has(index: MatrixIndex): boolean {
    return (
      0 <= index.row &&
      index.row < this.height() &&
      0 <= index.column &&
      index.column < this.width()
    );
  }

  column(index: number): Iterable<T> | undefined {
    if (index >= this.columnCount) {
      return undefined;
    }
    return [...this.values.values()].map((row, rowIndex) => {
      if (row[index] === undefined) {
        throw new Error(`Unable to index row ${rowIndex} column ${index}`);
      }
      return row[index];
    });
  }

  rows(): Iterable<Iterable<T>> {
    return this.values;
  }

  columns(): Iterable<Iterable<T>> {
    const result: T[][] = [];
    this.forEach((value, index) => {
      result[index.column] = result[index.column] ?? [];
      result[index.column][index.row] = value;
    });
    return result;
  }

  transpose(): Matrix<T> {
    return new Matrix(this.columns());
  }

  get(index: MatrixIndex): T | undefined {
    return this.values[index.row]?.[index.column];
  }

  set(index: MatrixIndex, value: T): this {
    if (!this.has(index)) {
      throw new RangeError(
        `Cannot set index ${index} for a matrix of size ${this.height()} rows and ${this.width()} columns`
      );
    }
    this.values[index.row][index.column] = value;
    return this;
  }

  increasingNeighbors(index: MatrixIndex): Iterable<MatrixEntry<T>> {
    return [
      { row: index.row + 1, column: index.column },
      { row: index.row, column: index.column + 1 },
    ]
      .map((i) => {
        const v = this.get(i);
        return v === undefined ? undefined : { value: v, index: i };
      })
      .filter(<U>(v: U): v is Exclude<U, undefined> => v !== undefined);
  }

  rectiliniearNeighbors(index: MatrixIndex): Iterable<MatrixEntry<T>> {
    return [
      { row: index.row + 1, column: index.column },
      { row: index.row, column: index.column + 1 },
      { row: index.row - 1, column: index.column },
      { row: index.row, column: index.column - 1 },
    ]
      .map((i) => {
        const v = this.get(i);
        return v === undefined ? undefined : { value: v, index: i };
      })
      .filter(<U>(v: U): v is Exclude<U, undefined> => v !== undefined);
  }

  neighbors(index: MatrixIndex): Iterable<MatrixEntry<T>> {
    return [
      { row: index.row + 1, column: index.column },
      { row: index.row, column: index.column + 1 },
      { row: index.row - 1, column: index.column },
      { row: index.row, column: index.column - 1 },
      { row: index.row + 1, column: index.column + 1 },
      { row: index.row + 1, column: index.column - 1 },
      { row: index.row - 1, column: index.column + 1 },
      { row: index.row - 1, column: index.column - 1 },
    ]
      .map((i) => {
        const v = this.get(i);
        return v === undefined ? undefined : { value: v, index: i };
      })
      .filter(<U>(v: U): v is Exclude<U, undefined> => v !== undefined);
  }

  forEach(fn: (value: T, index: MatrixIndex, matrix: Matrix<T>) => any) {
    [...this.values.values()].forEach((row, rowIndex) => {
      [...row.values()].forEach((value, columnIndex) =>
        fn(value, { row: rowIndex, column: columnIndex }, this)
      );
    });
  }

  reduce<U>(
    fn: (accumulator: U, value: T, index: MatrixIndex) => U,
    startingValue: U
  ): U {
    let runningAccumulator = startingValue;
    this.forEach((v, index) => {
      runningAccumulator = fn(runningAccumulator, v, index);
    });
    return runningAccumulator;
  }

  map<U>(
    fn: (value: T, index: MatrixIndex, matrix: Matrix<T>) => U
  ): Matrix<U> {
    return new Matrix(
      [...this.values.values()].map((v, row) =>
        [...v.values()].map((u, column) => fn(u, { row, column }, this))
      )
    );
  }

  toString(
    format?: (element: T, index: MatrixIndex, matrix: Matrix<T>) => string
  ): string {
    const fmt = format ?? ((element) => String(element));
    return [...this.rows()]
      .map((rowValues, row) =>
        [...rowValues].reduce(
          (acc, element, column) => acc + fmt(element, { row, column }, this),
          ''
        )
      )
      .join('\n');
  }

  findPathRectilinear(
    from: MatrixIndex,
    to: MatrixIndex,
    cost: (from: MatrixEntry<T>, to: MatrixEntry<T>) => number,
    estimatedCost: (from: MatrixEntry<T>, to: MatrixEntry<T>) => number = (
      from,
      to
    ) =>
      Math.abs(from.index.column - to.index.column) +
      Math.abs(from.index.row - from.index.row)
  ): { cost: number; path: MatrixEntry<T>[] } {
    const start = this.get(from);
    const end = this.get(to);
    if (start === undefined || end === undefined) {
      throw new RangeError(
        `Matrix of size ${this.rowCount} rows by ${this.columnCount} columns does not include enpoints of path: (${from}, ${to})`
      );
    }

    const pathHash = new Map<string, Path<T>>();
    const paths: Path<T>[] = [];
    let thisPath: Path<T> = new Path(0, [{ index: from, value: start }], this);
    pathHash.set(thisPath.hash(), thisPath);
    while (!sameMatrixIndex(to, thisPath.lastStep().index)) {
      paths.push(
        ...[...this.rectiliniearNeighbors(thisPath.lastStep().index)]
          .map(
            (nextEntry) =>
              new Path<T>(
                thisPath.cost + cost(thisPath.lastStep(), nextEntry),
                [...thisPath.steps, nextEntry],
                this
              )
          )
          .filter((nextPath) => {
            const existingPath = pathHash.get(nextPath.hash());
            if (
              existingPath === undefined ||
              nextPath.cost < existingPath.cost
            ) {
              pathHash.set(nextPath.hash(), nextPath);
              return true;
            }
            return false;
          })
      );

      paths.sort(
        (a, b) =>
          a.cost +
          estimatedCost(a.lastStep(), { index: to, value: end }) -
          (b.cost + estimatedCost(b.lastStep(), { index: to, value: end }))
      );
      const nextPath = paths.shift();
      if (nextPath === undefined) {
        throw new Error('No path found');
      }
      thisPath = nextPath;
    }

    return { cost: thisPath.cost, path: thisPath.steps };
  }
}

class Path<T> {
  constructor(
    readonly cost: number,
    readonly steps: MatrixEntry<T>[],
    private map: Matrix<T>
  ) {
    if (steps.length < 1) {
      throw new Error('Zero lengh path');
    }
  }

  contains(index: MatrixIndex): boolean {
    return this.steps.some((entry) => sameMatrixIndex(entry.index, index));
  }
  lastStep(): MatrixEntry<T> {
    return this.steps[this.steps.length - 1];
  }

  toString(): string {
    return this.map.toString((value, index) => {
      if (this.steps.some((entry) => sameMatrixIndex(entry.index, index))) {
        return chalk.blackBright(chalk.bgWhite(value));
      }
      return chalk.gray(value);
    });
  }

  hash(): string {
    return `${this.lastStep().index.row},${this.lastStep().index.column}`;
  }
}
