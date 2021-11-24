import { GamingComputer } from './GamingComputer';

describe('GamingComputer', () => {
  it('should run until it loops', () => {
    const program = [
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ];
    const computer = GamingComputer.fromCode(program);
    while(!computer.hasVisited(computer.getState().executionPointer)) {
        computer.step();
    }
    expect(computer.getState().accumulator).toBe(5);
  });
});
