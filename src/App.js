import React from 'react';
import { useEffect, useState } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

const choises = [
  { id:1, name: 'rock', component: Rock, losesTo: 2},
  { id:2, name: 'paper', component: Paper, losesTo: 3},
  { id:3, name: 'scissors', component: Scissors, losesTo: 1},

]


export default function App() {

  // стартові значення гри
  const[wins, setWins] =  useState(0);
  const[losses, setLosses] =  useState(0);
  const[userChoise, setUserChoise] =  useState(null);
  const[computerChoise, setComputerChoise] =  useState(null);
  const[gameState, setGameState] =  useState(null);

  // хук useEffect працює як методи componentDidMount і componentDidUpdate Оновлюєм компонент 
  useEffect(() => {
    restartGame();
  }, []);

  // обнуляєм значення
  const restartGame = () => {
    setGameState(null);
    setUserChoise(null);

    // створюєм логіку вибору бота гри на основі варіантів ходів та рандому
    const randomChoise = choises[Math.floor(Math.random() * choises.length)];
    setComputerChoise(randomChoise);
  }

  // записуєм вибір гравця
  const handleUserChoise = (choise) => {
    const chosenChoise = choises.find(c => c.id === choise);
    setUserChoise(chosenChoise);

    // прописуєм логіку гри win / losse
    if(chosenChoise.losesTo === computerChoise.id){
      // losse
      setLosses(losses => losses + 1);
      setGameState('losse');
    }else if(computerChoise.losesTo === chosenChoise.id){
      // win
      setWins(wins => wins + 1);
      setGameState('win');
    }else if(computerChoise.id === chosenChoise.id){
      // draw
      setGameState('draw');
    }
  }

  // рендер іконок вибору бота
  const renderComponent = (choise) => {
    const Component = choise.component;
    return <Component />;
  }

  return (
    <div className="app">
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">{losses === 1 ? 'Losse' : 'Losses'}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      {gameState && (
        <div className="game-state" onClick={() => restartGame()}>
          <div>
            <div className='game-state-content'>
              <p>{renderComponent(userChoise)}</p>
              {gameState === 'win' && <p>You won!</p>}
              {gameState === 'losse' && <p>You lost!</p>}
              {gameState === 'draw' && <p>You drew!</p>}
              <p>{renderComponent(computerChoise)}</p>
            </div>
            <button>Play Again</button>
          </div>
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* записуэм вибір гравця в handleUserChoise(choise) для порывняння з id*/}
        <div>
          <button className="rock" onClick={() => handleUserChoise(1)}>
            <Rock />
          </button>
          <button className="paper" onClick={() => handleUserChoise(2)}>
            <Paper />
          </button>
          <button className="scissors" onClick={() => handleUserChoise(3)}>
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button className="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}
