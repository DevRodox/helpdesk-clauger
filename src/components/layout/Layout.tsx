import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toast } from '../ui';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title = 'Gestión de Tickets' }: Props) => {
  const [showToast, setShowToast] = useState(false);

  const handleBlockedFeature = () => {
    setShowToast(true);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500 ease-in-out">
      <Sidebar onBlockedFeature={handleBlockedFeature} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onNotificationClick={handleBlockedFeature} />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <Toast
        message="Funcionalidad Limitada"
        type="info"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};
