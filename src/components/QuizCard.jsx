"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import AnswerOption from './Answer/AnswerOption';
import NavigationButtons from './NavigationButtons';
import TranslationToggle from './TranslationToggle';
import QuestionProgress from './Question/QuestionProgress';
import { cleanupSounds } from '@/utils/soundUtils';
import { rtlByLocale } from '@/utils/rtl';
import useQuizAnswer from '@/hooks/useQuizAnswer';
import useQuizTranslation from '@/hooks/useQuizTranslation';
import useQuizNavigation from '@/hooks/useQuizNavigation';
import { saveQuestionState } from '@/utils/localStorage';

const QuizCard = ({ question, meta }) => {
  const { selectedAnswer, allowNext, handleAnswerSelect } = useQuizAnswer(question?.uuid);
  const { showTranslation, toggleTranslation } = useQuizTranslation();
  const { navigateTo } = useQuizNavigation(showTranslation);

  // Save current question state
  useEffect(() => {
    if (question?.uuid) {
      saveQuestionState(question.uuid, showTranslation);
    }
  }, [question?.uuid, showTranslation]);

  // Cleanup sounds on unmount
  useEffect(() => {
    return () => cleanupSounds();
  }, []);

  // Render logic
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-column pb-24">
      {/* Progress Bar */}
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <QuestionProgress 
            total={meta.statistic?.total} 
            current={meta.statistic?.current} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl p-6">
          {/* Question Text & Translation */}
          <div className="mb-6">
            <div className="flex items-center text-gray-800 text-sm mb-2">
              <span>{question.title}</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">{question.question}</h1>
            {showTranslation && question.translation && (
              <div dir={rtlByLocale(meta.locale) ? 'rtl' : 'ltr'}>
                <p className="mt-2 text-lg text-indigo-600 italic">
                  {question.translation}
                </p>
              </div>
            )}
          </div>

          {question.image?.medium && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-full max-w-lg h-64 md:h-80 rounded overflow-hidden shadow-md">
                <Image
                  src={question.image.medium}
                  alt="Question image"
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {question.answers.map((answer) => (
              <AnswerOption
                key={answer.id}
                answer={answer}
                selectedAnswer={selectedAnswer}
                handleAnswerSelect={handleAnswerSelect}
                isSelectionEnabled={!selectedAnswer}
                showTranslation={showTranslation}
                locale={meta.locale}
                question={question}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 flex justify-center fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <div>
            <TranslationToggle
              showTranslation={showTranslation}
              toggleTranslation={toggleTranslation}
            />
          </div>
          <div>
            <NavigationButtons
              question={question}
              meta={meta}
              allowNext={allowNext}
              navigateTo={navigateTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;