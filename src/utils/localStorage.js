import { QUIZ_ANSWERS_STORAGE_KEY, CURRENT_QUESTION_UUID_KEY, QUESTION_STATE_KEY } from './storageKeys';

/**
 * Saves the user's answer for a specific question
 */
export const saveUserAnswer = (questionUuid, answerId) => {
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
export const getUserAnswer = (questionUuid) => {
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
 * Saves the current question state including translation preferences
 */
export const saveQuestionState = (questionUuid, showTranslation, locale = 'en') => {
  localStorage.setItem(CURRENT_QUESTION_UUID_KEY, questionUuid);
  
  const questionState = {
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
export const getQuestionState = () => {
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