import { Memoize } from 'typescript-memoize';

export class LanternFishSchool {
  constructor(private ages: number[]) {}

  countAfter(days: number): number {
    return this.ages.reduce(
      (total, age) => total + this.countProgeny(days - age),
      this.ages.length
    );
  }

  @Memoize()
  countProgeny(daysAlive: number): number {
    if (daysAlive < 0) {
      return 0;
    }
    let myLifespan = daysAlive;
    const nextGen = [];
    while (myLifespan > 0) {
      nextGen.push(myLifespan - 9);
      myLifespan -= 7;
    }
    return nextGen.reduceRight(
      (total, lifespan) => total + this.countProgeny(lifespan),
      nextGen.length
    );
  }
}
