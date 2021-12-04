import inputParser from '../2020/utils/inputParser';

const inputFileName = '../../inputs/2021/Day4.txt';
const list = inputParser(inputFileName);

const getFormatedInput = (list: string[]) => {
  const drawnNumbers = list[0].split(',').map(stringNumber => Number(stringNumber));

  const boards = [];

  for (let index = 1; index < list.length; index++) {
    if (list[index] === '') {
      boards.push([] as Array<Array<{ number: number; isDrawn: boolean }>>);
      continue;
    }

    const row = list[index]
      .split(/\s/)
      .filter(Boolean)
      .map(stringNumber => ({ number: Number(stringNumber), isDrawn: false }));
    boards[boards.length - 1].push(row);
  }
  return {
    boards: boards.filter(board => board.length > 0),
    drawnNumbers: drawnNumbers,
  };
};

const checkIfBoardHasCompletedRow = (board: Array<Array<{ number: number; isDrawn: boolean }>>) => {
  let isCompleted = false;
  board.forEach(row => {
    if (row.every(cell => cell.isDrawn)) {
      isCompleted = true;
    }
  });
  return isCompleted;
};

const checkIfBoardHasCompletedColumn = (
  board: Array<Array<{ number: number; isDrawn: boolean }>>
) => {
  for (let index = 0; index < board[0].length; index++) {
    const column = board.map(row => row[index]);
    if (column.every(cell => cell.isDrawn)) {
      return true;
    }
  }
  return false;
};

const displayBoards = (boards: Array<Array<Array<{ number: number; isDrawn: boolean }>>>) => {
  boards.forEach(board => {
    console.log('------');
    console.log(
      board
        .map(row =>
          row.map(cell => (cell.isDrawn ? `|${cell.number}|` : `·${cell.number}·`)).join(' ')
        )
        .join('\n')
    );
  });
};

const firstQuestionSolver = () => {
  const { boards, drawnNumbers } = getFormatedInput(list);

  let completedBoard = null;
  let index = 0;
  while (index < drawnNumbers.length - 1) {
    const drawnNumber = drawnNumbers[index];
    boards.forEach(board => {
      board.forEach(row => {
        row.forEach(cell => {
          if (cell.number === drawnNumber) {
            cell.isDrawn = true;
          }
        });
      });
    });

    completedBoard = boards.find(
      board => checkIfBoardHasCompletedRow(board) || checkIfBoardHasCompletedColumn(board)
    );
    if (completedBoard) {
      const sumOfAllNotDrawnNumbersInCompletedBoard = completedBoard.reduce((acc, row) => {
        const notDrawnNumbers = row.filter(cell => !cell.isDrawn).map(cell => cell.number);
        return acc + notDrawnNumbers.reduce((acc, number) => acc + number, 0);
      }, 0);

      displayBoards(
        boards.filter(
          board => checkIfBoardHasCompletedRow(board) || checkIfBoardHasCompletedColumn(board)
        )
      );
      console.log('drawnNumbers', drawnNumbers.slice(0, index + 1).join(' '));
      console.log('last drawn number', drawnNumber);
      console.log('score', sumOfAllNotDrawnNumbersInCompletedBoard * drawnNumbers[index]);

      break;
    }

    index++;
  }
};

// firstQuestionSolver();

const secondQuestionSolver = () => {
  const { boards, drawnNumbers } = getFormatedInput(list);
  let index = 0;
  let loosingBoards: {
    number: number;
    isDrawn: boolean;
  }[][][] = [];

  let stillPlayingBoards = boards;

  while (index < drawnNumbers.length - 1) {
    const drawnNumber = drawnNumbers[index];
    stillPlayingBoards.forEach(board => {
      board.forEach(row => {
        row.forEach(cell => {
          if (cell.number === drawnNumber) {
            cell.isDrawn = true;
          }
        });
      });
    });

    const boardsThatJustLost = stillPlayingBoards.filter(
      board => checkIfBoardHasCompletedRow(board) || checkIfBoardHasCompletedColumn(board)
    );

    loosingBoards = loosingBoards.concat(boardsThatJustLost);
    stillPlayingBoards = stillPlayingBoards.filter(board => !loosingBoards.includes(board));

    if (stillPlayingBoards.length === 0) {
      const lastLoosingBoard = loosingBoards[loosingBoards.length - 1];

      const sumOfAllNotDrawnNumbersInLastLoosingBoard = lastLoosingBoard.reduce((acc, row) => {
        const notDrawnNumbers = row.filter(cell => !cell.isDrawn).map(cell => cell.number);
        return acc + notDrawnNumbers.reduce((acc, number) => acc + number, 0);
      }, 0);

      console.log('last loosing board');
      displayBoards([lastLoosingBoard]);
      console.log('drawnNumbers', drawnNumbers.slice(0, index + 1).join(' '));
      console.log('last drawn number', drawnNumber);
      console.log('score', sumOfAllNotDrawnNumbersInLastLoosingBoard * drawnNumbers[index]);

      break;
    }

    index++;
  }
};

secondQuestionSolver();
