import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { BingoBoard } from './BingoBoard';

(async () => {
  const calledNumbers: number[] = [];
  let boards: BingoBoard[] = [];
  let boardRows: number[][] = [];
  (await loadInput(join(__dirname, 'input.txt'))).forEach(
    (line, lineNumber) => {
      if (lineNumber === 0) {
        calledNumbers.push(...line.split(',').map((n) => parseInt(n, 10)));
        return;
      }
      if (lineNumber === 1) {
        return;
      }
      if (line === '') {
        boards.push(new BingoBoard(boardRows));
        boardRows = [];
        return;
      }
      boardRows.push(
        line
          .replaceAll('  ', ' ')
          .trimStart()
          .split(' ')
          .map((n) => parseInt(n, 10))
      );
    }
  );
  boards.push(new BingoBoard(boardRows));

  for (const num of calledNumbers) {
    boards.forEach((board) => {
      board.mark(num);
      if (!board.winner(false)) {
        return;
      }
      if (boards.length === 1) {
        answer(board.score(num), true);
      }
    });
    boards = boards.filter((b) => !b.winner(false));
  }
})().catch(console.error);
