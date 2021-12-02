import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day2.txt';
const list = inputParser(inputFileName);

const firstQuestionSolver = () => {
  let depthPosition = 0;
  let forwardPosition = 0;

  list.forEach(instruction => {
    const [direction, distance] = instruction.split(' ');
    if (direction === 'down') {
      depthPosition += Number(distance);
    } else if (direction === 'up') {
      depthPosition -= Number(distance);
    } else if (direction === 'forward') {
      forwardPosition += Number(distance);
    }
  });

  const finalPosition = forwardPosition * depthPosition;

  console.log('firstQuestionSolver', finalPosition);
};

firstQuestionSolver();

const secondQuestionSolver = () => {
  let depthPosition = 0;
  let forwardPosition = 0;
  let aim = 0;

  list.forEach(instruction => {
    const [direction, distance] = instruction.split(' ');
    if (direction === 'down') {
      aim += Number(distance);
    } else if (direction === 'up') {
      aim -= Number(distance);
    } else if (direction === 'forward') {
      const parsedDistance = Number(distance);
      forwardPosition += parsedDistance;
      depthPosition += aim * parsedDistance;
    }
  });

  const finalPosition = forwardPosition * depthPosition;

  console.log('secondQuestionSolver', finalPosition);
};

secondQuestionSolver();
