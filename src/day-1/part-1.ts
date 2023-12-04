import { readInputLines, printTitle } from '../helpers';

printTitle(1, 1);

let answer = 0;

for (const line of readInputLines(import.meta)) {
  const numberString = line.replaceAll(/\D+/g, '');

  answer += Number((numberString.at(0) ?? '0') + (numberString.at(-1) ?? '0'));
}

console.log('Answer:', answer); // 54630
