import { printTitle, readInputLines } from '../helpers';
import { getBetterTimeCount } from './parse-input';
import { parseRaces } from './parse-input';

printTitle(6, 1);

const lines = readInputLines(import.meta);
const races = parseRaces(lines);

let answer = 1;

for (const race of races) {
  answer *= getBetterTimeCount(race);
}

console.log('Answer:', answer); // 1155175
