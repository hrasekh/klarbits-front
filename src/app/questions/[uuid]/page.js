import React from 'react';
import { notFound } from 'next/navigation';
import QuizCard from '@/components/QuizCard';

async function fetchQuestion(uuid, locale = 'en') {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/${uuid}?locale=${locale}`, {
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

export default async function QuestionPage({ params, searchParams }) {
  const resolvedParams = await params;
  const uuid = resolvedParams.uuid;
  const locale = searchParams?.locale || 'en';
  
  const question = await fetchQuestion(uuid, locale);

  if (!question) {
    notFound();
  }

  return (      
    <QuizCard question={question} />
  );
}