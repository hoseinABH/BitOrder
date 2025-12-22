// Common components
import { Outlet } from 'react-router-dom';
import ThemeToggle from './theme-toggle';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { useState } from 'react';
import UpdateNotification from './update-notification';
import AppVersion from './app-version';
import InstallPrompt from './install-prompt';

export function MainLayout() {
  const { showReload, reloadPage } = useServiceWorker();
  const [showUpdateNotification, setShowUpdateNotification] = useState(true);

  const handleUpdate = () => {
    reloadPage();
  };

  const handleDismiss = () => {
    setShowUpdateNotification(false);
  };
  return (
    <main className="relative container mx-auto min-h-screen px-4 py-4 md:px-8 md:py-16">
      <ThemeToggle className="fixed right-6 bottom-14 z-20" />
      <Outlet />
      {showReload && showUpdateNotification && (
        <UpdateNotification onUpdate={handleUpdate} onDismiss={handleDismiss} />
      )}
      <AppVersion />
      <InstallPrompt />
    </main>
  );
}
