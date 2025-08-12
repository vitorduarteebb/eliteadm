'use client';

import { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  X,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Copy,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  granted: boolean;
  required: boolean;
  dependencies: string[];
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  canEdit: boolean;
}

interface PermissionGroup {
  category: string;
  permissions: Permission[];
}

const mockPermissions: Permission[] = [
  // Dashboard
  { id: 'dashboard_view', name: 'Visualizar Dashboard', description: 'Acesso ao painel principal', category: 'dashboard', granted: true, required: false, dependencies: [] },
  { id: 'dashboard_analytics', name: 'Analytics do Dashboard', description: 'Visualizar estatísticas e relatórios', category: 'dashboard', granted: true, required: false, dependencies: ['dashboard_view'] },
  { id: 'dashboard_export', name: 'Exportar Dashboard', description: 'Baixar dados do dashboard', category: 'dashboard', granted: false, required: false, dependencies: ['dashboard_view'] },
  
  // Usuários
  { id: 'users_view', name: 'Visualizar Usuários', description: 'Listar usuários do sistema', category: 'users', granted: true, required: false, dependencies: [] },
  { id: 'users_create', name: 'Criar Usuários', description: 'Cadastrar novos usuários', category: 'users', granted: false, required: false, dependencies: ['users_view'] },
  { id: 'users_edit', name: 'Editar Usuários', description: 'Modificar dados de usuários', category: 'users', granted: false, required: false, dependencies: ['users_view'] },
  { id: 'users_delete', name: 'Excluir Usuários', description: 'Remover usuários do sistema', category: 'users', granted: false, required: false, dependencies: ['users_view'] },
  { id: 'users_permissions', name: 'Gerenciar Permissões', description: 'Alterar permissões de usuários', category: 'users', granted: false, required: false, dependencies: ['users_view'] },
  
  // Kanban
  { id: 'kambam_view', name: 'Visualizar Kanban', description: 'Acesso aos quadros Kanban', category: 'kanban', granted: true, required: false, dependencies: [] },
  { id: 'kambam_create', name: 'Criar Kanban', description: 'Criar novos quadros e cartões', category: 'kanban', granted: false, required: false, dependencies: ['kambam_view'] },
  { id: 'kambam_edit', name: 'Editar Kanban', description: 'Modificar quadros e cartões', category: 'kanban', granted: false, required: false, dependencies: ['kambam_view'] },
  { id: 'kambam_delete', name: 'Excluir Kanban', description: 'Remover quadros e cartões', category: 'kanban', granted: false, required: false, dependencies: ['kambam_view'] },
  
  // Contatos
  { id: 'contacts_view', name: 'Visualizar Contatos', description: 'Listar contatos e leads', category: 'contacts', granted: true, required: false, dependencies: [] },
  { id: 'contacts_create', name: 'Criar Contatos', description: 'Cadastrar novos contatos', category: 'contacts', granted: false, required: false, dependencies: ['contacts_view'] },
  { id: 'contacts_edit', name: 'Editar Contatos', description: 'Modificar dados de contatos', category: 'contacts', granted: false, required: false, dependencies: ['contacts_view'] },
  { id: 'contacts_delete', name: 'Excluir Contatos', description: 'Remover contatos do sistema', category: 'contacts', granted: false, required: false, dependencies: ['contacts_view'] },
  { id: 'contacts_appointments', name: 'Gerenciar Agendamentos', description: 'Criar e editar compromissos', category: 'contacts', granted: false, required: false, dependencies: ['contacts_view'] },
  
  // IA
  { id: 'ai_use', name: 'Usar IA Ayumi', description: 'Acesso à interface de IA', category: 'ai', granted: true, required: false, dependencies: [] },
  { id: 'ai_admin', name: 'Administrar IA', description: 'Configurações avançadas da IA', category: 'ai', granted: false, required: false, dependencies: ['ai_use'] },
  { id: 'ai_analytics', name: 'Analytics da IA', description: 'Visualizar métricas de uso da IA', category: 'ai', granted: false, required: false, dependencies: ['ai_use'] },
  
  // Relatórios
  { id: 'reports_view', name: 'Visualizar Relatórios', description: 'Acesso aos relatórios do sistema', category: 'reports', granted: false, required: false, dependencies: [] },
  { id: 'reports_export', name: 'Exportar Relatórios', description: 'Baixar relatórios em diferentes formatos', category: 'reports', granted: false, required: false, dependencies: ['reports_view'] },
  { id: 'reports_create', name: 'Criar Relatórios', description: 'Gerar relatórios personalizados', category: 'reports', granted: false, required: false, dependencies: ['reports_view'] },
  
  // Sistema
  { id: 'system_settings', name: 'Configurações do Sistema', description: 'Acesso às configurações gerais', category: 'system', granted: false, required: false, dependencies: [] },
  { id: 'system_logs', name: 'Logs do Sistema', description: 'Visualizar logs de auditoria', category: 'system', granted: false, required: false, dependencies: ['system_settings'] },
  { id: 'system_backup', name: 'Backup do Sistema', description: 'Gerenciar backups e restaurações', category: 'system', granted: false, required: false, dependencies: ['system_settings'] }
];

const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acesso total ao sistema',
    permissions: mockPermissions.map(p => p.id),
    isDefault: false,
    canEdit: false
  },
  {
    id: 'manager',
    name: 'Gerente',
    description: 'Acesso de gestão com limitações',
    permissions: ['dashboard_view', 'dashboard_analytics', 'users_view', 'kambam_view', 'kambam_create', 'kambam_edit', 'contacts_view', 'contacts_create', 'contacts_edit', 'ai_use', 'reports_view'],
    isDefault: false,
    canEdit: true
  },
  {
    id: 'user',
    name: 'Usuário',
    description: 'Acesso básico ao sistema',
    permissions: ['dashboard_view', 'kambam_view', 'kambam_create', 'kambam_edit', 'contacts_view', 'contacts_create', 'contacts_edit', 'ai_use'],
    isDefault: true,
    canEdit: true
  },
  {
    id: 'viewer',
    name: 'Visualizador',
    description: 'Acesso somente leitura',
    permissions: ['dashboard_view', 'kambam_view', 'contacts_view'],
    isDefault: false,
    canEdit: true
  }
];

export function PermissionManager() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const permissionGroups = permissions.reduce((groups, permission) => {
    const category = permission.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {} as Record<string, Permission[]>);

  const handlePermissionToggle = (permissionId: string, roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role || !role.canEdit) return;

    const hasPermission = role.permissions.includes(permissionId);
    const newPermissions = hasPermission
      ? role.permissions.filter(p => p !== permissionId)
      : [...role.permissions, permissionId];

    setRoles(prev => prev.map(r => 
      r.id === roleId ? { ...r, permissions: newPermissions } : r
    ));
  };

  const handleCreateRole = (roleData: Omit<Role, 'id'>) => {
    const newRole: Role = {
      ...roleData,
      id: `role_${Date.now()}`,
      canEdit: true
    };
    setRoles(prev => [...prev, newRole]);
    setShowCreateRole(false);
  };

  const handleUpdateRole = (roleData: Role) => {
    setRoles(prev => prev.map(r => r.id === roleData.id ? roleData : r));
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isDefault) {
      alert('Não é possível excluir um papel padrão do sistema.');
      return;
    }
    setRoles(prev => prev.filter(r => r.id !== roleId));
  };

  const getPermissionStatus = (permissionId: string, roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.permissions.includes(permissionId) || false;
  };

  const getDependencyStatus = (permission: Permission, roleId: string) => {
    if (permission.dependencies.length === 0) return true;
    return permission.dependencies.every(depId => getPermissionStatus(depId, roleId));
  };

  const canGrantPermission = (permission: Permission, roleId: string) => {
    if (permission.required) return false;
    return getDependencyStatus(permission, roleId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dashboard': return '📊';
      case 'users': return '👥';
      case 'kanban': return '📋';
      case 'contacts': return '📞';
      case 'ai': return '🤖';
      case 'reports': return '📈';
      case 'system': return '⚙️';
      default: return '🔧';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dashboard': return 'bg-blue-100 text-blue-800';
      case 'users': return 'bg-green-100 text-green-800';
      case 'kanban': return 'bg-purple-100 text-purple-800';
      case 'contacts': return 'bg-orange-100 text-orange-800';
      case 'ai': return 'bg-pink-100 text-pink-800';
      case 'reports': return 'bg-indigo-100 text-indigo-800';
      case 'system': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-600">🔐 Gerenciamento de Permissões</h1>
              <p className="text-gray-600">Configure regras de acesso e permissões do sistema</p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowCreateRole(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Novo Papel
              </Button>
              <Button
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                variant="outline"
                className="px-6 py-2 rounded-lg"
              >
                <Settings className="h-5 w-5 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar permissões..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Todas as Categorias</option>
              {Object.keys(permissionGroups).map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <Button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
              }}
              variant="outline"
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Papéis */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Papéis do Sistema
              </h3>
              
              <div className="space-y-3">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRole?.id === role.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{role.name}</h4>
                        <p className="text-sm text-gray-600">{role.description}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {role.permissions.length} permissões
                          </span>
                          {role.isDefault && (
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              Padrão
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        {role.canEdit && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingRole(role);
                            }}
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        )}
                        {role.canEdit && !role.isDefault && (
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRole(role.id);
                            }}
                            size="sm"
                            variant="outline"
                            className="h-6 w-6 p-0 text-red-600"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Permissões */}
          <div className="lg:col-span-2">
            {selectedRole ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Permissões: {selectedRole.name}
                    </h3>
                    <p className="text-gray-600">{selectedRole.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {selectedRole.permissions.length} de {permissions.length} permissões
                    </span>
                    {!selectedRole.canEdit && (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                        Somente Leitura
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {Object.entries(permissionGroups)
                    .filter(([category]) => categoryFilter === 'all' || category === categoryFilter)
                    .map(([category, categoryPermissions]) => {
                      const filteredPermissions = categoryPermissions.filter(permission =>
                        searchTerm === '' || 
                        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        permission.description.toLowerCase().includes(searchTerm.toLowerCase())
                      );

                      if (filteredPermissions.length === 0) return null;

                      return (
                        <div key={category} className="border border-gray-200 rounded-lg">
                          <div className={`px-4 py-3 ${getCategoryColor(category)} rounded-t-lg`}>
                            <h4 className="font-semibold flex items-center">
                              {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h4>
                          </div>
                          
                          <div className="p-4 space-y-3">
                            {filteredPermissions.map((permission) => {
                              const isGranted = getPermissionStatus(permission.id, selectedRole.id);
                              const canGrant = canGrantPermission(permission, selectedRole.id);
                              const dependencyMet = getDependencyStatus(permission, selectedRole.id);

                              return (
                                <div
                                  key={permission.id}
                                  className={`p-3 rounded-lg border ${
                                    isGranted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                                  } ${!canGrant ? 'opacity-50' : ''}`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2">
                                        <h5 className="font-medium text-gray-900">{permission.name}</h5>
                                        {permission.required && (
                                          <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                                            Obrigatória
                                          </span>
                                        )}
                                        {!dependencyMet && (
                                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                                            Dependência
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600 mt-1">{permission.description}</p>
                                      {permission.dependencies.length > 0 && (
                                        <p className="text-xs text-gray-500 mt-1">
                                          Depende de: {permission.dependencies.join(', ')}
                                        </p>
                                      )}
                                    </div>
                                    
                                    <div className="ml-4">
                                      <label className="flex items-center">
                                        <input
                                          type="checkbox"
                                          checked={isGranted}
                                          onChange={() => handlePermissionToggle(permission.id, selectedRole.id)}
                                          disabled={!canGrant || !selectedRole.canEdit}
                                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione um Papel</h3>
                <p className="text-gray-500">Escolha um papel na lista ao lado para gerenciar suas permissões</p>
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Papéis</p>
                <p className="text-2xl font-semibold text-gray-900">{roles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total de Permissões</p>
                <p className="text-2xl font-semibold text-gray-900">{permissions.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Papéis Editáveis</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {roles.filter(r => r.canEdit).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Permissões Obrigatórias</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {permissions.filter(p => p.required).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Criação/Edição de Papel */}
      {(showCreateRole || editingRole) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingRole ? 'Editar Papel' : 'Novo Papel'}
            </h3>
            <RoleForm
              role={editingRole}
              onSubmit={editingRole ? handleUpdateRole : handleCreateRole}
              onCancel={() => {
                setShowCreateRole(false);
                setEditingRole(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Componente do Formulário de Papel
interface RoleFormProps {
  role?: Role;
  onSubmit: (roleData: Omit<Role, 'id'>) => void;
  onCancel: () => void;
}

function RoleForm({ role, onSubmit, onCancel }: RoleFormProps) {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: role?.permissions || [],
    isDefault: role?.isDefault || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Papel</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={3}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
          Papel padrão do sistema
        </label>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
          {role ? 'Atualizar' : 'Criar'}
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
