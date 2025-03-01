"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import AnswerOption from './Answer/AnswerOption';
import NavigationButtons from './NavigationButtons';
import TranslationToggle from './TranslationToggle';

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
    // Reset selection state when question changes
    setSelectedAnswer(null);
    setAllowNext(false);
  }, [question.uuid]);

  const handleAnswerSelect = (answerId) => {
    if (!selectedAnswer) { // Only allow selection if no answer is currently selected
      setSelectedAnswer(answerId);
      setAllowNext(true); // Enable next button immediately on selection
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
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Left side - Header and navigation */}
        <div className="md:col-span-4 bg-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Quiz Challenge</h2>
          
          <div className="mb-6">
            <div className="flex items-center text-sm mb-2">
              <span>{question.title}</span>
            </div>
            
          </div>
          
          <div className="mt-auto">
            <TranslationToggle 
              showTranslation={showTranslation} 
              toggleTranslation={toggleTranslation} 
              theme="light"
            />
          </div>
        </div>
        
        {/* Right side - Question content */}
        <div className="md:col-span-8 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{question.question}</h1>
            {showTranslation && question.translation && (
              <p className="mt-2 text-lg text-indigo-600 italic">{question.translation}</p>
            )}
          </div>

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
              />
            ))}
          </div>

          {/* Action buttons */}
          <NavigationButtons
            question={question}
            allowNext={allowNext}
            navigateTo={navigateTo}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizCard;