import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const dashedLine = '-'.repeat(42);

export function printTitle(day: number, part: number) {
  console.log(`\n${dashedLine}[ DAY ${day} | PART ${part} ]${dashedLine}\n`);
}

export function dirname(importMeta: ImportMeta): string {
  return fileURLToPath(new URL('.', importMeta.url));
}

export function filename(importMeta: ImportMeta): string {
  return fileURLToPath(importMeta.url);
}

export function readInputText(importMeta: ImportMeta, filename = 'input'): string {
  return readFileSync(resolve(dirname(importMeta), `${filename}.txt`), 'utf8').trim();
}

export function splitLines(input: string): string[] {
  return input.split(/\r?\n/);
}

export function readInputLines(importMeta: ImportMeta, filename = 'input'): string[] {
  return splitLines(readInputText(importMeta, filename));
}

export function arraySum(array: number[]): number {
  return array.reduce((a, b) => a + b, 0);
}
