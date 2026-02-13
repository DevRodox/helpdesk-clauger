import { useEffect } from 'react';

interface Props {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  type = 'info',
  isVisible,
  onClose,
  duration = 3000,
}: Props) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const styles = {
    info: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-yellow-600 text-white',
    error: 'bg-red-600 text-white',
  };

  const icons = {
    info: 'info',
    success: 'check_circle',
    warning: 'warning',
    error: 'error',
  };

  return (
    <div className="fixed top-4 right-4 z-60 animate-[slideIn_0.3s_ease-out]">
      <div
        className={`${styles[type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-75 max-w-md`}
      >
        <span className="material-icons">{icons[type]}</span>
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
          <span className="material-icons text-lg">close</span>
        </button>
      </div>
    </div>
  );
};
