'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirecionar baseado no role do usuário
      if (user.role === 'admin') {
        router.push('/dashboard');
      } else if (user.role === 'manager') {
        router.push('/users');
      } else {
        router.push('/ayumi');
      }
    } else {
      // Redirecionar para login se não autenticado
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  // Mostrar loading enquanto verifica autenticação
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        <p className="text-gray-600">Carregando EliteADM...</p>
      </div>
    </div>
  );

  return null;
}
