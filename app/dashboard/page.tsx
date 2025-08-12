'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LogOut, User, Shield, Calendar, TrendingUp, Users, FileText, Settings, Users as UsersIcon, Shield as ShieldIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const navigationItems = [
    { name: 'Gerenciar Usuários', href: '/users', icon: UsersIcon, color: 'blue' },
    { name: 'Permissões', href: '/permissions', icon: ShieldIcon, color: 'purple' },
    { name: 'Ayumi Chat', href: '/ayumi', icon: User, color: 'green' }
  ];

  const stats = [
    {
      title: 'Total de Usuários',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Atividades Hoje',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Relatórios Gerados',
      value: '23',
      change: '+8%',
      changeType: 'positive',
      icon: FileText,
      color: 'purple'
    },
    {
      title: 'Sistema Online',
      value: '99.9%',
      change: 'Estável',
      changeType: 'neutral',
      icon: Shield,
      color: 'indigo'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Novo usuário cadastrado', user: 'João Silva', time: '2 min atrás', type: 'user' },
    { id: 2, action: 'Relatório mensal gerado', user: 'Maria Santos', time: '15 min atrás', type: 'report' },
    { id: 3, action: 'Configuração atualizada', user: 'Admin Sistema', time: '1 hora atrás', type: 'config' },
    { id: 4, action: 'Backup automático realizado', user: 'Sistema', time: '2 horas atrás', type: 'system' },
    { id: 5, action: 'Nova permissão criada', user: 'Admin Sistema', time: '3 horas atrás', type: 'permission' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4 text-blue-500" />;
      case 'report': return <FileText className="h-4 w-4 text-green-500" />;
      case 'config': return <Settings className="h-4 w-4 text-purple-500" />;
      case 'system': return <Shield className="h-4 w-4 text-indigo-500" />;
      case 'permission': return <Shield className="h-4 w-4 text-orange-500" />;
      default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EliteADM Dashboard</h1>
                <p className="text-gray-600">Sistema de Gerenciamento Completo</p>
              </div>
              
              {/* Botões de Navegação */}
              <div className="flex items-center space-x-3">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => router.push(item.href)}
                      className={`bg-${item.color}-500 hover:bg-${item.color}-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Logado como</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
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

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${
                        stat.changeType === 'positive' ? 'text-green-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Atividade Recente */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Atividade Recente</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">por {activity.user}</p>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
