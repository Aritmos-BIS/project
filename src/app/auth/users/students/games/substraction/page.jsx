"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SumGame = () => {
  const [num1, setNum1] = useState(11);
  const [num2, setNum2] = useState(12);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [enemyAnswer, setEnemyAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(23);
  const [playerLives, setPlayerLives] = useState(3);
  const [enemyLives, setEnemyLives] = useState(5);
  const [gameover, setGameover] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [currentGif1, setCurrentGif1] = useState('/gifs/Ari_idle.gif');
  const [currentGif2, setCurrentGif2] = useState('/gifs/Plus_and_moin_idle.gif');

  const correctGif1 = '/gifs/Ari_att.gif';
  const incorrectGif1 = '/gifs/Ari_danio.gif';
  const idleGif1 = '/gifs/Ari_idle.gif';
  const correctGif2 = '/gifs/Plus_and_moin_danio.gif';
  const incorrectGif2 = '/gifs/Plus_and_moin_att.gif';
  const idleGif2 = '/gifs/Plus_and_moin_idle.gif';

  const generateRandomNumbers = () => {
    let newNum1 = Math.floor(Math.random() * 20);
    let newNum2 = Math.floor(Math.random() * 20);
    
    if (newNum1 < newNum2) {
      [newNum1, newNum2] = [newNum2, newNum1];
    }
    
    const newCorrectAnswer = newNum1 - newNum2;
    setNum1(newNum1);
    setNum2(newNum2);
    setCorrectAnswer(newCorrectAnswer);
    setPlayerAnswer('');
    setEnemyAnswer('');
    setResultMessage('');
  };

  useEffect(() => {
    generateRandomNumbers(); // Initialize with random numbers on mount
  }, []);

  const checkAnswer = () => {
    if(playerAnswer !== ''){
      if (parseInt(playerAnswer, 10) === correctAnswer) {
        setEnemyLives(prevEnemyLives => {
          const newEnemyLives = prevEnemyLives - 1;
          if (newEnemyLives <= 0) {
            setGameover(true);
            setResultMessage('¡Ganaste!');
          }
          return newEnemyLives;
        });
        setCurrentGif1(correctGif1);
        setCurrentGif2(correctGif2);
        setTimeout(() => {
          setCurrentGif1(idleGif1);
          setCurrentGif2(idleGif2);
        }, 5000);
        generateRandomNumbers(); // Generate new numbers for the next round
      } else {
        setPlayerLives(prevPlayerLives => {
          const newPlayerLives = prevPlayerLives - 1;
          if (newPlayerLives <= 0) {
            setGameover(true);
            setResultMessage('¡Perdiste!');
          }
          return newPlayerLives;
        });
        setCurrentGif1(incorrectGif1);
        setCurrentGif2(incorrectGif2);
        setTimeout(() => {
          setCurrentGif1(idleGif1);
          setCurrentGif2(idleGif2);
        }, 5000);
      }
    }else{
      alert('No puede estar vacío')
    }
    
  };

  const reloadGame = () => {
    generateRandomNumbers();
    setPlayerLives(3);
    setEnemyLives(5);
    setGameover(false);
    setResultMessage('');
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setPlayerAnswer(inputValue);
      setCurrentGif1(idleGif1);
      setCurrentGif2(idleGif2);
    } else {
      alert('Ingrese solo números válidos');
    }
  };
  
  const playerLifeBarWidth = (playerLives / 3) * 100;
  const enemyLifeBarWidth = (enemyLives / 5) * 100;

  return (
    <div className="container mx-auto text-center text-white">
      <h1 className="text-6xl text-white font-semibold mb-4">Juego de las restas</h1>
      
      <div className="mx-auto flex justify-center items-center space-between py-3">
        <Image
          src={currentGif1}
          alt="GIF"
          width={250}
          height={250}
          objectFit="contain"
        />
        <Image
          src={currentGif2}
          alt="GIF"
          width={250}
          height={250}
          objectFit="contain"
        />
      </div>
   
      {gameover ? (
        <div>
          <p>{resultMessage}</p>
          <button onClick={reloadGame} className="bg-sky-500 font-medium text-center rounded-lg p-2 shadow-lg items-center justify-center max-lg:w-1/2 shadow-black hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500">
            Reintentar
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="text-left">
            <p className='ml-5 text-xl'>Vida del jugador:</p>
            <div className="mx-5 relative h-6 rounded-full overflow-hidden bg-gray-300">
              <div className="h-6 bg-green-600 animate-pulse" style={{ width: `${playerLifeBarWidth}%` }}></div>
            </div>
          </div>
          <div className="text-right">
            <p className='mr-5 text-xl'>Vida del enemigo:</p>
            <div className="mx-5 relative h-7 rounded-full overflow-hidden bg-gray-300">
              <div className="h-7 bg-red-500 animate-pulse" style={{ width: `${enemyLifeBarWidth}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {playerLives > 0 && enemyLives > 0 && !gameover && (
        <div>
          <p className="text-xl mb-2">Vidas restantes: {playerLives}</p>
          <p className="text-3xl mb-4">
            {num1} - {num2} =
            <input
              type="number"
              value={playerAnswer}
              onChange={handleChange}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  checkAnswer();
                }
              }}
              placeholder='Escribe tu respuesta aquí'
              className="border border-gray-400 p-2 rounded-md m-2 mb-6 text-black placeholder-slate-400"
            />
            <button onClick={checkAnswer} className="bg-sky-500 font-medium text-center rounded-lg p-2 shadow-lg items-center justify-center max-lg:w-3/4 shadow-black hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500">
              Atacar
            </button>
          </p>
        </div>
      )}
      <div className="max-lg:hidden flex flex-row justify-between my-4">
        <div>
          <a className="items-center justify-center" href="/auth/users/students/courses/sumas">
            <button className="bg-sky-500 font-medium text-center rounded-lg m-4 py-1 shadow-lg items-center shadow-black justify-center w-full hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500">
              Regresar
            </button>
          </a>
        </div>
        <div>
          <div className="flex flex-row justify-around m-3">
            <a className="items-center justify-center" href="/auth/users/students/quizes/addition">
              <button className="bg-sky-500 font-medium text-center rounded-lg p-2 shadow-lg items-center justify-center w-full shadow-black hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500">
                Examen
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-row items-center justify-around my-4">
        <a className="items-start justify-start" href="/auth/users/students/courses/sumas">
          <button className="bg-sky-500 text-lg font-medium text-center rounded-lg shadow-lg items-center justify-center w-full p-1 hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500">
            Regresar
          </button>
        </a>
        <a className="items-end justify-end" href="/auth/users/students/quizes/addition">
          <button className="bg-sky-500 font-medium text-center rounded-lg shadow-lg items-center justify-center w-full p-1 hover:shadow-inner hover:shadow-black hover:bg-rose-700 hover:text-gray-900 text-white transition-all duration-500">
            Examen
          </button>
        </a>
      </div>
    </div>
  );
};

export default SumGame;
