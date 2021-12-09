import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day8.txt';
const list = inputParser(inputFileName);

const firstQuestionSolver = () => {
  const outputValueList = list.filter(Boolean).map(entry => {
    return entry.split('|')[1].split(' ').filter(Boolean);
  });
  let uniqueNumberOfSegmentsQuantity = 0;
  outputValueList.forEach(segmentsNumbers => {
    segmentsNumbers.filter(segments => {
      if ([2, 3, 4, 7].includes(segments.length)) {
        uniqueNumberOfSegmentsQuantity += 1;
      }
    });
  });
  console.log(
    'uniqueNumberOfSegmentsQuantity',
    JSON.stringify(uniqueNumberOfSegmentsQuantity, null, 2)
  );
};
firstQuestionSolver();

const getFormatedInputValues = (allValues: string, partNumber: number) => {
  return allValues
    .split('|')
    [partNumber].split(' ')
    .filter(Boolean)
    .map(values => values.split(''));
};

const getValueFromInput = (allValues: string) => {
  const decodingValues = getFormatedInputValues(allValues, 0);
  const outputValues = getFormatedInputValues(allValues, 1);
  const segmentsForNumberOne = decodingValues.find(segmentsGroup => {
    return segmentsGroup.length === 2;
  });

  const segmentsForNumberFour = decodingValues.find(segmentsGroup => {
    return segmentsGroup.length === 4;
  });

  const doesSegmentsIncludesNumberOneSegments = (segmentsGroup: string[]) => {
    return segmentsForNumberOne?.every(element => segmentsGroup.includes(element));
  };

  const doesSegmentsIncludesNumberFourSegments = (segmentsGroup: string[]) => {
    return segmentsForNumberFour?.every(element => segmentsGroup.includes(element));
  };

  const segmentsForNumberNine = decodingValues.find(segmentsGroup => {
    return segmentsGroup.length === 6 && doesSegmentsIncludesNumberFourSegments(segmentsGroup);
  });
  const segmentsForNumberZero = decodingValues.find(segmentsGroup => {
    return (
      segmentsGroup.length === 6 &&
      !doesSegmentsIncludesNumberFourSegments(segmentsGroup) &&
      doesSegmentsIncludesNumberOneSegments(segmentsGroup)
    );
  });

  const segmentsForNumberSix = decodingValues.find(segmentsGroup => {
    return (
      segmentsGroup.length === 6 &&
      !doesSegmentsIncludesNumberFourSegments(segmentsGroup) &&
      !doesSegmentsIncludesNumberOneSegments(segmentsGroup)
    );
  });

  const doesNumberSixSegmentsIncludesGroup = (segmentsGroup: string[]) => {
    return segmentsGroup?.every(element => segmentsForNumberSix?.includes(element));
  };

  const segmentsForNumberThree = decodingValues.find(segmentsGroup => {
    return segmentsGroup.length === 5 && doesSegmentsIncludesNumberOneSegments(segmentsGroup);
  });

  const segmentsForNumberTwo = decodingValues.find(segmentsGroup => {
    return (
      segmentsGroup.length === 5 &&
      !doesNumberSixSegmentsIncludesGroup(segmentsGroup) &&
      !doesSegmentsIncludesNumberOneSegments(segmentsGroup)
    );
  });
  const segmentsForNumberFive = decodingValues.find(segmentsGroup => {
    return (
      segmentsGroup.length === 5 &&
      doesNumberSixSegmentsIncludesGroup(segmentsGroup) &&
      !doesSegmentsIncludesNumberOneSegments(segmentsGroup)
    );
  });

  const digits: number[] = [];
  outputValues.forEach(segmentsGroup => {
    if (segmentsGroup.length === 2) {
      digits.push(1);
      return;
    }
    if (segmentsGroup.length === 3) {
      digits.push(7);
      return;
    }
    if (segmentsGroup.length === 4) {
      digits.push(4);
      return;
    }
    if (segmentsGroup.length === 7) {
      digits.push(8);
      return;
    }

    if (segmentsGroup.length === 5) {
      if (segmentsForNumberThree?.every(element => segmentsGroup?.includes(element))) {
        digits.push(3);
        return;
      }
      if (segmentsForNumberTwo?.every(element => segmentsGroup?.includes(element))) {
        digits.push(2);
        return;
      }
      if (segmentsForNumberFive?.every(element => segmentsGroup?.includes(element))) {
        digits.push(5);
        return;
      }
    }

    if (segmentsGroup.length === 6) {
      if (segmentsForNumberNine?.every(element => segmentsGroup?.includes(element))) {
        digits.push(9);
        return;
      }
      if (segmentsForNumberSix?.every(element => segmentsGroup?.includes(element))) {
        digits.push(6);
        return;
      }
      if (segmentsForNumberZero?.every(element => segmentsGroup?.includes(element))) {
        digits.push(0);
        return;
      }
    }
  });
  return parseInt(digits.join(''), 10);
};

const secondQuestionSolver = () => {
  const outputValueList = list.filter(Boolean);
  const digitsValues = outputValueList.map(value => getValueFromInput(value));
  console.log(
    'firstOutput',
    JSON.stringify(
      digitsValues.reduce((acc, curr) => acc + curr, 0),
      null,
      2
    )
  );
};

secondQuestionSolver();
