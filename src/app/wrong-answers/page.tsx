"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWrongAnswers, removeWrongAnswer, clearWrongAnswers, getUserState } from '@/utils/localStorage';

interface WrongAnswer {
  questionUuid: string;
  userAnswer: string | number;
  correctAnswer: string | number;
  date: string;
}

export default function WrongAnswersPage() {
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateId, setStateId] = useState<number | null>(null);

  useEffect(() => {
    // Load wrong answers from localStorage
    const loadWrongAnswers = () => {
      const answers = getWrongAnswers();
      // Sort by date (newest first)
      answers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setWrongAnswers(answers);
      
      // Get user's state selection for review links
      const userState = getUserState();
      setStateId(userState);
      
      setIsLoading(false);
    };

    loadWrongAnswers();
  }, []);

  const handleRemoveItem = (uuid: string) => {
    removeWrongAnswer(uuid);
    setWrongAnswers(prev => prev.filter(item => item.questionUuid !== uuid));
  };

  const handleClearAll = () => {
    const confirmed = window.confirm("Are you sure you want to clear all wrong answers?");
    if (confirmed) {
      clearWrongAnswers();
      setWrongAnswers([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getReviewLink = (questionUuid: string) => {
    let reviewUrl = `/questions/${questionUuid}`;
    if (stateId !== null) {
      reviewUrl += `?condition=${stateId}`;
    }
    return reviewUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Wrong Answers</h1>
        <div className="flex gap-4">
          <Link href="/">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </button>
          </Link>
          
          {wrongAnswers.length > 0 && (
            <button 
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : wrongAnswers.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-700">No Wrong Answers</h2>
          <p className="mt-2 text-gray-500">You haven't answered any questions incorrectly yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {wrongAnswers.map((answer, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-2">{formatDate(answer.date)}</p>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Question ID: {answer.questionUuid}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-red-50 p-4 rounded-md border border-red-100">
                      <div className="font-medium text-gray-700 mb-2">Your Answer:</div>
                      <div className="text-red-600 font-medium">{answer.userAnswer.toString()}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex ml-4">
                  <Link href={getReviewLink(answer.questionUuid)}>
                    <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors mr-2">
                      Try Again
                    </button>
                  </Link>
                  
                  <button 
                    onClick={() => handleRemoveItem(answer.questionUuid)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
