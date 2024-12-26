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
  
  export const isValidInSquare = (board, square, row, col, value) => {  
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
      isValidInSquare(board, square, row, col, value)
    );
  };