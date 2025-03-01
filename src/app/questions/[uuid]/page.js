// src/app/questions/[uuid]/page.js
import React from 'react';
import { notFound } from 'next/navigation';
import QuizCard from '@/components/QuizCard';

// Define metadata export function for better SEO
export async function generateMetadata({ params }) {
  // Await the params object before accessing properties
  const resolvedParams = await params;
  const question = await fetchQuestion(resolvedParams.uuid);
  
  if (!question) {
    return {
      title: 'Question Not Found - Quiz App',
    };
  }
  
  return {
    title: `${question.question} - Quiz App`,
    description: `Answer the question: ${question.question}`,
  };
}

// Fetch function placed outside component for better reusability
async function fetchQuestion(uuid) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/${uuid}`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    return null;
  }
}

export default async function QuestionPage({ params }) {
  // Await the params object before accessing properties
  const resolvedParams = await params;
  const uuid = resolvedParams.uuid;
  const question = await fetchQuestion(uuid);

  if (!question) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <QuizCard question={question} />
    </div>
  );
}