/* eslint-disable unicorn/no-process-exit */
import fs from 'fs-extra';
import path from 'node:path';
import { dirname } from './helpers';

const argv = process.argv.slice(2);
const dayNumber = argv.at(0) ?? 1;

const __dirname = dirname(import.meta);
const dayDirectory = path.resolve(__dirname, `day-${dayNumber}`);

if (fs.existsSync(dayDirectory)) {
  console.log(`> ERROR: The directory for day ${dayNumber} already exists at ${dayDirectory}`);
  // process.exit();
}

console.log('> INFO: Making day', dayNumber);

const template = (part: number) =>
  `
import { printTitle, readInputLines } from '../helpers';

printTitle(${dayNumber}, ${part});

const input = readInputLines(import.meta);

let answer = input;

// DO THE FUCKING JOB !

console.log('Answer:', answer); // ???
`.trimStart();

fs.outputFileSync(path.resolve(dayDirectory, 'input.txt'), '');
fs.outputFileSync(path.resolve(dayDirectory, 'part-1.ts'), template(1));
fs.outputFileSync(path.resolve(dayDirectory, 'part-2.ts'), template(2));

const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const packageJson = fs.readJSONSync(packageJsonPath);
const newPackageJson = {
  ...packageJson,
  scripts: {
    ...packageJson.scripts,
    [`day-${dayNumber}-1`]: `tsx watch src/day-${dayNumber}/part-1`,
    [`day-${dayNumber}-2`]: `tsx watch src/day-${dayNumber}/part-2`,
  },
};

fs.writeJsonSync(packageJsonPath, newPackageJson, { spaces: 2 });

console.log('> INFO: Done at', dayDirectory);
