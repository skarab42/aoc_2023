import { printTitle, readInputLines } from '../helpers';

printTitle(3, 1);

const lines = readInputLines(import.meta);

function getSlice(line: number, start: number, end: number): string[] {
  return [...(lines[line] ?? '')].slice(start, end);
}

function getMatrix(line: number, start: number, length: number): string[][] {
  return [
    getSlice(line - 1, start, start + length + 2),
    getSlice(line, start, start + length + 2),
    getSlice(line + 1, start, start + length + 2),
  ];
}

function testMatrix(matrix: string[][]): boolean {
  return Boolean(matrix.flat().some((char) => char.match(/[^\d.]/)));
}

let answer = 0;

for (const [lineIndex, line] of lines.entries()) {
  const matches = [...(line?.matchAll(/(\d+)/g) ?? [])];

  for (const match of matches) {
    const start = match.index || 1;
    const value = Number(match[0] ?? '.');
    const length = value.toString().length;

    const matrix = getMatrix(lineIndex, start - 1, length);

    if (testMatrix(matrix)) {
      answer += value;
    }
  }
}

console.log('Answer:', answer); // ??? / 3606
