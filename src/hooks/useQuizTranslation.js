import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * Custom hook for managing translation state and URL parameters
 */
const useQuizTranslation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [showTranslation, setShowTranslation] = useState(
    searchParams.get('showTranslation') === 'true'
  );

  // Update state when URL parameters change
  useEffect(() => {
    setShowTranslation(searchParams.get('showTranslation') === 'true');
  }, [searchParams]);

  // Toggle translation and update URL
  const toggleTranslation = () => {
    const newShowTranslation = !showTranslation;
    setShowTranslation(newShowTranslation);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('showTranslation', newShowTranslation.toString());
    
    const locale = searchParams.get('locale');
    if (locale) newParams.set('locale', locale);

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return {
    showTranslation,
    toggleTranslation
  };
};

export default useQuizTranslation;