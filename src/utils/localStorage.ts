import { 
  QUIZ_ANSWERS_STORAGE_KEY, 
  WRONG_ANSWERS_STORAGE_KEY,
  CURRENT_QUESTION_UUID_KEY, 
  QUESTION_STATE_KEY,
  USER_STATE_SELECTION_KEY
} from './storageKeys';

interface QuestionState {
  uuid: string;
  showTranslation: boolean;
  locale: string;
  lastVisited: string;
}

interface WrongAnswer {
  questionUuid: string;
  userAnswer: string | number;
  date: string;
  title: string;
  question: string;
}

/**
 * Saves the user's answer for a specific question
 */
export const saveUserAnswer = (questionUuid: string, answerId: string | number) => {
  try {
    const storedAnswersRaw = localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
    const storedAnswers = storedAnswersRaw ? JSON.parse(storedAnswersRaw) : {};
    storedAnswers[questionUuid] = answerId;
    localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify(storedAnswers));
  } catch (error) {
    console.error("Failed to save answer to localStorage:", error);
  }
};

/**
 * Gets the previously selected answer for a question
 * Returns null if no answer was found
 */
export const getUserAnswer = (questionUuid: string): string | number | null => {
  try {
    const storedAnswersRaw = localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
    if (storedAnswersRaw) {
      const storedAnswers = JSON.parse(storedAnswersRaw);
      return storedAnswers[questionUuid] || null;
    }
  } catch (error) {
    console.error("Failed to parse stored answers:", error);
  }
  return null;
};

/**
 * Saves the user's selected German state
 */
export const saveUserState = (stateId: number): boolean => {
  try {
    localStorage.setItem(USER_STATE_SELECTION_KEY, stateId.toString());
    return true;
  } catch (error) {
    console.error("Failed to save state selection to localStorage:", error);
    return false;
  }
};

/**
 * Gets the user's previously selected German state
 * Returns null if no state was selected
 */
export const getUserState = (): number | null => {
  try {
    const stateId = localStorage.getItem(USER_STATE_SELECTION_KEY);
    return stateId ? parseInt(stateId, 10) : null;
  } catch (error) {
    console.error("Failed to parse stored state selection:", error);
    return null;
  }
};

/**
 * Saves the current question state including translation preferences
 */
export const saveQuestionState = (questionUuid: string, showTranslation: boolean, locale = 'en'): void => {
  localStorage.setItem(CURRENT_QUESTION_UUID_KEY, questionUuid);
  
  const questionState: QuestionState = {
    uuid: questionUuid,
    showTranslation: showTranslation,
    locale: locale,
    lastVisited: new Date().toISOString()
  };
  
  localStorage.setItem(QUESTION_STATE_KEY, JSON.stringify(questionState));
};

/**
 * Gets the previously saved question state
 */
export const getQuestionState = (): QuestionState | null => {
  try {
    const stateRaw = localStorage.getItem(QUESTION_STATE_KEY);
    if (stateRaw) {
      return JSON.parse(stateRaw);
    }
  } catch (error) {
    console.error("Failed to parse question state:", error);
  }
  return null;
};

/**
 * Clears all quiz related data from localStorage
 */
export const clearQuizData = (): boolean => {
  try {
    localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify({}));
    localStorage.removeItem(CURRENT_QUESTION_UUID_KEY);
    localStorage.removeItem(QUESTION_STATE_KEY);
    localStorage.removeItem(WRONG_ANSWERS_STORAGE_KEY); 
    return true;
  } catch (error) {
    console.error("Failed to clear quiz data:", error);
    return false;
  }
};

/**
 * Checks if the user has any saved progress
 * Returns true if there are saved answers
 */
export const hasSavedProgress = (): boolean => {
  try {
    const storedAnswersString = localStorage.getItem(QUIZ_ANSWERS_STORAGE_KEY);
    if (storedAnswersString) {
      const storedAnswers = JSON.parse(storedAnswersString);
      return typeof storedAnswers === 'object' && 
             storedAnswers !== null && 
             Object.keys(storedAnswers).length > 0;
    }
  } catch (error) {
    console.error("Error checking for saved progress:", error);
  }
  return false;
};

export const recordWrongAnswer = (
  questionUuid: string, 
  userAnswer: string | number,
  title: string,
  question: string
): boolean => {
  try {
    const wrongAnswersRaw = localStorage.getItem(WRONG_ANSWERS_STORAGE_KEY);
    const wrongAnswers: WrongAnswer[] = wrongAnswersRaw ? JSON.parse(wrongAnswersRaw) : [];
    
    // Check if this question is already in wrong answers
    const existingIndex = wrongAnswers.findIndex(item => item.questionUuid === questionUuid);
    
    if (existingIndex >= 0) {
      // Update existing entry
      wrongAnswers[existingIndex] = {
        questionUuid,
        userAnswer,
        title,
        question,
        date: new Date().toISOString()
      };
    } else {
      // Add new entry
      wrongAnswers.push({
        questionUuid,
        userAnswer,
        title,
        question,
        date: new Date().toISOString()
      });
    }
    
    localStorage.setItem(WRONG_ANSWERS_STORAGE_KEY, JSON.stringify(wrongAnswers));
    return true;
  } catch (error) {
    console.error("Failed to save wrong answer to localStorage:", error);
    return false;
  }
};

/**
 * Gets all wrong answers
 */
export const getWrongAnswers = (): WrongAnswer[] => {
  try {
    const wrongAnswersRaw = localStorage.getItem(WRONG_ANSWERS_STORAGE_KEY);
    return wrongAnswersRaw ? JSON.parse(wrongAnswersRaw) : [];
  } catch (error) {
    console.error("Failed to get wrong answers from localStorage:", error);
    return [];
  }
};

/**
 * Checks if there are any wrong answers saved
 */
export const hasWrongAnswers = (): boolean => {
  try {
    const wrongAnswersRaw = localStorage.getItem(WRONG_ANSWERS_STORAGE_KEY);
    if (wrongAnswersRaw) {
      const wrongAnswers = JSON.parse(wrongAnswersRaw);
      return Array.isArray(wrongAnswers) && wrongAnswers.length > 0;
    }
    return false;
  } catch (error) {
    console.error("Error checking for wrong answers:", error);
    return false;
  }
};

/**
 * Remove a specific wrong answer by questionUuid
 */
export const removeWrongAnswer = (questionUuid: string): boolean => {
  try {
    const wrongAnswersRaw = localStorage.getItem(WRONG_ANSWERS_STORAGE_KEY);
    if (wrongAnswersRaw) {
      const wrongAnswers: WrongAnswer[] = JSON.parse(wrongAnswersRaw);
      const updatedWrongAnswers = wrongAnswers.filter(item => item.questionUuid !== questionUuid);
      localStorage.setItem(WRONG_ANSWERS_STORAGE_KEY, JSON.stringify(updatedWrongAnswers));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to remove wrong answer:", error);
    return false;
  }
};

/**
 * Clears all wrong answers
 */
export const clearWrongAnswers = (): boolean => {
  try {
    localStorage.setItem(WRONG_ANSWERS_STORAGE_KEY, JSON.stringify([]));
    return true;
  } catch (error) {
    console.error("Failed to clear wrong answers:", error);
    return false;
  }
};


/**
 * Completely resets all quiz and preference data
 * This is more aggressive than clearQuizData as it also removes state selection
 */
export const resetAllQuizData = (): boolean => {
  try {
    localStorage.setItem(QUIZ_ANSWERS_STORAGE_KEY, JSON.stringify({}));
    localStorage.removeItem(CURRENT_QUESTION_UUID_KEY);
    localStorage.removeItem(QUESTION_STATE_KEY);
    localStorage.removeItem(USER_STATE_SELECTION_KEY);
    localStorage.removeItem(WRONG_ANSWERS_STORAGE_KEY); 
    return true;
  } catch (error) {
    console.error("Failed to reset all quiz data:", error);
    return false;
  }
};