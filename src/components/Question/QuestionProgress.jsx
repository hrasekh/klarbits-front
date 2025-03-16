import React from 'react';
import { useRouter } from 'next/navigation';

function QuestionProgress({ total, current }) {
  const progressPercentage = (current / total) * 100;
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex items-center"> 
        <button
          className="pr-6 cursor-pointer z-10 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
          aria-label="Close quiz"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-medium text-gray-700">Question {current} of {total}</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <div
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500 relative"
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 5 && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="bg-white opacity-20 h-full w-full transform -skew-x-12"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionProgress;