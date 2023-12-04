import { readInputLines } from '../helpers';

export type Color = 'red' | 'green' | 'blue';
export type ColorRecord = Record<Color, number>;
export type ParsedOutput = {
  gameName: string;
  gameNumber: number;
  gameRounds: Partial<ColorRecord>[];
};

// Parse input file to somthing like :
// => [
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
export function parseInput(): ParsedOutput[] {
  return readInputLines(import.meta).map((line) => {
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
}
