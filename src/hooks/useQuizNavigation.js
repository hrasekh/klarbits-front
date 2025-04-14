import { useRouter, useSearchParams } from 'next/navigation';
import { getUserState } from '@/utils/localStorage';

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
    
    // Get condition from either current URL or localStorage
    const currentCondition = searchParams.get('condition');
    const stateId = currentCondition || getUserState();
    
    if (stateId !== null) {
      newParams.set('condition', stateId);
    }

    router.push(`/questions/${questionData.uuid}?${newParams.toString()}`);
  };

  return {
    navigateTo
  };
};

export default useQuizNavigation;