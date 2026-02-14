import { useState, useEffect, type ReactNode } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations, SUPPORTED_LANGUAGES, type Language } from '../i18n';

const LANGUAGE_STORAGE_KEY = 'helpdesk-language';

const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0];
  return SUPPORTED_LANGUAGES.includes(browserLang as Language) 
    ? (browserLang as Language) 
    : 'es';
};

const getStoredLanguage = (): Language => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored && SUPPORTED_LANGUAGES.includes(stored as Language)
    ? (stored as Language)
    : getBrowserLanguage();
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};