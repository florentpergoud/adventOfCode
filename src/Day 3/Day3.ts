import inputParser from '../utils/inputParser';

const inputFileName = 'Input3-1.txt';

const treeSymbol = '#';

const isThereTreeAtPosition = (vertical:number, horizontal:number, map: string[]) => {
  const modulatedHorizontal = horizontal % map[0].length;
  return map[vertical].charAt(modulatedHorizontal) === treeSymbol;
};

const numberOfThreeForSlope = (verticalMovment :number, horizontalMovment :number) => {
  const map = inputParser(inputFileName);
  let numberOfTreeEncoutered = 0;
  let horizontalIndex = 0;
  for (let verticalIndex = 0; verticalIndex < map.length; verticalIndex += verticalMovment) {
    if (isThereTreeAtPosition(verticalIndex, horizontalIndex, map)) {
      numberOfTreeEncoutered += 1;
    }
    horizontalIndex += horizontalMovment;
  }
  return numberOfTreeEncoutered;
};

const firstQuestionSolver = () => {
  const numberOfTreeEncoutered = numberOfThreeForSlope(1, 3);
  console.log(`We encoutered ${numberOfTreeEncoutered} trees`);
};

const secondQuestionSolver = () => {
  const multiplicatedNumber = numberOfThreeForSlope(1, 1) * numberOfThreeForSlope(1, 3) * numberOfThreeForSlope(1, 5) * numberOfThreeForSlope(1, 7) * numberOfThreeForSlope(2, 1);
  console.log(`Multiplicated number for is ${multiplicatedNumber}`);
};

firstQuestionSolver();

secondQuestionSolver();
