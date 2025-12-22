import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { useEffect, useState } from 'react';

interface InstallPopupProps {
  delay?: number;
}

export default function InstallPrompt({ delay = 3000 }: InstallPopupProps) {
  const { isInstallable, isInstalled, handleInstall } = useInstallPrompt();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    console.log('Install state:', { isInstallable, isInstalled, showPopup });

    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        console.log('Showing install popup');
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

  if (!showPopup || isInstalled) {
    console.log('Popup hidden:', { showPopup, isInstalled });
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="animate-fadeIn fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="animate-scaleIn fixed top-1/2 left-1/2 z-[10000] w-[calc(100vw-40px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 flex cursor-pointer items-center justify-center rounded-lg border-none bg-transparent p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600"
          onClick={handleClose}
        >
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

        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[20px] bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
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

        {/* Title */}
        <h2 className="m-0 mb-3 text-center text-[28px] font-bold text-gray-900">
          Install Our App
        </h2>

        {/* Message */}
        <p className="m-0 mb-8 text-center text-base leading-relaxed text-gray-600">
          Get quick access to our app by installing it on your home screen. Experience faster
          loading and offline access!
        </p>

        {/* Features */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2 text-center text-sm text-gray-700">
            <span className="text-[32px]">⚡</span>
            <span className="text-[13px] font-medium">Fast & Reliable</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center text-sm text-gray-700">
            <span className="text-[32px]">📱</span>
            <span className="text-[13px] font-medium">Works Offline</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-center text-sm text-gray-700">
            <span className="text-[32px]">🚀</span>
            <span className="text-[13px] font-medium">Quick Access</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="flex-1 cursor-pointer rounded-[10px] border-2 border-gray-200 bg-white px-4 py-3.5 text-base font-semibold text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
            onClick={handleClose}
          >
            Maybe Later
          </button>
          <button
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] border-none bg-gradient-to-br from-indigo-500 to-purple-600 px-4 py-3.5 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(102,126,234,0.4)] active:translate-y-0"
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

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
