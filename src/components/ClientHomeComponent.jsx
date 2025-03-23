'use client';

// components/ClientHomeComponent.jsx
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Client-side component to handle localStorage
function StartPracticeButton({ initialUuid }) {
  const [questionUuid, setQuestionUuid] = useState(initialUuid);

  useEffect(() => {
    // Check localStorage for the current question UUID
    const storedUuid = localStorage.getItem('currentQuestionUuid');
    if (storedUuid) {
      setQuestionUuid(storedUuid);
    }
  }, []);

  const continueBt = questionUuid !== initialUuid;

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
      <Link href={`/questions/${initialUuid}`} className={`w-full ${!continueBt ? '' : 'sm:w-1/2'}`}>
        <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1">
          Start Practice
        </button>
      </Link>
      {continueBt && (
        <Link href={`/questions/${questionUuid}`} className="w-full sm:w-1/2">
          <button className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1">
            Continue Practice
          </button>
        </Link>
      )}
    </div>
  );
}

export default function ClientHomeComponent({ initialUuid }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center pt-20 pb-12">
        <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-700 mb-2">
            Leben in Deutschland
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Integration Test
          </h2>
        </div>

        <p className="text-lg text-gray-700 max-w-md mb-10 leading-relaxed">
          Prepare for your German citizenship and integration exams with confidence and ease.
        </p>

        <StartPracticeButton initialUuid={initialUuid} />

        <div className="w-full max-w-4xl mx-auto mt-16 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <p className="text-lg text-gray-700 max-w-2xl mb-12 leading-relaxed">
          Access comprehensive practice tests, study materials, and expert tips to confidently pass your German citizenship and integration exams. Start your journey to German citizenship today.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500 flex flex-col">
            <div className="text-blue-500 text-4xl mb-4">📚</div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">312 Questions</h2>
            <p className="text-gray-600 flex-grow">Practice with the complete official question pool for the Einbürgerungstest.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500 flex flex-col">
            <div className="text-green-500 text-4xl mb-4">🎯</div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">Realistic Format</h2>
            <p className="text-gray-600 flex-grow">Experience test conditions similar to the actual examination environment.</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500 flex flex-col">
            <div className="text-purple-500 text-4xl mb-4">📈</div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">Track Progress</h2>
            <p className="text-gray-600 flex-grow">Monitor your learning journey and watch your improvement over time.</p>
          </div>
        </div>

        <div className="mt-16 bg-white p-6 rounded-xl shadow-lg max-w-4xl w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-left mb-6 sm:mb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready?</h3>
              <p className="text-gray-600">Start practicing now and pass your test with confidence.</p>
            </div>
            <Link href={`/questions/${initialUuid}`}>
              <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-base shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1">
                Begin Your Journey <span className="ml-2">→</span>
              </button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 bg-gray-800 text-center text-gray-300 text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} German Citizenship Test Preparation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}