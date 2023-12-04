import { readInputLines, printTitle } from '../helpers';

printTitle(1, 2);

let answer = 0;

const NUMBER_MAP = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  // reversed
  eno: '1',
  owt: '2',
  eerht: '3',
  ruof: '4',
  evif: '5',
  xis: '6',
  neves: '7',
  thgie: '8',
  enin: '9',
};

const REGXEP = /one|two|three|four|five|six|seven|eight|nine|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;

function reverseString(input: string): string {
  return [...input].reverse().join('');
}

function normalize(line: string): string {
  return line.replaceAll(REGXEP, (match) => {
    return NUMBER_MAP[match as keyof typeof NUMBER_MAP];
  });
}

for (const line of readInputLines(import.meta)) {
  const numberString = normalize(line).replaceAll(/\D+/g, '');
  const numberStringReversed = normalize(reverseString(line)).replaceAll(/\D+/g, '');

  answer += Number((numberString.at(0) ?? '0') + (numberStringReversed.at(0) ?? '0'));
}

console.log('Answer:', answer); // 54770
