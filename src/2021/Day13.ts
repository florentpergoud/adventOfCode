import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day13.txt';
const list = inputParser(inputFileName).filter(Boolean);

const coordinates = list.filter(line => line.includes(','));
const foldingInsctructions = list.filter(line => line.includes('fold'));

const getInitialPaper = (coordinates: string[]): string[][] => {
  const maxXCoord = Math.max(...coordinates.map(coord => parseInt(coord.split(',')[0], 10)));
  const maxYCoord = Math.max(...coordinates.map(coord => parseInt(coord.split(',')[1], 10)));

  const paper = [];

  for (let y = 0; y <= maxYCoord; y++) {
    paper[y] = new Array(maxXCoord + 1).fill('.');
    for (let x = 0; x <= maxXCoord; x++) {
      coordinates.includes(`${x},${y}`) && (paper[y][x] = '#');
    }
  }
  return paper;
};

const logPaper = (paper: string[][]) => console.log(paper.map(line => line.join(' ')).join('\n'));

const foldPaperHorizontally = (paper: string[][], row: number): string[][] => {
  const newPaper = paper.slice(0, row);
  for (let index = row + 1; index < paper.length; index++) {
    for (let x = 0; x < paper[0].length; x++) {
      const foldingElement = paper[index][x];
      if (foldingElement === '#') {
        newPaper[2 * row - index][x] = foldingElement;
      }
    }
  }
  return newPaper;
};

const foldPaperVertically = (paper: string[][], column: number): string[][] => {
  const newPaper = paper.map(line => line.slice(0, column));

  for (let y = 0; y < paper.length; y++) {
    for (let index = column + 1; index < paper[0].length; index++) {
      const foldingElement = paper[y][index];
      if (foldingElement === '#') {
        newPaper[y][2 * column - index] = foldingElement;
      }
    }
  }
  return newPaper;
};

const foldPaper = (paper: string[][], instruction: string): string[][] => {
  const instructionAxis = instruction.split(' ')[2].charAt(0);
  const instructionDistance = parseInt(instruction.split(' ')[2].split('=')[1], 10);

  if (instructionAxis === 'y') {
    return foldPaperHorizontally(paper, instructionDistance);
  }

  return foldPaperVertically(paper, instructionDistance);
};

const countDot = (paper: string[][]): number => {
  return paper.reduce((acc, line) => acc + line.filter(dot => dot === '#').length, 0);
};

const firstQuestionSolver = () => {
  const paper = getInitialPaper(coordinates);
  // logPaper(paper);
  // console.log('');

  const newPaper = foldPaper(paper, foldingInsctructions[0]);
  // logPaper(newPaper);
  // console.log('');

  const dotCount = countDot(newPaper);
  console.log('dotCount', dotCount);
};
// firstQuestionSolver();

const secondQuestionSolver = () => {
  const paper = getInitialPaper(coordinates);

  let foldedPaper: string[][] = paper;

  for (let index = 0; index < foldingInsctructions.length; index++) {
    const foldingInsctruction = foldingInsctructions[index];
    const folded = foldPaper(foldedPaper, foldingInsctruction);
    foldedPaper = folded;
  }

  logPaper(foldedPaper);
};

secondQuestionSolver();
