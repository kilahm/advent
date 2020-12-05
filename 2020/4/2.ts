import { readFileSync } from 'fs';
import { join } from 'path';
import { answer } from '../../shared/answer';

const fieldValidation: Map<string, (string) => boolean> = new Map([
  [
    'byr',
    (value) => {
      if (!/^[0-9]+$/.test(value)) {
        return false;
      }
      const intval = parseInt(value);
      return 1920 <= intval && intval <= 2002;
    },
  ],
  [
    'iyr',
    (value) => {
      if (!/^[0-9]+$/.test(value)) {
        return false;
      }
      const intval = parseInt(value);
      return 2010 <= intval && intval <= 2020;
    },
  ],
  [
    'eyr',
    (value) => {
      if (!/^[0-9]+$/.test(value)) {
        return false;
      }
      const intval = parseInt(value);
      return 2020 <= intval && intval <= 2030;
    },
  ],
  [
    'hgt',
    (value) => {
      const parts = /^(?<height>\d+)(?<units>cm|in)$/.exec(value);
      console.log(parts, JSON.stringify(value));
      if (parts === null) {
        return false;
      }
      const intval = parseInt(parts.groups.height);
      return parts.groups.units === 'cm'
        ? 150 <= intval && intval <= 193
        : 59 <= intval && intval <= 76;
    },
  ],
  ['hcl', (value) => /^#[0-9a-f]{6}$/.test(value)],
  [
    'ecl',
    (value) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value),
  ],
  ['pid', (value) => /^\d{9}$/.test(value)],
]);
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
    .reduce((validCount, passport) => {
      const isValid = [...fieldValidation.entries()].every(([field, validator]) => {
        if(!passport.has(field)) {
          console.log(`rejecting due to lack of field ${field}`);
          return false;
        }
        if(!validator(passport.get(field))) {
          console.log(`rejecting bad value for field ${field}: ${passport.get(field)}`)
          return false;
        }
        return true;
      })
      if(isValid) {
        console.log('found valid passport');
        return validCount + 1;
      }
      return validCount;
    }, 0)
);
