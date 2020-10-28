import '../Tictactoe.css';
import {calculateWinner} from './calculatewinner';
import React, { useState,useEffect,useRef} from 'react';
import useTicTacToe from './useTicTacToe';
import  { readFromStorage, writeToStorage } from './LocalStorage';
import cn from 'classnames';
const HIST="history";
const STEP="step";

const Square = ({ isWinning,value, handleClick }) => {
  return (
      <button className={"square " + (isWinning ? "square--winning" : null)}  onClick={handleClick}>
          {value}
      </button>
  );
};

const Board = ({ winningSquares,board, handleClick }) => {
  function renderSquare(i) {
      return <Square isWinning={winningSquares.includes(i)} value={board[i]} handleClick={() => handleClick(i)} />;
  }

  return (
      <div>
          <div className="board-row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
          </div>
          <div className="board-row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
          </div>
          <div className="board-row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
          </div>
      </div>
  );
};

const Game = () => {
const {history,setHistory,step,setStep,player,setPlayer,player1,setPlayer1,player2,setPlayer2,storageOfHistory}=useTicTacToe();
  const handleClick = (i) => {
      console.log(`square ${i} is clicked`);
      storageOfHistory(i);
  };
  function status() {
      let winner= calculateWinner(history[step]);
      console.log(winner);
      if (winner) {
        return "Winner: " + winner.Player;
      } else if (!history[step].includes(null)) {
        return "draw";
      } else {
        return "Next player: " + (player===true?player1:player2);
      }
  }
  function jumpTo(index){
    setStep(index);
    setPlayer((index%2===0)?'X':'O');
  }
  function renderHistory() {
      return history.map((b, index) => (
          <li key={index}>
            
      <button className={cn({'history':index===step})} onClick={()=>{jumpTo(index)}}>{index === 0 ? 'Go to start of the game' : `Go to step ${index}`}</button></li>
      ));
  }

  // const board = history[step];
  let winner= calculateWinner(history[step]);
  const firstPlayerNameFieldRef = useRef(null);
    console.log(firstPlayerNameFieldRef.current);
    useEffect(() => {
        console.log(firstPlayerNameFieldRef.current);
        if (firstPlayerNameFieldRef.current) {
            firstPlayerNameFieldRef.current.focus();
        }
    }, []);
  let numberOfRenders = useRef(0); //useRef(0);
  useEffect(() => {
    numberOfRenders += 1;
    console.log('Number of times rendered = ', numberOfRenders);
});
const handleChange1=(event)=>{
  if(event.target.value.length<=1){
    setPlayer1(event.target.value);
  }
  else{
    alert("enter single char");
  }
   
}
const handleChange2=(event)=>{
  if(event.target.value.length<=1){
    if(player1===event.target.value){
      alert("Name already used");
    }
    else{
      setPlayer2(event.target.value);
    }
  }
  else{
    alert("enter single char");
  }
}
//handleChange=handleChange.bind();
function reset(){
    setPlayer(true);
    //window.localStorage.clear();
    setHistory([Array(9).fill(null)]);
    setStep(0);
}
  return (
      <div className="game">
          <div className="game-board">
              <Board winningSquares={winner ? winner.line : []} board={history[step]} handleClick={handleClick} />
              
          </div>
          <div className="game-info">
              <div>{status()}</div>
              <ol>{renderHistory()}</ol>
          </div>
          <div className="name-inputs">
                <label for="player1">Player1</label>
                <input ref={firstPlayerNameFieldRef} type={'text'}  value={player1} name="player1" onChange={handleChange1} placeholder={'X'} />
                <br></br>
                <label for="player1">Player2</label>
                <input type={'text'}  value={player2} name="player2" onChange={handleChange2} placeholder={'Y'} />
                <br></br>
                <div>
                <button class="reset" type="reset" onClick={reset}>Reset</button>
                </div>
               
            </div>
      </div>
  );
};

export default Game;