import { numericSort } from '../../shared/numbers';
import { incompleteErrorScore } from './incompleteErrorScore';

describe('incompleteErrorScore', () => {
  it.each([
    ['[({(<(())[]>[[{[]{<()<>>', 288957],
  ])(`should parse %s with an incomplete score of %d`, (line, score) => {
    expect(incompleteErrorScore(line)).toBe(score);
  });

  it('should parse all lines correctly', () => {
    const scores = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`
      .split('\n')
      .map(incompleteErrorScore)
      .filter(score => score > 0)
      .sort(numericSort);
    
    expect(scores[Math.floor(scores.length / 2)]).toBe(288957);
  });
})