import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { useEffect, useState } from 'react';

interface InstallPopupProps {
  delay?: number; // Delay in milliseconds before showing popup
}

export default function InstallPrompt({ delay = 3000 }: InstallPopupProps) {
  const { isInstallable, isInstalled, handleInstall } = useInstallPrompt();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, delay]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleInstallClick = async () => {
    await handleInstall();
    setShowPopup(false);
  };

  if (!showPopup || isInstalled) return null;

  return (
    <>
      <div className="install-popup-overlay" onClick={handleClose} />
      <div className="install-popup">
        <button className="install-popup-close" onClick={handleClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="install-popup-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>

        <h2 className="install-popup-title">Install Our App</h2>
        <p className="install-popup-message">
          Get quick access to our app by installing it on your home screen. Experience faster
          loading and offline access!
        </p>

        <div className="install-popup-features">
          <div className="install-popup-feature">
            <span className="install-popup-feature-icon">⚡</span>
            <span className="install-popup-feature-text">Fast & Reliable</span>
          </div>
          <div className="install-popup-feature">
            <span className="install-popup-feature-icon">📱</span>
            <span className="install-popup-feature-text">Works Offline</span>
          </div>
          <div className="install-popup-feature">
            <span className="install-popup-feature-icon">🚀</span>
            <span className="install-popup-feature-text">Quick Access</span>
          </div>
        </div>

        <div className="install-popup-actions">
          <button className="install-popup-btn install-popup-btn-dismiss" onClick={handleClose}>
            Maybe Later
          </button>
          <button
            className="install-popup-btn install-popup-btn-install"
            onClick={handleInstallClick}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Install Now
          </button>
        </div>
      </div>
    </>
  );
}
