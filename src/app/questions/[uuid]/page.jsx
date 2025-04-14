import React from 'react';
import { notFound, redirect } from 'next/navigation';
import QuizCard from '@/components/QuizCard';


async function fetchQuestion({uuid, locale = 'en', condition}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/${uuid}?locale=${locale}&condition=${condition}`, {
      next: { revalidate: 10 },
    });

    console.log('Response URL from:', `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/questions/${uuid}?locale=${locale}&condition=${condition}`);

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
  const condition = searchParams?.condition || null;
  
  const question = await fetchQuestion({uuid, locale, condition});
  
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
  const condition = searchParams?.condition || null;

  if (!condition) {
    redirect(`/state-selection?uuid=${uuid}`);
  }
  
  const data = await fetchQuestion({uuid, locale, condition});


  if (!data) {
    notFound();
  }

  return (      
    <QuizCard question={data.question} meta={data.meta} />
  );
}