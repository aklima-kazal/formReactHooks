import React, { useState } from "react";
import RootLayout from "./Layouts/RootLayout";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const winingConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];
  function getWinner(squares) {
    for (let combination of winingConditions) {
      const [a, b, c] = combination;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
  function handleSquereClick(index) {
    if (board[index] || getWinner(board)) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "0";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }
  function getGameStatus() {
    const winner = getWinner(board);
    if (winner) {
      return `Winner : ${winner}`;
    }
    if (board.every((square) => square !== null)) {
      return "Draw";
    }
    return "Next player : " + (isXTurn ? "X" : "0");
  }
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }
  return (
    <>
      <div className=" mx-auto flex items-center justify-center min-h-[100vh] w-[100vw] bg-linear-to-bl from-violet-300 to-red-200 ">
        <div>
          <h1 className="text-6xl text-cyan-800 font-bold text-center text-shadow-lg/30 ...">
            Tik Tac Toe
          </h1>
          <div
            className={`text-3xl text-center mt-4 text-shadow-lg/30 ... ${
              getWinner(board)
                ? "text-red-900 animate-bounce"
                : "text-violet-900 animate-pulse"
            }`}
          >
            {getGameStatus()}
          </div>
          <div className="grid grid-cols-3 gap-2 p-4 shadow-xl/30 ... bg-linear-to-bl from-gray-800 to-slate-500 overflow-hidden rounded-xl mt-6 mb-6 ">
            {board.map((squares, index) => (
              <button
                key={index}
                className={`hover:bg-slate-950 bg-slate-900 rounded-2xl text-5xl h-32 mx-auto flex items-center justify-center font-bold w-[100%] text-shadow-lg/30 ... shadow-xl/30 ... ${
                  squares === "X"
                    ? "text-pink-500 font-bold text-6xl"
                    : squares === "0"
                    ? "text-violet-500 text-6xl font-bold"
                    : ""
                }`}
                onClick={() => handleSquereClick(index)}
              >
                {squares}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 ">
            <button
              onClick={resetGame}
              className="text-shadow-lg/40 ... bg-violet-400 shadow-lg shadow-indigo-500/50  py-3 px-6 rounded-xl font-semibold text-2xl text-blue-300"
            >
              {getWinner(board) ? "Play Again" : "Reset Game"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
