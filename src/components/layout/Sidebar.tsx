import { ThemeSwitch } from '../ui';
import { useTheme } from '../../hooks';

interface Props {
  onBlockedFeature: () => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  icon: string;
  active?: boolean;
  blocked?: boolean;
}

export const Sidebar = ({ onBlockedFeature, isOpen, onClose }: Props) => {
  const { isDark, toggleTheme } = useTheme();

  const navItems: NavItem[] = [
    { label: 'Tickets', icon: 'confirmation_number', active: true },
    { label: 'Usuarios', icon: 'people', blocked: true },
    { label: 'Configuración', icon: 'settings', blocked: true },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.blocked) {
      onBlockedFeature();
    }
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white dark:bg-[#1a2632] 
        border-r border-gray-200 dark:border-gray-700 
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-primary font-bold text-xl">
          <span className="material-icons">support_agent</span>
          HelpDesk
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Cerrar menú"
        >
          <span className="material-icons">close</span>
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item)}
            disabled={item.active}
            className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 font-medium text-sm transition-colors ${
              item.active
                ? 'bg-primary/10 text-primary cursor-default'
                : item.blocked
                ? 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <span className="material-icons text-xl">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
        <div className="w-full px-4 py-2 flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
            Tema
          </span>
          <ThemeSwitch isDark={isDark} toggleTheme={toggleTheme} />
        </div>

        <button
          onClick={onBlockedFeature}
          className="w-full px-4 py-3 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg flex items-center gap-3 font-medium text-sm transition-colors"
        >
          <span className="material-icons text-xl">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};