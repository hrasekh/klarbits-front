import Link from 'next/link';
import { useEffect, useState } from 'react';

// Define constants for localStorage keys
const QUIZ_ANSWERS_STORAGE_KEY = 'quizUserAnswers';
const CURRENT_QUESTION_UUID_KEY = 'currentQuestionUuid';

// --- Client-side component to handle localStorage and buttons ---
export const StartPracticeButton = ({ initialUuid }: { initialUuid: string }) => {
  // State for the UUID to continue from (still useful for the Continue button's link)
  const [questionUuid, setQuestionUuid] = useState(initialUuid);
  // State to specifically track if there are saved answers in localStorage
  const [hasSavedAnswers, setHasSavedAnswers] = useState(false); // Default to false

  // Effect to check localStorage on component mount
  useEffect(() => {
    // 1. Check for current question UUID (for the 'Continue' link target)
    const storedUuid = localStorage.getItem(CURRENT_QUESTION_UUID_KEY);
    if (storedUuid && storedUuid !== 'undefined' && storedUuid !== 'null') {
      setQuestionUuid(storedUuid);
    } else {
      setQuestionUuid(initialUuid);
      if (storedUuid === 'undefined' || storedUuid === 'null') {
        localStorage.removeItem(CURRENT_QUESTION_UUID_KEY);
      }
    }

    // 2. Check if there are any saved answers
    let answersExist = false; // Assume no answers exist initially
    const storedAnswersString = localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
    if (storedAnswersString) {
      try {
        const storedAnswers = JSON.parse(storedAnswersString);
        // Check if the parsed value is a non-null object and has at least one key
        if (typeof storedAnswers === 'object' && storedAnswers !== null && Object.keys(storedAnswers).length > 0) {
          answersExist = true;
        }
      } catch (error) {
        console.error("Error reading quiz answers from localStorage:", error);
        // If parsing fails, treat it as no valid answers exist
        // Clear potentially corrupted data
        localStorage.removeItem(QUIZ_ANSWERS_STORAGE_KEY);
      }
    }
    setHasSavedAnswers(answersExist); // Update the state based on the check

  }, [initialUuid]); // Dependency array includes initialUuid

  // Handler for the "Start Practice" / "Start Over" button click
  const handleStartPracticeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Use the hasSavedAnswers state to determine if confirmation is needed
    if (hasSavedAnswers) {
      const userConfirmed = window.confirm(
        "Are you sure you want to start over? This will delete your previous answers and progress."
      );

      if (!userConfirmed) {
        event.preventDefault(); // Prevent navigation if user cancels
        return;
      }
    }

    // Clear storage if it's the first time or if the user confirmed "Start Over"
    localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify({}));
    localStorage.removeItem(CURRENT_QUESTION_UUID_KEY);

    // Update state immediately to reflect the cleared progress *before* navigation
    setHasSavedAnswers(false);
    setQuestionUuid(initialUuid); // Reset the target UUID state as well

    // Allow Link navigation to proceed
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
      {/* --- Start Practice / Start Over Button --- */}
      <Link
        href={`/questions/${initialUuid}`}
        // Conditional width based on whether other buttons are shown
        className={`w-full ${!hasSavedAnswers ? '' : 'sm:w-1/2'}`}
      >
        <button
          onClick={handleStartPracticeClick} // Attach click handler
          className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1"
        >
          {/* Text depends on whether saved answers exist */}
          Start {hasSavedAnswers ? 'Over' : 'Practice'}
        </button>
      </Link>

      {/* --- Continue Button (Conditional) --- */}
      {/* Show if saved answers exist */}
      {hasSavedAnswers && (
        // Link target still uses questionUuid state (which was read from localStorage)
        <Link href={`/questions/${questionUuid}`} className="w-full sm:w-1/2">
          <button className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1">
            Continue
          </button>
        </Link>
      )}

      {/* --- Starred Questions Button (Conditional) --- */}
      {/* Show if saved answers exist */}
      {hasSavedAnswers && (
        <Link href={"/stared"} className="w-full sm:w-1/2">
          <button className="cursor-pointer bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full h-14 sm:h-16 flex items-center justify-center transform hover:-translate-y-1">
            Starred Questions
          </button>
        </Link>
      )}
    </div>
  );
}
