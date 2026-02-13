interface Props {
  title: string;
  onNotificationClick?: () => void;
}

export const Header = ({ title, onNotificationClick }: Props) => {
  return (
    <header className="h-16 bg-white dark:bg-[#1a2632] border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-8">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={onNotificationClick}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Notificaciones"
        >
          <span className="material-icons">notifications</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
          JS
        </div>
      </div>
    </header>
  );
};
