import React from 'react';
import LanguageSelector from "@/components/Language/LanguageSelector";

const TranslationToggle = ({ showTranslation, toggleTranslation, theme = 'dark' }) => {
  const textColor = theme === 'light' ? 'text-white' : 'text-gray-700';
  const bgColor = theme === 'light' ? 'bg-indigo-400' : 'bg-indigo-200';
  const switchBgColor = theme === 'light' ? 'bg-white' : 'bg-indigo-600';

  return (
    <div className="flex items-center">
      {/* Translation icon for mobile, text for larger screens */}
      <span className={`hidden sm:inline text-sm font-medium mr-2 ${textColor}`}>
        Translation
        {showTranslation ? ' On' : ' Off'}
      </span>
      
      {/* Translation icon only visible on mobile */}
      <span className={`sm:hidden mr-2 ${textColor}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
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
      <span className='ml-2'>
        {showTranslation && <LanguageSelector />}
      </span>
    </div>
  );
};

export default TranslationToggle;