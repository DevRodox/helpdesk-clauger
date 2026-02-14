import { useLanguage } from '../../hooks';
import { SUPPORTED_LANGUAGES, getLanguageLabel } from '../../i18n';

export const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          className={`px-3 py-1 text-xs font-medium rounded transition-all ${
            language === lang
              ? 'bg-white dark:bg-[#2c3b4a] text-primary shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
          aria-label={`Switch to ${getLanguageLabel(lang)}`}
        >
          {getLanguageLabel(lang)}
        </button>
      ))}
    </div>
  );
};