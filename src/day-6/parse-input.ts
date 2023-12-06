export type Race = {
  time: number;
  distance: number;
};

export function parseRaces(lines: string[]): Race[] {
  const times = lines
    .at(0)
    ?.replace(/Time: +/, '')
    .split(/ +/g)
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
