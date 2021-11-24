const innerBagPattern = /(?:(?<count>\d+) (?<color>.*) bag)/;
export class BagRule {
  constructor(
    readonly outerBag: Readonly<string>,
    readonly innerBags: Readonly<Map<string, number>>
  ) {}

  countContents(ruleSet: Map<string, BagRule>): number {
    return [...this.innerBags.entries()].reduce(
      (total, [color, count]) =>
        total + count * ruleSet.get(color).countContents(ruleSet),
      1
    );
  }

  static fromString(rule: string): BagRule {
    const trimmed = rule.endsWith('.') ? rule.slice(0, -1) : rule;
    const [outerBag, rest] = trimmed.split(' bags contain ', 2);

    if (rest === undefined) {
      throw new Error(`Invalid bag rule: ${rule}`);
    }

    if (rest.startsWith('no other')) {
      return new BagRule(outerBag, new Map());
    }

    if (!rest.includes('bag')) {
      throw new Error(`Invalid inner bag rule list: ${rest}`);
    }

    const innerBags = new Map<string, number>();
    rest.split(', ').forEach((r) => {
      const result = innerBagPattern.exec(r);
      if (result === null) {
        throw new Error(`Invalid inner bag rule: ${r}`);
      }
      const { count, color } = result.groups ?? {};
      if (count === undefined || color === undefined) {
        throw new Error(`Unable to determine color or count from "${rest}"`);
      }
      innerBags.set(color, parseInt(count, 10));
    });

    return new BagRule(outerBag, innerBags);
  }
}
