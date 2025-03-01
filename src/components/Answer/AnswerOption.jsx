// src/components/AnswerOption.jsx
import React from 'react';
import CorrectIcon from '@/components/icons/CorrectIcon';
import IncorrectIcon from '@/components/icons/IncorrectIcon';
import { getAnswerOptionStyles } from './AnswerOptionStyles'; // Import the style function

const AnswerOption = ({ answer, selectedAnswer, handleAnswerSelect, isSelectionEnabled }) => {
  const { bgColor, borderColor, textColor, iconColor, cursorStyle } = getAnswerOptionStyles(answer, selectedAnswer, isSelectionEnabled);

  return (
    <div
      onClick={() => isSelectionEnabled && handleAnswerSelect(answer.id)}
      className={`${bgColor} ${borderColor} ${textColor} border-2 rounded-lg p-4 flex items-center transition-all duration-200 ${cursorStyle}`}
    >
      <div className={`flex-shrink-0 w-8 h-8 mr-4 rounded-full flex items-center justify-center border-2 ${borderColor} ${iconColor}`}>
        {selectedAnswer && answer.is_correct && (
          <CorrectIcon />
        )}
        {selectedAnswer == answer.id && !answer.is_correct && (
          <IncorrectIcon />
        )}
      </div>

      <span className="font-medium">{answer.answer}</span>
    </div>
  );
};

export default AnswerOption;