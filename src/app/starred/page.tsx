'use client';

import React, { useState, useEffect } from 'react';
// Removed Link import as it's handled by HomePageButton and GradientButton with asLink

// Import Reusable Components (adjust paths if your structure is different)
import PageWrapper from '@/components/layout/PageWrapper';
import PageTitle from '@/components/ui/PageTitle';
import LoadingState from '@/components/ui/LoadingState';
import EmptyState from '@/components/ui/EmptyState';
import QuestionListItem from '@/components/Question/QuestionListItem';
import GradientButton from '@/components/ui/GradientButton';
import DividerLine from '@/components/ui/DividerLine';
import HomePageButton from '@/components/navigation/HomePageButton';
import { getUserState } from '@/utils/localStorage';

// Define the Question type (keep as it was)
type Question = {
  uuid: string;
  title: string;
  question: string;
};

// Star Icon for Empty State
const StarIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-yellow-500">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

// Unstar Icon for Button (can be reused or kept specific if needed)
const UnstarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
     <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);


const StarredQuestionsPage = () => {
  const [starredQuestions, setStarredQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stateId, setStateId] = useState<number | null>(null);

  const getReviewLink = (questionUuid: string) => {
    // Keep the existing link generation logic
    let reviewUrl = `/questions/${questionUuid}`;
    if (stateId !== null) {
      reviewUrl += `?condition=${stateId}`;
    }
    return reviewUrl;
  };

  // --- Data Loading Logic (Unchanged) ---
  useEffect(() => {
    const loadStarredQuestions = () => {
      try {
        const starredUuids = JSON.parse(localStorage.getItem('starredQuestions') || '[]');
        if (starredUuids.length === 0) {
          setStarredQuestions([]);
          setIsLoading(false);
          return;
        }
        const questionDetails = JSON.parse(localStorage.getItem('questionDetails') || '{}');
        const questions = starredUuids.map((uuid: string) => {
          const details = questionDetails[uuid] || {};
          return {
            uuid,
            title: details.title || `Question with ID: ${uuid.substring(0, 8)}...`,
            question: details.question || ''
          };
        });
        setStarredQuestions(questions);
        const userState = getUserState();
        setStateId(userState);
      } catch (error) {
        console.error('Error loading starred questions:', error);
        setStarredQuestions([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadStarredQuestions();
  }, []);

  // --- Removal Logic (Unchanged) ---
  const removeFromStarred = (uuid: string) => {
    setStarredQuestions(prevQuestions =>
      prevQuestions.filter(question => question.uuid !== uuid)
    );
    const starredUuids = JSON.parse(localStorage.getItem('starredQuestions') || '[]');
    const updatedStarredUuids = starredUuids.filter((id: string) => id !== uuid);
    localStorage.setItem('starredQuestions', JSON.stringify(updatedStarredUuids));
    const questionDetails = JSON.parse(localStorage.getItem('questionDetails') || '{}');
    if (questionDetails[uuid]) {
      const restQuestions = { ...questionDetails };
      delete restQuestions[uuid];
      localStorage.setItem('questionDetails', JSON.stringify(restQuestions));
    }
  };

  // --- Render using Reusable Components ---
  return (
    <PageWrapper topBarGradient={{ from: 'from-blue-500', via: 'via-green-500', to: 'to-blue-500' }}>
      <PageTitle
        title="Starred Questions"
      />

      {isLoading ? (
        // Use LoadingState Component
        <LoadingState message="Loading starred questions..." />
      ) : starredQuestions.length === 0 ? (
        // Use EmptyState Component
        <EmptyState
          icon={<StarIcon />} // Pass the icon component
          message="Nothing Starred Yet"
          description="You haven't starred any questions yet. Star questions during quizzes to review them here."
        />
      ) : (
        // Use QuestionListItem Component for the list
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {starredQuestions.map(question => (
              <QuestionListItem
                key={question.uuid}
                title={question.title}
                question={question.question}
                linkHref={getReviewLink(question.uuid)}
                borderColor="border-yellow-500"
                actions={
                  <>
                    <GradientButton
                      asLink // Render as link styled as button
                      href={getReviewLink(question.uuid)}
                    >
                      View
                    </GradientButton>
                    <GradientButton
                      onClick={() => removeFromStarred(question.uuid)}
                      gradient={{ from: 'from-yellow-500', to: 'to-yellow-600' }} // Yellow gradient
                      ariaLabel="Unstar this question"
                    >
                      <UnstarIcon />
                      Unstar
                    </GradientButton>
                  </>
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

export default StarredQuestionsPage;