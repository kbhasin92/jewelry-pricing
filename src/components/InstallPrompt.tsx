'use client';

import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // @ts-expect-error — `prompt()` is a property on BeforeInstallPromptEvent, not standard Event
    deferredPrompt.prompt();
    // @ts-expect-error — `userChoice` is a property on BeforeInstallPromptEvent, not standard Event
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted install prompt');
    } else {
      console.log('User dismissed install prompt');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#222',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <span>Install this app?</span>
      <button
        onClick={handleInstallClick}
        style={{
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Install
      </button>
    </div>
  );
}
