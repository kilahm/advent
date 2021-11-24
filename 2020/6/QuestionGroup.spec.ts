import { QuestionGroup } from './QuestionGroup';

describe('QuestionGroup', () => {
    it('should count the total questions that at least one person answered for a set of groups', () => {
        const data = `abc

a
b
c

ab
ac

a
a
a
a

b`.split('\n');
        const result = QuestionGroup.fromLedger(data).reduce((total, group) => total + group.anyYesQuestionCount(), 0);
        expect(result).toBe(11);
    })

    it('should count the total questions that everyone answered for a set of groups', () => {
        const data = `abc

a
b
c

ab
ac

a
a
a
a

b`.split('\n');
        const result = QuestionGroup.fromLedger(data).reduce((total, group) => total + group.everyYesQuesitonCount(), 0);
        expect(result).toBe(6);
    })
})