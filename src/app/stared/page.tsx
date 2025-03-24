'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Question = {
  uuid: string;
  title: string;
  question: string;
};

const StarredQuestionsPage = () => {
  const [starredQuestions, setStarredQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStarredQuestions = () => {
      try {
        // Get starred question UUIDs
        const starredUuids = JSON.parse(localStorage.getItem('starredQuestions') || '[]');

        if (starredUuids.length === 0) {
          setStarredQuestions([]);
          setIsLoading(false);
          return;
        }

        // Get question details
        const questionDetails = JSON.parse(localStorage.getItem('questionDetails') || '{}');

        // Create complete question objects
        const questions = starredUuids.map((uuid: string) => {
          const details = questionDetails[uuid] || {};

          return {
            uuid,
            title: details.title || `Question with ID: ${uuid.substring(0, 8)}...`,
            question: details.question || ''
          };
        });

        setStarredQuestions(questions);
      } catch (error) {
        console.error('Error loading starred questions:', error);
        setStarredQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadStarredQuestions();
  }, []);

  const removeFromStarred = (uuid: string) => {
    // Remove from state
    setStarredQuestions(prevQuestions =>
      prevQuestions.filter(question => question.uuid !== uuid)
    );

    // Remove from starredQuestions localStorage
    const starredUuids = JSON.parse(localStorage.getItem('starredQuestions') || '[]');
    const updatedStarredUuids = starredUuids.filter((id: string) => id !== uuid);
    localStorage.setItem('starredQuestions', JSON.stringify(updatedStarredUuids));

    // Optionally remove from questionDetails localStorage
    const questionDetails = JSON.parse(localStorage.getItem('questionDetails') || '{}');
    if (questionDetails[uuid]) {
      const { [uuid]: _, ...restQuestions } = questionDetails;
      localStorage.setItem('questionDetails', JSON.stringify(restQuestions));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center pt-20 pb-12">
        <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-700 mb-2">
            Starred Questions
          </h1>
        </div>

        {isLoading ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500 text-lg">Loading starred questions...</div>
            </div>
          </div>
        ) : starredQuestions.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-yellow-500 text-6xl mb-4">⭐</div>
              <p className="text-gray-600 mb-8 text-lg">You haven't starred any questions yet</p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-4">
              {starredQuestions.map(question => (
                <div
                  key={question.uuid}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-yellow-500"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <Link
                        href={`/questions/${question.uuid}`}
                        className="text-xl text-gray-800 font-semibold hover:text-blue-600 transition-colors duration-300"
                      >
                        {question.title}
                      </Link>
                      {question.question && (
                        <p className="text-gray-700 mt-2 line-clamp-2">{question.question}</p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <Link
                        href={`/questions/${question.uuid}`}
                        className="cursor-pointer"
                      >
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform cursor-pointer">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => removeFromStarred(question.uuid)}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-2 px-4 rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform cursor-pointer"
                        aria-label="Unstar this question"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                        Unstar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full max-w-4xl mx-auto mt-16 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <Link href="/" className="cursor-pointer">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 cursor-pointer">
            Home Page <span className="ml-2">→</span>
          </button>
        </Link>
      </main>

      <footer className="w-full py-6 bg-gray-800 text-center text-gray-300 text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} German Citizenship Test Preparation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default StarredQuestionsPage;