"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    clearQuizData,
    hasSavedProgress,
    getUserState,
    getQuestionState,
    hasWrongAnswers
} from '@/utils/localStorage';

// --- Base Button Styles ---
// Define common styles to avoid repetition
const baseButtonStyles = "group flex items-center justify-center w-full px-6 py-4 rounded-lg text-base sm:text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:-translate-y-0.5 cursor-pointer";

// --- Button Variant Styles ---
// Define styles for different button types
const buttonVariants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    warning: "bg-yellow-600 hover:bg-yellow-600 text-white focus:ring-yellow-400",
    danger:  "bg-red-600 hover:bg-red-600 text-white focus:ring-red-500",
};

export const StartPracticeButton = ({ initialUuid }) => {
    const router = useRouter();
    const [questionUuid, setQuestionUuid] = useState(initialUuid);
    const [hasSavedAnswers, setHasSavedAnswers] = useState(false);
    const [hasWrongAnswersList, setHasWrongAnswersList] = useState(false);

    useEffect(() => {
        // Check localStorage only on the client-side after mount
        setHasSavedAnswers(hasSavedProgress());
        setHasWrongAnswersList(hasWrongAnswers());

        const questionState = getQuestionState();
        if (questionState && questionState.uuid) {
            setQuestionUuid(questionState.uuid);
        } else {
            setQuestionUuid(initialUuid);
        }
    }, [initialUuid]);

    const handleStartPracticeClick = (event) => {
        event.preventDefault();
        if (hasSavedAnswers) {
            const userConfirmed = window.confirm(
                "Are you sure you want to start over? This will delete your previous answers and progress."
            );
            if (!userConfirmed) return;
            clearQuizData();
            setHasSavedAnswers(false); // Update state immediately for UI feedback
            setHasWrongAnswersList(false); // Assume starting over clears wrong answers too
        }
        // Always start from the state selection with the initial topic UUID
        router.push(`/state-selection?uuid=${initialUuid}`);
    };

    const handleContinueClick = (event) => {
        event.preventDefault();
        const stateId = getUserState();
        const questionState = getQuestionState();

        let continueUrl = `/questions/${questionUuid}`; // Use current/saved questionUuid
        const queryParams = [];

        if (stateId !== null) {
            queryParams.push(`condition=${stateId}`);
        }
        if (questionState?.showTranslation) {
            queryParams.push('showTranslation=true');
        }

        if (queryParams.length > 0) {
            continueUrl += `?${queryParams.join('&')}`;
        }

        router.push(continueUrl);
    };

    // Determine primary action text
    const startButtonText = hasSavedAnswers ? 'Start Over' : 'Start Practice';

    return (
        // Use Grid for layout: 1 column on small, 2 columns on sm+
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">

            {/* Start Practice / Start Over Button */}
            <button
                onClick={handleStartPracticeClick}
                className={`${baseButtonStyles} ${buttonVariants.primary}`}
            >
                {startButtonText}
                {/* Icon removed */}
            </button>

            {/* Continue Button (Conditional) */}
            {hasSavedAnswers && (
                <button
                    onClick={handleContinueClick}
                    className={`${baseButtonStyles} ${buttonVariants.success}`}
                >
                    Continue Practice
                    {/* Icon removed */}
                </button>
            )}

            {/* Starred Questions Link/Button (Conditional) */}
            {/* Only show if saved answers exist, as starring requires progress */}
            {hasSavedAnswers && (
                <Link href="/starred" legacyBehavior>
                    <a className={`${baseButtonStyles} ${buttonVariants.warning}`}>
                        Starred Questions
                        {/* Icon removed */}
                    </a>
                </Link>
            )}

            {/* Wrong Answers Link/Button (Conditional) */}
            {hasWrongAnswersList && (
                <Link href="/wrong-answers" legacyBehavior>
                     <a className={`${baseButtonStyles} ${buttonVariants.danger}`}>
                        Review Wrong Answers
                        {/* Icon removed */}
                    </a>
                </Link>
            )}
        </div>
    );
};
