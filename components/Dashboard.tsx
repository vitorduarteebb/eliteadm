'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  User, 
  LogOut, 
  Settings, 
  BarChart3, 
  Shield, 
  Brain, 
  AlertTriangle,
  Users,
  Activity,
  Kanban,
  UserCheck,
  Calendar,
  Clock,
  TrendingUp
} from 'lucide-react';
import { AyumiInterface } from '@/components/AyumiInterface';
import { UserManagement } from '@/components/UserManagement';
import { UsageMonitor } from '@/components/UsageMonitor';
import { AccessControl } from '@/components/AccessControl';
import { KambamBoard } from '@/components/KambamBoard';
import { ContactManager } from '@/components/ContactManager';

type TabType = 'dashboard' | 'ai' | 'users' | 'usage' | 'access' | 'settings' | 'kambam' | 'contacts';

export function Dashboard() {
  const { user, logout, checkAIUsageLimit, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, permission: 'dashboard_view' },
    { id: 'kambam', label: 'Kambam', icon: Kanban, permission: 'kambam_view' },
    { id: 'contacts', label: 'Contatos', icon: UserCheck, permission: 'contacts_view' },
    { id: 'ai', label: 'Ayumi IA', icon: Brain, permission: 'ai_use' },
    { id: 'users', label: 'Usuários', icon: Users, permission: 'users_view', adminOnly: true },
    { id: 'usage', label: 'Monitoramento', icon: Activity, permission: 'usage_view' },
    { id: 'access', label: 'Controle de Acesso', icon: Shield, permission: 'access_control', adminOnly: true },
    { id: 'settings', label: 'Configurações', icon: Settings, permission: 'settings_view' },
  ];

  const filteredTabs = tabs.filter(tab => {
    // Verificar permissões do usuário
    if (tab.permission && !hasPermission(tab.permission)) return false;
    
    // Verificar se é apenas para admin
    if (tab.adminOnly && user?.role !== 'admin') return false;
    
    return true;
  });

  const canUseAI = checkAIUsageLimit();
  const usagePercentage = user ? (user.aiUsageCount / user.aiUsageLimit) * 100 : 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Uso da IA
                  </CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user?.aiUsageCount || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    de {user?.aiUsageLimit || 0} consultas mensais
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        usagePercentage > 80 ? 'bg-red-500' : 
                        usagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Status da Conta
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{user?.role}</div>
                  <p className="text-xs text-muted-foreground">
                    {user?.isActive ? 'Ativa' : 'Inativa'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Último Acesso
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Hoje</div>
                  <p className="text-xs text-muted-foreground">
                    {user?.lastLogin ? new Date(user.lastLogin).toLocaleString('pt-BR') : 'Primeiro acesso'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Segurança
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Alta</div>
                  <p className="text-xs text-muted-foreground">
                    Todas as verificações OK
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Novos Cards de Estatísticas */}
            {hasPermission('kambam_view') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Atividades Kambam
                    </CardTitle>
                    <Kanban className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <p className="text-xs text-muted-foreground">
                      Cartões ativos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Contatos Ativos
                    </CardTitle>
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">28</div>
                    <p className="text-xs text-muted-foreground">
                      Leads e prospectos
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Agendamentos
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <p className="text-xs text-muted-foreground">
                      Próximos 7 dias
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Alertas e Notificações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {!canUseAI && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-red-700">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Limite de Uso Atingido
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-600">
                      Você atingiu o limite mensal de {user?.aiUsageLimit} consultas à IA. 
                      O limite será renovado em {user?.aiUsageResetDate ? 
                        new Date(user.aiUsageResetDate).toLocaleDateString('pt-BR') : 'próximo mês'}.
                    </p>
                  </CardContent>
                </Card>
              )}

              {hasPermission('contacts_view') && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-orange-700">
                      <Clock className="h-5 w-5 mr-2" />
                      Contatos Pendentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-orange-600">
                      Você tem 3 contatos que precisam de follow-up nos próximos 2 dias.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo, {user?.name}!</CardTitle>
                <CardDescription>
                  Este é seu painel de controle do Portal Auto. Aqui você pode acessar 
                  todas as funcionalidades do sistema de forma segura e organizada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>E-mail:</strong> {user?.email}</p>
                  <p><strong>Função:</strong> {user?.role}</p>
                  <p><strong>Conta criada:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}</p>
                  <p><strong>Permissões ativas:</strong> {user?.permissions?.filter(p => p.granted).length || 0}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'kambam':
        return hasPermission('kambam_view') ? <KambamBoard /> : (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Você não tem permissão para acessar o Kambam.</p>
            </CardContent>
          </Card>
        );
      case 'contacts':
        return hasPermission('contacts_view') ? <ContactManager /> : (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Você não tem permissão para acessar os contatos.</p>
            </CardContent>
          </Card>
        );
      case 'ai':
        return hasPermission('ai_use') ? <AyumiInterface /> : (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Você não tem permissão para conversar com a Ayumi.</p>
            </CardContent>
          </Card>
        );
      case 'users':
        return hasPermission('users_view') ? <UserManagement onBack={() => setActiveView('main')} /> : (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Você não tem permissão para gerenciar usuários.</p>
            </CardContent>
          </Card>
        );
      case 'usage':
        return <UsageMonitor />;
      case 'access':
        return hasPermission('access_control') ? <AccessControl /> : (
          <Card>
            <CardContent className="text-center py-8">
              <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Você não tem permissão para acessar o controle de acesso.</p>
            </CardContent>
          </Card>
        );
      case 'settings':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Gerencie suas preferências e configurações da conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Funcionalidade em desenvolvimento...</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Portal Auto</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Olá, {user?.name}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8 overflow-x-auto">
            {filteredTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as TabType)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}
