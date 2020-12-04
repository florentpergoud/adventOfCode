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

  return false;
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

// firstQuestionSolver();

// Exo 2

const isHeightValid = (heightAndUnit:string) => {
  if (heightAndUnit.includes('cm')) {
    const heightString = heightAndUnit.slice(0, heightAndUnit.length - 2);
    if (heightString.length < 2) {
      return false;
    }
    const height = parseInt(heightString, 10);
    if (height < 150 || height > 193) {
      return false;
    }
    return true;
  }
  if (heightAndUnit.includes('in')) {
    const heightString = heightAndUnit.slice(0, heightAndUnit.length - 2);
    if (heightString.length < 2) {
      return false;
    }
    const height = parseInt(heightString, 10);
    if (height < 59 || height > 76) {
      return false;
    }
    return true;
  }
  return false;
};

const filterNotValidatedWithMoreRulesPassports = (passports: any[]) :any[] => passports.filter((passport) => {
  if (Object.keys(passport).length < 7) {
    return false;
  }
  // @ts-ignore
  const doesPassportsContainsCID = Object.keys(passport).includes('cid');
  if (Object.keys(passport).length === 7 && doesPassportsContainsCID) {
    return false;
  }

  if (parseInt(passport.byr.value, 10) > 2002 || parseInt(passport.byr.value, 10) < 1920) {
    return false;
  }

  if (parseInt(passport.iyr.value, 10) > 2020 || parseInt(passport.iyr.value, 10) < 2010) {
    return false;
  }

  if (parseInt(passport.eyr.value, 10) > 2030 || parseInt(passport.eyr.value, 10) < 2020) {
    return false;
  }

  if (!isHeightValid(passport.hgt.value)) {
    return false;
  }

  if (!passport.hcl.value.match(/^#([0-9a-f]{6}|[0-9a-f]{3})$/)) {
    return false;
  }

  if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport.ecl.value)) {
    return false;
  }

  if (!passport.pid.value.match(/^[0-9]{9}$/)) {
    return false;
  }

  return true;
});

const extractValidPassportsFromBatch = (batch:string[]) => {
  const passports = extractPassportsFromBatch(batch);
  return filterNotValidatedWithMoreRulesPassports(passports);
};

const secondQuestionSolver = () => {
  const batch = inputParser(inputFileName);
  const validPassports = extractValidPassportsFromBatch(batch);
  console.log(`We encoutered ${validPassports.length} valid passports`);
};

secondQuestionSolver();
