'use client';

import { UserManagement } from '@/components/UserManagement';
import { useAuth } from '@/lib/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LogOut, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleBackToMain = () => {
    if (user?.role === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/ayumi');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header com Navegação */}
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Lado Esquerdo - Título e Botão Voltar */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMain}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Voltar ao Menu</span>
                </button>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários EliteADM</h1>
              </div>

              {/* Lado Direito - Info do Usuário e Logout */}
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Logado como</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <UserManagement onBack={() => router.push('/dashboard')} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
