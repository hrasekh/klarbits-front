import React from 'react';
import CorrectIcon from '@/components/icons/CorrectIcon';
import IncorrectIcon from '@/components/icons/IncorrectIcon';
import { getAnswerOptionStyles } from './AnswerOptionStyles';

const AnswerOption = ({ answer, selectedAnswer, handleAnswerSelect, isSelectionEnabled, showTranslation }) => {
  const { bgColor, borderColor, textColor, iconColor, cursorStyle } = getAnswerOptionStyles(answer, selectedAnswer, isSelectionEnabled);

  return (
    <div
      onClick={() => isSelectionEnabled && handleAnswerSelect(answer.id)}
      className={`${bgColor} ${borderColor} ${textColor} border-2 rounded-lg p-4 flex items-start transition-all duration-200 ${cursorStyle} hover:shadow-md`}
    >
      <div className={`flex-shrink-0 w-8 h-8 mr-4 mt-0.5 rounded-full flex items-center justify-center border-2 ${borderColor} ${iconColor}`}>
        {selectedAnswer && answer.is_correct && (
          <CorrectIcon />
        )}
        {selectedAnswer == answer.id && !answer.is_correct && (
          <IncorrectIcon />
        )}
      </div>

      <div className="flex flex-col">
        <span className="font-medium">{answer.answer}</span>
        {showTranslation && answer.translation && (
          <span className="text-indigo-600 text-sm mt-1 italic">{answer.translation}</span>
        )}
      </div>
    </div>
  );
};

export default AnswerOption;