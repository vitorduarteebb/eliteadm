'use client';

import { usePWA } from '@/lib/hooks/usePWA';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Download, RefreshCw, X } from 'lucide-react';

export function PWAUpdateNotification() {
  const { pwaEvent, updatePWA, dismissUpdate } = usePWA();

  if (!pwaEvent) return null;

  if (pwaEvent.type === 'update-available') {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-sm">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-800">Atualização Disponível</h3>
              </div>
              <button
                onClick={dismissUpdate}
                className="text-blue-600 hover:text-blue-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-sm text-blue-700 mb-4">
              Uma nova versão do Portal Auto está disponível. Atualize para obter as últimas melhorias.
            </p>
            
            <div className="flex space-x-2">
              <Button
                onClick={updatePWA}
                size="sm"
                className="flex-1"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Atualizar
              </Button>
              <Button
                onClick={dismissUpdate}
                variant="outline"
                size="sm"
              >
                Depois
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (pwaEvent.type === 'installed') {
    return (
      <div className="fixed top-4 right-4 z-50 max-w-sm">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Download className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-800">App Instalado</h3>
              </div>
              <button
                onClick={dismissUpdate}
                className="text-green-600 hover:text-green-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-sm text-green-700 mb-4">
              O Portal Auto foi instalado com sucesso! Agora funciona offline e carrega mais rápido.
            </p>
            
            <Button
              onClick={dismissUpdate}
              size="sm"
              variant="outline"
              className="w-full"
            >
              Entendi
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
