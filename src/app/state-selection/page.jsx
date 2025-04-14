// app/state-selection/page.tsx (or your actual page file path)

import React, { Suspense } from 'react'; // Import Suspense
import StateSelectionClientWrapper from '@/components/StateSelectionClientWrapper'; // Adjust path

function LoadingStateSelection() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div
        role="status"
        aria-live="polite"
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"
      >
        <span className="sr-only">Loading state selection...</span>
      </div>
    </div>
  );
}

export default function StateSelectionPage() {
  return (
    <main>
      <Suspense fallback={<LoadingStateSelection />}>
        <StateSelectionClientWrapper />
      </Suspense>
    </main>
  );
}