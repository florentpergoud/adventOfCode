import inputParser from '../utils/inputParser';

const inputFileName = 'Input6.txt';

const getRawDeclarationForms = (batch : string[]) => batch.reduce((rawPassports, currentLine, index) => {
  const rawPassportsToModify = [...rawPassports];
  if (index === 0) {
    rawPassportsToModify[0] = currentLine;
    return rawPassportsToModify;
  }

  if (currentLine.length < 1) {
    rawPassportsToModify.push('');
  } else {
    rawPassportsToModify[rawPassportsToModify.length - 1] = `${rawPassportsToModify[rawPassportsToModify.length - 1]}${currentLine}`;
  }
  return rawPassportsToModify;
}, ['']);

const removeDuplicatesFromDeclarationForms = (rawDeclarationForms : string[]) => rawDeclarationForms
  .map(
    (rawDeclarationForm) => rawDeclarationForm
      .split('')
      .filter((currentLetter, index, allLetters) => allLetters.indexOf(currentLetter) === index)
      .join(''),
  );

const convertToSumOfSameAnswers = (declarationForms : string[]) => declarationForms.reduce(
  (sumOfSameAnswers, currentValue) => sumOfSameAnswers + currentValue.length, 0,
);

// const firstQuestionSolver = () => {
//   const batch = inputParser(inputFileName);
//   const rawDeclarationForms = getRawDeclarationForms(batch);
//   const declarationForms = removeDuplicatesFromDeclarationForms(rawDeclarationForms);
//   const sumOfSameAnswers = convertToSumOfSameAnswers(declarationForms);
//   console.log('sumOfSameAnswers', JSON.stringify(sumOfSameAnswers, null, 2));
// };

// firstQuestionSolver();

// Exo 2

const getSplitedRawDeclarationForms = (batch : string[]) => batch.reduce((rawPassports, currentLine, index) => {
  const rawPassportsToModify = [...rawPassports];
  if (index === 0) {
    rawPassportsToModify[0] = {
      nubmerOfEntries: 1,
      entries: currentLine,
    };
    return rawPassportsToModify;
  }

  if (currentLine.length < 1) {
    rawPassportsToModify.push({
      nubmerOfEntries: 0,
      entries: '',
    });
  } else {
    rawPassportsToModify[rawPassportsToModify.length - 1] = {
      nubmerOfEntries: rawPassportsToModify[rawPassportsToModify.length - 1].nubmerOfEntries + 1,
      entries: `${rawPassportsToModify[rawPassportsToModify.length - 1].entries}${currentLine}`,
    };
  }
  return rawPassportsToModify;
}, [{
  nubmerOfEntries: 0,
  entries: '',
}]);

const getCommonAnswers = (rawDeclarationForms : {
  nubmerOfEntries: number;
  entries: string;
}[]) => rawDeclarationForms
  .map(
    (rawDeclarationForm) => {
      if (rawDeclarationForm.nubmerOfEntries === 1) {
        return rawDeclarationForm.entries;
      }
      let commonLetters = '';
      const uniqueLetters = rawDeclarationForm.entries.split('')
        .filter((currentLetter, index, allLetters) => allLetters.indexOf(currentLetter) === index);

      uniqueLetters.forEach((letter) => {
        if (rawDeclarationForm.entries.split('').filter((currentLetter) => currentLetter === letter).length === rawDeclarationForm.nubmerOfEntries) {
          commonLetters += letter;
        }
      });
      return commonLetters;
    },
  );

const secondQuestionSolver = () => {
  const batch = inputParser(inputFileName);
  const rawDeclarationForms = getSplitedRawDeclarationForms(batch);
  const declarationForms = getCommonAnswers(rawDeclarationForms);
  const sumOfSameAnswers = convertToSumOfSameAnswers(declarationForms);
  console.log('sumOfSameAnswers', JSON.stringify(sumOfSameAnswers, null, 2));
};

secondQuestionSolver();
