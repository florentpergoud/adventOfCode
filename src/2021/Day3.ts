import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day3.txt';
const list = inputParser(inputFileName);

const mostCommonBitFinderAtIndex = (list: string[], index: number) => {
  let zeroBitCount = list.filter(item => item.charAt(index) === '0').length;
  return zeroBitCount > list.length / 2 ? '1' : '0';
};

const binaryToDecimal = (binary: string) => parseInt(binary, 2);

const firstQuestionSolver = () => {
  let binaryGammaRate = '';

  for (let index = 0; index < list[0].length; index++) {
    binaryGammaRate += mostCommonBitFinderAtIndex(list, index);
  }

  const binaryEpsilonRate = binaryGammaRate
    .split('')
    .map(binaryNumberString => (binaryNumberString === '1' ? '0' : '1'))
    .join('');

  const decimalGammaRate = binaryToDecimal(binaryGammaRate);
  const decimalEpsilonRate = binaryToDecimal(binaryEpsilonRate);

  console.log('firstQuestionSolver', decimalGammaRate * decimalEpsilonRate);
};

// firstQuestionSolver();

const findMostOrLeastCommonValueInList = (
  list: string[],
  searchForMostCommon: boolean,
  discriminatingBitIndex: number
): string[] => {
  const mostCommonValue = mostCommonBitFinderAtIndex(list, discriminatingBitIndex);
  const filteringValue = searchForMostCommon
    ? mostCommonValue
    : mostCommonValue === '1'
    ? '0'
    : '1';
  const filteredList = list.filter(item => item.charAt(discriminatingBitIndex) === filteringValue);
  if (filteredList.length === 1) return filteredList;
  return findMostOrLeastCommonValueInList(
    filteredList,
    searchForMostCommon,
    discriminatingBitIndex + 1
  );
};

const secondQuestionSolver = () => {
  const oxygenGeneratorRating = binaryToDecimal(
    findMostOrLeastCommonValueInList(list, false, 0)[0]
  );
  const co2ScrubberRating = binaryToDecimal(findMostOrLeastCommonValueInList(list, true, 0)[0]);
  console.log('secondQuestionSolver', oxygenGeneratorRating * co2ScrubberRating);
};

secondQuestionSolver();
