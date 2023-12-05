import { printTitle, readInputLines } from '../helpers';

printTitle(3, 2);

const lines = readInputLines(import.meta);

type Star = { index: number };
type Gear = { start: number; end: number; value: number };

type ComputedLine = {
  stars: Star[];
  gears: Gear[];
};

const computedLines: ComputedLine[] = [];

for (const line of lines) {
  const stars = [...line.matchAll(/\*/g)].map((star) => ({ index: star.index ?? -1 }));
  const gears = [...line.matchAll(/\d+/g)].map((star) => {
    const start = star.index ?? -1;
    return {
      start,
      end: start + star[0].length - 1,
      value: Number(star[0]),
    };
  });

  computedLines.push({ stars, gears });
}

function getAdjacentGears(starIndex: number, line: ComputedLine | undefined): number[] {
  if (!line) {
    return [];
  }

  const gears = line.gears.filter((gear) => {
    return (
      (gear.start < starIndex + 2 && gear.start > starIndex - 2) ||
      (gear.end < starIndex + 2 && gear.end > starIndex - 2)
    );
  });

  return gears.map((gear) => gear.value);
}

let answer = 0;

for (const [lineIndex, line] of computedLines.entries()) {
  if (line.stars.length === 0) {
    continue;
  }

  for (const star of line.stars) {
    const gears = [
      ...getAdjacentGears(star.index, computedLines[lineIndex - 1]),
      ...getAdjacentGears(star.index, line),
      ...getAdjacentGears(star.index, computedLines[lineIndex + 1]),
    ];

    if (gears.length === 2) {
      answer += (gears[0] ?? 0) * (gears[1] ?? 0);
    }
  }
}

console.log('Answer:', answer); // 91031374
