'use client';

import { useState, useEffect } from 'react';
import { 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical,
  Shield, 
  CheckCircle,
  XCircle
} from 'lucide-react';
import { User as UserType } from '../hooks/useAuth';
import { DEFAULT_ROLES } from '../lib/permissions';

interface UserManagementProps {
  onBack: () => void;
}

export function UserManagement({ onBack }: UserManagementProps) {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, statusFilter]);

  const loadUsers = () => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      // Garantir que o status seja do tipo correto
      const typedUsers = parsedUsers.map((user: any) => ({
        ...user,
        status: user.status === 'active' ? 'active' : 'inactive' as const,
        createdAt: new Date(user.createdAt),
        lastLogin: user.lastLogin ? new Date(user.lastLogin) : null
      }));
      setUsers(typedUsers as UserType[]);
    } else {
      // Criar usuário admin padrão se não existir
      const defaultAdmin: UserType = {
        id: 'admin_1',
        name: 'Administrador',
        email: 'admin@eliteadm.com',
        password: 'admin123',
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        lastLogin: null
      };
      setUsers([defaultAdmin]);
      localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
  };

  const saveUsersToStorage = (updatedUsers: UserType[]) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const filterUsers = () => {
    let filtered = users;

    // Filtrar por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = (userData: Omit<UserType, 'id' | 'createdAt'>) => {
    const newUser: UserType = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date(),
      lastLogin: null
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowCreateModal(false);
    setSuccessMessage('Usuário criado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUpdateUser = (userId: string, userData: Partial<UserType>) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, ...userData } : user
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
    setEditingUser(null);
    setSuccessMessage('Usuário atualizado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      saveUsersToStorage(updatedUsers);
      setSuccessMessage('Usuário excluído com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    );
    setUsers(updatedUsers);
    saveUsersToStorage(updatedUsers);
  };

  const getRoleName = (roleId: string) => {
    const role = DEFAULT_ROLES.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getRoleColor = (roleId: string) => {
    const colors: { [key: string]: string } = {
      'admin': 'bg-red-100 text-red-800',
      'gerente': 'bg-blue-100 text-blue-800',
      'vendedor': 'bg-green-100 text-green-800',
      'instrutor': 'bg-purple-100 text-purple-800',
      'usuario': 'bg-gray-100 text-gray-800'
    };
    return colors[roleId] || 'bg-gray-100 text-gray-800';
  };

    return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Voltar ao Menu</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <span>Gerenciamento de Usuários EliteADM</span>
          </h1>
            </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Usuário</span>
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
          </div>
      )}

      {/* Filters */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                  placeholder="Buscar usuários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </div>
              </div>
            </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Papel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Criado em
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
                </tr>
              </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                          </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleName(user.role)}
                        </span>
                      </td>
                      
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                      {user.status === 'active' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ativo
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 mr-1" />
                          Inativo
                        </>
                      )}
                        </span>
                      </td>
                      
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? user.lastLogin.toLocaleDateString('pt-BR') : 'Nunca'}
                      </td>
                      
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt.toLocaleDateString('pt-BR')}
                      </td>
                      
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Editar usuário"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`p-1 ${
                          user.status === 'active' 
                            ? 'text-orange-600 hover:text-orange-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={user.status === 'active' ? 'Desativar usuário' : 'Ativar usuário'}
                      >
                        {user.status === 'active' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Excluir usuário"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                        </div>
                      </td>
                    </tr>
              ))}
              </tbody>
            </table>
        </div>
        
        {/* Table Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Total de Usuários: <span className="font-medium">{filteredUsers.length}</span>
            </div>
            <div className="text-sm text-gray-500">
              {filteredUsers.length === users.length ? 'Mostrando todos os usuários' : `Filtrado de ${users.length} usuários`}
            </div>
          </div>
        </div>
              </div>

      {/* Create/Edit User Modal */}
      {(showCreateModal || editingUser) && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdateUser : (userId: string, userData: Partial<UserType>) => {
            handleCreateUser(userData as Omit<UserType, 'id' | 'createdAt'>);
          }}
          onCancel={() => {
            setShowCreateModal(false);
            setEditingUser(null);
          }}
        />
            )}
          </div>
  );
}

interface UserFormProps {
  user?: UserType | null;
  onSubmit: (userId: string, userData: Partial<UserType>) => void;
  onCancel: () => void;
}

function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'usuario',
    status: user?.status || 'active'
  });

  const isEditing = !!user;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || (!isEditing && !formData.password)) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!isEditing && formData.password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const userData: Partial<UserType> = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status
    };

    if (!isEditing) {
      userData.password = formData.password;
    }

    if (isEditing) {
      onSubmit(user.id, userData);
    } else {
      onSubmit(`user_${Date.now()}`, userData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
                </label>
              <input
                  type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
              </div>

            {!isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>
            )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Papel
                </label>
                <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DEFAULT_ROLES.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
                </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
              </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isEditing ? 'Salvar' : 'Criar'}
              </button>
              </div>
          </form>
            </div>
          </div>
    </div>
  );
}
