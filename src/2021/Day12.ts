import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day12.txt';
const list = inputParser(inputFileName).filter(Boolean);

interface AvailableCaves {
  [key: string]: string[];
}

const buildAvailableCavesFromCave = (cavesDesctiption: string[]): AvailableCaves => {
  const availableCaves: { [key: string]: string[] } = {};

  for (let i = 0; i < cavesDesctiption.length; i++) {
    const current = cavesDesctiption[i];
    const [left, right] = current.split('-');
    if (right !== 'start') {
      if (!availableCaves[left]) {
        availableCaves[left] = [right];
      }
      if (!availableCaves[left].includes(right)) {
        availableCaves[left].push(right);
      }
    }
    if (left !== 'start' && right !== 'end') {
      if (!availableCaves[right]) {
        availableCaves[right] = [left];
      }
      if (!availableCaves[right].includes(left)) {
        availableCaves[right].push(left);
      }
    }
  }
  return availableCaves;
};

const isCharUpperCase = (char: string): boolean => {
  return char === char.toUpperCase();
};

const exploreNextCave = ({
  availableCaves,
  currentCave,
  path,
  allowTwoSmallCaveVisit = false,
}: {
  availableCaves: AvailableCaves;
  currentCave: string;
  path: string[];
  allowTwoSmallCaveVisit?: boolean;
}): string[][] => {
  const nearbyCaves = availableCaves[currentCave];
  let canStillVisitTwoTimesACave =
    allowTwoSmallCaveVisit &&
    path.every(cave => {
      return path.filter(c => c === cave).length <= 1 || isCharUpperCase(cave);
    });
  // We reached a dead end
  if (nearbyCaves.length === 1 && !isCharUpperCase(nearbyCaves[0]) && !canStillVisitTwoTimesACave) {
    return [];
  }

  const subPathsWithCurrent: string[][] = [];

  nearbyCaves.forEach(nearbyCave => {
    if (nearbyCave === 'end') {
      subPathsWithCurrent.push([currentCave, nearbyCave]);
      return;
    }
    if (!isCharUpperCase(nearbyCave)) {
      const numberOfTimesCaveHasBeenVisited = path.filter(el => el === nearbyCave).length;
      if (numberOfTimesCaveHasBeenVisited === 1 && !canStillVisitTwoTimesACave) {
        return;
      }
      if (numberOfTimesCaveHasBeenVisited >= 2) {
        return;
      }
    }
    const subPaths = exploreNextCave({
      availableCaves,
      currentCave: nearbyCave,
      path: [...path, nearbyCave],
      allowTwoSmallCaveVisit: canStillVisitTwoTimesACave,
    });
    subPaths.forEach(subPath => {
      subPathsWithCurrent.push([currentCave, ...subPath]);
    });
  });
  return subPathsWithCurrent;
};

const firstQuestionSolver = () => {
  const availableCaves = buildAvailableCavesFromCave(list);
  const allPaths = exploreNextCave({
    availableCaves,
    currentCave: 'start',
    path: ['start'],
  });
  console.log('solution', allPaths.length);
};
// firstQuestionSolver();

const secondQuestionSolver = () => {
  const availableCaves = buildAvailableCavesFromCave(list);
  const allPaths = exploreNextCave({
    availableCaves,
    currentCave: 'start',
    path: ['start'],
    allowTwoSmallCaveVisit: true,
  });

  console.log('solution', allPaths.length);
};

secondQuestionSolver();
