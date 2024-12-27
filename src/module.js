export const isValidInRow = (board, square, col, value) => {
    const squareMod = square % 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i*3+squareMod][j][col] === value) {
          return false;
        }
      }
    }
    return true;
  };
  
  export const isValidInColumn = (board, square, row, value) => {
    const startSquare = Math.floor((square / 3));
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i+startSquare*3][row][j] === value) {
          return false;
        }
      }
    }
    return true;
  };
  
  export const isValidInSquare = (board, square, value) => {  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[square][i][j] === value) {
          return false;
        }
      }
    }
    return true;
  };
  
  export const isValidMove = (board, square, row, col, value) => {
    return (
      isValidInRow(board, square, col, value) &&
      isValidInColumn(board, square, row, value) &&
      isValidInSquare(board, square, value)
    );
  };

  export function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (emptyCell === null) {
      return true;
    }
    const [square, row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, square, row, col, num)) {
        board[square][row][col] = num;
        if (solveSudoku(board)) {
          return true;
        }
        board[square][row][col] = 0;
      }
    }
    return false;
  }
  

function findEmptyCell(board) {
  for (let square = 0; square < 9; square++) {
      for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
              if (board[square][row][col] === 0) {
                  return [square, row, col];
              }
          }
      }
  }
  return null;
}