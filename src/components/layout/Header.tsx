interface Props {
  title: string;
  onNotificationClick?: () => void;
  onMenuClick?: () => void;
}

export const Header = ({ title, onNotificationClick, onMenuClick }: Props) => {
  return (
    <header className="h-16 bg-white dark:bg-[#1a2632] border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Abrir menú"
        >
          <span className="material-icons">menu</span>
        </button>
        
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
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