'use client';

// components/ClientHomeComponent.jsx
import Head from 'next/head';
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
        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg shadow-md transition-colors duration-300 w-full h-12 sm:h-16 flex items-center justify-center">
          {'Start Practice'}
        </button>
      </Link>
      {continueBt && (
        <Link href={`/questions/${questionUuid}`} className="w-full sm:w-1/2">
          <button className="cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-base sm:text-lg shadow-md transition-colors duration-300 w-full h-12 sm:h-16 flex items-center justify-center">
            {'Continue Practice'}
          </button>
        </Link>
      )}
    </div>
  );
}

export default function ClientHomeComponent({ initialUuid }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Head>
        <title>Einbürgerungstest Practice</title>
        <meta name="description" content="Practice for your German citizenship test (Einbürgerungstest)" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Einbürgerungstest Practice
        </h1>
        
        <p className="text-lg text-gray-600 max-w-md mb-8">
          Prepare for your German citizenship test with our comprehensive practice questions and study materials.
        </p>
        
        {/* Use the client-side button component */}
        <StartPracticeButton initialUuid={initialUuid} />
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-gray-800 font-semibold mb-2">312 Questions</h2>
            <p className="text-gray-600">Practice all of the official question pool for the Einbürgerungstest.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-gray-800 font-semibold mb-2">Realistic Format</h2>
            <p className="text-gray-600">Experience the test in conditions similar to the actual examination.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl text-gray-800 font-semibold mb-2">Track Progress</h2>
            <p className="text-gray-600">Monitor your learning and see improvement over time.</p>
          </div>
        </div>
      </main>
    </div>
  );
}