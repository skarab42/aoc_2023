export type Race = {
  time: number;
  distance: number;
};

export function parseRaces(lines: string[]): Race[] {
  const times = lines
    .at(0)
    ?.replace(/Time: +/, '')
    .split(/ +/)
    .map(Number);

  const distances = lines
    .at(1)
    ?.replace(/Distance: +/, '')
    .split(/ +/)
    .map(Number);

  if (!times || !distances) {
    throw new Error('No times or distances found');
  }

  return times.map((time, index) => ({ time, distance: distances[index]! }));
}

export function parseOneRace(lines: string[]): Race {
  const time = Number(
    lines
      .at(0)
      ?.replace(/Time: +/, '')
      .replaceAll(/ +/g, ''),
  );

  const distance = Number(
    lines
      .at(1)
      ?.replace(/Distance: +/, '')
      .replaceAll(/ +/g, ''),
  );

  if (!time || !distance) {
    throw new Error('No times or distances found');
  }

  return { time, distance };
}

export function getBetterTimeCount({ time, distance }: Race): number {
  let betterDistanceCount = 0;

  for (let testTime = 1; testTime < time; testTime++) {
    const testDistance = testTime * (time - testTime);

    if (testDistance > distance) {
      betterDistanceCount++;
    }
  }

  return betterDistanceCount;
}
