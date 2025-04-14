'use client';

import { useSearchParams } from 'next/navigation';
import StateSelection from '@/components/StateSelection';

export default function StateSelectionPage() {
  const searchParams = useSearchParams();
  const initialUuid = searchParams.get('uuid') || '';

  if (!initialUuid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Missing Question ID</h2>
          <p className="text-gray-700 mb-6">
            Unable to proceed without a valid question ID. Please return to the home page and try again.
          </p>
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <main>
      <StateSelection initialUuid={initialUuid} />
    </main>
  );
}
