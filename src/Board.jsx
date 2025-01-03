// Board.js
import React from "react";
import { isValidMoveBoard, solveSudokuBoard } from "./module";
import "./Board.css";

export default function Board({ board, setBoard }){
    const handleChange = (squareIndex, rowIndex, cellIndex, value) => {
      const newValue = parseInt(value) || 0;
      if (newValue === 0){
        const newBoard = [...board];
        newBoard[squareIndex][rowIndex][cellIndex] = 0;
        setBoard(newBoard);
        return;
      } else if (isValidMoveBoard(board, squareIndex, rowIndex, cellIndex, newValue)) {
        const newBoard = [...board];
        const nextBoard = JSON.parse(JSON.stringify(board));
        newBoard[squareIndex][rowIndex][cellIndex] = newValue;
        nextBoard[squareIndex][rowIndex][cellIndex] = newValue;
        if(solveSudokuBoard(newBoard)){
        setBoard(nextBoard);
        } else {
          alert("Invalid move");
        }
      } else {
        alert("Invalid move");
      }
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