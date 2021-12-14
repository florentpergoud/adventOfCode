import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day14.txt';
const list = inputParser(inputFileName).filter(Boolean);
const template = list[0].trim();
const pairInsertions = list.slice(1).map(line => {
  const [insertionSlot, newElement] = line.split(' -> ');
  return { insertionSlot, newElement };
});

const updatePolymer = (pair: string, depthToRender: number): string => {
  if (depthToRender === 0) {
    return pair;
  }

  const insertion = pairInsertions.find(el => el.insertionSlot === pair);
  const firstHalfChilds = updatePolymer(pair[0] + insertion?.newElement, depthToRender - 1);
  const secondHalfChilds = updatePolymer(insertion?.newElement + pair[1], depthToRender - 1);

  return firstHalfChilds.slice(0, firstHalfChilds.length - 1) + secondHalfChilds;
};

const countElements = (polymer: string) => {
  const elementsCounts = new Array(26).fill(0);
  for (let index = 0; index < polymer.length; index++) {
    elementsCounts[polymer.charCodeAt(index) - 66]++;
  }
  return elementsCounts;
};

const questionsSolver = (depthToRender: number): number => {
  let updatedPolymer = template.charAt(0);

  for (let index = 1; index < template.length; index++) {
    const pair = template.slice(index - 1, index + 1);
    console.log('mother pair', JSON.stringify(pair, null, 2));
    const pairWithChilds: string = updatePolymer(pair, depthToRender);
    updatedPolymer += pairWithChilds.slice(1, pairWithChilds.length);
  }

  console.log('updatedPolymer', JSON.stringify(updatedPolymer, null, 2));

  const elementsCounts = countElements(updatedPolymer);

  const presentElements = elementsCounts.filter(el => el > 0);
  return Math.max(...presentElements) - Math.min(...presentElements);
};
const firstQuestionSolver = () => {
  const answer = questionsSolver(10);
  console.log('answer', JSON.stringify(answer, null, 2));
};
// firstQuestionSolver();

const secondQuestionSolver = () => {
  const answer = questionsSolver(20);
  console.log('answer', JSON.stringify(answer, null, 2));
};
secondQuestionSolver();
