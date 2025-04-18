'use client';

import { StartPracticeButton } from '@/components/Home/StartPracticeButton';
import Footer from '@/components/layout/Footer';

// --- Main Page Component (No changes needed here) ---
export default function ClientHomeComponent({ initialUuid }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Decorative top border */}
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center pt-20 pb-12">
        {/* Title Section */}
        <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-700 mb-2">
            Leben in Deutschland
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Integration Test
          </h2>
        </div>

        {/* Introductory Paragraph */}
        <p className="text-lg text-gray-700 max-w-md mb-10 leading-relaxed">
          Prepare for your German citizenship and integration exams with confidence and ease.
        </p>

        {/* Render the interactive buttons component, passing the initial UUID */}
        <StartPracticeButton initialUuid={initialUuid} />

        {/* Separator */}
        <div className="w-full max-w-4xl mx-auto mt-16 mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* More descriptive text */}
        <p className="text-lg text-gray-700 max-w-2xl mb-12 leading-relaxed">
          Access comprehensive practice tests, study materials, and expert tips to confidently pass your German citizenship and integration exams. Start your journey to German citizenship today.
        </p>

        {/* Features Grid Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-4xl">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-500 flex flex-col">
            <div className="text-blue-500 text-4xl mb-4">📚</div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">310 Questions</h2>
            <p className="text-gray-600 flex-grow">Practice with the complete official question pool for the Einbürgerungstest.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500 flex flex-col">
            <div className="text-green-500 text-4xl mb-4">🎯</div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">Realistic Format</h2>
            <p className="text-gray-600 flex-grow">Experience test conditions similar to the actual examination environment.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-purple-500 flex flex-col">
            <div className="text-purple-500 text-4xl mb-4">📈</div>
            <h2 className="text-xl text-gray-800 font-semibold mb-3">Track Progress</h2>
            <p className="text-gray-600 flex-grow">Monitor your learning journey and watch your improvement over time.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}