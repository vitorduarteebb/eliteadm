'use client';

import { useState } from 'react';
import { 
  Bot, 
  Brain, 
  TrendingUp, 
  BarChart3, 
  MessageSquare, 
  Settings,
  ArrowLeft,
  Home,
  Tabs,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AyumiPerformanceAnalytics } from '@/components/AyumiPerformanceAnalytics';
import { AyumiFeedbackCorrections } from '@/components/AyumiFeedbackCorrections';

export default function AyumiTrainingOverviewPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'feedback'>('overview');

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: BarChart3 },
    { id: 'performance', name: 'Análise de Performance', icon: TrendingUp },
    { id: 'feedback', name: 'Feedback e Correções', icon: MessageSquare }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance':
        return <AyumiPerformanceAnalytics />;
      case 'feedback':
        return <AyumiFeedbackCorrections />;
      default:
        return <OverviewContent />;
    }
  };

  const OverviewContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Módulo de Treinamento da Ayumi</h1>
              <p className="text-lg text-gray-600">Aperfeiçoe e corrija sua IA com ferramentas avançadas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Precisão Atual</p>
              <p className="text-2xl font-bold text-green-600">94.2%</p>
              <p className="text-sm text-green-600">+2.1% vs mês anterior</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Feedback Pendente</p>
              <p className="text-2xl font-bold text-yellow-600">8</p>
              <p className="text-sm text-yellow-600">Aguardando revisão</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <MessageSquare className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Melhorias Implementadas</p>
              <p className="text-2xl font-bold text-blue-600">23</p>
              <p className="text-sm text-blue-600">Este mês</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
            Análise de Performance
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Métricas de precisão e confiança</li>
            <li>• Análise por categoria e tendências</li>
            <li>• Relatórios de satisfação do usuário</li>
            <li>• Recomendações de melhoria</li>
            <li>• Gráficos de performance semanal</li>
          </ul>
          <button
            onClick={() => setActiveTab('performance')}
            className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Acessar Análise
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 text-purple-500 mr-2" />
            Feedback e Correções
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Gestão de feedback dos usuários</li>
            <li>• Sistema de prioridades e status</li>
            <li>• Implementação de correções</li>
            <li>• Histórico de melhorias</li>
            <li>• Workflow de aprovação</li>
          </ul>
          <button
            onClick={() => setActiveTab('feedback')}
            className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Acessar Feedback
          </button>
        </div>
      </div>

      {/* Recent Improvements */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Melhorias Recentes</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Resposta sobre obrigações do aluno expandida</p>
              <p className="text-xs text-gray-500">Categoria: Obrigações e Direitos - Implementado hoje</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Processo de cancelamento em revisão</p>
              <p className="text-xs text-gray-500">Categoria: Cancelamento e Rescisão - Pendente</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Política de faltas precisa de mais detalhes</p>
              <p className="text-xs text-gray-500">Categoria: Faltas e Penalidades - Prioridade Alta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Treinar IA</p>
              <p className="text-sm opacity-90">Aplicar melhorias</p>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Gerar Relatório</p>
              <p className="text-sm opacity-90">Performance mensal</p>
            </div>
          </button>
          
          <button className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Novo Feedback</p>
              <p className="text-sm opacity-90">Adicionar manualmente</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Voltar ao Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Treinamento da Ayumi</h1>
                <p className="text-sm text-gray-600">Módulo de Aperfeiçoamento da IA</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Dashboard Principal"
              >
                <Home className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {renderTabContent()}
      </main>
    </div>
  );
}

// Componentes auxiliares
function CheckCircle(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AlertCircle(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  );
}
