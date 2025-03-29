"use client";

// Create a map to store audio instances
const audioMap: Map<string, HTMLAudioElement> = new Map();

/**
 * Gets or creates an audio instance
 * @param {string} soundPath - Path to the sound file
 * @returns {HTMLAudioElement} Audio element
 */
export const getAudio = (soundPath: string): HTMLAudioElement => {
  if (!audioMap.has(soundPath)) {
    audioMap.set(soundPath, new Audio(soundPath));
  }
  return audioMap.get(soundPath) as HTMLAudioElement;
};

/**
 * Plays a sound file
 * @param {string} soundPath - Path to the sound file
 * @param {string | null} fallbackMessage - Optional message to show if sound fails to play
 * @returns {Promise<void>} Promise that resolves when sound finishes playing
 */
export const playSound = (soundPath: string): Promise<void> => {
  const audio = getAudio(soundPath);
  
  // Reset the audio to the beginning if it was already playing
  audio.currentTime = 0;
  
  return audio.play().catch((error: Error) => {
    console.error("Error playing sound:", error);
  });
};

/**
 * Plays wrong answer sound
 * @param {string | null} customPath - Optional custom path to wrong sound
 * @returns {Promise<void>} Promise from playSound
 */
export const playWrongAnswerSound = (): Promise<void> => {
  const soundPath = '/wrong.mp3';
  return playSound(soundPath);
};

export const playCorrectAnswerSound = (): Promise<void> => {
  const soundPath = '/correct.mp3';
  return playSound(soundPath);
}

/**
 * Cleanup function to stop all sounds and clear references
 */
export const cleanupSounds = (): void => {
  audioMap.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
  audioMap.clear();
};