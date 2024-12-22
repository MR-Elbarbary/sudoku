// Board.js
import React from "react";
import "./Board.css";

const Board = ({ board, setBoard }) => {
    const handleChange = (squareIndex, rowIndex, cellIndex, value) => {
        const newBoard = [...board];
        newBoard[squareIndex][rowIndex][cellIndex] = parseInt(value) || 0;
        setBoard(newBoard);
      };

  return (
    <div className="sudoku-board">
      {board.map((square, squareIndex) => (
        <div key={squareIndex} className="square">
          {square.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => (
                <input
                  key={cellIndex}
                  className="cell"
                  type="text"
                  maxLength="1"
                  value={cell || ""}
                  onChange={(e) => handleChange(squareIndex, rowIndex, cellIndex, e.target.value)}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
