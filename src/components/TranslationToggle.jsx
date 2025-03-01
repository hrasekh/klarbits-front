import React from 'react';
import LanguageSelector from "@/components/Language/LanguageSelector";

const TranslationToggle = ({ showTranslation, toggleTranslation, theme = 'dark' }) => {
  const textColor = theme === 'light' ? 'text-white' : 'text-gray-700';
  const bgColor = theme === 'light' ? 'bg-indigo-400' : 'bg-indigo-200';
  const switchBgColor = theme === 'light' ? 'bg-white' : 'bg-indigo-600';

  return (
    <div className="flex items-center">
       {showTranslation && <LanguageSelector />}
      <span className={`text-sm font-medium mr-2 ${textColor}`}>
        Translation
        {showTranslation ? ' On' : ' Off'}
      </span>
      <span>
      </span>
      <button
        onClick={toggleTranslation}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${bgColor}`}
        aria-pressed={showTranslation}
      >
        <span
          className={`${
            showTranslation ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform ${switchBgColor} rounded-full transition-transform`}
        />
      </button>
    </div>
  );
};

export default TranslationToggle;