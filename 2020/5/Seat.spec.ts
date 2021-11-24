import { Seat } from './Seat';
describe('Seat', () => {
  test.each([
    ['FBFBBFFRLR', 44, 5, 357],
    ['FFFBBBFRRR', 14, 7, 119],
    ['BFFFBBFRRR', 70, 7, 567],
    ['BBFFBBFRLL', 102, 4, 820],
  ])(
    'Seat %s is row %d column %d',
    (code, expectedRow, expectedColumn, expectedId) => {
      const seat = new Seat(code);
      expect(seat.row).toBe(expectedRow);
      expect(seat.column).toBe(expectedColumn);
      expect(seat.id).toBe(expectedId);
    }
  );
});
