'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleCalendar } from '@/lib/hooks/useGoogleCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

function GoogleAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleAuthCallback, isLoading, error } = useGoogleCalendar();
  const [authStatus, setAuthStatus] = useState<'processing' | 'success' | 'error'>('processing');

  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      handleAuthCallback(code)
        .then(() => {
          setAuthStatus('success');
          // Redirecionar após 3 segundos
          setTimeout(() => {
            router.push('/');
          }, 3000);
        })
        .catch(() => {
          setAuthStatus('error');
        });
    } else {
      setAuthStatus('error');
    }
  }, [searchParams, handleAuthCallback, router]);

  if (isLoading || authStatus === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Processando Autenticação
            </h2>
            <p className="text-gray-600">
              Conectando sua conta do Google Calendar...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Autenticação Realizada com Sucesso!
            </h2>
            <p className="text-gray-600 mb-6">
              Sua conta do Google Calendar foi conectada. 
              Você será redirecionado em alguns segundos.
            </p>
            <Button onClick={() => router.push('/')} className="w-full">
              Voltar ao Sistema
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Erro na Autenticação
          </h2>
          <p className="text-gray-600 mb-6">
            {error || 'Ocorreu um erro ao conectar sua conta do Google Calendar.'}
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push('/')} className="w-full">
              Voltar ao Sistema
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()} 
              className="w-full"
            >
              Tentar Novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function GoogleAuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <RefreshCw className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Carregando...
            </h2>
          </CardContent>
        </Card>
      </div>
    }>
      <GoogleAuthCallbackContent />
    </Suspense>
  );
}

