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

const QuizCard = ({ question }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get the initial showTranslation state from URL or default to false
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [allowNext, setAllowNext] = useState(false);
  const [showTranslation, setShowTranslation] = useState(
    searchParams.get('showTranslation') === 'true'
  );

  useEffect(() => {
    if (question?.uuid) {
      localStorage.setItem('currentQuestionUuid', question.uuid);

      // Also store other relevant state if needed
      const questionState = {
        uuid: question.uuid,
        showTranslation: showTranslation,
        locale: searchParams.get('locale') || 'en',
        lastVisited: new Date().toISOString()
      };

      localStorage.setItem('questionState', JSON.stringify(questionState));
    }
  }, [question?.uuid, showTranslation, searchParams]);


  useEffect(() => {
    // Reset selection state when question changes
    setSelectedAnswer(null);
    setAllowNext(false);
  }, [question.uuid]);

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

    // Update URL with new showTranslation state
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('showTranslation', newShowTranslation.toString());

    // Preserve existing locale parameter if it exists
    const locale = searchParams.get('locale');
    if (locale) {
      newParams.set('locale', locale);
    }

    // Update URL without reloading the page
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // Create a custom navigateTo function to preserve translation state
  const navigateTo = (questionData) => {
    if (!questionData) return;

    // Build new URL with translation parameter preserved
    const newParams = new URLSearchParams();
    newParams.set('showTranslation', showTranslation.toString());

    // Preserve existing locale parameter if it exists
    const locale = searchParams.get('locale');
    if (locale) {
      newParams.set('locale', locale);
    }

    router.push(`/questions/${questionData.uuid}?${newParams.toString()}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-column pb-24">

      <div className="p-6 flex justify-center">
        <div className="w-full max-w-6xl">
          <QuestionProgress total={question.statistic?.total} current={question.statistic?.current} />
        </div>
      </div>

      {/* Main content - Takes remaining width with some padding */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl p-6">

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

          {/* Question Image - Display if available */}
          {question.image && (
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

          {/* Answer options */}
          <div className="space-y-3 mb-8">
            {question.answers.map((answer) => (
              <AnswerOption
                key={answer.id}
                answer={answer}
                selectedAnswer={selectedAnswer}
                handleAnswerSelect={handleAnswerSelect}
                isSelectionEnabled={!selectedAnswer}
                showTranslation={showTranslation}
                locale={question.locale}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 flex justify-center fixed bottom-0 w-full bg-white border-t border-gray-200">
        {/* Centered container with same max width as content */}
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