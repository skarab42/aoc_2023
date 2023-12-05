import { printTitle, readInputLines } from '../helpers';

printTitle(4, 1);

const lines = readInputLines(import.meta);

function calculatePoints(matchNumbers: number): number {
  if (matchNumbers < 3) {
    return matchNumbers;
  }

  return Math.pow(2, matchNumbers - 1);
}

let answer = 0;

for (const line of lines) {
  const [, winningNumbersString = '', myNumbersString = ''] = line.split(/[:|]/);
  const myNumbers = myNumbersString.trim().split(/ +/).map(Number);
  const winningNumbers = new Set(winningNumbersString.trim().split(' ').map(Number));
  const matchNumbers = myNumbers.filter((myNumber) => winningNumbers.has(myNumber));

  answer += calculatePoints(matchNumbers.length);
}

console.log('Answer:', answer); // 24848
