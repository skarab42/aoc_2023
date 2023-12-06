import { printTitle, readInputLines } from '../helpers';
import { parseGame } from './parse-games';

printTitle(4, 1);

const lines = readInputLines(import.meta);

let answer = 0;

for (const line of lines) {
  const game = parseGame(line);

  answer += game.points;
}

console.log('Answer:', answer); // 24848
