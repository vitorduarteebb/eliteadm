'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Users,
  Settings,
  AlertTriangle
} from 'lucide-react';

interface AccessRule {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  roles: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

const defaultPermissions: Permission[] = [
  { id: 'ai.use', name: 'Usar IA', description: 'Permitir uso da IA Bradial', category: 'AI' },
  { id: 'ai.unlimited', name: 'IA Ilimitada', description: 'Uso ilimitado da IA', category: 'AI' },
  { id: 'users.read', name: 'Visualizar Usuários', description: 'Ver lista de usuários', category: 'Usuários' },
  { id: 'users.write', name: 'Gerenciar Usuários', description: 'Criar/editar usuários', category: 'Usuários' },
  { id: 'users.delete', name: 'Excluir Usuários', description: 'Remover usuários', category: 'Usuários' },
  { id: 'monitoring.read', name: 'Ver Monitoramento', description: 'Acessar relatórios de uso', category: 'Monitoramento' },
  { id: 'access.manage', name: 'Controle de Acesso', description: 'Gerenciar regras de acesso', category: 'Segurança' },
  { id: 'system.admin', name: 'Administrador', description: 'Acesso total ao sistema', category: 'Sistema' },
];

export function AccessControl() {
  const { user } = useAuth();
  const [rules, setRules] = useState<AccessRule[]>([]);
  const [permissions] = useState<Permission[]>(defaultPermissions);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRule, setEditingRule] = useState<AccessRule | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
    roles: [] as string[],
  });

  useEffect(() => {
    loadAccessRules();
  }, []);

  const loadAccessRules = async () => {
    try {
      setIsLoading(true);
      
      // Simular dados (em produção, viria de uma API)
      const mockRules: AccessRule[] = [
        {
          id: '1',
          name: 'Usuário Padrão',
          description: 'Permissões básicas para usuários regulares',
          permissions: ['ai.use', 'users.read'],
          roles: ['user'],
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '2',
          name: 'Moderador',
          description: 'Permissões estendidas para moderadores',
          permissions: ['ai.use', 'users.read', 'users.write', 'monitoring.read'],
          roles: ['moderator'],
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
        {
          id: '3',
          name: 'Administrador',
          description: 'Acesso completo ao sistema',
          permissions: ['system.admin'],
          roles: ['admin'],
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      setRules(mockRules);
    } catch (error) {
      console.error('Erro ao carregar regras de acesso:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRule = async () => {
    try {
      const rule: AccessRule = {
        id: Date.now().toString(),
        ...newRule,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setRules([...rules, rule]);
      setNewRule({ name: '', description: '', permissions: [], roles: [] });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Erro ao criar regra:', error);
    }
  };

  const handleUpdateRule = async (ruleId: string, updates: Partial<AccessRule>) => {
    try {
      setRules(rules.map(rule => 
        rule.id === ruleId 
          ? { ...rule, ...updates, updatedAt: new Date() }
          : rule
      ));
      setEditingRule(null);
    } catch (error) {
      console.error('Erro ao atualizar regra:', error);
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta regra?')) return;
    
    try {
      setRules(rules.filter(rule => rule.id !== ruleId));
    } catch (error) {
      console.error('Erro ao excluir regra:', error);
    }
  };

  const toggleRuleStatus = (ruleId: string) => {
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      handleUpdateRule(ruleId, { isActive: !rule.isActive });
    }
  };

  const getPermissionName = (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    return permission ? permission.name : permissionId;
  };

  const groupPermissionsByCategory = () => {
    return permissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
  };

  if (user?.role !== 'admin') {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">Você não tem permissão para acessar o controle de acesso.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Controle de Acesso</h2>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nova Regra
        </Button>
      </div>

      {/* Warning Banner */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
            <p className="text-amber-700">
              <strong>Atenção:</strong> Alterações nas regras de acesso afetam imediatamente 
              todos os usuários associados. Teste cuidadosamente antes de aplicar.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Create Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Nova Regra de Acesso</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Regra</label>
              <Input
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                placeholder="Ex: Usuário Premium"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <Input
                value={newRule.description}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                placeholder="Descrição das permissões incluídas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Funções</label>
              <div className="space-y-2">
                {['user', 'moderator', 'admin'].map(role => (
                  <label key={role} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newRule.roles.includes(role)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewRule({ ...newRule, roles: [...newRule.roles, role] });
                        } else {
                          setNewRule({ ...newRule, roles: newRule.roles.filter(r => r !== role) });
                        }
                      }}
                      className="mr-2"
                    />
                    <span className="capitalize">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Permissões</label>
              <div className="space-y-4">
                {Object.entries(groupPermissionsByCategory()).map(([category, perms]) => (
                  <div key={category}>
                    <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {perms.map(permission => (
                        <label key={permission.id} className="flex items-start">
                          <input
                            type="checkbox"
                            checked={newRule.permissions.includes(permission.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewRule({ 
                                  ...newRule, 
                                  permissions: [...newRule.permissions, permission.id] 
                                });
                              } else {
                                setNewRule({ 
                                  ...newRule, 
                                  permissions: newRule.permissions.filter(p => p !== permission.id) 
                                });
                              }
                            }}
                            className="mr-2 mt-1"
                          />
                          <div>
                            <span className="text-sm font-medium">{permission.name}</span>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateRule} disabled={!newRule.name}>
                <Save className="h-4 w-4 mr-2" />
                Criar Regra
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rules List */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Carregando regras de acesso...</p>
          </div>
        ) : (
          rules.map((rule) => (
            <Card key={rule.id} className={!rule.isActive ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      {rule.isActive ? (
                        <Unlock className="h-5 w-5 mr-2 text-green-600" />
                      ) : (
                        <Lock className="h-5 w-5 mr-2 text-red-600" />
                      )}
                      {rule.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleRuleStatus(rule.id)}
                    >
                      {rule.isActive ? (
                        <Lock className="h-3 w-3" />
                      ) : (
                        <Unlock className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingRule(rule)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Funções
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {rule.roles.map(role => (
                        <span
                          key={role}
                          className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center">
                      <Settings className="h-4 w-4 mr-1" />
                      Permissões
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {rule.permissions.map(permission => (
                        <span
                          key={permission}
                          className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                        >
                          {getPermissionName(permission)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Criado: {rule.createdAt.toLocaleDateString('pt-BR')} | 
                  Atualizado: {rule.updatedAt.toLocaleDateString('pt-BR')}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
