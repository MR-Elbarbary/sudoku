import { useState } from "react";
import { generatePuzzle, solveSudokuBoard } from "./module";

export default function Settings({ board, setBoard }){
  const [difficulty, setDifficulty] = useState(25);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  function solve() {
    const boardCopy = JSON.parse(JSON.stringify(board));
    solveSudokuBoard(boardCopy); 
    setBoard(boardCopy);
  }

  function generate() {
    setBoard(generatePuzzle(difficulty));
  }

  return (
    <div>
      <label htmlFor="difficulty">Difficulty:</label>
      <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
        <option value="25">Easy</option>
        <option value="35">Medium</option>
        <option value="45">Hard</option>
      </select>
      <button onClick={generate}>Generate</button>
      <button onClick={solve}>Solve</button>
    </div>
  );
}