import React from 'react';

const NavigationButtons = ({ question, allowNext, navigateTo }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex space-x-3">
        {question.previous_question && (
          <button
            onClick={() => navigateTo(question.previous_question)}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center justify-center font-medium"
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
            className={`px-6 py-2 rounded-lg flex items-center justify-center transition-colors font-medium ${
              allowNext
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
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