import { es } from './es';
import { en } from './en';

export type Language = 'es' | 'en';
export type Translations = typeof es;

export const translations: Record<Language, Translations> = {
  es,
  en,
};

export const SUPPORTED_LANGUAGES: Language[] = ['es', 'en'];

export const getLanguageLabel = (lang: Language): string => {
  const labels: Record<Language, string> = {
    es: 'ES',
    en: 'EN',
  };
  return labels[lang];
};