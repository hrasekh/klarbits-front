import React from 'react';
import { notFound } from 'next/navigation';
import QuizCard from '@/components/QuizCard';
import { Metadata } from 'next';

// interface Question {
//   id: string;
//   title: string;
//   content: string;
//   uuid: string;
//   question: string;
//   translation?: string;
//   answers: any[];
//   statistic?: {
//     total: number;
//     current: number;
//   };
// }

async function fetchQuestion({uuid, locale = 'en'}) {
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

export async function generateMetadata({ 
  params, 
  searchParams 
}) {
  const uuid = params.uuid;
  const locale = searchParams?.locale || 'en';
  
  const question = await fetchQuestion({uuid, locale});
  
  if (!question) {
    return {
      title: 'Question Not Found',
      description: 'The requested question could not be found.'
    };
  }

  return {
    title: question.title || 'Quiz Question',
    description: question.content?.substring(0, 160) || 'Take this quiz question to test your knowledge.'
  };
}

// Define the page component without type annotations
export default async function QuestionPage(props) {
  const { params, searchParams } = props;
  const uuid = params.uuid;
  const locale = searchParams?.locale || 'en';
  
  const question = await fetchQuestion({uuid, locale});

  if (!question) {
    notFound();
  }

  return (      
    <QuizCard question={question} />
  );
}