// src/components/QuizCard.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnswerOption from './Answer/AnswerOption';
import NavigationButtons from './NavigationButtons';

const QuizCard = ({ question }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [allowNext, setAllowNext] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset state when question changes
    setSelectedAnswer(null);
    setAllowNext(false);
  }, [question.uuid]);

  const handleAnswerSelect = (answerId) => {
    if (!selectedAnswer) { // Only allow selection if no answer is currently selected
      setSelectedAnswer(answerId);
      setAllowNext(true); // Enable next button immediately on selection
    }
  };

  const navigateTo = (questionData) => {
    if (!questionData) return;
    router.push(`/questions/${questionData.uuid}`);
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header with progress */}
      <div className="bg-indigo-600 px-6 py-4 text-white relative">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Quiz Challenge</h2>
          <span className="bg-indigo-500 px-3 py-1 rounded-full text-xs font-medium">
            {!question.next_question ? "Final Question" : "Question"}
          </span>
        </div>

        {/* Progress dots */}
        <div className="mt-3 flex space-x-1">
          {question.previous_question && (
            <div className="h-1 w-8 rounded-full bg-indigo-300"></div>
          )}
          <div className="h-1 w-16 rounded-full bg-indigo-200"></div>
          {question.next_question && (
            <div className="h-1 w-8 rounded-full bg-indigo-300"></div>
          )}
        </div>
      </div>

      {/* Question content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h1>

        {/* Answer options */}
        <div className="space-y-3 mb-6">
          {question.answers.map((answer) => (
            <AnswerOption
              key={answer.id}
              answer={answer}
              selectedAnswer={selectedAnswer}
              handleAnswerSelect={handleAnswerSelect}
              isSelectionEnabled={!selectedAnswer} // Pass prop to disable click
            />
          ))}
        </div>

        {/* Action buttons */}
        <NavigationButtons
          question={question}
          navigateTo={navigateTo}
          allowNext={allowNext}
        />
      </div>
    </div>
  );
};

export default QuizCard;