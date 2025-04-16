'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWrongAnswers, getUserState } from '@/utils/localStorage'; // Assuming this path is correct

interface WrongAnswer {
  questionUuid: string;
  userAnswer: string | number; // Keep this if needed, though not displayed in the list
  date: string; // Keep this if needed, though not displayed in the list
  title: string;
  question: string;
}

const WrongAnswersPage = () => {
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateId, setStateId] = useState<number | null>(null);

  useEffect(() => {
    const loadWrongAnswers = () => {
      try {
        const answers = getWrongAnswers();
        // Sort by date (newest first) - good practice to keep
        answers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setWrongAnswers(answers);

        // Get user's state selection for review links
        const userState = getUserState();
        setStateId(userState);

      } catch (error) {
         console.error('Error loading wrong answers:', error);
         setWrongAnswers([]); // Set to empty array on error
      } finally {
         setIsLoading(false);
      }
    };

    loadWrongAnswers();
  }, []);

  const getReviewLink = (questionUuid: string) => {
    let reviewUrl = `/questions/${questionUuid}`;
    if (stateId !== null) {
      reviewUrl += `?condition=${stateId}`;
    }
    return reviewUrl;
  };

  // Optional: Format date if you decide to display it later
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return new Intl.DateTimeFormat('en-US', {
  //     year: 'numeric', month: 'short', day: 'numeric',
  //     hour: '2-digit', minute: '2-digit'
  //   }).format(date);
  // };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Top Gradient Bar */}
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-red-500 to-blue-500"></div> {/* Changed middle color to red */}

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center pt-20 pb-12">
        {/* Header Title */}
        <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-red-600 to-blue-700 mb-2"> {/* Adjusted gradient */}
            Wrong Answers Review
          </h1>
        </div>

        {isLoading ? (
          // Loading State - Styled like StarredQuestionsPage
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex justify-center items-center h-64">
              {/* You can add a spinner here if preferred, but keeping text for consistency */}
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mr-4"></div>
              <div className="text-gray-500 text-lg">Loading wrong answers...</div>
            </div>
          </div>
        ) : wrongAnswers.length === 0 ? (
          // Empty State - Styled like StarredQuestionsPage
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center h-64">
              {/* Changed Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 mb-8 text-lg">Great job! You haven't answered any questions incorrectly yet.</p>
            </div>
          </div>
        ) : (
          // List of Wrong Answers - Styled like StarredQuestionsPage
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {wrongAnswers.map(answer => (
                <div
                  key={answer.questionUuid} // Use questionUuid as the key
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-red-500" // Changed border color to red
                >
                  <div className="flex justify-between items-center">
                    {/* Question Info */}
                    <div className="text-left flex-1 mr-4"> {/* Added flex-1 and margin */}
                      <Link
                        href={getReviewLink(answer.questionUuid)}
                        className="text-xl text-gray-800 font-semibold hover:text-blue-600 transition-colors duration-300 line-clamp-1" // Added line-clamp
                      >
                        {answer.title}
                      </Link>
                      {answer.question && (
                        <p className="text-gray-700 mt-2 line-clamp-2">{answer.question}</p>
                      )}
                      {/* Optionally display user's wrong answer or date */}
                      {/* <p className="text-sm text-red-600 mt-1">Your answer: {answer.userAnswer}</p> */}
                      {/* <p className="text-xs text-gray-400 mt-1">Answered on: {formatDate(answer.date)}</p> */}
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0"> {/* Prevent button from shrinking */}
                      <Link
                        href={getReviewLink(answer.questionUuid)}
                        className="cursor-pointer"
                      >
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform cursor-pointer">
                          Review
                        </button>
                      </Link>
                      {/* No "Remove" button here, aligning with original functionality */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="w-full max-w-4xl mx-auto mt-16 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* Home Button */}
        <Link href="/" className="cursor-pointer">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 cursor-pointer">
            Home Page <span className="ml-2">→</span>
          </button>
        </Link>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-center text-gray-300 text-sm mt-auto"> {/* Added mt-auto */}
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} German Citizenship Test Preparation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WrongAnswersPage;