import { fatal } from '../../shared/display';

export interface PasswordPolicy {
  validate(password: string): boolean;
}

export class MinMaxPolicy implements PasswordPolicy {
  private static parser = /^(?<min>\d+)-(?<max>\d+) (?<character>[a-z])$/;
  private static cache: { [policy: string]: MinMaxPolicy } = {};

  static fromString(policy: string): MinMaxPolicy {
    if (!MinMaxPolicy.cache[policy]) {
      const result = MinMaxPolicy.parser.exec(policy);
      if (result === null) {
        fatal('Unable to parse policy');
      }
      const min = result.groups?.['min'];
      const max = result.groups?.['max'];
      const character = result.groups?.['character'];
      if (min === undefined || max === undefined || character === undefined) {
        fatal('Something is wrong with the regex for parsing min max policies');
      }
      MinMaxPolicy.cache[policy] = new MinMaxPolicy(
        parseInt(min),
        parseInt(max),
        character
      );
    }
    return MinMaxPolicy.cache[policy];
  }
  constructor(
    private min: number,
    private max: number,
    private character: string
  ) {}

  validate(password: string): boolean {
    const count = password
      .split('')
      .reduce(
        (count: number, character: string) =>
          character === this.character ? count + 1 : count,
        0
      );
    return this.min <= count && count <= this.max;
  }
}

export class PositionalPolicy implements PasswordPolicy {
  static parser = /^(?<pos1>\d+)-(?<pos2>\d+) (?<char>[a-z])$/;
  static cache: { [policy: string]: PositionalPolicy } = {};

  static fromString(policy: string): PositionalPolicy {
    if (!PositionalPolicy.cache[policy]) {
      const result = PositionalPolicy.parser.exec(policy);
      const pos1 = result?.groups?.['pos1'];
      const pos2 = result?.groups?.['pos2'];
      const char = result?.groups?.['char'];
      if (pos1 === undefined || pos2 === undefined || char === undefined) {
        fatal('Something is wrong with the regex for positional policies');
      }
      PositionalPolicy.cache[policy] = new PositionalPolicy(
        parseInt(pos1),
        parseInt(pos2),
        char
      );
    }
    return PositionalPolicy.cache[policy];
  }

  constructor(
    private pos1: number,
    private pos2: number,
    private char: string
  ) {}

  validate(password: string): boolean {
    const pos1Valid = password.substr(this.pos1 - 1, 1) === this.char;
    const pos2Valid = password.substr(this.pos2 - 1, 1) === this.char;
    return (pos1Valid && !pos2Valid) || (!pos1Valid && pos2Valid);
  }
}
