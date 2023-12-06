function calculatePoints(matchNumbers: number): number {
  if (matchNumbers < 3) {
    return matchNumbers;
  }

  return Math.pow(2, matchNumbers - 1);
}

export type Card = {
  id: number;
  myNumbers: number[];
  winningNumbers: Set<number>;
  matchNumbers: number[];
  points: number;
};

export function parseCard(line: string): Card {
  const [title = 'Card ?', winningNumbersString = '', myNumbersString = ''] = line.split(/[:|]/);
  const id = Number.parseInt(title.replace(/Card +/, ''));
  const myNumbers = myNumbersString.trim().split(/ +/).map(Number);
  const winningNumbers = new Set(winningNumbersString.trim().split(' ').map(Number));
  const matchNumbers = myNumbers.filter((myNumber) => winningNumbers.has(myNumber));
  const points = calculatePoints(matchNumbers.length);

  return {
    id,
    myNumbers,
    winningNumbers,
    matchNumbers,
    points,
  };
}
