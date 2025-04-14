"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GERMAN_STATES } from '@/utils/germanStates'; // Assuming this contains { id: number, name: string }[]
import { saveUserState, getUserState } from '@/utils/localStorage';

interface StateSelectionProps {
  initialUuid: string;
}

const StateSelection = ({ initialUuid }: StateSelectionProps) => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedStateId = getUserState();
    if (savedStateId !== null) {
      setSelectedState(savedStateId);
    }
    setLoading(false);
  }, []);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedState(parseInt(e.target.value, 10));
  };

  const handleDivClick = (stateId: number) => {
    setSelectedState(stateId);
  };

  const handleContinue = () => {
    if (selectedState !== null) {
      saveUserState(selectedState);
      router.push(`/questions/${initialUuid}?condition=${selectedState}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div
          role="status"
          aria-live="polite"
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-gray-100 relative">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>

      {/* Content Card - Further adjusted max-width for xl screens */}
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl bg-white rounded-lg shadow-xl p-6 md:p-8"> {/* Increased xl:max-w */}
        <h1 id="state-selection-heading" className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          Select Your German State
        </h1>

        <p className="text-gray-600 text-sm sm:text-base mb-6 text-center md:text-left">
          Please choose your state to view relevant quiz questions. Your selection will be saved for future visits.
        </p>

        {/* State Selection Grid - Added xl:grid-cols-4 */}
        <div
          role="radiogroup"
          aria-labelledby="state-selection-heading"
          // Updated Grid Classes: 1 col default, 2 on md+, 3 on lg+, 4 on xl+
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-8"
        >
          {GERMAN_STATES.map((state) => (
            <div
              key={state.id}
              className={`
                rounded-lg border p-3 md:p-4 cursor-pointer transition-all duration-150 ease-in-out
                flex items-center /* Use flex to align radio/text nicely */
                ${selectedState === state.id
                  ? 'border-blue-600 bg-blue-50 shadow-md ring-2 ring-blue-300 ring-offset-1'
                  : 'border-gray-200 bg-white hover:border-blue-400 hover:bg-gray-50'
                }
              `}
              onClick={() => handleDivClick(state.id)}
            >
              <label className="flex items-center cursor-pointer w-full">
                  <input
                    type="radio"
                    name="stateSelection"
                    value={state.id}
                    checked={selectedState === state.id}
                    onChange={handleStateChange}
                    className="mr-3 flex-shrink-0 h-4 w-4 md:h-5 md:w-5 accent-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                  />
                  <span className="text-sm sm:text-base text-gray-800 select-none">
                    {state.name}
                  </span>
              </label>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedState === null}
          className={`
            w-full py-3 md:py-4 rounded-lg font-semibold text-base sm:text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-all duration-300 ease-in-out
            ${selectedState === null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5'
            }
          `}
        >
          Continue to Questions
        </button>
      </div>
    </div>
  );
};

export default StateSelection;