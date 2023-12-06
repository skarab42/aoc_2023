import { printTitle, readInputLines } from '../helpers';

printTitle(5, 1);

const lines = readInputLines(import.meta);

function parseSeeds(line: string | undefined): number[] {
  return line ? line.split(' ').slice(1).map(Number) : [];
}

type RangeMap = [destination: number, source: number, lenght: number];

function parseRangeMap(line: string): RangeMap {
  const range = line.split(' ').map(Number);

  if (range && range.length === 3) {
    return line.split(' ').map(Number) as RangeMap;
  }

  return [-1, -1, -1];
}

type SeedMap = {
  name: string;
  ranges: RangeMap[];
};

function newMap(name: string): SeedMap {
  return { name, ranges: [] };
}

function parseMaps(lines: string[]): SeedMap[] {
  const maps: SeedMap[] = [];

  let map: SeedMap | undefined;

  for (const line of lines) {
    if (line.trim().length === 0) {
      map = undefined;
      continue;
    }

    const nameMatch = line.match(/^([a-z-]+) map:/);

    if (nameMatch) {
      map = newMap(nameMatch[1] ?? '???');
      maps.push(map);
      continue;
    }

    if (map) {
      map.ranges.push(parseRangeMap(line));
    }
  }

  return maps;
}

type ParsedLines = { seeds: number[]; maps: SeedMap[] };

function parseLines(lines: string[]): ParsedLines {
  return {
    seeds: parseSeeds(lines.shift()),
    maps: parseMaps(lines),
  };
}

type ShortRange = [start: number, lenght: number];

function inRange(value: number, [start, length]: ShortRange): boolean {
  return value >= start && value < start + length;
}

function findSourceRange(value: number, ranges: RangeMap[]): RangeMap | undefined {
  return ranges.find((range) => inRange(value, range.slice(1) as ShortRange));
}

const { seeds, maps } = parseLines(lines);

let answer = Number.POSITIVE_INFINITY;

for (const seed of seeds) {
  const destinations: number[] = [];

  let currentSeed = seed;

  for (const map of maps) {
    const range = findSourceRange(currentSeed, map.ranges);

    if (!range) {
      continue;
    }

    const offset = range[0] - range[1];
    const destination = currentSeed + offset;

    currentSeed = destination;

    destinations.push(destination);
  }

  answer = Math.min(answer, destinations.at(-1) ?? Number.POSITIVE_INFINITY);
}

console.log('Answer:', answer); // 175622908
