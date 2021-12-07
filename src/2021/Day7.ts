import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day7.txt';
const list = inputParser(inputFileName);

const input = list[0].split(',').map(Number);

const firstQuestionSolver = () => {
  const maxPosition = Math.max(...input);
  const minPosition = Math.min(...input);

  const fuelCosts: number[] = [];
  for (let i = minPosition; i <= maxPosition; i++) {
    const costsToMoveToCrabPosition = input
      .map(theoricalPosition => Math.abs(theoricalPosition - i))
      .reduce((acc, curr) => acc + curr, 0);

    fuelCosts.push(costsToMoveToCrabPosition);
  }

  console.log('solution ', Math.min(...fuelCosts));
};
firstQuestionSolver();

const secondQuestionSolver = () => {
  const maxPosition = Math.max(...input);
  const minPosition = Math.min(...input);

  const fuelCosts: number[] = [];
  for (let i = minPosition; i <= maxPosition; i++) {
    const costsToMoveToCrabPosition = input
      .map(theoricalPosition => {
        const n = Math.abs(theoricalPosition - i);
        return (n * (n + 1)) / 2;
      })
      .reduce((acc, curr) => acc + curr, 0);

    fuelCosts.push(costsToMoveToCrabPosition);
  }

  console.log('solution ', Math.min(...fuelCosts));
};

secondQuestionSolver();
