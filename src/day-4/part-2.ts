import { arraySum, printTitle, readInputLines } from '../helpers';
import { parseCard } from './parse-input';

printTitle(4, 2);

const lines = readInputLines(import.meta);
const winningGames = new Map<number, number>();

function incrementWinningGame(id: number): void {
  winningGames.set(id, winningGames.has(id) ? winningGames.get(id)! + 1 : 1);
}

function countWinningGame(line: string): void {
  const game = parseCard(line);

  incrementWinningGame(game.id);

  if (game.points === 0) {
    return;
  }

  const wins = game.matchNumbers.length;
  const start = game.id;
  const end = start + wins;

  for (let index = start; index < end; index++) {
    const line = lines[index];

    if (line) {
      countWinningGame(line);
    }
  }
}

for (const line of lines) {
  countWinningGame(line);
}

const answer = arraySum([...winningGames.values()]);

console.log('Answer:', answer); // 7258152
