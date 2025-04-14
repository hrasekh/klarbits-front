"use client";

import { useSearchParams } from 'next/navigation';
import StateSelection from '@/components/StateSelection'; // Keep the original component
import Link from 'next/link'; // Use Next.js Link for client-side navigation

export default function StateSelectionClientWrapper() {
  const searchParams = useSearchParams();
  const initialUuid = searchParams.get('uuid');

  if (!initialUuid) {
    // Render the error state directly within the client component
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center shadow-md">
          <h2 className="text-xl font-semibold text-red-700 mb-4">
            Missing Required Information
          </h2>
          <p className="text-gray-700 mb-6">
            The question identifier (UUID) is missing from the URL. Please go back or return to the home page and try selecting a question again.
          </p>
          {/* Use Next.js Link for better SPA navigation */}
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }


  return <StateSelection initialUuid={initialUuid} />;
}