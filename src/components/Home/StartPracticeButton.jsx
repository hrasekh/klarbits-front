"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { clearQuizData, hasSavedProgress, getUserState, getQuestionState } from '@/utils/localStorage';

export const StartPracticeButton = ({ initialUuid }) => {
  const router = useRouter();
  const [questionUuid, setQuestionUuid] = useState(initialUuid);
  const [hasSavedAnswers, setHasSavedAnswers] = useState(false);

  useEffect(() => {
    const questionState = getQuestionState();
    if (questionState && questionState.uuid) {
      setQuestionUuid(questionState.uuid);
    } else {
      setQuestionUuid(initialUuid);
    }

    setHasSavedAnswers(hasSavedProgress());
  }, [initialUuid]);

  const handleStartPracticeClick = (event) => {
    event.preventDefault();
    if (hasSavedAnswers) {
      const userConfirmed = window.confirm(
        "Are you sure you want to start over? This will delete your previous answers and progress."
      );

      if (!userConfirmed) {
        return;
      }
      
      clearQuizData();
    }

    router.push(`/state-selection?uuid=${initialUuid}`);
  };

  const handleContinueClick = (event) => {
    event.preventDefault();
    
    const stateId = getUserState();
    
    let continueUrl = `/questions/${questionUuid}`;
    if (stateId !== null) {
      continueUrl += `?condition=${stateId}`;
    }
    
    const questionState = getQuestionState();
    if (questionState && questionState.showTranslation) {
      const separator = continueUrl.includes('?') ? '&' : '?';
      continueUrl += `${separator}showTranslation=true`;
    }
    
    router.push(continueUrl);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
      <button
        onClick={handleStartPracticeClick}
        className={`cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1 ${!hasSavedAnswers ? '' : 'sm:w-1/2'}`}
      >
        Start {hasSavedAnswers ? 'Over' : 'Practice'}
      </button>

      {hasSavedAnswers && (
        <button 
          onClick={handleContinueClick}
          className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-1/2 h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1"
        >
          Continue
        </button>
      )}

      {hasSavedAnswers && (
        <Link href={"/stared"} className="w-full sm:w-1/2">
          <button className="cursor-pointer bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1">
            Star Question
          </button>
        </Link>
      )}
    </div>
  );
};