import { fatal } from '../../shared/display';

const pointMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .split('')
  .reduce((map, letter, index) => {
    map[letter] = index + 1;
    return map;
  }, {} as Record<string, number>);

export function itemPriority(item: string): number {
  const p = pointMap[item];
  if (p === undefined) {
    fatal(`Invalid item tye: ${item}`);
  }
  return p;
}

export class Rucksack {
  constructor(readonly pocket1: Set<string>, readonly pocket2: Set<string>) {}
  commonItem(): string {
    const common = [...this.pocket1.values()].filter((i) =>
      this.pocket2.has(i)
    );
    if (common.length !== 1) {
      fatal('sack has moe than 1 common item');
    }
    return common[0];
  }

  has(item: string): boolean {
    return this.pocket1.has(item) || this.pocket2.has(item);
  }

  static fromString(value: string): Rucksack {
    if (value.length % 2 !== 0) {
      fatal(`Rucksack has odd total items, so has uneven pockets`);
    }
    const splitIndex = Math.ceil(value.length / 2);
    const allItems = value.split('');
    return new Rucksack(
      new Set(allItems.slice(0, splitIndex)),
      new Set(allItems.slice(splitIndex))
    );
  }
}

export class RucksackGroup {
  constructor(private sacks: [Rucksack, Rucksack, Rucksack]) {}
  static fromIterable(sacks: Iterable<Rucksack>): RucksackGroup[] {
    const groups: RucksackGroup[] = [];
    let thisGroup: Rucksack[] = [];
    for (const sack of sacks) {
      thisGroup.push(sack);
      if (thisGroup.length === 3) {
        groups.push(
          new RucksackGroup([thisGroup[0], thisGroup[1], thisGroup[2]])
        );
        thisGroup = [];
      }
    }
    return groups;
  }

  badge(): string {
    const badges = [
      ...this.sacks[0].pocket1.values(),
      ...this.sacks[0].pocket2.values(),
    ].filter((item) => this.sacks[1].has(item) && this.sacks[2].has(item));
    if (badges.length !== 1) {
      fatal('Pack group has more than 1 badge');
    }
    return badges[0];
  }
}
