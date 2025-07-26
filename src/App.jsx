import { useState } from 'react';

const Square = ({ value, onSquareClick }) => {
  return (
    <button
      className="w-24 h-24 text-4xl font-bold flex items-center justify-center
                 border border-black focus:outline-none cursor-pointer"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (!squares.includes(null)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mt-8 text-center">{status}</h1>
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="grid grid-cols-3 gap-0 border-4 border-black">
          {squares.map((val, idx) => (
            <Square key={idx} value={val} onSquareClick={() => handleClick(idx)} />
          ))}
        </div>
        <button
          onClick={resetGame}
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 cursor-pointer hover:scale-110 transition ease-in-out"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
