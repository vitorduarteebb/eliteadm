'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface UsageStats {
  totalRequests: number;
  totalUsers: number;
  activeUsers: number;
  averageResponseTime: number;
  errorRate: number;
  topQuestions: Array<{ question: string; count: number }>;
  hourlyUsage: Array<{ hour: string; count: number }>;
}

export function AyumiUsageDashboard() {
  const [stats, setStats] = useState<UsageStats>({
    totalRequests: 0,
    totalUsers: 0,
    activeUsers: 0,
    averageResponseTime: 0,
    errorRate: 0,
    topQuestions: [],
    hourlyUsage: []
  });

  const [isLoading, setIsLoading] = useState(true);

  // Simular dados de uso (em produção, viriam de uma API real)
  useEffect(() => {
    const loadStats = () => {
      // Simular carregamento
      setTimeout(() => {
        setStats({
          totalRequests: 1247,
          totalUsers: 89,
          activeUsers: 23,
          averageResponseTime: 2.3,
          errorRate: 3.2,
          topQuestions: [
            { question: 'Como funciona o processo de habilitação?', count: 156 },
            { question: 'Quais são as principais normas do CTB?', count: 134 },
            { question: 'Como melhorar meu atendimento?', count: 98 },
            { question: 'Como crescer no Grupo Onishi?', count: 87 },
            { question: 'Preciso de ajuda com legislação', count: 76 }
          ],
          hourlyUsage: [
            { hour: '08:00', count: 45 },
            { hour: '09:00', count: 78 },
            { hour: '10:00', count: 92 },
            { hour: '11:00', count: 85 },
            { hour: '12:00', count: 67 },
            { hour: '13:00', count: 73 },
            { hour: '14:00', count: 89 },
            { hour: '15:00', count: 95 },
            { hour: '16:00', count: 87 },
            { hour: '17:00', count: 76 },
            { hour: '18:00', count: 52 }
          ]
        });
        setIsLoading(false);
      }, 1000);
    };

    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📊 Dashboard de Uso da Ayumi</h2>
          <p className="text-gray-600">Monitoramento em tempo real do sistema de IA</p>
        </div>
        <div className="text-sm text-gray-500">
          Última atualização: {new Date().toLocaleString('pt-BR')}
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total de Requisições</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalRequests.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">+12% vs. ontem</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">de {stats.totalUsers} total</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tempo Médio de Resposta</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.averageResponseTime}s</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">-8% vs. ontem</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Taxa de Erro</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.errorRate}%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-600">-2% vs. ontem</span>
          </div>
        </div>
      </div>

      {/* Gráficos e Tabelas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uso por Hora */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 Uso por Hora</h3>
          <div className="space-y-3">
            {stats.hourlyUsage.map((hour, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 w-16">{hour.hour}</span>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(hour.count / Math.max(...stats.hourlyUsage.map(h => h.count))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 w-12 text-right">{hour.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Perguntas Mais Frequentes */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">❓ Perguntas Mais Frequentes</h3>
          <div className="space-y-3">
            {stats.topQuestions.map((question, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{question.question}</p>
                  <p className="text-xs text-gray-500">{question.count} perguntas</p>
                </div>
                <div className="ml-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status do Sistema */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🔧 Status do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">API Externa</p>
              <p className="text-xs text-green-600">Conectado</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Sistema de Regras</p>
              <p className="text-xs text-green-600">Ativo</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Monitoramento</p>
              <p className="text-xs text-green-600">Funcionando</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Ações Rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Exportar Relatório
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Configurar Alertas
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Backup de Dados
          </button>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Limpar Cache
          </button>
        </div>
      </div>
    </div>
  );
}
