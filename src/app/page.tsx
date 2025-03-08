// src/app/page.tsx
import ClientHomeComponent from '@/components/ClientHomeComponent';

async function fetchHome() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/home`);

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