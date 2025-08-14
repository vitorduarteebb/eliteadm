'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  Clock,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Target,
  Zap
} from 'lucide-react';

interface PerformanceMetrics {
  accuracy: number;
  responseTime: number;
  userSatisfaction: number;
  totalInteractions: number;
  dailyActiveUsers: number;
  categoryPerformance: {
    name: string;
    accuracy: number;
    usage: number;
    satisfaction: number;
  }[];
  weeklyTrends: {
    date: string;
    interactions: number;
    accuracy: number;
    satisfaction: number;
  }[];
  topQuestions: {
    question: string;
    usage: number;
    accuracy: number;
    category: string;
  }[];
  userFeedback: {
    positive: number;
    negative: number;
    neutral: number;
    total: number;
  };
}

export function AyumiPerformanceAnalytics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    accuracy: 0,
    responseTime: 0,
    userSatisfaction: 0,
    totalInteractions: 0,
    dailyActiveUsers: 0,
    categoryPerformance: [],
    weeklyTrends: [],
    topQuestions: [],
    userFeedback: { positive: 0, negative: 0, neutral: 0, total: 0 }
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Dados de exemplo para demonstração
  useEffect(() => {
    const mockMetrics: PerformanceMetrics = {
      accuracy: 0.94,
      responseTime: 1.2,
      userSatisfaction: 0.89,
      totalInteractions: 1247,
      dailyActiveUsers: 23,
      categoryPerformance: [
        { name: 'Obrigações e Direitos', accuracy: 0.96, usage: 45, satisfaction: 0.93 },
        { name: 'Cancelamento e Rescisão', accuracy: 0.88, usage: 23, satisfaction: 0.87 },
        { name: 'Valores e Taxas', accuracy: 0.92, usage: 67, satisfaction: 0.91 },
        { name: 'Faltas e Penalidades', accuracy: 0.85, usage: 34, satisfaction: 0.82 },
        { name: 'Agendamento', accuracy: 0.90, usage: 56, satisfaction: 0.88 },
        { name: 'Documentação', accuracy: 0.93, usage: 28, satisfaction: 0.90 },
        { name: 'Garantias', accuracy: 0.87, usage: 19, satisfaction: 0.85 },
        { name: 'Legislação', accuracy: 0.91, usage: 31, satisfaction: 0.89 }
      ],
      weeklyTrends: [
        { date: '2024-12-09', interactions: 45, accuracy: 0.92, satisfaction: 0.87 },
        { date: '2024-12-10', interactions: 52, accuracy: 0.94, satisfaction: 0.89 },
        { date: '2024-12-11', interactions: 48, accuracy: 0.93, satisfaction: 0.88 },
        { date: '2024-12-12', interactions: 61, accuracy: 0.95, satisfaction: 0.91 },
        { date: '2024-12-13', interactions: 58, accuracy: 0.94, satisfaction: 0.90 },
        { date: '2024-12-14', interactions: 67, accuracy: 0.96, satisfaction: 0.92 },
        { date: '2024-12-15', interactions: 73, accuracy: 0.95, satisfaction: 0.93 }
      ],
      topQuestions: [
        { question: 'Quais são as obrigações do aluno?', usage: 45, accuracy: 0.95, category: 'Obrigações e Direitos' },
        { question: 'Como funciona o cancelamento?', usage: 23, accuracy: 0.88, category: 'Cancelamento e Rescisão' },
        { question: 'Quais são os valores das taxas?', usage: 67, accuracy: 0.92, category: 'Valores e Taxas' },
        { question: 'O que acontece em caso de falta?', usage: 34, accuracy: 0.85, category: 'Faltas e Penalidades' },
        { question: 'Como funciona o agendamento?', usage: 56, accuracy: 0.90, category: 'Agendamento' }
      ],
      userFeedback: { positive: 1108, negative: 89, neutral: 50, total: 1247 }
    };

    setMetrics(mockMetrics);
  }, []);

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 0.9) return 'text-green-600';
    if (accuracy >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 0.9) return 'text-green-600';
    if (satisfaction >= 0.8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getFeedbackPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Análise de Performance da Ayumi</h2>
            <p className="text-gray-600">Métricas e insights para aperfeiçoamento da IA</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('7d')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === '7d'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              7 dias
            </button>
            <button
              onClick={() => setSelectedPeriod('30d')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === '30d'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30 dias
            </button>
            <button
              onClick={() => setSelectedPeriod('90d')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === '90d'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              90 dias
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Precisão Geral</p>
              <p className={`text-2xl font-bold ${getAccuracyColor(metrics.accuracy)}`}>
                {(metrics.accuracy * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2.1% vs período anterior
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo de Resposta</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.responseTime}s</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingDown className="h-4 w-4 mr-1" />
                -0.3s vs período anterior
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfação do Usuário</p>
              <p className={`text-2xl font-bold ${getSatisfactionColor(metrics.userSatisfaction)}`}>
                {(metrics.userSatisfaction * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +1.8% vs período anterior
              </p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Interações Totais</p>
              <p className="text-2xl font-bold text-gray-900">{metrics.totalInteractions}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15% vs período anterior
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance by Category */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance por Categoria</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precisão
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Satisfação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {metrics.categoryPerformance.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccuracyColor(category.accuracy)}`}>
                      {(category.accuracy * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{category.usage}</div>
                    <div className="text-xs text-gray-500">interações</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSatisfactionColor(category.satisfaction)}`}>
                      {(category.satisfaction * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {category.accuracy >= 0.9 ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Excelente
                      </span>
                    ) : category.accuracy >= 0.8 ? (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Bom
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Precisa Melhorar
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Trends Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendências Semanais</h3>
        <div className="grid grid-cols-7 gap-4">
          {metrics.weeklyTrends.map((trend, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-2">
                  {new Date(trend.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                </p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trend.interactions}</p>
                    <p className="text-xs text-gray-500">interações</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${getAccuracyColor(trend.accuracy)}`}>
                      {(trend.accuracy * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500">precisão</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${getSatisfactionColor(trend.satisfaction)}`}>
                      {(trend.satisfaction * 100).toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500">satisfação</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Questions and User Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Questions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Perguntas Mais Utilizadas</h3>
          <div className="space-y-4">
            {metrics.topQuestions.map((question, index) => (
              <div key={index} className="border-l-4 border-purple-500 pl-4">
                <p className="text-sm font-medium text-gray-900 mb-1">{question.question}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{question.category}</span>
                  <div className="flex items-center space-x-2">
                    <span>{question.usage} usos</span>
                    <span className={`${getAccuracyColor(question.accuracy)}`}>
                      {(question.accuracy * 100).toFixed(0)}% precisão
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Feedback */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback dos Usuários</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Positivo</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {getFeedbackPercentage(metrics.userFeedback.positive, metrics.userFeedback.total)}%
                </p>
                <p className="text-xs text-gray-500">{metrics.userFeedback.positive} respostas</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Negativo</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">
                  {getFeedbackPercentage(metrics.userFeedback.negative, metrics.userFeedback.total)}%
                </p>
                <p className="text-xs text-gray-500">{metrics.userFeedback.negative} respostas</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Neutro</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-600">
                  {getFeedbackPercentage(metrics.userFeedback.neutral, metrics.userFeedback.total)}%
                </p>
                <p className="text-xs text-gray-500">{metrics.userFeedback.neutral} respostas</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Total de Avaliações</span>
              <span className="text-lg font-bold text-gray-900">{metrics.userFeedback.total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recomendações de Melhoria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Categoria: Faltas e Penalidades</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Precisão de 85% está abaixo da meta. Considere revisar as respostas e adicionar mais exemplos.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Otimização de Performance</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Tempo de resposta de 1.2s está bom, mas pode ser otimizado para perguntas frequentes.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800">Categoria: Obrigações e Direitos</h4>
                <p className="text-sm text-green-700 mt-1">
                  Excelente performance com 96% de precisão. Considere usar como modelo para outras categorias.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-purple-800">Crescimento de Usuários</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Aumento de 15% nas interações indica boa aceitação. Continue monitorando a satisfação.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
