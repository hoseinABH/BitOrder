import { useEffect, useState } from 'react';

interface UseServiceWorkerReturn {
  showReload: boolean;
  reloadPage: () => void;
}

export const useServiceWorker = (): UseServiceWorkerReturn => {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showReload, setShowReload] = useState<boolean>(false);

  useEffect(() => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration: ServiceWorkerRegistration) => {
          console.log('Service Worker registered:', registration);

          // Check if there's a waiting worker
          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
            setShowReload(true);
          }

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  setWaitingWorker(newWorker);
                  setShowReload(true);
                }
              });
            }
          });
        })
        .catch((error: Error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for controller change (when new SW takes over)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const reloadPage = (): void => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return { showReload, reloadPage };
};
