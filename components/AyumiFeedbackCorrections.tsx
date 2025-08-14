'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Edit, 
  Save, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Bot,
  Star,
  Flag,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  question: string;
  originalAnswer: string;
  correctedAnswer?: string;
  userFeedback: 'positive' | 'negative' | 'neutral';
  feedbackText?: string;
  category: string;
  timestamp: Date;
  status: 'pending' | 'reviewed' | 'implemented' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
  notes?: string;
  tags: string[];
}

interface FeedbackStats {
  totalFeedback: number;
  positiveFeedback: number;
  negativeFeedback: number;
  pendingReview: number;
  implemented: number;
  averageRating: number;
  topCategories: { name: string; count: number }[];
}

export function AyumiFeedbackCorrections() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState<FeedbackStats>({
    totalFeedback: 0,
    positiveFeedback: 0,
    negativeFeedback: 0,
    pendingReview: 0,
    implemented: 0,
    averageRating: 0,
    topCategories: []
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FeedbackItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dados de exemplo para demonstração
  useEffect(() => {
    const mockFeedback: FeedbackItem[] = [
      {
        id: '1',
        question: 'Quais são as obrigações do aluno?',
        originalAnswer: 'O aluno deve frequentar as aulas e pagar as taxas.',
        correctedAnswer: 'O aluno deve frequentar as aulas, pagar as taxas em dia, apresentar toda a documentação necessária, respeitar os horários estabelecidos e comparecer aos exames agendados.',
        userFeedback: 'negative',
        feedbackText: 'A resposta estava muito vaga e não incluía todas as obrigações importantes.',
        category: 'Obrigações e Direitos',
        timestamp: new Date('2024-12-15T10:30:00'),
        status: 'implemented',
        priority: 'high',
        assignedTo: 'Admin Sistema',
        notes: 'Resposta expandida com todas as obrigações detalhadas do contrato.',
        tags: ['obrigações', 'aluno', 'deveres', 'contrato']
      },
      {
        id: '2',
        question: 'Como funciona o cancelamento?',
        originalAnswer: 'O cancelamento pode ser solicitado a qualquer momento.',
        userFeedback: 'negative',
        feedbackText: 'Falta informação sobre taxas e processo de cancelamento.',
        category: 'Cancelamento e Rescisão',
        timestamp: new Date('2024-12-14T15:45:00'),
        status: 'pending',
        priority: 'medium',
        tags: ['cancelamento', 'rescisão', 'taxas']
      },
      {
        id: '3',
        question: 'Quais são os valores das taxas?',
        originalAnswer: 'Os valores incluem taxa de matrícula, curso teórico e aulas práticas.',
        userFeedback: 'positive',
        feedbackText: 'Resposta clara e completa sobre as taxas.',
        category: 'Valores e Taxas',
        timestamp: new Date('2024-12-13T09:15:00'),
        status: 'reviewed',
        priority: 'low',
        tags: ['taxas', 'valores', 'preços']
      },
      {
        id: '4',
        question: 'O que acontece em caso de falta?',
        originalAnswer: 'Faltas podem gerar penalidades.',
        userFeedback: 'negative',
        feedbackText: 'Precisa de mais detalhes sobre as penalidades e como evitá-las.',
        category: 'Faltas e Penalidades',
        timestamp: new Date('2024-12-12T14:20:00'),
        status: 'pending',
        priority: 'high',
        tags: ['faltas', 'penalidades', 'multas']
      },
      {
        id: '5',
        question: 'Como funciona o agendamento?',
        originalAnswer: 'O agendamento é feito conforme disponibilidade.',
        userFeedback: 'neutral',
        feedbackText: 'A resposta poderia ser mais específica sobre o processo.',
        category: 'Agendamento',
        timestamp: new Date('2024-12-11T11:30:00'),
        status: 'reviewed',
        priority: 'medium',
        tags: ['agendamento', 'aulas', 'exames']
      }
    ];

    setFeedbackItems(mockFeedback);
    
    // Calcular estatísticas
    const totalFeedback = mockFeedback.length;
    const positiveFeedback = mockFeedback.filter(item => item.userFeedback === 'positive').length;
    const negativeFeedback = mockFeedback.filter(item => item.userFeedback === 'negative').length;
    const pendingReview = mockFeedback.filter(item => item.status === 'pending').length;
    const implemented = mockFeedback.filter(item => item.status === 'implemented').length;
    
    const categoryCounts = mockFeedback.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topCategories = Object.entries(categoryCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setStats({
      totalFeedback,
      positiveFeedback,
      negativeFeedback,
      pendingReview,
      implemented,
      averageRating: (positiveFeedback / totalFeedback) * 5,
      topCategories
    });
  }, []);

  const filteredFeedback = feedbackItems.filter(item => {
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.feedbackText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'implemented': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFeedbackIcon = (feedback: string) => {
    switch (feedback) {
      case 'positive': return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case 'negative': return <ThumbsDown className="h-4 w-4 text-red-600" />;
      case 'neutral': return <MessageSquare className="h-4 w-4 text-gray-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setFeedbackItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus as any } : item
    ));
  };

  const handlePriorityChange = (id: string, newPriority: string) => {
    setFeedbackItems(prev => prev.map(item => 
      item.id === id ? { ...item, priority: newPriority as any } : item
    ));
  };

  const handleEditFeedback = (item: FeedbackItem) => {
    setEditingItem(item);
    setShowFeedbackForm(true);
  };

  const handleDeleteFeedback = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este feedback?')) {
      setFeedbackItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'reviewed': return 'Revisado';
      case 'implemented': return 'Implementado';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Crítico';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feedback e Correções da Ayumi</h2>
            <p className="text-gray-600">Gerencie feedback dos usuários e implemente melhorias</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFeedbackForm(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Novo Feedback</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFeedback}</p>
              <p className="text-sm text-green-600">+{stats.implemented} implementados</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Feedback Positivo</p>
              <p className="text-2xl font-bold text-green-600">{stats.positiveFeedback}</p>
              <p className="text-sm text-green-600">
                {Math.round((stats.positiveFeedback / stats.totalFeedback) * 100)}% do total
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <ThumbsUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes de Revisão</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</p>
              <p className="text-sm text-yellow-600">Aguardando análise</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avaliação Média</p>
              <p className="text-2xl font-bold text-purple-600">{stats.averageRating.toFixed(1)}/5</p>
              <p className="text-sm text-purple-600">Baseado no feedback</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por pergunta, feedback ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="reviewed">Revisado</option>
              <option value="implemented">Implementado</option>
              <option value="rejected">Rejeitado</option>
            </select>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Todas as Prioridades</option>
              <option value="critical">Crítico</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Feedback</h3>
          <p className="text-sm text-gray-600">Gerencie e implemente melhorias baseadas no feedback dos usuários</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeedback.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className="flex items-start space-x-2 mb-2">
                        {getFeedbackIcon(item.userFeedback)}
                        <p className="text-sm font-medium text-gray-900">{item.question}</p>
                      </div>
                      {item.feedbackText && (
                        <p className="text-xs text-gray-600 italic">"{item.feedbackText}"</p>
                      )}
                      {item.correctedAnswer && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                          <p className="text-xs text-green-800 font-medium">Resposta Corrigida:</p>
                          <p className="text-xs text-green-700">{item.correctedAnswer}</p>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}
                    >
                      <option value="pending">Pendente</option>
                      <option value="reviewed">Revisado</option>
                      <option value="implemented">Implementado</option>
                      <option value="rejected">Rejeitado</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={item.priority}
                      onChange={(e) => handlePriorityChange(item.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(item.priority)}`}
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                      <option value="critical">Crítico</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {item.timestamp.toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditFeedback(item)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFeedback(item.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {item.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(item.id, 'reviewed')}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Marcar como Revisado"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Categories */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias com Mais Feedback</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stats.topCategories.map((category, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">{category.count}</span>
              </div>
              <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <RefreshCw className="h-4 w-4" />
          <span>Atualizar IA</span>
        </button>
        
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <TrendingUp className="h-4 w-4" />
          <span>Gerar Relatório</span>
        </button>
        
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
          <Bot className="h-4 w-4" />
          <span>Treinar com Feedback</span>
        </button>
      </div>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Editar Feedback' : 'Novo Feedback'}
              </h3>
            </div>
            
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pergunta Original
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Digite a pergunta que recebeu feedback..."
                    defaultValue={editingItem?.question || ''}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resposta Original da IA
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Digite a resposta original da IA..."
                    defaultValue={editingItem?.originalAnswer || ''}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback do Usuário
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Digite o feedback do usuário..."
                    defaultValue={editingItem?.feedbackText || ''}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Obrigações e Direitos</option>
                      <option>Cancelamento e Rescisão</option>
                      <option>Valores e Taxas</option>
                      <option>Faltas e Penalidades</option>
                      <option>Agendamento</option>
                      <option>Documentação</option>
                      <option>Garantias</option>
                      <option>Legislação</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prioridade
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                      <option value="critical">Crítico</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resposta Corrigida (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Digite a resposta corrigida..."
                    defaultValue={editingItem?.correctedAnswer || ''}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="tag1, tag2, tag3"
                    defaultValue={editingItem?.tags.join(', ') || ''}
                  />
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowFeedbackForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Salvar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
