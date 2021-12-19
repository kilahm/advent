import { join } from 'path';
import { Memoize } from 'typescript-memoize';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { bin } from '../../shared/lists';
import { numericSort } from '../../shared/numbers';

(async () => {
  const lines = await loadInput(join(__dirname, 'input.txt'));
  const startingPattern = lines.shift();
  if (typeof startingPattern !== 'string') {
    throw new Error('Unable to load starting pattern');
  }

  const insertionRules: Rule[] = lines.slice(1).map((line) => {
    const [pair, insert] = line.split(' -> ');
    if (typeof pair !== 'string' || pair.length !== 2) {
      throw new Error(`Invalid rule: ${line} (pair is not length 2)`);
    }
    if (typeof insert !== 'string' || insert.length !== 1) {
      throw new Error(`Invalid rule: ${line} (insert is not length 1)`);
    }
    return { left: pair[0], right: pair[1], insert };
  });

  const ruleSet = new InsertionRuleSet(insertionRules);

  let symbolSet = SymbolSet.fromString(startingPattern);
  for (let i = 0; i < 40; ++i) {
    const start = Date.now();
    symbolSet = symbolSet.applyRules(ruleSet);
    console.log(`Iteration ${i} took ${(Date.now() - start) / 1000} Seconds`);
  }

  const counts = Object.values(symbolSet.symbolCounts()).sort(numericSort);
  answer(counts[counts.length - 1] - counts[0]);
})().catch(console.error);

interface Rule {
  left: string;
  right: string;
  insert: string;
}
class InsertionRuleSet {
  constructor(private rules: Rule[]) {}

  @Memoize((...args: string[]): string => args.join(''))
  apply(pair: string): string[] {
    const applicableRule = this.rules.find(
      (rule) => rule.left === pair[0] && rule.right === pair[1]
    );
    if (applicableRule === undefined) {
      return [pair];
    }
    return [
      `${applicableRule.left}${applicableRule.insert}`,
      `${applicableRule.insert}${applicableRule.right}`,
    ];
  }
}

class SymbolSet {
  private state: Map<string, number> = new Map();
  static fromString(set: string) {
    const instance = new SymbolSet();
    set.split('').forEach((symbol, index, all) => {
      if (index === all.length - 1) {
        return;
      }
      instance.addPair(`${symbol}${all[index + 1]}`, 1);
    });
    return instance;
  }

  addPair(pair: string, times: number): this {
    this.state.set(pair, (this.state.get(pair) ?? 0) + times);
    return this;
  }

  applyRules(rules: InsertionRuleSet): SymbolSet {
    const next = new SymbolSet();
    this.state.forEach((count, pair) => {
      rules.apply(pair).forEach((newPair) => next.addPair(newPair, count));
    });
    return next;
  }

  symbolCounts(): Record<string, number> {
    const doubles = [...this.state.entries()].reduce((acc, [pair, count]) => {
      const [left, right] = pair.split('');
      acc[left] = (acc[left] ?? 0) + count;
      acc[right] = (acc[right] ?? 0) + count;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(doubles).reduce((acc, [symbol, count]) => {
      acc[symbol] = Math.ceil(count / 2);
      return acc;
    }, {} as Record<string, number>);
  }
}
