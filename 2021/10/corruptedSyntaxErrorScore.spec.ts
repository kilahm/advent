import { corruptedSyntaxErrorScore } from './corruptedSyntaxErrorScore';

describe('corruptedSyntaxErrorScore', () => {
  it.each([
    ['{([(<{}[<>[]}>{[]{[(<()>', 1197],
    ['[[<[([]))<([[{}[[()]]]', 3],
    ['[{[{({}]{}}([{[{{{}}([]', 57],
    ['[<(<(<(<{}))><([]([]()', 3],
    ['<{([([[(<>()){}]>(<<{{', 25137],
  ])(`should parse %s with an error score of %d`, (line, score) => {
    expect(corruptedSyntaxErrorScore(line)).toBe(score);
  });

  it('should parse all lines correctly', () => {
    const result = `[({(<(())[]>[[{[]{<()<>>
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
      .map(corruptedSyntaxErrorScore)
      .reduce((acc, score) => acc + score, 0);
    expect(result).toBe(26397);
  });
});
