export class QuestionGroup {
  private anyYesQuestion = new Set<string>();
  private everyYesQuestion = new Set<string>();
  private evaluatedEveryQuestion = false;
  readonly people: number;
  constructor(private readonly record: string[]) {
    this.people = record.length;
    record.forEach((r) =>
      r.split('').forEach((q) => this.anyYesQuestion.add(q))
    );
  }

  anyYesQuestionCount(): number {
    return this.anyYesQuestion.size;
  }

  everyYesQuesitonCount(): number {
    if (this.evaluatedEveryQuestion) {
      return this.everyYesQuestion.size;
    }
    // Record answers from first person
    this.record[0].split('').forEach((q) => this.everyYesQuestion.add(q));
    this.record.forEach((r) => {
      const recordSet = new Set(r.split(''));
      for (const allanswer of this.everyYesQuestion.values()) {
        if (!recordSet.has(allanswer)) {
          this.everyYesQuestion.delete(allanswer);
        }
      }
    });

    return this.everyYesQuestion.size;
  }

  static fromLedger(ledger: string[]): QuestionGroup[] {
    const groups: QuestionGroup[] = [];
    let recordSet = [];
    for (const row of ledger) {
      if (row === '') {
        groups.push(new QuestionGroup(recordSet));
        recordSet = [];
        continue;
      }
      recordSet.push(row);
    }
    if (recordSet.length > 0) {
      groups.push(new QuestionGroup(recordSet));
    }
    return groups;
  }
}
