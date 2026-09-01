import { useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [isIosDevice, setIsIosDevice] = useState<boolean>(false);

  useEffect(() => {
    // Check if already in standalone mode or dismissed
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    const isDismissed = getItem<boolean>('pwa-dismissed', false);

    const isIos =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;

    setIsIosDevice(isIos);

    if (isStandalone || isDismissed) {
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsBannerVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (isIos && !isStandalone && !isDismissed) {
      const timer = setTimeout(() => {
        setIsBannerVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setIsBannerVisible(false);
    }
    setDeferredPrompt(null);
  };

  const dismissBanner = () => {
    setIsBannerVisible(false);
    setItem('pwa-dismissed', true);
  };

  return {
    isBannerVisible,
    isIosDevice,
    triggerInstall,
    dismissBanner,
  };
}
