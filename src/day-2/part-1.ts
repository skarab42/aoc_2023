import { printTitle } from '../helpers';
import { type ColorRecord, parseInput } from './parse-input';

printTitle(2, 1);

const games = parseInput();
const roundLimit: ColorRecord = {
  red: 12,
  green: 13,
  blue: 14,
};

let answer = 0;

for (const game of games) {
  const badRound = game.gameRounds.find((round) => {
    return (
      (round.red ?? 0) > roundLimit.red || (round.green ?? 0) > roundLimit.green || (round.blue ?? 0) > roundLimit.blue
    );
  });

  if (!badRound) {
    answer += game.gameNumber;
  }
}

console.log('Answer:', answer); // 2449
