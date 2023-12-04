import { printTitle, readInputLines } from '../helpers';

printTitle(2, 1);

const lines = readInputLines(import.meta);

type Color = 'red' | 'green' | 'blue';
type ColorRecord = Record<Color, number>;

const games = lines.map((line) => {
  const [gameName = '', ...gameRoundsRaw] = line.split(/[:;] ?/);
  const gameNumber = Number.parseInt(gameName.replace('Game ', ''));
  const gameRounds: ColorRecord[] = gameRoundsRaw.map((gameRound) => {
    const cubes = gameRound.split(/, ?/).map((cube) => {
      const [key, value] = cube.split(' ').reverse();
      return [key, Number(value)];
    });
    return Object.fromEntries(cubes);
  });

  return { gameName, gameNumber, gameRounds };
});

// Output somthing like:
// games = [
//   ...,
//   {
//     gameName: 'Game 42',
//     gameNumber: 42,
//     gameRounds: [
//       { blue: 12, green: 2 },
//       { green: 2, red: 4, blue: 13 },
//       { blue: 9, red: 1, green: 2 },
//       { green: 2, red: 3, blue: 1 }
//     ]
//   }
//   ...,
// ]

const roundLimit: ColorRecord = {
  red: 12,
  green: 13,
  blue: 14,
};

let answer = 0;

for (const game of games) {
  const badRound = game.gameRounds.find((round) => {
    return round?.red > roundLimit.red || round?.green > roundLimit.green || round?.blue > roundLimit.blue;
  });

  if (!badRound) {
    answer += game.gameNumber;
  }
}

console.log('Answer:', answer); // 2449
