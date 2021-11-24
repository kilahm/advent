import { join } from 'path';
import { answer } from '../../shared/answer';
import { loadInput } from '../../shared/input';
import { Seat } from './Seat';

(async () => {
  const input = (await loadInput(join(__dirname, 'input.txt')));

  const seats = input.map(code => new Seat(code));
  const maxId = Math.max(...seats.map(seat => seat.id));
  answer(maxId);
})();
