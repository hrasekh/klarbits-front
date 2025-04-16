'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Keep for potential future use, though HomePageButton handles main nav
import { getWrongAnswers, getUserState } from '@/utils/localStorage';

// Import Reusable Components
import PageWrapper from '@/components/layout/PageWrapper';
import PageTitle from '@/components/ui/PageTitle';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import QuestionListItem from '@/components/Question/QuestionListItem';
import GradientButton from '@/components/ui/GradientButton';
import DividerLine from '@/components/ui/DividerLine';
import HomePageButton from '@/components/navigation/HomePageButton';

// Define the WrongAnswer type (keep as it was)
interface WrongAnswer {
  questionUuid: string;
  userAnswer: string | number;
  date: string;
  title: string;
  question: string;
}

// Correct Icon for Empty State
const CorrectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const WrongAnswersPage = () => {
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateId, setStateId] = useState<number | null>(null);

  useEffect(() => {
    const loadWrongAnswers = () => {
      // Keep the existing data loading logic
      try {
        const answers = getWrongAnswers();
        answers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setWrongAnswers(answers);
        const userState = getUserState();
        setStateId(userState);
      } catch (error) {
         console.error('Error loading wrong answers:', error);
         setWrongAnswers([]);
      } finally {
         setIsLoading(false);
      }
    };
    loadWrongAnswers();
  }, []);

  const getReviewLink = (questionUuid: string) => {
    // Keep the existing link generation logic
    let reviewUrl = `/questions/${questionUuid}`;
    if (stateId !== null) {
      reviewUrl += `?condition=${stateId}`;
    }
    return reviewUrl;
  };

  return (
    <PageWrapper topBarGradient={{ from: 'from-blue-500', via: 'via-red-500', to: 'to-blue-500' }}>
      <PageTitle
        title="Wrong Answers Review"
        gradientColors={{ from: 'from-blue-700', via: 'via-red-600', to: 'to-blue-700' }}
      />

      {isLoading ? (
        <LoadingState message="Loading wrong answers..." />
      ) : wrongAnswers.length === 0 ? (
        <EmptyState
          icon={<CorrectIcon />}
          message="No Wrong Answers"
          description="Great job! You haven't answered any questions incorrectly yet."
        />
      ) : (
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {wrongAnswers.map(answer => (
              <QuestionListItem
                key={answer.questionUuid}
                title={answer.title}
                question={answer.question}
                linkHref={getReviewLink(answer.questionUuid)} // Link for title and Review button
                borderColor="border-red-500" // Specific border for wrong answers
                actions={ // Pass the Review button
                  <GradientButton
                    asLink // Render as link styled as button
                    href={getReviewLink(answer.questionUuid)}
                    gradient={{ from: 'from-blue-600', to: 'to-blue-700' }} // Default blue gradient
                  >
                    Review
                  </GradientButton>
                }
              />
            ))}
          </div>
        </div>
      )}

      <DividerLine />
      <HomePageButton />
    </PageWrapper>
  );
};

export default WrongAnswersPage;