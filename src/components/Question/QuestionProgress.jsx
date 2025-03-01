import React from 'react';
import { useRouter } from 'next/navigation';

function QuestionProgress({ total, current }) {
  const progressPercentage = (current / total) * 100;
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="w-full pt-6 flex items-center"> 
      <button
        className="pr-6 cursor-pointer z-10 text-gray-500 hover:text-gray-700" // Removed absolute positioning, adjust padding as needed
        onClick={handleClose}
        aria-label="Close quiz"
      >
        X {/* Multiplication sign */}
      </button>

      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuestionProgress;