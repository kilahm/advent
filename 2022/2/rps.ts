import { fatal } from '../../shared/display';

export enum RPSShape {
  Rock,
  Paper,
  Scissors,
}

export function parseYou(raw: string): RPSShape {
  switch (raw) {
    case 'A':
      return RPSShape.Rock;
    case 'B':
      return RPSShape.Paper;
    case 'C':
      return RPSShape.Scissors;
  }
  fatal(`Invalid you value: ${raw}`);
}

export function parseMe1(raw: string): RPSShape {
  switch (raw) {
    case 'X':
      return RPSShape.Rock;
    case 'Y':
      return RPSShape.Paper;
    case 'Z':
      return RPSShape.Scissors;
  }
  fatal(`Invalid me value: ${raw}`);
}

export function parseMe2(raw: string, you: RPSShape): RPSShape {
  switch (raw) {
    case 'X':
      return loseAgainst(you);
    case 'Y':
      return you;
    case 'Z':
      return winAgainst(you);
  }
  fatal(`Invalid me value: ${raw}`);
}

export interface RPSGame {
  me: RPSShape;
  you: RPSShape;
}

export function parseEntry1(line: string): RPSGame {
  const [you, me] = line.split(' ', 2);
  return { me: parseMe1(me), you: parseYou(you) };
}

export function parseEntry2(line: string): RPSGame {
  const [you, me] = line.split(' ', 2);
  return { me: parseMe2(me, parseYou(you)), you: parseYou(you) };
}

export function gameScore({ me, you }: RPSGame): number {
  let score = 0;
  switch (me) {
    case RPSShape.Rock:
      score += 1;
      break;
    case RPSShape.Paper:
      score += 2;
      break;
    case RPSShape.Scissors:
      score += 3;
      break;
  }
  if (win(me, you)) {
    return score + 6;
  }
  if (me === you) {
    return score + 3;
  }
  return score;
}

function win(me: RPSShape, you: RPSShape): boolean {
  switch (me) {
    case RPSShape.Paper:
      return you === RPSShape.Rock;
    case RPSShape.Rock:
      return you === RPSShape.Scissors;
    case RPSShape.Scissors:
      return you === RPSShape.Paper;
  }
}

function winAgainst(shape: RPSShape): RPSShape {
  switch (shape) {
    case RPSShape.Paper:
      return RPSShape.Scissors;
    case RPSShape.Rock:
      return RPSShape.Paper;
    case RPSShape.Scissors:
      return RPSShape.Rock;
  }
}

function loseAgainst(shape: RPSShape): RPSShape {
  switch (shape) {
    case RPSShape.Paper:
      return RPSShape.Rock;
    case RPSShape.Rock:
      return RPSShape.Scissors;
    case RPSShape.Scissors:
      return RPSShape.Paper;
  }
}
