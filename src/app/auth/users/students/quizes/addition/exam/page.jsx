'use client';
import db from "@/libs/db";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { quiz } from './data.js';

const Page = () => {
  const router = useRouter()
  const { data: session } = useSession();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (session?.user.id) {
      try {
        const res = await fetch(`/api/studentsExam/addition/${session.user.id}`, {
          method: "PUT",
          body: JSON.stringify({ AdditionQuiz: result.correctAnswers }),
          headers: {
            "Content-Type": "application/json"
          }
        });
  
        if (!res.ok) {
          console.error('Failed to update quiz results:', res.statusText);
          // Handle the error (e.g., show an error message to the user)
          return;
        }
  
        const data = await res.json();
        // Handle the data if needed
  
      } catch (error) {
        console.error('Error parsing JSON or making the request:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  
    router.push(`/auth/users/students/dashboard/${session.user.id}`);
  };
  
  

  //   Select and check answer
  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
      console.log('false');
    }
  };

  // Calculate score and increment to next question
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (

  <div className="w-11/12 m-5 mx-auto text-center items-center justify-center transition-all duration-500">
    <h1 className="text-white text-4xl m-10 font-semibold">Examen de Sumas</h1>
    <div>
        <img className="md:hidden mx-auto" src="/gifs/separate/Plus-Idle.gif" alt="" />
    <h2 className="mb-5">
      Pregunta: {activeQuestion + 1}
      <span>/{questions.length}</span>
    </h2>
  </div>
  <div>
    {!showResult ? (
      <div className="w-full list-none rounded-lg
       bg-purple-300 p-5 my-2 h-max items-center justify-center text-center">
        <h3 className="text-black on text-2xl pb-4 text-center transition-all duration-500">{questions[activeQuestion].question}</h3>
        {answers.map((answer, idx) => (
          <li
            key={idx}
            onClick={() => onAnswerSelected(answer, idx)}
            className={`cursor-pointer hover:bg-purple-300 transition-all duration-500 my-9 py-2 px-4 text-black border border-white rounded-lg ${selectedAnswerIndex === idx ? 'bg-violet-700 text-white' : 'hover:border-black ease-in-out hover:scale-105'}`}
          >
            <span>{answer}</span>
          </li>
        ))}
        {checked ? (
          <button
            onClick={nextQuestion}
            className="btn bg-orange-400 font-medium text-center rounded-lg shadow-lg items-center justify-center w-full py-2 px-4 hover:shadow-inner hover:shadow-black hover:bg-orange-700 hover:text-gray-900 text-white transition-all duration-500 mx-auto my-4"
          >
            {activeQuestion === question.length - 1 ? 'Terminar examen' : 'Siguiente pregunta'}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            disabled
            className="btn-disabled bg-gray-500 py-4 px-2 w-full mt-5 mb-5 rounded cursor-not-allowed"
          >
            {activeQuestion === question.length - 1 ? 'Selecciona tu respuesta y terminar examen' : 'Selecciona tu respuesta'}
          </button>
        )}
      </div>
    ) : (
      <div className="quiz-container text-xl py-9 bg-purple-200 mt-8 rounded  flex flex-col items-center justify-center">
        <h2 className="text-black text-3xl pb-1">Resultados del examen</h2>
        <hr />
        <h2 className="text-black text-3xl pb-2">Total {(result.score / 50) * 100}%</h2>
        <p>
          Total de preguntas: <span>{questions.length}</span>
        </p>
        <p>
          Puntuacion total: <span>{result.score}</span>
        </p>
        <p>
          Preguntas correctas: <span>{result.correctAnswers}</span>
        </p>
        <p className=' pb-2'>
          Preguntas incorrectas: <span>{result.wrongAnswers}</span>
        </p>
        <a>
          <button 
            className="btn bg-orange-400 font-medium text-center rounded-lg shadow-lg items-center justify-center w-full py-2 px-4 hover:shadow-inner hover:shadow-black hover:bg-orange-700 hover:text-gray-900 text-white transition-all duration-500 mx-auto my-4"
          onClick={onSubmit}>
            Regresar al inicio
          </button>
        </a>
    
      </div>
    )}
  </div>
</div>

  );
};

export default Page;