import { useState } from 'react'
import './App.css'
import Board from './Board'

function App() {

  const [board, setBoard] = useState([
    [
      [5, 3, 0],
      [6, 0, 0],
      [0, 9, 8],
    ],
    [
      [0, 7, 0],
      [1, 9, 5],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 6, 0],
      [0, 0, 0],
    ],
    [
      [8, 0, 0],
      [4, 0, 0],
      [7, 0, 0],
    ],
    [
      [0, 6, 0],
      [8, 0, 3],
      [0, 2, 0],
    ],
    [
      [0, 0, 3],
      [0, 0, 1],
      [0, 0, 6],
    ],
    [
      [0, 0, 0],
      [0, 6, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [4, 1, 9],
      [0, 8, 0],
    ],
    [
      [2, 8, 0],
      [0, 0, 5],
      [0, 7, 9],
  ]]);

  return (
    <>
      <div>
      <Board board={board} setBoard ={setBoard} />
      </div>
    </>
  )
}

export default App
