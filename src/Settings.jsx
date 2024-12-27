import { useState } from "react";
import { solveSudoku } from "./module";

export default function Settings({ board, setBoard }){
  const [difficulty, setDifficulty] = useState("easy");

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    //setBoard(generateBoard(e.target.value));
  };

  function solve() {
    const boardCopy = JSON.parse(JSON.stringify(board));
    solveSudoku(boardCopy); 
    setBoard(boardCopy);
  }

  return (
    <div>
      <label htmlFor="difficulty">Difficulty:</label>
      <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button>Generate</button>
      <button onClick={solve}>Solve</button>
    </div>
  );
}