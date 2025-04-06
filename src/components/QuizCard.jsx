"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import AnswerOption from './Answer/AnswerOption';
import NavigationButtons from './NavigationButtons';
import TranslationToggle from './TranslationToggle';
import QuestionProgress from './Question/QuestionProgress';
import { playWrongAnswerSound, playCorrectAnswerSound, cleanupSounds } from '@/utils/soundUtils';
import { rtlByLocale } from '@/utils/rtl';

// Define a key for storing answers in localStorage
const QUIZ_ANSWERS_STORAGE_KEY = 'quizUserAnswers';

const QuizCard = ({ question }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedAnswer, setSelectedAnswer] = useState(null); // Holds the ID of the selected answer
  const [allowNext, setAllowNext] = useState(false);
  const [showTranslation, setShowTranslation] = useState(
    searchParams.get('showTranslation') === 'true'
  );

  // --- Effect to handle general session state (like last visited) ---
  // This seems more about resuming the quiz session, keeping it separate
  useEffect(() => {
    if (question?.uuid) {
      localStorage.setItem('currentQuestionUuid', question.uuid);
      const questionState = {
        uuid: question.uuid,
        showTranslation: showTranslation,
        locale: searchParams.get('locale') || 'en',
        lastVisited: new Date().toISOString()
      };
      localStorage.setItem('questionState', JSON.stringify(questionState));
    }
  }, [question?.uuid, showTranslation, searchParams]);

  // --- Effect to load stored answer or reset state when question changes ---
  useEffect(() => {
    if (!question?.uuid) return; // Don't run if question is not loaded yet

    let previouslySelectedAnswerId = null;
    try {
      const storedAnswersRaw = localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
      if (storedAnswersRaw) {
        const storedAnswers = JSON.parse(storedAnswersRaw);
        // Check if there's a stored answer for the *current* question UUID
        previouslySelectedAnswerId = storedAnswers[question.uuid] || null;
      }
    } catch (error) {
      console.error("Failed to parse stored answers:", error);
      // Optional: Clear corrupted data
      // localStorage.removeItem(QUIZ_ANSWERS_STORAGE_KEY);
    }

    if (previouslySelectedAnswerId) {
      // Restore the selected answer state
      setSelectedAnswer(previouslySelectedAnswerId);
      setAllowNext(true); // If an answer was previously selected, allow navigation
    } else {
      // Reset selection state for the new question if no answer was stored
      setSelectedAnswer(null);
      setAllowNext(false);
    }

  }, [question?.uuid]); // This effect runs when the question UUID changes

  // --- Effect for sound cleanup ---
  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      cleanupSounds();
    };
  }, []);


  const handleAnswerSelect = (answerId, is_correct) => {
    if (!selectedAnswer) { // Only allow selection if no answer is currently selected
      setSelectedAnswer(answerId);
      setAllowNext(true); // Enable next button immediately on selection

      // --- Store the selected answer in localStorage ---
      try {
        const storedAnswersRaw = localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
        const storedAnswers = storedAnswersRaw ? JSON.parse(storedAnswersRaw) : {};
        // Update the answer for the current question
        storedAnswers[question.uuid] = answerId;
        localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(storedAnswers));
      } catch (error) {
        console.error("Failed to save answer to localStorage:", error);
      }
      // --- End storing answer ---

      if (!is_correct) {
        playWrongAnswerSound();
      } else {
        playCorrectAnswerSound();
      }
    }
  };

  const toggleTranslation = () => {
    const newShowTranslation = !showTranslation;
    setShowTranslation(newShowTranslation);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('showTranslation', newShowTranslation.toString());
    const locale = searchParams.get('locale');
    if (locale) newParams.set('locale', locale);

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  const navigateTo = (questionData) => {
    if (!questionData) return;
    const newParams = new URLSearchParams();
    newParams.set('showTranslation', showTranslation.toString());
    const locale = searchParams.get('locale');
    if (locale) newParams.set('locale', locale);

    router.push(`/questions/${questionData.uuid}?${newParams.toString()}`);
  };

  // Render logic remains largely the same
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-column pb-24">

      {/* Progress Bar */}
      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <QuestionProgress total={question.statistic?.total} current={question.statistic?.current} />
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
              <div dir={rtlByLocale(question.locale) ? 'rtl' : 'ltr'}>
                <p className={`mt-2 text-lg text-indigo-600 italic`}>
                  {question.translation}
                </p>
              </div>
            )}
          </div>

          {/* Question Image */}
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
                selectedAnswer={selectedAnswer} // Pass the potentially restored answer ID
                handleAnswerSelect={handleAnswerSelect}
                isSelectionEnabled={!selectedAnswer} // Disable selection if an answer is already selected/restored
                showTranslation={showTranslation}
                locale={question.locale}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
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