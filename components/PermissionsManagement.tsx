'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  SYSTEM_PERMISSIONS, 
  DEFAULT_ROLES, 
  Role, 
  Permission,
  getRolePermissions 
} from '../lib/permissions';

interface PermissionsManagementProps {
  onBack: () => void;
}

export function PermissionsManagement({ onBack }: PermissionsManagementProps) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRole, setNewRole] = useState<Partial<Role>>({
    name: '',
    description: '',
    permissions: []
  });
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = () => {
    const savedRoles = localStorage.getItem('roles');
    if (savedRoles) {
      setRoles(JSON.parse(savedRoles));
    } else {
      // Usar papéis padrão na primeira vez
      setRoles(DEFAULT_ROLES);
      localStorage.setItem('roles', JSON.stringify(DEFAULT_ROLES));
    }
  };

  const saveRoles = (updatedRoles: Role[]) => {
    setRoles(updatedRoles);
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
    setSuccessMessage('Papéis salvos com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      alert('Nome e descrição são obrigatórios');
      return;
    }

    const role: Role = {
      id: `role_${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions || [],
      isDefault: false
    };

    const updatedRoles = [...roles, role];
    saveRoles(updatedRoles);
    
    setNewRole({ name: '', description: '', permissions: [] });
    setShowCreateForm(false);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
  };

  const handleSaveRole = () => {
    if (!editingRole) return;

    const updatedRoles = roles.map(r => 
      r.id === editingRole.id ? editingRole : r
    );
    
    saveRoles(updatedRoles);
    setEditingRole(null);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isDefault) {
      alert('Não é possível excluir papéis padrão do sistema');
      return;
    }

    if (confirm('Tem certeza que deseja excluir este papel?')) {
      const updatedRoles = roles.filter(r => r.id !== roleId);
      saveRoles(updatedRoles);
    }
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    const updatedPermissions = role.permissions.includes(permissionId)
      ? role.permissions.filter(p => p !== permissionId)
      : [...role.permissions, permissionId];

    const updatedRole = { ...role, permissions: updatedPermissions };
    
    if (editingRole?.id === roleId) {
      setEditingRole(updatedRole);
    } else {
      const updatedRoles = roles.map(r => 
        r.id === roleId ? updatedRole : r
      );
      saveRoles(updatedRoles);
    }
  };

  const toggleNewRolePermission = (permissionId: string) => {
    const currentPermissions = newRole.permissions || [];
    const updatedPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter(p => p !== permissionId)
      : [...currentPermissions, permissionId];
    
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  const getPermissionName = (permissionId: string) => {
    const permission = SYSTEM_PERMISSIONS.find(p => p.id === permissionId);
    return permission ? permission.name : permissionId;
  };

  const getPermissionDescription = (permissionId: string) => {
    const permission = SYSTEM_PERMISSIONS.find(p => p.id === permissionId);
    return permission ? permission.description : '';
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
            <Users className="w-4 h-4" />
            <span>Voltar ao Menu</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <span>Gerenciamento de Permissões EliteADM</span>
          </h1>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Papel</span>
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Create Role Form */}
      {showCreateForm && (
        <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Criar Novo Papel</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Papel
              </label>
              <input
                type="text"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Supervisor"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <input
                type="text"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Gerencia equipe de vendas"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissões
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto">
              {SYSTEM_PERMISSIONS.map((permission) => (
                <label key={permission.id} className="flex items-center space-x-2 p-2 border border-gray-200 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={newRole.permissions?.includes(permission.id) || false}
                    onChange={() => toggleNewRolePermission(permission.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-700">{permission.name}</div>
                    <div className="text-xs text-gray-500">{permission.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateRole}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Criar Papel
            </button>
          </div>
        </div>
      )}

      {/* Roles List */}
      <div className="space-y-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-semibold text-gray-800">{role.name}</h3>
                    {role.isDefault && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        Padrão
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{role.description}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    {role.permissions.length} permissões
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {!role.isDefault && (
                    <>
                      <button
                        onClick={() => handleEditRole(role)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Editar papel"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                        title="Excluir papel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Permissions Grid */}
            <div className="p-6">
              <h4 className="text-lg font-medium text-gray-800 mb-4">Permissões</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SYSTEM_PERMISSIONS.map((permission) => {
                  const hasPermission = role.permissions.includes(permission.id);
                  const isEditing = editingRole?.id === role.id;
                  
                  return (
                    <div
                      key={permission.id}
                      className={`p-3 border rounded-lg ${
                        hasPermission 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              hasPermission ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            <span className={`text-sm font-medium ${
                              hasPermission ? 'text-green-800' : 'text-gray-600'
                            }`}>
                              {permission.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {permission.description}
                          </p>
                        </div>
                        
                        {isEditing && !role.isDefault && (
                          <input
                            type="checkbox"
                            checked={hasPermission}
                            onChange={() => togglePermission(role.id, permission.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {editingRole?.id === role.id && (
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingRole(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveRole}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Salvar Alterações
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Como funciona o sistema de permissões</h4>
            <p className="text-sm text-blue-700 mt-1">
              Cada usuário recebe um papel que define suas permissões no sistema EliteADM. 
              Os papéis padrão não podem ser excluídos, mas podem ser editados. 
              As permissões são verificadas em tempo real para controlar o acesso às funcionalidades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
