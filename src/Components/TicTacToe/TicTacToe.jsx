import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import check from '../Assets/check.png';
import circle from '../Assets/circle.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const handleClick = (index) => {
    if (lock || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const renderImage = (value) => {
    if (value === "x") {
      return <img src={check} alt="X" />;
    }
    if (value === "o") {
      return <img src={circle} alt="O" />;
    }
    return null;
    
  };

  const checkWin = (board) => {
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== "") {
      won(board[2]);
    } else if (board[3] === board[4] && board[4] === board[5] && board[5] !== "") {
      won(board[5]);
    } else if (board[6] === board[7] && board[7] === board[8] && board[8] !== "") {
      won(board[8]);
    } else if (board[0] === board[3] && board[3] === board[6] && board[6] !== "") {
      won(board[6]);
    } else if (board[1] === board[4] && board[4] === board[7] && board[7] !== "") {
      won(board[7]);
    } else if (board[2] === board[5] && board[5] === board[8] && board[8] !== "") {
      won(board[8]);
    } else if (board[0] === board[4] && board[4] === board[8] && board[8] !== "") {
      won(board[8]);
    } else if (board[2] === board[4] && board[4] === board[6] && board[6] !== "") {
      won(board[6]);
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congrats : <img src=${check} alt="X" /> Wins`;
    } else {
      titleRef.current.innerHTML = `Congrats : <img src=${circle} alt="O" /> Wins`;
    }
  };


  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game - <span>React App</span></h1>
      <div className="board">
        {[0, 1, 2].map(row => (
          <div key={row} className={`row${row + 1}`}>
            {[0, 1, 2].map(col => (
              <div
                key={col}
                className="boxes"
                onClick={() => handleClick(row * 3 + col)}
              >
                {renderImage(board[row * 3 + col])}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={() => { setBoard(["", "", "", "", "", "", "", "", ""]); setCount(0); setLock(false); titleRef.current.innerHTML
         = 'Tic Tac Toe Game - <span>React App</span>'; }}>Reset</button>
    </div>
  );
};

export default TicTacToe;
