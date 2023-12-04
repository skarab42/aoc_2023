import { printTitle } from '../helpers';
import { type ColorRecord, parseInput } from './parse-input';

printTitle(2, 2);

const games = parseInput();

let answer = 0;

for (const game of games) {
  const roundLimit: ColorRecord = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const round of game.gameRounds) {
    roundLimit.red = Math.max(roundLimit.red, round.red ?? 0);
    roundLimit.green = Math.max(roundLimit.green, round.green ?? 0);
    roundLimit.blue = Math.max(roundLimit.blue, round.blue ?? 0);
  }

  answer += roundLimit.red * roundLimit.green * roundLimit.blue;
}

console.log('Answer:', answer); // 2449
