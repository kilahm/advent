import { readFileSync } from 'fs';
import { join } from 'path';
import { answer } from '../../shared/answer';

const requiredFields: string[] = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
];

answer(
  readFileSync(join(__dirname, 'input.txt'))
    .toString('utf-8')
    .split('\n\n')
    .map(
      (p) =>
        new Map(
          //@ts-ignore
          p
            .replace(/\n/gm, ' ')
            .split(' ')
            .map((field) => field.split(':'))
        )
    )
    .reduce(
      (validCount, passport) =>
        validCount +
        (requiredFields.every((field) => passport.has(field)) ? 1 : 0),
      0
    )
);
