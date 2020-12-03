export interface PasswordPolicy {
  validate(password: string): boolean;
}

export class MinMaxPolicy implements PasswordPolicy {
  private static parser = /^(?<min>\d+)-(?<max>\d+) (?<character>[a-z])$/;
  private static cache: { [policy: string]: MinMaxPolicy } = {};

  static fromString(policy: string): MinMaxPolicy {
    if (!MinMaxPolicy.cache[policy]) {
      const { min, max, character } = MinMaxPolicy.parser.exec(policy).groups;
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
      const { pos1, pos2, char } = result.groups;
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
