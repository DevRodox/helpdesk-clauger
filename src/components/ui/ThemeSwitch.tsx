import { useLanguage } from '../../hooks';

interface Props {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeSwitch: React.FC<Props> = ({ isDark, toggleTheme }) => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={isDark} onChange={toggleTheme} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors peer-focus:ring-2 peer-focus:ring-primary peer-checked:bg-primary"></div>
        <div className="absolute left-1 top-1 bg-white dark:bg-gray-200 w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
        {isDark ? t.sidebar.dark : t.sidebar.light}
      </span>
    </div>
  );
};