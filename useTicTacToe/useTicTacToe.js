import {calculateWinner} from './calculatewinner';
import React, { useState,useEffect,useRef} from 'react';
import  { readFromStorage, writeToStorage } from './LocalStorage';

const useTicTacToe=()=>{
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [player, setPlayer] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const storageOfHistory=(i)=>{
    const board = history[step];
    const entervalue=()=>step===history.length-1;//functionn to check if we are in history or not if we are back in history this function wont allow you to update the square value.
      
        if (board[i] === null && !calculateWinner(board) && entervalue()===true) {
          
            const newBoard = [...board]; 
//Note, we have to create a new state object, and never mutate the current state and set it back. React wont come to know any state change in this case and there will be no re rendering that is going to happen
            if(player){ 
              newBoard[i] = player1;
              setPlayer(false);
              
            }else{
              newBoard[i] = player2;
              setPlayer(true);
              
            }
            console.log(board);
            // [initalboard, step1board]
            const newHistory = history.concat([newBoard]);
            setHistory(newHistory);
            //writeToStorage(HIST,newHistory);
            //Update the step
            setStep((prevStep) => prevStep + 1);
            //writeToStorage(STEP,step+1);
      }
  }
  return {history,setHistory,step,setStep,player,setPlayer,player1,setPlayer1,player2,setPlayer2,storageOfHistory};
}
export default useTicTacToe;



