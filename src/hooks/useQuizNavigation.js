import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Custom hook for handling quiz navigation
 */
const useQuizNavigation = (showTranslation) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateTo = (questionData) => {
    if (!questionData) return;
    
    const newParams = new URLSearchParams();
    newParams.set('showTranslation', showTranslation.toString());
    
    const locale = searchParams.get('locale');
    if (locale) newParams.set('locale', locale);
    
    newParams.set('condition', 1);

    router.push(`/questions/${questionData.uuid}?${newParams.toString()}`);
  };

  return {
    navigateTo
  };
};

export default useQuizNavigation;