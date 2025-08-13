'use client';

import { AyumiInterface } from '@/components/AyumiInterface';
import { useAuth } from '@/lib/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LogOut, ArrowLeft, Users, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AyumiPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleBackToMain = () => {
    if (user?.role === 'admin') {
      router.push('/dashboard');
    } else {
      router.push('/ayumi');
    }
  };

  const navigationItems = [
    { name: 'Gerenciar Usuários', href: '/users', icon: Users, color: 'blue', show: user?.role === 'admin' || user?.role === 'manager' },
    { name: 'Permissões', href: '/permissions', icon: Shield, color: 'purple', show: user?.role === 'admin' }
  ].filter(item => item.show);

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
                <h1 className="text-2xl font-bold text-gray-900">Ayumi - IA EliteADM</h1>
                <p className="text-gray-600">Sua parceira de sucesso no sistema Elite</p>
              </div>

              {/* Lado Direito - Botões de Navegação, Info do Usuário e Logout */}
              <div className="flex items-center space-x-4">
                {/* Botões de Navegação */}
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => router.push(item.href)}
                      className={`bg-${item.color}-500 hover:bg-${item.color}-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}

                {/* Separador */}
                {navigationItems.length > 0 && <div className="h-6 w-px bg-gray-300"></div>}

                {/* Info do Usuário e Logout */}
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
          <AyumiInterface />
        </div>
      </div>
    </ProtectedRoute>
  );
}
