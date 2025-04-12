import React from 'react';
import StarButton from './Star/StarButton';
import HomeButton from './Home/HomeButton';

const NavigationButtons = ({ question, meta, allowNext, navigateTo }) => {
  return (
    <div>
      <div className="flex space-x-3 w-full sm:w-auto">

        {meta.previous_question && (
          <button
            onClick={() => navigateTo(meta.previous_question)}
            className="w-full sm:w-auto px-4 py-2 border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline ml-1">Back</span>
          </button>
        )}

        {meta.next_question && (
          <button
            onClick={() => navigateTo(meta.next_question)}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center transition-colors border ${allowNext ? " border-green-300 bg-green-100 hover:bg-green-200" : " border-indigo-200 bg-indigo-50 hover:bg-indigo-100"} text-indigo-600 cursor-pointer`}
          >
            <span className="hidden sm:inline mr-1">{allowNext ? "Next" : "Skip"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <StarButton question={question} />
      </div>
    </div>
  );
};

export default NavigationButtons;