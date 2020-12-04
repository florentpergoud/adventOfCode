import inputParser from '../utils/inputParser';

const inputFileName = 'Input4.txt';
// const inputFileName = 'Test4.txt';

const convertArrayToObject = (array: any[], key:string) => {
  const initialValue = {};
  return array.reduce((obj, item) => ({
    ...obj,
    [item[key]]: item,
  }), initialValue);
};

const buildPartialPassportFromBatchLine = (batchLine:string) => {
  const newKeyValues = batchLine.split(' ');
  const keyAndValueArray = newKeyValues.map((keyValue:string) => {
    const splited = keyValue.split(':');
    return {
      passPortFiledName: splited[0],
      value: splited[1],
    };
  });
  return convertArrayToObject(keyAndValueArray, 'passPortFiledName');
};

const extractPassportsFromBatch = (batch:string[]) => {
  const passports : any[] = [];
  let currentPassportIndex = 0;
  batch.forEach((line) => {
    if (line.length < 1) {
      currentPassportIndex += 1;
      return;
    }

    const formatedPassport = buildPartialPassportFromBatchLine(line);

    if (passports[currentPassportIndex]) {
      passports[currentPassportIndex] = { ...passports[currentPassportIndex], ...formatedPassport };
    } else {
      // @ts-ignore
      passports[currentPassportIndex] = formatedPassport;
    }
  });
  return passports;
};

const filterNotValidatedPassports = (passports: any[]) :any[] => passports.filter((passport) => {
  if (Object.keys(passport).length < 7) {
    return false;
  }
  // @ts-ignore
  const doesPassportsContainsCID = Object.keys(passport).includes('cid');
  if (Object.keys(passport).length === 7 && doesPassportsContainsCID) {
    return false;
  }

  return true;
});

const validPassportsInBatch = (batch:string[]) => {
  const passports = extractPassportsFromBatch(batch);
  return filterNotValidatedPassports(passports);
};

const firstQuestionSolver = () => {
  const batch = inputParser(inputFileName);
  const validPassports = validPassportsInBatch(batch);
  console.log(`We encoutered ${validPassports.length} valid passports`);
};

// const secondQuestionSolver = () => {

// };

firstQuestionSolver();

// secondQuestionSolver();
