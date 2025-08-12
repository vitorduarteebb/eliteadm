'use client';

import { useEffect, useState } from 'react';

interface PWAUpdateAvailable {
  type: 'update-available';
  payload: ServiceWorkerRegistration;
}

interface PWAInstalled {
  type: 'installed';
}

type PWAEvent = PWAUpdateAvailable | PWAInstalled;

export function usePWA() {
  const [pwaEvent, setPWAEvent] = useState<PWAEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration);

          // Verificar atualizações
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setPWAEvent({
                    type: 'update-available',
                    payload: registration,
                  });
                }
              });
            }
          });

          // SW instalado pela primeira vez
          if (!navigator.serviceWorker.controller) {
            setPWAEvent({ type: 'installed' });
          }
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });

      // Listener para SW ativo
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }
  }, []);

  const updatePWA = () => {
    if (pwaEvent?.type === 'update-available') {
      const registration = pwaEvent.payload;
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
  };

  const dismissUpdate = () => {
    setPWAEvent(null);
  };

  return {
    pwaEvent,
    isInstalled,
    updatePWA,
    dismissUpdate,
  };
}
