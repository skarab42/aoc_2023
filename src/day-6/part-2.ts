import { printTitle, readInputLines } from '../helpers';
import { parseOneRace } from './parse-input';
import { getBetterTimeCount } from './parse-input';

printTitle(6, 2);

const lines = readInputLines(import.meta);
const answer = getBetterTimeCount(parseOneRace(lines));

console.log('Answer:', answer); // 35961505
