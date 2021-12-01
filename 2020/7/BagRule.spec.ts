import { BagRule } from './BagRule';

describe('BagRule', () => {
  it.each([
    [
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
      'light red',
      { 'bright white': 1, 'muted yellow': 2 },
    ],
    [
      'light red bags contain 1 bright white bag.',
      'light red',
      { 'bright white': 1 },
    ],
    [
      'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
      'dark orange',
      { 'bright white': 3, 'muted yellow': 4 },
    ],
    ['faded blue bags contain no other bags.', 'faded blue', {}],
  ])('should parse %s', (ruleString, outerColor, innerColors) => {
    const rule = BagRule.fromString(ruleString);
    expect(rule.outerBag).toBe(outerColor);
    expect(rule.innerBags.size).toBe(new Map(Object.entries(innerColors)).size);
    for (const [c, n] of Object.entries(innerColors)) {
      expect(rule.innerBags.get(c)).toBe(n);
    }
  });

  it('should count the contents of a bag', () => {
    const ruleSet = [
      'shiny gold bags contain 2 dark red bags.',
      'dark red bags contain 2 dark orange bags.',
      'dark orange bags contain 2 dark yellow bags.',
      'dark yellow bags contain 2 dark green bags.',
      'dark green bags contain 2 dark blue bags.',
      'dark blue bags contain 2 dark violet bags.',
      'dark violet bags contain no other bags.',
    ]
      .map((r) => BagRule.fromString(r))
      .reduce((all, r) => all.set(r.outerBag, r), new Map<string, BagRule>());
    expect(ruleSet.get('shiny gold')?.countContents(ruleSet)).toBe(127);
  });

  it('should count the contents of a bag 2', () => {
    const ruleSet = [
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
      'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
      'bright white bags contain 1 shiny gold bag.',
      'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
      'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
      'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
      'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
      'faded blue bags contain no other bags.',
      'dotted black bags contain no other bags.',
    ]
      .map((r) => BagRule.fromString(r))
      .reduce((all, r) => all.set(r.outerBag, r), new Map<string, BagRule>());
    expect(ruleSet.get('shiny gold')?.countContents(ruleSet)).toBe(33);
  });
});
