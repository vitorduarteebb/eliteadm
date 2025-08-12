'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { KambamBoard as KambamBoardType, KambamColumn, KambamCard } from '@/lib/types/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Plus, 
  MoreVertical, 
  Calendar, 
  User, 
  Tag, 
  Clock, 
  AlertTriangle,
  Edit,
  Trash2,
  Copy,
  Archive,
  Filter,
  Search
} from 'lucide-react';

export function KambamBoard() {
  const { user: currentUser } = useAuth();
  const [boards, setBoards] = useState<KambamBoardType[]>([]);
  const [currentBoard, setCurrentBoard] = useState<KambamBoardType | null>(null);
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [newCardData, setNewCardData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    dueDate: '',
    tags: '',
    assignedTo: ''
  });

  // Dados de exemplo para demonstração
  useEffect(() => {
    const sampleBoard: KambamBoardType = {
      id: '1',
      name: 'Pipeline de Vendas',
      description: 'Acompanhamento de leads e oportunidades',
      columns: [
        {
          id: 'col1',
          title: 'Leads',
          status: 'leads',
          order: 1,
          cards: [
            {
              id: 'card1',
              title: 'Empresa ABC Ltda',
              description: 'Interessada em solução de IA',
              status: 'to_do',
              priority: 'high',
              assignedTo: 'João Silva',
              dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              createdAt: new Date(),
              updatedAt: new Date(),
              daysInStatus: 3,
              tags: ['tech', 'startup'],
              attachments: []
            },
            {
              id: 'card2',
              title: 'Consultoria XYZ',
              description: 'Precisa de demonstração',
              status: 'to_do',
              priority: 'medium',
              assignedTo: 'Maria Santos',
              dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
              createdAt: new Date(),
              updatedAt: new Date(),
              daysInStatus: 1,
              tags: ['consultoria'],
              attachments: []
            }
          ]
        },
        {
          id: 'col2',
          title: 'Em Negociação',
          status: 'negotiation',
          order: 2,
          cards: [
            {
              id: 'card3',
              title: 'Corporação DEF',
              description: 'Proposta enviada, aguardando retorno',
              status: 'in_progress',
              priority: 'urgent',
              assignedTo: 'Pedro Costa',
              dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              createdAt: new Date(),
              updatedAt: new Date(),
              daysInStatus: 5,
              tags: ['corporativo', 'grande-conta'],
              attachments: ['proposta.pdf']
            }
          ]
        },
        {
          id: 'col3',
          title: 'Fechado',
          status: 'closed',
          order: 3,
          cards: [
            {
              id: 'card4',
              title: 'Startup GHI',
              description: 'Contrato assinado, implementação em andamento',
              status: 'done',
              priority: 'low',
              assignedTo: 'Ana Oliveira',
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              createdAt: new Date(),
              updatedAt: new Date(),
              daysInStatus: 0,
              tags: ['startup', 'implementação'],
              attachments: ['contrato.pdf', 'escopo.pdf']
            }
          ]
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setBoards([sampleBoard]);
    setCurrentBoard(sampleBoard);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getDaysInStatusColor = (days: number) => {
    if (days >= 7) return 'text-red-600 font-semibold';
    if (days >= 5) return 'text-orange-600 font-semibold';
    if (days >= 3) return 'text-yellow-600 font-semibold';
    return 'text-gray-600';
  };

  const filteredCards = (cards: KambamCard[]) => {
    return cards.filter(card => {
      const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesPriority = filterPriority === 'all' || card.priority === filterPriority;
      const matchesAssignee = filterAssignee === 'all' || 
                             (filterAssignee === 'unassigned' ? !card.assignedTo : card.assignedTo === filterAssignee);
      
      return matchesSearch && matchesPriority && matchesAssignee;
    });
  };

  const handleCreateCard = () => {
    if (!newCardData.title || !selectedColumn) return;

    let newStatus: 'to_do' | 'in_progress' | 'review' | 'done';
    if (selectedColumn === 'col1') newStatus = 'to_do';
    else if (selectedColumn === 'col2') newStatus = 'in_progress';
    else if (selectedColumn === 'col3') newStatus = 'done';
    else newStatus = 'to_do';

    const newCard: KambamCard = {
      id: Date.now().toString(),
      title: newCardData.title,
      description: newCardData.description,
      status: newStatus,
      priority: newCardData.priority,
      assignedTo: newCardData.assignedTo || undefined,
      dueDate: newCardData.dueDate ? new Date(newCardData.dueDate) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      daysInStatus: 0,
      tags: newCardData.tags ? newCardData.tags.split(',').map(t => t.trim()) : [],
      attachments: []
    };

    if (currentBoard) {
      const updatedBoard = {
        ...currentBoard,
        columns: currentBoard.columns.map(col => 
          col.id === selectedColumn 
            ? { ...col, cards: [...col.cards, newCard] }
            : col
        )
      };
      setCurrentBoard(updatedBoard);
      setBoards(boards.map(b => b.id === updatedBoard.id ? updatedBoard : b));
    }

    // Reset form
    setNewCardData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      tags: '',
      assignedTo: ''
    });
    setShowCreateCard(false);
    setSelectedColumn('');
  };

  const handleMoveCard = (cardId: string, fromColumnId: string, toColumnId: string) => {
    if (!currentBoard || fromColumnId === toColumnId) return;

    // Encontrar o card na coluna de origem
    const fromColumn = currentBoard.columns.find(col => col.id === fromColumnId);
    const cardToMove = fromColumn?.cards.find(c => c.id === cardId);
    
    if (!cardToMove) {
      console.error('Card não encontrado:', cardId);
      return;
    }

    // Determinar o novo status baseado na coluna de destino
    let newStatus: 'to_do' | 'in_progress' | 'review' | 'done';
    if (toColumnId === 'col1') newStatus = 'to_do';
    else if (toColumnId === 'col2') newStatus = 'in_progress';
    else if (toColumnId === 'col3') newStatus = 'done';
    else newStatus = 'to_do';

    // Criar novo card com status atualizado
    const updatedCard = {
      ...cardToMove,
      status: newStatus,
      updatedAt: new Date(),
      daysInStatus: 0 // Reset contador de dias no status
    };

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(col => {
        if (col.id === fromColumnId) {
          // Remover card da coluna de origem
          return { 
            ...col, 
            cards: col.cards.filter(c => c.id !== cardId) 
          };
        }
        if (col.id === toColumnId) {
          // Adicionar card à coluna de destino
          return { 
            ...col, 
            cards: [...col.cards, updatedCard]
          };
        }
        return col;
      })
    };

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => b.id === updatedBoard.id ? updatedBoard : b));
    
    // Feedback visual de sucesso
    console.log(`Card "${cardToMove.title}" movido para "${currentBoard.columns.find(c => c.id === toColumnId)?.title}"`);
  };

  const handleDeleteCard = (cardId: string, columnId: string) => {
    if (!currentBoard) return;

    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map(col => 
        col.id === columnId 
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      )
    };

    setCurrentBoard(updatedBoard);
    setBoards(boards.map(b => b.id === updatedBoard.id ? updatedBoard : b));
  };

  const handleDragStart = (e: React.DragEvent, cardId: string, columnId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('fromColumnId', columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedCard(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    try {
      const cardId = e.dataTransfer.getData('cardId');
      const fromColumnId = e.dataTransfer.getData('fromColumnId');
      
      if (!cardId || !fromColumnId) {
        console.error('Dados de drag inválidos');
        return;
      }
      
      if (fromColumnId !== columnId) {
        handleMoveCard(cardId, fromColumnId, columnId);
      }
    } catch (error) {
      console.error('Erro ao mover card:', error);
    }
  };

  if (!currentBoard) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-500">Carregando quadro...</p>
      </div>
    );
  }

  const allAssignees = Array.from(new Set(
    currentBoard.columns.flatMap(col => col.cards.map(card => card.assignedTo)).filter(Boolean)
  ));

  return (
    <div className="space-y-6">
      {/* Header do Quadro */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{currentBoard.name}</CardTitle>
              <p className="text-gray-600">{currentBoard.description}</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setShowCreateCard(true)}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Cartão
              </Button>
              <Button variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Filtros e Busca */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar cartões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todas as prioridades</option>
              <option value="urgent">Urgente</option>
              <option value="high">Alta</option>
              <option value="medium">Média</option>
              <option value="low">Baixa</option>
            </select>

            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos os responsáveis</option>
              <option value="unassigned">Não atribuído</option>
              {allAssignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setFilterPriority('all');
                setFilterAssignee('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold">
                  {currentBoard.columns.reduce((acc, col) => acc + col.cards.length, 0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Cartões</p>
                <p className="text-lg font-bold">
                  {currentBoard.columns.reduce((acc, col) => acc + col.cards.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cartões Urgentes</p>
                <p className="text-lg font-bold text-red-600">
                  {currentBoard.columns.reduce((acc, col) => 
                    acc + col.cards.filter(c => c.priority === 'urgent').length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Parados +5 dias</p>
                <p className="text-lg font-bold text-orange-600">
                  {currentBoard.columns.reduce((acc, col) => 
                    acc + col.cards.filter(c => c.daysInStatus >= 5).length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <User className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Atribuídos</p>
                <p className="text-lg font-bold text-green-600">
                  {currentBoard.columns.reduce((acc, col) => 
                    acc + col.cards.filter(c => c.assignedTo).length, 0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quadro Kanban */}
      <div className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max p-4">
          {currentBoard.columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div 
                className={`kamban-column bg-gray-50 rounded-lg p-4 transition-all duration-200 ${
                  dragOverColumn === column.id 
                    ? 'bg-blue-50 border-2 border-blue-300 border-dashed shadow-lg' 
                    : 'border-2 border-transparent'
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                    {filteredCards(column.cards).length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[100px]">
                  {dragOverColumn === column.id && filteredCards(column.cards).length === 0 && (
                    <div className="flex items-center justify-center h-20 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50">
                      <span className="text-blue-600 text-sm font-medium">Solte o cartão aqui</span>
                    </div>
                  )}
                  {filteredCards(column.cards).map((card) => (
                    <div
                      key={card.id}
                      className={`kamban-card bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move ${
                        draggedCard === card.id ? 'opacity-50 transform rotate-2 scale-105' : ''
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, card.id, column.id)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{card.title}</h4>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleDeleteCard(card.id, column.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {card.description}
                      </p>

                      <div className="space-y-2">
                        {/* Prioridade */}
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(card.priority)}`}>
                            {getPriorityIcon(card.priority)} {card.priority}
                          </span>
                          <span className={`text-xs ${getDaysInStatusColor(card.daysInStatus)}`}>
                            {card.daysInStatus} dias
                          </span>
                        </div>

                        {/* Tags */}
                        {card.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {card.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="tag"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Informações adicionais */}
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          {card.assignedTo && (
                            <span className="flex items-center">
                              <User className="h-3 w-3 mr-1" />
                              {card.assignedTo}
                            </span>
                          )}
                          {card.dueDate && (
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(card.dueDate).toLocaleDateString('pt-BR')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Botão para adicionar cartão na coluna */}
                  <Button
                    variant="outline"
                    className="w-full h-12 border-dashed border-gray-300 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setSelectedColumn(column.id);
                      setShowCreateCard(true);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Cartão
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para criar cartão */}
      {showCreateCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-overlay">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Novo Cartão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <Input
                  value={newCardData.title}
                  onChange={(e) => setNewCardData({ ...newCardData, title: e.target.value })}
                  placeholder="Título do cartão"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={newCardData.description}
                  onChange={(e) => setNewCardData({ ...newCardData, description: e.target.value })}
                  placeholder="Descrição do cartão"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridade
                  </label>
                  <select
                    value={newCardData.priority}
                    onChange={(e) => setNewCardData({ ...newCardData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Vencimento
                  </label>
                  <Input
                    type="date"
                    value={newCardData.dueDate}
                    onChange={(e) => setNewCardData({ ...newCardData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (separadas por vírgula)
                </label>
                <Input
                  value={newCardData.tags}
                  onChange={(e) => setNewCardData({ ...newCardData, tags: e.target.value })}
                  placeholder="tech, startup, urgente"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável
                </label>
                <Input
                  value={newCardData.assignedTo}
                  onChange={(e) => setNewCardData({ ...newCardData, assignedTo: e.target.value })}
                  placeholder="Nome do responsável"
                />
              </div>

              <div className="flex space-x-2 pt-4">
                <Button onClick={handleCreateCard} className="flex-1">
                  Criar Cartão
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateCard(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
