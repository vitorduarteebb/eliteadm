'use client';

import { useRouter } from 'next/navigation';
import { 
  Users, 
  Shield, 
  Bot, 
  BarChart3, 
  Settings, 
  Calendar,
  TrendingUp,
  FileText,
  Zap,
  UserCheck,
  Cog,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();

  const navigationItems = [
    {
      name: 'Ayumi - IA EliteADM',
      description: 'Sua parceira de sucesso no sistema Elite',
      href: '/ayumi',
      icon: Bot,
      color: 'purple',
      bgColor: 'purple-100',
      iconColor: 'purple-600'
    },
    {
      name: 'Gerenciar Usuários',
      description: 'Controle completo de usuários e acessos',
      href: '/users',
      icon: Users,
      color: 'blue',
      bgColor: 'blue-100',
      iconColor: 'blue-600'
    },
    {
      name: 'Sistema de Permissões',
      description: 'Gestão de papéis e permissões',
      href: '/permissions',
      icon: Shield,
      color: 'green',
      bgColor: 'green-100',
      iconColor: 'green-600'
    },
    {
      name: 'Relatórios e Analytics',
      description: 'Métricas e insights do sistema',
      href: '/reports',
      icon: BarChart3,
      color: 'indigo',
      bgColor: 'indigo-100',
      iconColor: 'indigo-600'
    },
    {
      name: 'Configurações',
      description: 'Personalize o sistema EliteADM',
      href: '/settings',
      icon: Settings,
      color: 'gray',
      bgColor: 'gray-100',
      iconColor: 'gray-600'
    }
  ];

  const stats = [
    {
      title: 'Usuários Ativos',
      value: '25',
      change: '+12%',
      changeType: 'positive',
      icon: UserCheck,
      color: 'blue'
    },
    {
      title: 'Projetos Ativos',
      value: '12',
      change: '+5%',
      changeType: 'positive',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Uso de IA (Ayumi)',
      value: '0/100',
      change: 'Disponível',
      changeType: 'neutral',
      icon: Zap,
      color: 'purple'
    },
    {
      title: 'Sistema Online',
      value: '99.9%',
      change: 'Estável',
      changeType: 'positive',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">EliteADM</h1>
                <p className="text-sm text-gray-600">Sistema de Gerenciamento Elite</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Modo de Teste</p>
                <p className="font-medium text-gray-900">Administrador</p>
                <p className="text-xs text-gray-500 capitalize">admin</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo ao EliteADM!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Sistema completo de gerenciamento com IA integrada (Ayumi), controle de usuários e permissões avançadas.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-sm text-blue-800">
                <strong>Modo de Teste:</strong> Sistema funcionando sem autenticação para demonstração.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                onClick={() => router.push(item.href)}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-${item.bgColor}`}>
                    <IconComponent className={`h-8 w-8 text-${item.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>Acessar</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Atividade Recente</h3>
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
      </main>
    </div>
  );
}
