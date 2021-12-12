import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day11.txt';
const list = inputParser(inputFileName).filter(Boolean);

const addOneToEveryMatrixValue = (matrix: number[][]): number[][] => {
  return matrix.map(line => line.map(value => value + 1));
};

const getFlashingOctopusIstThereIs = (
  matrixWithEnergyStep: number[][],
  canOtcopusFlash: boolean[][]
): { x: number; y: number } | null => {
  for (let y = 0; y < matrixWithEnergyStep.length; y++) {
    for (let x = 0; x < matrixWithEnergyStep[y].length; x++) {
      if (matrixWithEnergyStep[y][x] >= 10 && canOtcopusFlash[y][x]) {
        return { x, y };
      }
    }
  }

  return null;
};

const updateOctopusEnergyAfterFlash = (
  matrixWithOctopusEnergyStepped: number[][],
  octopusFlash: { x: number; y: number }
): number[][] => {
  const { x, y } = octopusFlash;
  const matrixWithOctopusEnergySteppedAfterFlash = matrixWithOctopusEnergyStepped.map(line =>
    line.map(value => value)
  );
  matrixWithOctopusEnergySteppedAfterFlash[y][x] -= 10;
  if (y - 1 >= 0) {
    matrixWithOctopusEnergySteppedAfterFlash[y - 1][x] += 1;
    if (x - 1 >= 0) {
      matrixWithOctopusEnergySteppedAfterFlash[y - 1][x - 1] += 1;
    }
    if (matrixWithOctopusEnergySteppedAfterFlash[y - 1][x + 1]) {
      matrixWithOctopusEnergySteppedAfterFlash[y - 1][x + 1] += 1;
    }
  }

  if (matrixWithOctopusEnergySteppedAfterFlash[y + 1]) {
    matrixWithOctopusEnergySteppedAfterFlash[y + 1][x] += 1;
    if (x - 1 >= 0) {
      matrixWithOctopusEnergySteppedAfterFlash[y + 1][x - 1] += 1;
    }
    if (matrixWithOctopusEnergySteppedAfterFlash[y + 1][x + 1]) {
      matrixWithOctopusEnergySteppedAfterFlash[y + 1][x + 1] += 1;
    }
  }
  if (x - 1 >= 0) {
    matrixWithOctopusEnergySteppedAfterFlash[y][x - 1] += 1;
  }
  if (matrixWithOctopusEnergySteppedAfterFlash[y][x + 1]) {
    matrixWithOctopusEnergySteppedAfterFlash[y][x + 1] += 1;
  }

  return matrixWithOctopusEnergySteppedAfterFlash;
};

const renderStep = (matrix: number[][]) => {
  let flashCountForStep = 0;
  let matrixWithOctopusEnergyStepped = addOneToEveryMatrixValue(matrix);

  const canOctopusFlash = matrixWithOctopusEnergyStepped.map(line => line.map(_ => true));

  let flashingOctopus = getFlashingOctopusIstThereIs(
    matrixWithOctopusEnergyStepped,
    canOctopusFlash
  );

  while (flashingOctopus) {
    flashCountForStep++;
    matrixWithOctopusEnergyStepped = updateOctopusEnergyAfterFlash(
      matrixWithOctopusEnergyStepped,
      flashingOctopus
    );
    canOctopusFlash[flashingOctopus.y][flashingOctopus.x] = false;
    flashingOctopus = getFlashingOctopusIstThereIs(matrixWithOctopusEnergyStepped, canOctopusFlash);
  }

  canOctopusFlash.forEach((line, y) => {
    line.forEach((value, x) => {
      if (!value) {
        matrixWithOctopusEnergyStepped[y][x] = 0;
      }
    });
  });

  return { flashCountForStep, octupusAfterStep: matrixWithOctopusEnergyStepped };
};

const drawMatrix = (matrix: number[][]) => {
  matrix.forEach(line => {
    console.log(line.map(value => value.toString().padStart(2, ' ')).join(''));
  });
};

const firstQuestionSolver = () => {
  const inputMatrix = list.map(line => line.split('').map(value => parseInt(value, 10)));

  let matrixWithOctopusEnergyStepped = inputMatrix.map(line => line.map(value => value));
  let flashCount = 0;

  for (let index = 0; index < 100; index++) {
    const { flashCountForStep, octupusAfterStep } = renderStep(matrixWithOctopusEnergyStepped);
    flashCount += flashCountForStep;
    matrixWithOctopusEnergyStepped = octupusAfterStep;
    console.log('matrixWithOctopusEnergyStepped');
    drawMatrix(matrixWithOctopusEnergyStepped);
    console.log('flashCount', JSON.stringify(flashCount, null, 2));
  }
};
// firstQuestionSolver();

const areAllOctopusFlashing = (matrixWithOctopusEnergyStepped: number[][]): boolean => {
  return (
    matrixWithOctopusEnergyStepped.reduce((acc, line) => {
      return acc + line.reduce((acc, value) => acc + value);
    }, 0) === 0
  );
};

const secondQuestionSolver = () => {
  const inputMatrix = list.map(line => line.split('').map(value => parseInt(value, 10)));

  let matrixWithOctopusEnergyStepped = inputMatrix.map(line => line.map(value => value));
  let flashCount = 0;

  for (let index = 0; index < 400; index++) {
    const { flashCountForStep, octupusAfterStep } = renderStep(matrixWithOctopusEnergyStepped);
    flashCount += flashCountForStep;
    matrixWithOctopusEnergyStepped = octupusAfterStep;
    if (areAllOctopusFlashing(octupusAfterStep)) {
      console.log('step with first all flashing', index + 1);
      break;
    }
  }
};
secondQuestionSolver();
