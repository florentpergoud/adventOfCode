import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day5.txt';
const list = inputParser(inputFileName);

const getFormatedInput = (list: string[]) => {
  return list
    .filter(row => row.length > 0)
    .map(row => {
      const [origin, destination] = row.split(' -> ');
      return [origin.split(',').map(Number), destination.split(',').map(Number)];
    });
};

const drawArea = (area: number[][]) => {
  console.log(area.map(row => row.map(value => (value === 0 ? '.' : value)).join(' ')).join('\n'));
};

const drawAreaMap = (
  maxXCoords: number,
  maxYCoords: number,
  horizontalOrVerticalLines: number[][][]
) => {
  const area = new Array(maxXCoords + 1).fill(0).map(() => new Array(maxYCoords + 1).fill(0));
  horizontalOrVerticalLines.forEach(input => {
    const [origin, destination] = input;
    const [x1, y1] = origin;
    const [x2, y2] = destination;

    const vectorAngle = Math.atan(Math.abs(y2 - y1) / Math.abs(x2 - x1)) * (180 / Math.PI);

    if (vectorAngle === 0) {
      for (let x = x1; x1 < x2 ? x <= x2 : x >= x2; x1 < x2 ? x++ : x--) {
        area[x][y1]++;
      }
    }
    if (vectorAngle === 90) {
      for (let y = y1; y1 < y2 ? y <= y2 : y >= y2; y1 < y2 ? y++ : y--) {
        area[x1][y]++;
      }
    }
    if (vectorAngle === 45) {
      for (
        let x = x1, y = y1;
        x1 < x2 ? x <= x2 : x >= x2;
        x1 < x2 ? x++ : x--, y1 < y2 ? y++ : y--
      ) {
        area[x][y]++;
      }
    }
  });

  return area;
};

const getMaxCoords = (lines: number[][][]) => {
  const maxXCoords = Math.max(...lines.map(input => [input[0][0], input[1][0]]).flat());
  const maxYCoords = Math.max(...lines.map(input => [input[0][1], input[1][1]]).flat());
  return [maxXCoords, maxYCoords];
};

const getDangerousAreaCount = (area: number[][]) => {
  return area.reduce((acc, row) => {
    return acc + row.filter(cell => cell > 1).length;
  }, 0);
};

const firstQuestionSolver = () => {
  const formatedInput = getFormatedInput(list);

  const horizontalOrVerticalLines = formatedInput.filter(input => {
    const [origin, destination] = input;
    return origin[0] === destination[0] || origin[1] === destination[1];
  });

  const [maxXCoords, maxYCoords] = getMaxCoords(horizontalOrVerticalLines);

  const area = drawAreaMap(maxXCoords, maxYCoords, horizontalOrVerticalLines);
  // drawArea(area);

  const answer = getDangerousAreaCount(area);

  console.log('answer', JSON.stringify(answer, null, 2));
};

firstQuestionSolver();

const secondQuestionSolver = () => {
  const formatedInput = getFormatedInput(list);

  const horizontalVerticalOrDiagonalLines = formatedInput.filter(input => {
    const [origin, destination] = input;

    const xDiff = Math.abs(origin[0] - destination[0]);
    const yDiff = Math.abs(origin[1] - destination[1]);

    const vectorAngle = Math.atan(yDiff / xDiff) * (180 / Math.PI);
    console.log('vectorAngle', JSON.stringify(vectorAngle, null, 2));
    return vectorAngle === 0 || vectorAngle === 45 || vectorAngle === 90;
  });

  console.log('horizontalVerticalOrDiagonalLines', horizontalVerticalOrDiagonalLines);

  const [maxXCoords, maxYCoords] = getMaxCoords(horizontalVerticalOrDiagonalLines);

  const area = drawAreaMap(maxXCoords, maxYCoords, horizontalVerticalOrDiagonalLines);
  drawArea(area);

  const answer = getDangerousAreaCount(area);

  console.log('answer', JSON.stringify(answer, null, 2));
};

secondQuestionSolver();
