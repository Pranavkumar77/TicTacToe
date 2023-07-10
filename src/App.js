import "./styles.css";
import { useState } from "react";

let lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const determineWinner = (board) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const Cell = ({ mark, disabled, onClick }) => {
  return (
    <div>
      <button className="cell" disabled={disabled} onClick={onClick}>
        {mark}
      </button>
    </div>
  );
};
export default function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const winner = determineWinner(board);
  const getStatus = () => {
    if (winner !== null) {
      return `Player ${winner} Won`;
    } else if (!board.includes(null)) {
      return `Its a draw`;
    } else {
      return `Player ${currentPlayer} Turns`;
    }
  };
  return (
    <div className="App">
      <h1>{getStatus()}</h1>
      <div className="board">
        {board
          .map((_, i) => i)
          .map((cellIndex) => {
            return (
              <Cell
                key={cellIndex}
                mark={board[cellIndex] || winner}
                disabled={board[cellIndex]}
                onClick={() => {
                  const newBoard = [...board];
                  newBoard[cellIndex] = currentPlayer;
                  setBoard(newBoard);
                  setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
                }}
              />
            );
          })}
      </div>
      <button
        className="reset"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setCurrentPlayer("X");
        }}
      >
        Reset
      </button>
    </div>
  );
}
