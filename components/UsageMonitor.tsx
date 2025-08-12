'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Users,
  Brain,
  Clock,
  BarChart3
} from 'lucide-react';

interface UsageStats {
  totalUsers: number;
  activeUsers: number;
  totalAIRequests: number;
  averageRequestsPerUser: number;
  usersNearLimit: number;
  usersOverLimit: number;
  requestsToday: number;
  requestsThisWeek: number;
  requestsThisMonth: number;
}

interface UserUsage {
  userId: string;
  name: string;
  email: string;
  aiUsageCount: number;
  aiUsageLimit: number;
  lastRequest: Date | null;
  usagePercentage: number;
}

export function UsageMonitor() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [userUsage, setUserUsage] = useState<UserUsage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('month');

  useEffect(() => {
    loadUsageData();
  }, [timeRange]);

  const loadUsageData = async () => {
    try {
      setIsLoading(true);
      
      // Simular dados (em produção, viria de uma API)
      const mockStats: UsageStats = {
        totalUsers: 156,
        activeUsers: 89,
        totalAIRequests: 2847,
        averageRequestsPerUser: 18.3,
        usersNearLimit: 23,
        usersOverLimit: 5,
        requestsToday: 127,
        requestsThisWeek: 891,
        requestsThisMonth: 2847,
      };

      const mockUserUsage: UserUsage[] = [
        {
          userId: '1',
          name: 'João Silva',
          email: 'joao@email.com',
          aiUsageCount: 95,
          aiUsageLimit: 100,
          lastRequest: new Date(),
          usagePercentage: 95,
        },
        {
          userId: '2',
          name: 'Maria Santos',
          email: 'maria@email.com',
          aiUsageCount: 88,
          aiUsageLimit: 100,
          lastRequest: new Date(Date.now() - 3600000),
          usagePercentage: 88,
        },
        {
          userId: '3',
          name: 'Pedro Costa',
          email: 'pedro@email.com',
          aiUsageCount: 110,
          aiUsageLimit: 100,
          lastRequest: new Date(Date.now() - 7200000),
          usagePercentage: 110,
        },
      ];

      setStats(mockStats);
      setUserUsage(mockUserUsage);
    } catch (error) {
      console.error('Erro ao carregar dados de uso:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRequestsForTimeRange = () => {
    if (!stats) return 0;
    switch (timeRange) {
      case 'today':
        return stats.requestsToday;
      case 'week':
        return stats.requestsThisWeek;
      case 'month':
        return stats.requestsThisMonth;
      default:
        return stats.requestsThisMonth;
    }
  };

  const formatLastRequest = (date: Date | null) => {
    if (!date) return 'Nunca';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora mesmo';
    if (minutes < 60) return `${minutes} min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days} dias atrás`;
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-500">Carregando dados de monitoramento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Monitoramento de Uso</h2>
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range as typeof timeRange)}
            >
              {range === 'today' && 'Hoje'}
              {range === 'week' && 'Semana'}
              {range === 'month' && 'Mês'}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              de {stats?.totalUsers} usuários totais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requisições IA</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getRequestsForTimeRange()}</div>
            <p className="text-xs text-muted-foreground">
              Média: {stats?.averageRequestsPerUser.toFixed(1)} por usuário
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo do Limite</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.usersNearLimit}</div>
            <p className="text-xs text-muted-foreground">
              Usuários com 80%+ do limite
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Limite Excedido</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.usersOverLimit}</div>
            <p className="text-xs text-muted-foreground">
              Usuários bloqueados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Alerts */}
      {stats && stats.usersOverLimit > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alertas de Uso Excessivo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">
              {stats.usersOverLimit} usuários excederam seus limites mensais de IA. 
              Considere revisar os limites ou entrar em contato com estes usuários.
            </p>
          </CardContent>
        </Card>
      )}

      {/* User Usage Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Uso por Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Usuário</th>
                  <th className="text-left py-3 px-4">Uso Atual</th>
                  <th className="text-left py-3 px-4">Limite</th>
                  <th className="text-left py-3 px-4">Percentual</th>
                  <th className="text-left py-3 px-4">Última Requisição</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {userUsage.map((usage) => (
                  <tr key={usage.userId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{usage.name}</p>
                        <p className="text-sm text-gray-500">{usage.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {usage.aiUsageCount}
                    </td>
                    <td className="py-3 px-4">
                      {usage.aiUsageLimit}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              usage.usagePercentage > 100 ? 'bg-red-500' :
                              usage.usagePercentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ 
                              width: `${Math.min(usage.usagePercentage, 100)}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">
                          {usage.usagePercentage.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatLastRequest(usage.lastRequest)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        usage.usagePercentage > 100 
                          ? 'bg-red-100 text-red-800'
                          : usage.usagePercentage > 80
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {usage.usagePercentage > 100 ? 'Bloqueado' :
                         usage.usagePercentage > 80 ? 'Alerta' : 'Normal'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Usage Trends Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Tendências de Uso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">Gráfico de tendências será implementado aqui</p>
              <p className="text-sm text-gray-400 mt-2">
                Integração com biblioteca de gráficos (Chart.js, Recharts, etc.)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
