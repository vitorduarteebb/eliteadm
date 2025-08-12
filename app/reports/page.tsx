'use client';

import { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, Users, Bot, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('users');

  const reports = [
    {
      id: 'users',
      title: 'Relatório de Usuários',
      description: 'Análise de usuários ativos, inativos e crescimento',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'ai',
      title: 'Relatório de IA',
      description: 'Métricas de uso da Ayumi IA e conversas',
      icon: Bot,
      color: 'bg-purple-500'
    },
    {
      id: 'tasks',
      title: 'Relatório de Tarefas',
      description: 'Progresso e produtividade das tarefas',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      id: 'contacts',
      title: 'Relatório de Contatos',
      description: 'Análise de contatos e leads',
      icon: Users,
      color: 'bg-pink-500'
    }
  ];

  const periods = [
    { id: 'week', label: 'Última Semana' },
    { id: 'month', label: 'Último Mês' },
    { id: 'quarter', label: 'Último Trimestre' },
    { id: 'year', label: 'Último Ano' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">📈 Relatórios e Análises</h1>
          <p className="text-gray-600">Visualize métricas e insights do sistema</p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Relatório</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {reports.map((report) => (
                  <option key={report.id} value={report.id}>
                    {report.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center">
                <Download className="h-5 w-5 mr-2" />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Cards de Relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                selectedReport === report.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${report.color}`}>
                  <report.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conteúdo do Relatório Selecionado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico Principal */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {reports.find(r => r.id === selectedReport)?.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {periods.find(p => p.id === selectedPeriod)?.label}
                </span>
              </div>
            </div>

            {/* Gráfico Simulado */}
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Gráfico do {reports.find(r => r.id === selectedReport)?.title}</p>
                <p className="text-sm text-gray-400">Período: {periods.find(p => p.id === selectedPeriod)?.label}</p>
              </div>
            </div>
          </div>

          {/* Métricas */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas Rápidas</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Crescimento</p>
                    <p className="text-2xl font-bold text-blue-900">+23%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Eficiência</p>
                    <p className="text-2xl font-bold text-green-900">87%</p>
                  </div>
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Satisfação</p>
                    <p className="text-2xl font-bold text-purple-900">4.8/5</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <button className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Exportar Dados</h3>
                <p className="text-sm text-gray-600">Baixar em CSV, Excel ou PDF</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Agendar Relatórios</h3>
                <p className="text-sm text-gray-600">Envio automático por email</p>
              </div>
            </div>
          </button>

          <button className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">Relatórios Personalizados</h3>
                <p className="text-sm text-gray-600">Criar análises customizadas</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
