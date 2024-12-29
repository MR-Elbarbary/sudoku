import { useState } from 'react'
import './App.css'
import Board from './Board'
import Settings from './Settings';
import { generatePuzzle } from './module';

function App() {

  const [board, setBoard] = useState(generatePuzzle());

  return (
    <>
      <div>
      <Board board={board} setBoard ={setBoard} />
      <Settings board={board} setBoard={setBoard} />
      </div>
    </>
  )
}

export default App
