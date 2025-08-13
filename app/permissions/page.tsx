'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/context/AuthContext';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { PermissionsManagement } from '../../components/PermissionsManagement';
import { AyumiRulesManagement } from '../../components/AyumiRulesManagement';
import { AyumiUsageDashboard } from '../../components/AyumiUsageDashboard';
import { BarChart3, Shield, Settings, Users } from 'lucide-react';

export default function PermissionsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('permissions');

  const handleBackToMenu = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const tabs = [
    {
      id: 'permissions',
      name: 'Papéis e Permissões',
      icon: Shield,
      component: <PermissionsManagement onBack={handleBackToMenu} />
    },
    {
      id: 'ayumi-rules',
      name: 'Regras da Ayumi',
      icon: Settings,
      component: <AyumiRulesManagement />
    },
    {
      id: 'usage-dashboard',
      name: 'Dashboard de Uso',
      icon: BarChart3,
      component: <AyumiUsageDashboard />
    }
  ];

  return (
    <ProtectedRoute requiredPermissions={['permissions:read']}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToMenu}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>Voltar ao Menu</span>
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Sistema EliteADM</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Logado como: <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </ProtectedRoute>
  );
}
