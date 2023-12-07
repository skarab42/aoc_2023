import { printTitle, readInputLines } from '../helpers';

printTitle(7, 1);

const lines = readInputLines(import.meta, 'input');

const KIND_REGEXP = {
  five: /([2-9AJKQT])\1{4}/g,
  four: /([2-9AJKQT])\1{3}/g,
  three: /([2-9AJKQT])\1{2}/g,
  two: /([2-9AJKQT])\1/g,
};

type Kind = keyof typeof KIND_REGEXP;

const kinds = Object.keys(KIND_REGEXP) as Kind[];

type Hand = {
  input: string;
  strength: number;
  normalizedInput: string;
};

const KIND_POINTS = { five: 30, four: 20, three: 10, two: 1, one: 0 };

function normalizeInput(input: string): string {
  return input
    .replaceAll('A', 'a')
    .replaceAll('K', 'b')
    .replaceAll('Q', 'c')
    .replaceAll('J', 'd')
    .replaceAll('T', 'e')
    .replaceAll('9', 'f')
    .replaceAll('8', 'g')
    .replaceAll('7', 'h')
    .replaceAll('6', 'i')
    .replaceAll('5', 'j')
    .replaceAll('4', 'k')
    .replaceAll('3', 'l')
    .replaceAll('2', 'm');
}

function parseHand(input: string): Hand {
  const normalizedInput = normalizeInput(input);
  const handCount = { five: 0, four: 0, three: 0, two: 0, one: 0 };

  let sortedHand = [...input].sort().join('');
  let strength = 0;

  for (const kind of kinds) {
    const match = sortedHand.match(KIND_REGEXP[kind]);

    if (match) {
      handCount[kind] += match.length;
      strength += match.length * KIND_POINTS[kind];
      sortedHand = sortedHand.replace(KIND_REGEXP[kind], '');
    }
  }

  handCount.one += sortedHand.length;

  return { input, normalizedInput, strength };
}

type Line = { hand: Hand; bid: number };

function parseLine(line: string): Line {
  const parts = line.split(' ');

  if (parts.length !== 2) {
    throw new Error('Bad format');
  }

  const hand = parseHand(parts[0]!);
  const bid = Number(parts[1]!);

  return { hand, bid };
}

function sortLines(a: Line, b: Line): number {
  if (a.hand.strength === b.hand.strength) {
    return b.hand.normalizedInput.localeCompare(a.hand.normalizedInput);
  }

  return a.hand.strength - b.hand.strength;
}

function parseLines(lines: string[]): Line[] {
  return lines.map((line) => parseLine(line)).sort(sortLines);
}

const parsedLines = parseLines(lines);

let answer = 0;

for (const [index, line] of parsedLines.entries()) {
  answer += line.bid * (index + 1);
}

console.log('Answer:', answer); // 250951660
