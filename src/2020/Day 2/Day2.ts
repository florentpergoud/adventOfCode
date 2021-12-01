import inputParser from '../utils/inputParser';

const inputFileName = 'Input2-1.txt';

const firstQuestionSolver = () => {
  const isPasswordValid = (minCount: number, maxCount: number, symbolToCount: string, password: string): boolean => {
    const symbolOccurence = password.split(symbolToCount).length - 1;
    return symbolOccurence >= minCount && symbolOccurence <= maxCount;
  };

  const passwordList = inputParser(inputFileName);
  const validPasswords = passwordList.filter(
    (passwordAndRule:string) => {
      if (!passwordAndRule) { return false; }
      const splitedPassword = passwordAndRule.split(' ');

      const minMaxCount = splitedPassword[0].split('-');
      const minCount = parseInt(minMaxCount[0], 10);
      const maxCount = parseInt(minMaxCount[1], 10);

      const symbolToCount = splitedPassword[1].charAt(0);

      const password = splitedPassword[2];

      return isPasswordValid(minCount, maxCount, symbolToCount, password);
    },
  );
  console.log(validPasswords.length);
};

const secondQuestionSolver = () => {
  const isPasswordValid = (firstPosition: number, secondPosition: number, symbolToCheck: string, password: string): boolean => {
    const isLetterInFirstSlot = password.charAt(firstPosition - 1) === symbolToCheck;
    const isLetterInSecondSlot = password.charAt(secondPosition - 1) === symbolToCheck;
    if (isLetterInFirstSlot) {
      return !isLetterInSecondSlot;
    }
    return isLetterInSecondSlot;
  };

  const passwordList = inputParser(inputFileName);
  const validPasswords = passwordList.filter(
    (passwordAndRule:string) => {
      if (!passwordAndRule) { return false; }
      const splitedPassword = passwordAndRule.split(' ');

      const positions = splitedPassword[0].split('-');
      const firstPosition = parseInt(positions[0], 10);
      const secondPosition = parseInt(positions[1], 10);

      const symbolToCheck = splitedPassword[1].charAt(0);

      const password = splitedPassword[2];

      return isPasswordValid(firstPosition, secondPosition, symbolToCheck, password);
    },
  );
  console.log(validPasswords.length);
};

// firstQuestionSolver();
secondQuestionSolver();
