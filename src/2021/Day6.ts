import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day6.txt';
const list = inputParser(inputFileName);

const input = list[0].split(',').map(Number);

const getUpdatedFishs = (fishValue: number): number[] => {
  let newFishsQuantity = 0;

  let newFishValue = fishValue - 1;
  if (newFishValue === -1) {
    newFishsQuantity++;
    newFishValue = 6;
  }

  return [newFishValue, ...new Array(newFishsQuantity).fill(8)];
};

const getFishesPopulationForGeneration = (
  initialFishesPopulation: number[],
  generationsToRender: number
): number => {
  if (generationsToRender === 0) {
    return initialFishesPopulation.length;
  }
  let fishsCount = 0;
  for (let index = 0; index < initialFishesPopulation.length; index++) {
    const subFamily = initialFishesPopulation[index];
    const updatedSubFamily = getUpdatedFishs(subFamily);
    fishsCount += getFishesPopulationForGeneration(updatedSubFamily, generationsToRender - 1);
  }
  return fishsCount;
};

const firstQuestionSolver = () => {
  const wholePopulation = getFishesPopulationForGeneration(input, 80);
  console.log('wholePopulation length', JSON.stringify(wholePopulation, null, 2));
};
firstQuestionSolver();

const secondQuestionSolver = () => {
  let fishesWithIndexAsAge = new Array(9).fill(0);
  input.forEach(fishAge => {
    fishesWithIndexAsAge[fishAge]++;
  });
  for (let dayCount = 0; dayCount < 256; dayCount++) {
    const parents = fishesWithIndexAsAge[0];
    for (let index = 0; index < 8; index++) {
      fishesWithIndexAsAge[index] = fishesWithIndexAsAge[index + 1] || 0;
    }
    fishesWithIndexAsAge[6] += parents;
    fishesWithIndexAsAge[8] = parents;
  }
  const totalFishes = fishesWithIndexAsAge.reduce((acc, curr) => acc + curr);
  console.log('fishesWithIndexAsAge', fishesWithIndexAsAge);
  console.log('totalFishes', totalFishes);
};

secondQuestionSolver();
