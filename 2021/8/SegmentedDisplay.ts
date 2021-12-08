type DisplayCodes = [
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>,
  Set<string>
];
export class MissingCode extends Error {
  constructor(readonly numeral: number, signals: string[]) {
    super(`Unable to find ${numeral} from ${JSON.stringify(signals)}`);
  }
}
export class SegmentedDisplay {
  constructor(private codes: DisplayCodes) {}

  numeralFromSignal(signal: string): string {
    const code = signal.split('');
    const result = this.codes.findIndex(
      (c) =>
        c !== undefined &&
        c.size === code.length &&
        code.every((element) => c.has(element))
    );
    if (result === -1) {
      throw new Error('Signal does not match any display codes');
    }
    return String(result);
  }
  static fromSignalList(signals: string[]): SegmentedDisplay {
    if (signals.length !== 10) {
      throw new Error('Expecting one signal per digit');
    }

    let codes = signals.map((s) => new Set(s.split('')));

    const code1 = codes.find((c) => c.size === 2);
    if (code1 === undefined) {
      throw new MissingCode(1, signals);
    }
    codes = codes.filter((c) => c !== code1);

    const code7 = codes.find((c) => c.size === 3);
    if (code7 === undefined) {
      throw new MissingCode(7, signals);
    }
    codes = codes.filter((c) => c !== code7);

    const code4 = codes.find((c) => c.size === 4);
    if (code4 === undefined) {
      throw new MissingCode(4, signals);
    }
    codes = codes.filter((c) => c !== code4);

    const code8 = codes.find((c) => c.size === 7);
    if (code8 === undefined) {
      throw new MissingCode(8, signals);
    }
    codes = codes.filter((c) => c !== code8);

    // 9 is the code that has all of 7 and the two segments in 4 that are not in 7
    const code9 = codes.find(
      (s) =>
        s.size === 6 &&
        [...code7.values()].every((element) => s.has(element)) &&
        [...code4.values()].every((element) => s.has(element))
    );
    if (code9 === undefined) {
      throw new MissingCode(9, signals);
    }
    codes = codes.filter((c) => c !== code9);

    // 6 has six elements, and includes all parts of 4 that are not in 7
    const code6 = codes.find(
      (c) =>
        c.size === 6 &&
        [...code4.values()]
          .filter((element) => !code7.has(element))
          .every((element) => c.has(element))
    );
    if (code6 === undefined) {
      throw new MissingCode(6, signals);
    }
    codes = codes.filter((c) => c !== code6);

    // 0 is the only code left with 6 elements
    const code0 = codes.find((c) => c.size === 6);
    if (code0 === undefined) {
      throw new MissingCode(0, signals);
    }
    codes = codes.filter((c) => c !== code0);

    // 3 is the only code left that contains all of 7
    const code3 = codes.find(
      (s) =>
        s.size === 5 &&
        [...code7.values()].every((element) => s.has(element))
    );
    if (code3 === undefined) {
      throw new MissingCode(3, signals);
    }
    codes = codes.filter((c) => c !== code3);

    // Only 5 and 2 left.  5 has both of the segments of 4 that are not in 7.

    const code5 = codes.find((s) =>
      [...code4.values()].filter((c) => !code7.has(c)).every((c) => s.has(c))
    );
    if (code5 === undefined) {
      throw new MissingCode(5, signals);
    }
    codes = codes.filter((c) => c !== code5);

    // Sanity check
    if (codes.length !== 1) {
      throw new Error('Something went wrong');
    }

    const code2 = codes[0];

    return new SegmentedDisplay([
      code0,
      code1,
      code2,
      code3,
      code4,
      code5,
      code6,
      code7,
      code8,
      code9,
    ]);
  }
}
