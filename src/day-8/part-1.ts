/* eslint-disable @typescript-eslint/no-unused-vars */
import { printTitle, readInputLines } from '../helpers';

printTitle(8, 1);

const lines = readInputLines(import.meta, 'input');

type Lines = {
  directions: number[];
  maps: Map<string, string[]>;
};

function parseLines(lines: string[]): Lines {
  const [directionsString, _emptyLine, ...mapsString] = lines;

  const directions = directionsString?.split('').map((d) => Number(d.replace('L', '0').replace('R', '1'))) ?? [];

  const maps = mapsString.map((mapString) => {
    const [_, index, ...map] = mapString.match(/^([A-Z]{3}) = \(([A-Z]{3}), ([A-Z]{3})\)$/) ?? [];

    if (!index || !map || map.length === 0) {
      throw new Error('Bad format');
    }

    return [index, map] as [string, string[]];
  });

  return { directions, maps: new Map(maps) };
}

const { directions, maps } = parseLines(lines);

let answer = 0;
let index = 'AAA';
let map: string[] | undefined;

while ((map = maps.get(index))) {
  index = map[directions.at(answer % directions.length)!]!;

  answer++;

  if (index === 'ZZZ') {
    break;
  }
}

console.log('Answer:', answer); // 18023
