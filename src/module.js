const isValidMove = (board, row, col, value) => {
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  return (
      !board[row].includes(value) &&
      !board.some(r => r[col] === value) &&
      ![...Array(3).keys()].some(i =>
          [...Array(3).keys()].some(j => board[startRow + i][startCol + j] === value)
      )
  );
};

const solveSudoku = (board) => {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) return true;

  const [row, col] = emptyCell;
  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;
      if (solveSudoku(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
};

const findEmptyCell = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) return [row, col];
    }
  }
  return null;
};

const shuffle = (board, isRowShuffle = true) => {
  for (let i = 0; i < 9; i += 3) {
    const indices = [i, i + 1, i + 2].sort(() => Math.random() - 0.5);
    if (isRowShuffle) {
      [board[indices[0]], board[indices[1]], board[indices[2]]] =
          [board[i], board[i + 1], board[i + 2]];
    } else {
      for (let row = 0; row < 9; row++) {
        [board[row][indices[0]], board[row][indices[1]], board[row][indices[2]]] =
            [board[row][i], board[row][i + 1], board[row][i + 2]];
      }
    }
  }
};

const generateSolvedBoard = () => {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  solveSudoku(board);
  shuffle(board, true);
  shuffle(board, false);
  return board;
};

export const generatePuzzle = (difficulty = 35) => {
  const solvedBoard = generateSolvedBoard();
  const puzzleBoard = JSON.parse(JSON.stringify(solvedBoard));
  let removalCount = difficulty;

  const cells = Array.from({ length: 81 }, (_, idx) => [Math.floor(idx / 9), idx % 9]);
  cells.sort(() => Math.random() - 0.5);

  while (removalCount > 0 && cells.length) {
    const [row, col] = cells.pop();
    const temp = puzzleBoard[row][col];
    puzzleBoard[row][col] = 0;
    if (!hasUniqueSolution(puzzleBoard)) puzzleBoard[row][col] = temp; // Restore if no unique solution
    else removalCount--;
  }
  let newboard = convertTo3x3Array(puzzleBoard);
  return newboard;
};


const hasUniqueSolution = (board) => {
  let solutionCount = 0;

  const solveAndCount = (unsolvedBoard) => {
    const emptyCell = findEmptyCell(unsolvedBoard);
    if (!emptyCell) {
      solutionCount++;
      return solutionCount > 1;
    }

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(unsolvedBoard, row, col, num)) {
        unsolvedBoard[row][col] = num;
        if (solveAndCount(unsolvedBoard)) return true;
        unsolvedBoard[row][col] = 0;
      }
    }
    return false;
  };

  solveAndCount(JSON.parse(JSON.stringify(board)));
  return solutionCount === 1;
};

function convertTo3x3Array(array) {
  let result = [];
  for (let i = 0; i < 9; i++) {
    let rowStart = Math.floor(i / 3) * 3;
    let colStart = (i % 3) * 3;
    let subgrid = [];
    for (let r = rowStart; r < rowStart + 3; r++) {
      subgrid.push(array[r].slice(colStart, colStart + 3));
    }
    result.push(subgrid);
  }
  return result;
}

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

export const isValidMoveBoard = (board, square, row, col, value) => {
  return (
    isValidInRow(board, square, col, value) &&
    isValidInColumn(board, square, row, value) &&
    isValidInSquare(board, square, value)
  );
};

export function solveSudokuBoard(board) {
  const root = { children: [] }; // Root of the decision tree
  const success = solveHelper(board, root);
  if (success) {
    console.log(JSON.stringify(root, null, 2)); // Print the tree in a readable format
  }
  return success;
}

function solveHelper(board, node) {
  const emptyCell = findEmptyCellBoard(board);
  if (emptyCell === null) {
    node.state = JSON.parse(JSON.stringify(board)); // Leaf node: store solved board state
    return true;
  }

  const [square, row, col] = emptyCell;
  node.square = square;
  node.row = row;
  node.col = col;
  node.children = []; // Children represent different decisions

  for (let num = 1; num <= 9; num++) {
    if (isValidMoveBoard(board, square, row, col, num)) {
      board[square][row][col] = num;

      // Create a child node for this decision
      const childNode = { num, square, row, col, children: [] };
      node.children.push(childNode);

      if (solveHelper(board, childNode)) {
        return true; // Solution found, propagate success
      }

      board[square][row][col] = 0; // Backtrack
    }
  }

  return false; // No valid number found for this cell
}

function findEmptyCellBoard(board) {
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

function arcReduce(x, y, D, R2) {
  let change = false;

  // Iterate over each value in D(x)
  for (let i = D[x].length - 1; i >= 0; i--) {
      const vx = D[x][i];
      const isConsistent = D[y].some(vy => R2(x, y, vx, vy)); // Check for consistency

      if (!isConsistent) {
          D[x].splice(i, 1); // Remove vx from D(x)
          change = true;
      }
  }

  return change;
}

function initializeDomains(board) {
  const domains = {};
  for (let square = 0; square < 3; square++) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const key = `${square}-${row}-${col}`;
        domains[key] = board[square][row][col] === 0
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9]
          : [board[square][row][col]];
      }
    }
  }
  return domains;
}

function getAllCells() {
  const cells = [];
  for (let square = 0; square < 3; square++) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        cells.push(`${square}-${row}-${col}`);
      }
    }
  }
  return cells;
}

function isValidUnaryConstraint(board, cell, value) {
  const [square, row, col] = cell.split("-").map(Number);
  return isValidMoveBoard(board, square, row, col, value);
}

// Check binary constraints (e.g., Sudoku rules)
function isValidBinaryConstraint(cell1, cell2, value1, value2) {
  const [square1, row1, col1] = cell1.split("-").map(Number);
  const [square2, row2, col2] = cell2.split("-").map(Number);

  // Same row
  if (row1 === row2 && square1 === square2) return value1 !== value2;
  // Same column
  if (col1 === col2 && square1 === square2) return value1 !== value2;
  // Same 3x3 box
  if (square1 === square2) return value1 !== value2;

  return true; // No conflict
}

function ac3(X, D, R1, R2) {
  // Initial domains are made consistent with unary constraints.
  for (const x of X) {
    D[x] = D[x].filter(vx => R1(x, vx)); // Filter domain D(x) based on R1 constraints
  }

  // Worklist contains all arcs we wish to prove consistent or not.
  let worklist = [];
  for (const x of X) {
    for (const y of X) {
      if (x !== y && (R2(x, y) || R2(y, x))) {
        worklist.push([x, y]);
      }
    }
  }

  // Process the worklist
  while (worklist.length > 0) {
    const [x, y] = worklist.pop();

    if (arcReduce(x, y, D, R2)) {
      if (D[x].length === 0) {
        return false; // Failure: Domain for x is empty
      }

      // Add related arcs back to the worklist
      for (const z of X) {
        if (z !== y && (R2(x, z) || R2(z, x))) {
          worklist.push([z, x]);
        }
      }
    }
  }

  return true; // Success: Domains are arc-consistent
}

function arcReduce(x, y, D, R2) {
  let change = false;

  for (let i = D[x].length - 1; i >= 0; i--) {
    const vx = D[x][i];
    const isConsistent = D[y].some(vy => R2(x, y, vx, vy)); // Check for consistency

    if (!isConsistent) {
      D[x].splice(i, 1); // Remove vx from D(x)
      change = true;
    }
  }

  return change;
}