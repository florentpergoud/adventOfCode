import inputParser from '../utils/inputParser';

const inputFileName = 'Input5.txt';

const convertRowSeat = (rawRowNumber: string) => {
  const splitedRawRowNumber = rawRowNumber.split('');

  const refinedRowNumbers = splitedRawRowNumber.reduce((previousState, rawSeatNumber) => {
    const midRangeSeatNumber = Math.round((previousState.max - previousState.min) / 2);
    if (rawSeatNumber === 'F') {
      return { min: previousState.min, max: previousState.max - midRangeSeatNumber };
    }
    return { min: previousState.min + midRangeSeatNumber, max: previousState.max };
  }, { min: 0, max: 127 });

  return refinedRowNumbers.min;
};

const convertColumnSeat = (rawColumnNumber: string) => {
  const splitedRawColumnNumber = rawColumnNumber.split('');
  const refinedRowNumbers = splitedRawColumnNumber.reduce(
    (previousState, currentRawColumnNumber) => {
      const midRangeSeatNumber = Math.round((previousState.max - previousState.min) / 2);
      if (currentRawColumnNumber === 'L') {
        return { min: previousState.min, max: previousState.max - midRangeSeatNumber };
      }
      return { min: previousState.min + midRangeSeatNumber, max: previousState.max };
    }, { min: 0, max: 7 },
  );

  return refinedRowNumbers.min;
};

const convertSeat = (rawSeat: string) => ({
  seatRow: convertRowSeat(rawSeat.substr(0, 7)),
  seatColumn: convertColumnSeat(rawSeat.substr(7, 3)),
});

const getSortedSeatIds = (batch: string[]) => {
  const convertedSeatList = batch.filter((raw) => !!raw).map((rawSeat) => convertSeat(rawSeat));
  const seatIds = convertedSeatList.map((seat) => (
    seat.seatRow * 8 + seat.seatColumn));

  return seatIds.sort((a, b) => b - a);
};

const firstQuestionSolver = () => {
  const batch = inputParser(inputFileName);
  const sortedSeatIds = getSortedSeatIds(batch);
  console.log('highestSeatIds', JSON.stringify(sortedSeatIds[0], null, 2));
};

// firstQuestionSolver();

// Exo 2

const getMissingSeatId = (seatIds : number[]) => {
  let missingSeatId = -1;
  for (let index = 1; index < seatIds.length - 1; index += 1) {
    const currentElement = seatIds[index];
    if ((currentElement + 1) !== seatIds[index - 1]) {
      missingSeatId = currentElement + 1;
      break;
    }
    if ((currentElement - 1) !== seatIds[index + 1]) {
      missingSeatId = currentElement - 1;
      break;
    }
  }
  return missingSeatId;
};

const secondQuestionSolver = () => {
  const batch = inputParser(inputFileName);
  const sortedSeatIds = getSortedSeatIds(batch);
  const missingSeatId = getMissingSeatId(sortedSeatIds);
  console.log('missingSeatId', JSON.stringify(missingSeatId, null, 2));
};

secondQuestionSolver();
