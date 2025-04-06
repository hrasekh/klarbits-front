import React from 'react';
import CorrectIcon from '@/components/Icons/CorrectIcon';
import IncorrectIcon from '@/components/Icons/IncorrectIcon';
import { getAnswerOptionStyles } from './AnswerOptionStyles';
import { rtlByLocale } from '@/utils/rtl';

const AnswerOption = ({ answer, selectedAnswer, handleAnswerSelect, isSelectionEnabled, showTranslation, locale }) => {
  const { bgColor, borderColor, textColor, iconColor, cursorStyle } = getAnswerOptionStyles(answer, selectedAnswer, isSelectionEnabled);
  const isRtl = rtlByLocale(locale);

  return (
    <div
      onClick={() => isSelectionEnabled && handleAnswerSelect(answer.id, answer.is_correct)}
      className={`${bgColor} ${borderColor} ${textColor} border-2 rounded-lg p-4 flex items-start transition-all duration-200 ${cursorStyle} hover:shadow-md`}
    >
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${borderColor} ${iconColor}`}>
        {selectedAnswer && answer.is_correct && (
          <CorrectIcon />
        )}
        {selectedAnswer == answer.id && !answer.is_correct && (
          <IncorrectIcon />
        )}
      </div>

      <div className="flex-grow pl-2 pr-2">
        <p className="font-medium">{answer.answer}</p>
        {showTranslation && answer.translation && (
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className="w-full"
          >
            <p className="text-indigo-600 text-sm mt-1 italic">{answer.translation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerOption;