'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Verificar se já foi instalado ou se o usuário já rejeitou
      const hasRejected = localStorage.getItem('pwa-install-rejected');
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
      
      if (!hasRejected && !isInstalled) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('PWA instalado com sucesso');
      } else {
        localStorage.setItem('pwa-install-rejected', 'true');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Erro ao instalar PWA:', error);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-rejected', 'true');
  };

  if (!showInstallPrompt) {
    return null;
  }

  return (
    <div className="pwa-install-prompt">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Download className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Instalar Portal Auto</h3>
        </div>
        <button
          onClick={handleDismiss}
          className="text-white/80 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <p className="text-sm text-white/90 mb-4">
        Instale o Portal Auto em seu dispositivo para acesso rápido e offline.
      </p>
      
      <div className="flex space-x-2">
        <Button
          onClick={handleInstall}
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          Instalar
        </Button>
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="sm"
          className="text-white/80 hover:text-white hover:bg-white/10"
        >
          Agora não
        </Button>
      </div>
    </div>
  );
}
