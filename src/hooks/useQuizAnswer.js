import { useState, useEffect } from 'react';
import { getUserAnswer, saveUserAnswer } from '@/utils/localStorage';
import { playWrongAnswerSound, playCorrectAnswerSound } from '@/utils/soundUtils';

/**
 * Custom hook for managing quiz answer selection and state
 */
const useQuizAnswer = (questionUuid) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [allowNext, setAllowNext] = useState(false);

  // Load previously selected answer when question changes
  useEffect(() => {
    if (!questionUuid) return;

    const previouslySelectedAnswerId = getUserAnswer(questionUuid);
    
    if (previouslySelectedAnswerId) {
      setSelectedAnswer(previouslySelectedAnswerId);
      setAllowNext(true);
    } else {
      setSelectedAnswer(null);
      setAllowNext(false);
    }
  }, [questionUuid]);

  // Handle answer selection
  const handleAnswerSelect = (answerId, is_correct) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answerId);
      setAllowNext(true);
      
      // Save to localStorage
      if (questionUuid) {
        saveUserAnswer(questionUuid, answerId);
      }

      // Play appropriate sound
      if (is_correct) {
        playCorrectAnswerSound();
      } else {
        playWrongAnswerSound();
      }
    }
  };

  return {
    selectedAnswer,
    allowNext,
    handleAnswerSelect
  };
};

export default useQuizAnswer;