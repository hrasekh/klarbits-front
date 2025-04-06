export const rtlByText = (str: string) => {
  const arabicRegex = /[\u0600-\u06FF]/;
  const hebrewRegex = /[\u0590-\u05FF]/;
  const persianRegex = /[\u0750-\u077F]/;

  return arabicRegex.test(str) || hebrewRegex.test(str) || persianRegex.test(str);
}

export const rtlByLocale = (locale: string) => {
  const rtlLocales = ['ar', 'he', 'fa', 'ur', 'dv', 'yi', 'jgo', 'ps'];
  return rtlLocales.includes(locale);
}
