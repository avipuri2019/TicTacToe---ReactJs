import React, { useState } from 'react'
import './TicTacToe.css'
import circle_icon from '../../assets/icon-x.png'
import cross_icon from '../../assets/icon-0.png'


export default function TicTacToe() {
    const [block, setBlock] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (block[index] || winner) return;
        console.log(turn)
        const newBlock = [...block];
        newBlock[index] = turn === "X" ? <img src={circle_icon} alt="X" /> : <img src={cross_icon} alt="O" />;
        console.log(newBlock)
        setBlock(newBlock);
        setTurn(turn === "X" ? "O" : "X");

        checkWinner(newBlock);
    }

    const checkWinner = (newBlock) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (newBlock[a] && newBlock[a].props.src === newBlock[b]?.props.src && newBlock[a].props.src === newBlock[c]?.props.src) {
                setWinner(newBlock[a]);
                return;
            }
        }
    }

    const resetGame = () => {
        setBlock(Array(9).fill(null));
        setTurn("X");
        setWinner(null);
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe Game In <span>React</span></h1>
            <h2 className='turn'>Current Turn: {turn === "X" ? <img className="turn-img" src={circle_icon} alt="X" /> : <img className="turn-img" src={cross_icon} alt="O" />}</h2>
            {winner && <h2 className='winner'>Winner: {winner.props.src === cross_icon ? <img className="winner-img" src={cross_icon} alt="X" /> : <img className="winner-img" src={circle_icon} alt="O" />}</h2>}


            <div className="board">

                {[0, 1, 2].map((row) => (
                    <div className={`row${row + 1}`} key={row}>
                        {block.slice(row * 3, row * 3 + 3).map((val, colIndex) => {
                            const index = row * 3 + colIndex;
                            return (
                                <div
                                    key={index}
                                    className="boxes"
                                    onClick={() => handleClick(index)}
                                >
                                    {val}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <button className="reset" onClick={resetGame}>
                {winner ? "Play Again" : "Reset Game"}
            </button>
        </div>
    )
}
