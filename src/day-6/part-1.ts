import { printTitle, readInputLines } from '../helpers';
import { type Race, parseRaces } from './parse-input';

printTitle(6, 1);

const lines = readInputLines(import.meta);
const races = parseRaces(lines);

function getBetterTimeCount({ time, distance }: Race): number {
  let betterDistanceCount = 0;

  for (let testTime = 1; testTime < time; testTime++) {
    const testDistance = testTime * (time - testTime);

    if (testDistance > distance) {
      betterDistanceCount++;
    }
  }

  return betterDistanceCount;
}

let answer = 1;

for (const race of races) {
  answer *= getBetterTimeCount(race);
}

console.log('Answer:', answer); // 1155175
