import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day10.txt';
const list = inputParser(inputFileName).filter(Boolean);

const openingChars = ['(', '{', '[', '<'];
const closingChars = [')', '}', ']', '>'];

const getMatchingOpeningChar = (char: string) => {
  return openingChars[closingChars.indexOf(char)];
};

const getMatchingClosingChar = (char: string) => {
  return closingChars[openingChars.indexOf(char)];
};

const getIllegalCharacterInLine = (line: string): string => {
  const buffer: string[] = [];
  const chars = line.split('');

  for (let index = 0; index < chars.length; index++) {
    const char = chars[index];

    if (openingChars.includes(char)) {
      buffer.push(char);
      continue;
    }

    if (buffer[buffer.length - 1] === getMatchingOpeningChar(char)) {
      buffer.pop();
      continue;
    }

    return char;
  }
  return '';
};

const computeScore = (illegalChars: string[]): number => {
  return illegalChars.reduce((acc, char) => {
    if (char === ')') {
      return acc + 3;
    }
    if (char === '}') {
      return acc + 1197;
    }
    if (char === '>') {
      return acc + 25137;
    }
    return acc + 57;
  }, 0);
};

const firstQuestionSolver = () => {
  const illegalChars = list.map(row => getIllegalCharacterInLine(row)).filter(el => el?.length > 0);
  console.log('result', JSON.stringify(computeScore(illegalChars), null, 2));
};
// firstQuestionSolver();

const isLineComplete = (line: string): boolean => {
  const buffer: string[] = [];
  const chars = line.split('');

  for (let index = 0; index < chars.length; index++) {
    const char = chars[index];

    if (openingChars.includes(char)) {
      buffer.push(char);
      continue;
    }

    if (buffer[buffer.length - 1] === getMatchingOpeningChar(char)) {
      buffer.pop();
      continue;
    }

    return false;
  }
  return true;
};

const getLineMissingClosingChars = (line: string): string[] => {
  const buffer: string[] = [];
  const chars = line.split('');

  for (let index = 0; index < chars.length; index++) {
    const char = chars[index];

    if (openingChars.includes(char)) {
      buffer.push(char);
      continue;
    }

    if (buffer[buffer.length - 1] === getMatchingOpeningChar(char)) {
      buffer.pop();
      continue;
    }
  }
  return buffer.map(el => getMatchingClosingChar(el)).reverse();
};

const computeMissingCharScore = (missingChars: string[]): number => {
  return missingChars.reduce((acc, char) => {
    if (char === ')') {
      return acc * 5 + 1;
    }
    if (char === '}') {
      return acc * 5 + 3;
    }
    if (char === '>') {
      return acc * 5 + 4;
    }
    return acc * 5 + 2;
  }, 0);
};

const secondQuestionSolver = () => {
  const incompleteLines = list.filter(isLineComplete);

  const missingChars = incompleteLines.map(getLineMissingClosingChars);
  const missingCharsScore = missingChars
    .map(missingChars => {
      return computeMissingCharScore(missingChars);
    })
    .sort((a, b) => a - b);
  console.log(
    'missingChars',
    JSON.stringify(missingCharsScore[(missingCharsScore.length - 1) / 2], null, 2)
  );
};
secondQuestionSolver();
