export interface MatrixIndex {
  row: number;
  column: number;
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

  rectiliniearNeighbors(
    index: MatrixIndex
  ): Iterable<{ value: T; index: MatrixIndex }> {
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
}
