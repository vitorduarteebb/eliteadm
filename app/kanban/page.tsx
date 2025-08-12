'use client';

import { useState } from 'react';
import { Plus, MoreVertical, Edit, Trash2, User } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Implementar sistema de login',
    description: 'Criar autenticação segura com JWT',
    status: 'done',
    priority: 'high',
    assignee: 'João Silva',
    dueDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Design do dashboard',
    description: 'Criar interface responsiva e moderna',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Maria Santos',
    dueDate: '2024-01-20'
  },
  {
    id: '3',
    title: 'Testes unitários',
    description: 'Implementar cobertura de testes',
    status: 'todo',
    priority: 'low',
    assignee: 'Pedro Costa',
    dueDate: '2024-01-25'
  },
  {
    id: '4',
    title: 'Documentação da API',
    description: 'Escrever documentação completa',
    status: 'review',
    priority: 'medium',
    assignee: 'Ana Oliveira',
    dueDate: '2024-01-18'
  }
];

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showAddTask, setShowAddTask] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo': return 'A Fazer';
      case 'in-progress': return 'Em Progresso';
      case 'review': return 'Em Revisão';
      case 'done': return 'Concluído';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      default: return priority;
    }
  };

  const columns = [
    { id: 'todo', title: 'A Fazer', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'Em Progresso', color: 'bg-blue-100' },
    { id: 'review', title: 'Em Revisão', color: 'bg-yellow-100' },
    { id: 'done', title: 'Concluído', color: 'bg-green-100' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-600">📋 Kanban - Gestão de Tarefas</h1>
              <p className="text-gray-600">Organize e acompanhe o progresso das suas tarefas</p>
            </div>
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Tarefa
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="space-y-4">
              <div className={`${column.color} p-4 rounded-lg`}>
                <h3 className="font-semibold text-gray-800 text-center">
                  {column.title} ({tasks.filter(task => task.status === column.id).length})
                </h3>
              </div>
              
              <div className="space-y-3">
                {tasks
                  .filter(task => task.status === column.id)
                  .map((task) => (
                    <div key={task.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        <span className="text-xs text-gray-500">{task.dueDate}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="text-xs text-gray-600">{task.assignee}</span>
                        </div>
                        
                        <div className="flex space-x-1">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Edit className="h-3 w-3" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600">
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-600">Total de Tarefas</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600">Em Progresso</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {tasks.filter(t => t.status === 'review').length}
            </div>
            <div className="text-sm text-gray-600">Em Revisão</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.status === 'done').length}
            </div>
            <div className="text-sm text-gray-600">Concluídas</div>
          </div>
        </div>
      </div>

      {/* Modal de Nova Tarefa */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Nova Tarefa</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Digite o título da tarefa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={3}
                  placeholder="Descreva a tarefa"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Limite</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAddTask(false)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
                >
                  Criar Tarefa
                </button>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
