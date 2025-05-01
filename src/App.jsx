import { useState } from 'react'
// import TicTacToe from './Components/TicTacToe/TicTacToe'
import './App.css'
import Player from './Components/Player'
import GameBoard from './Components/GameBorad'
import GameOver from './Components/GameOver'
import Log from './Components/Log'
import { WINNING_COMBINATIONS } from './winning-combinations'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}
const INTIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INTIAL_GAME_BOARD.map(row => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareCombination = gameBoard[combinations[0].row][combinations[0].column]
    const secondSquareCombination = gameBoard[combinations[1].row][combinations[1].column]
    const thirdSquareCombination = gameBoard[combinations[2].row][combinations[2].column]
    if (firstSquareCombination && firstSquareCombination === secondSquareCombination && firstSquareCombination === thirdSquareCombination) {
      winner = players[firstSquareCombination];
    }
  }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([])
  const [playerName, setPlayerName] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  const gameDraw = gameTurns.length === 9 && !winner;

  const handleActivePlayer = (rowIndex, colIndex) => {
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === 'X' ? 'O' : 'X')
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [

        {
          player: currentPlayer,
          square: {
            row: rowIndex,
            col: colIndex
          }
        },
        ...prevTurns,
      ]

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);

  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayerName) => {
      return {
        ...prevPlayerName,
        [symbol]: newName
      }
    })

  }


  return (

    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player intialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} handlePlayerName={handlePlayerNameChange} />
          <Player intialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} handlePlayerName={handlePlayerNameChange} />
        </ol>
        {(winner || gameDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard handleActivePlayer={handleActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
