'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Decorative top border */}
      <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center pt-20 pb-12">
        {/* Error Title Section */}
        <div className="mb-6 mt-6 transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-6xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-green-700 mb-2">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Page Not Found
          </h2>
        </div>

        {/* Error Message */}
        <p className="text-lg text-gray-700 max-w-md mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Return Home Button - Using Next.js Link for client-side navigation */}
        <Link href="/">
          <span className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-green-600 rounded-lg shadow-md hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 cursor-pointer inline-block">
            Return to Home Page
          </span>
        </Link>


      </main>

      {/* Footer Section */}
      <footer className="w-full py-6 bg-gray-800 text-center text-gray-300 text-sm">
        <div className="max-w-4xl mx-auto px-4">
          <p>© {new Date().getFullYear()} German Citizenship Test Preparation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}