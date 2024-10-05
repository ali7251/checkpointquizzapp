'use client'; // Pour activer les composants client

import React, { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: Question[];
}

interface Attempt {
  question: string;
  selectedOption: string;
  correctOption: string;
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [history, setHistory] = useState<Attempt[]>([]); // Historique des réponses

  const handleAnswerSubmit = () => {
    const currentQuestionData = questions[currentQuestion];

    if (selectedOption === currentQuestionData.correctAnswer) {
      setScore(score + 1);
    }

    // Ajouter la tentative à l'historique
    const attempt: Attempt = {
      question: currentQuestionData.question,
      selectedOption: currentQuestionData.options[selectedOption as number],
      correctOption: currentQuestionData.options[currentQuestionData.correctAnswer],
    };
    setHistory([...history, attempt]);

    // Passer à la prochaine question ou montrer les résultats
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500 text-white">
        <h2 className="text-4xl font-bold mb-4">Résultats du Quiz</h2>
        <p className="text-xl">
          Vous avez obtenu {score} sur {questions.length} questions.
        </p>

        {/* Affichage de l'historique des tentatives */}
        <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg text-gray-800">
          <h3 className="text-2xl font-semibold mb-4">Historique des tentatives</h3>
          <ul className="space-y-4">
            {history.map((attempt, index) => (
              <li key={index} className="border-b pb-2">
                <p className="font-semibold">Question : {attempt.question}</p>
                <p>
                  Réponse donnée :{' '}
                  <span className="font-semibold">{attempt.selectedOption}</span>
                </p>
                <p>
                  Bonne réponse :{' '}
                  <span className="font-semibold">{attempt.correctOption}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Quiz Interactif
      </h1>
      <h2 className="text-3xl font-semibold mb-8 drop-shadow-md">
        {questions[currentQuestion].question}
      </h2>
      <ul className="space-y-4 w-full max-w-md">
        {questions[currentQuestion].options.map((option, index) => (
          <li key={index} className="w-full">
            <button
              onClick={() => handleOptionChange(index)}
              className={`w-full py-3 px-6 text-lg rounded-md shadow-lg transition-all duration-300 transform hover:scale-105 
                ${selectedOption === index ? 'bg-green-500' : 'bg-white text-gray-800'}`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={handleAnswerSubmit}
        className={`mt-8 px-8 py-4 bg-yellow-500 text-gray-800 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105
          ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={selectedOption === null}
      >
        Valider la réponse
      </button>
    </div>
  );
};

export default Quiz;
