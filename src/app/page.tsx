// src/app/page.tsx
import ClientHomeComponent from '@/components/ClientHomeComponent';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Klarbits - Einbürgerungstest Practice',
  description: 'Practice for your German citizenship test (Einbürgerungstest)',
};

async function fetchHome() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/home`, {
      next: { revalidate: 60 },
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

export default async function Home() {
  const home = await fetchHome();
  const initialUuid = home?.citizenship_test?.uuid;

  return <ClientHomeComponent initialUuid={initialUuid} />;
}