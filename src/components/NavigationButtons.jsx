import React from 'react';

const NavigationButtons = ({ question, allowNext, navigateTo }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
      <div className="flex space-x-3 w-full sm:w-auto">
        {question.previous_question && (
          <button
            onClick={() => navigateTo(question.previous_question)}
            className="w-full sm:w-auto px-4 py-2 border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        )}

        {question.next_question && (
          <button
            onClick={() => navigateTo(question.next_question)}
            disabled={!allowNext}
            className={`w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
              allowNext
                ? "border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                : "border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavigationButtons;