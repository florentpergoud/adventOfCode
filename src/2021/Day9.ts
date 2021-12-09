import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day9.txt';
const list = inputParser(inputFileName)
  .filter(Boolean)
  .map(row => row.split('').map(Number));

const getSurroundingPoints = (rowIndex: number, colIndex: number): number[] => {
  const surroundingPoints = [];
  if (rowIndex - 1 >= 0) {
    surroundingPoints.push(list[rowIndex - 1][colIndex]);
  }
  if (rowIndex + 1 < list.length) {
    surroundingPoints.push(list[rowIndex + 1][colIndex]);
  }
  if (colIndex - 1 >= 0) {
    surroundingPoints.push(list[rowIndex][colIndex - 1]);
  }
  if (colIndex + 1 < list[0].length) {
    surroundingPoints.push(list[rowIndex][colIndex + 1]);
  }
  return surroundingPoints;
};

const isPointALowPoint = (point: number, rowIndex: number, colIndex: number): boolean => {
  const surroundingPoints = getSurroundingPoints(rowIndex, colIndex);
  return surroundingPoints.every(surroundingPoint => surroundingPoint > point);
};

const firstQuestionSolver = () => {
  const lowPointDepths: number[] = [];
  list.forEach((row, rowIndex) => {
    row.forEach((point, colIndex) => {
      if (isPointALowPoint(point, rowIndex, colIndex)) {
        lowPointDepths.push(point);
      }
    });
  });
  const riskScore = lowPointDepths.reduce((acc, depth) => acc + depth + 1, 0);
  console.log('riskScore', JSON.stringify(riskScore, null, 2));
};
// firstQuestionSolver();

const getSurroundingHigherPointsCount = ({
  rowIndex,
  colIndex,
}: {
  rowIndex: number;
  colIndex: number;
}): Array<{ rowIndex: number; colIndex: number }> => {
  const pointDepth = list[rowIndex][colIndex];
  const surroundingHigherPoints: Array<{ rowIndex: number; colIndex: number }> = [];

  if (
    rowIndex - 1 >= 0 &&
    pointDepth < list[rowIndex - 1][colIndex] &&
    list[rowIndex - 1][colIndex] !== 9
  ) {
    surroundingHigherPoints.push({ rowIndex: rowIndex - 1, colIndex });
  }
  if (
    rowIndex + 1 < list.length &&
    pointDepth < list[rowIndex + 1][colIndex] &&
    list[rowIndex + 1][colIndex] !== 9
  ) {
    surroundingHigherPoints.push({ rowIndex: rowIndex + 1, colIndex });
  }
  if (
    colIndex - 1 >= 0 &&
    pointDepth < list[rowIndex][colIndex - 1] &&
    list[rowIndex][colIndex - 1] !== 9
  ) {
    surroundingHigherPoints.push({ rowIndex, colIndex: colIndex - 1 });
  }
  if (
    colIndex + 1 < list[0].length &&
    pointDepth < list[rowIndex][colIndex + 1] &&
    list[rowIndex][colIndex + 1] !== 9
  ) {
    surroundingHigherPoints.push({ rowIndex, colIndex: colIndex + 1 });
  }

  if (surroundingHigherPoints.length === 0)
    return [
      {
        rowIndex,
        colIndex,
      },
    ];

  return surroundingHigherPoints
    .map(({ rowIndex, colIndex }) => {
      return getSurroundingHigherPointsCount({ rowIndex, colIndex });
    })
    .reduce(
      (acc, curr) => acc.concat(curr),
      [
        {
          rowIndex,
          colIndex,
        },
      ]
    );
};

const getBassinSize = (bassin: Array<{ rowIndex: number; colIndex: number }>): number => {
  const bassinWithoutDuplicates = bassin.filter(
    (point, index, self) =>
      self.findIndex(
        ({ rowIndex, colIndex }) => rowIndex === point.rowIndex && colIndex === point.colIndex
      ) === index
  );
  return bassinWithoutDuplicates.length;
};

const secondQuestionSolver = () => {
  const lowPointCoords: Array<{ rowIndex: number; colIndex: number }> = [];
  list.forEach((row, rowIndex) => {
    row.forEach((point, colIndex) => {
      if (isPointALowPoint(point, rowIndex, colIndex)) {
        lowPointCoords.push({ rowIndex, colIndex });
      }
    });
  });

  const bassins = lowPointCoords.map(({ rowIndex, colIndex }) => {
    const bassin = getSurroundingHigherPointsCount({ rowIndex, colIndex });
    return getBassinSize(bassin);
  });

  const threeBiggestBassins = bassins.sort((a, b) => b - a).slice(0, 3);
  console.log('threeBiggestBassins', JSON.stringify(threeBiggestBassins, null, 2));
  console.log(
    'answer',
    JSON.stringify(
      threeBiggestBassins.reduce((acc, curr) => acc * curr, 1),
      null,
      2
    )
  );
};
secondQuestionSolver();
