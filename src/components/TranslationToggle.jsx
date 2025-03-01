import React from 'react';

const TranslationToggle = ({ showTranslation, toggleTranslation }) => {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium mr-2 text-gray-700">
        {showTranslation ? 'Hide Translation' : 'Show Translation'}
      </span>
      <button
        onClick={toggleTranslation}
        className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none bg-indigo-200"
        aria-pressed={showTranslation}
      >
        <span
          className={`${
            showTranslation ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-indigo-600 rounded-full transition-transform`}
        />
      </button>
    </div>
  );
};

export default TranslationToggle;