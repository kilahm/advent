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

  calledNumbers.forEach(num => {
    boards.forEach(board => {
      board.mark(num);
      if(board.winner(false)) {
        answer(board.score(num), true);
      }
    })
  });
})().catch(console.error);
