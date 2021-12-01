import path from 'path';
import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day1.txt';
const list = inputParser(inputFileName).map(input => Number(input));

const firstQuestionSolver = () => {
  const totalLargerMeasurments = list.reduce((upToNowlargerMeasurments, curr, index) => {
    if (index === 0) {
      return 0;
    }
    if (curr > list[index - 1]) {
      return upToNowlargerMeasurments + 1;
    }

    return upToNowlargerMeasurments;
  }, 0);

  console.log('firstQuestionSolver', totalLargerMeasurments);
};

firstQuestionSolver();

const secondQuestionSolver = () => {
  const totalLargerMeasurments = list.reduce((upToNowlargerMeasurments, curr, index) => {
    if (index < 3) {
      return 0;
    }
    const currentSum = list.slice(index - 2, index + 1).reduce((acc, curr) => acc + curr);
    const previousSum = list.slice(index - 3, index).reduce((acc, curr) => acc + curr);

    if (currentSum > previousSum) {
      return upToNowlargerMeasurments + 1;
    }

    return upToNowlargerMeasurments;
  }, 0);

  console.log('secondQuestionSolver', totalLargerMeasurments);
};

secondQuestionSolver();
