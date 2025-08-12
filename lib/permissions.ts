export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[]; // IDs das permissões
  isDefault?: boolean;
}

export interface UserRole {
  userId: string;
  roleId: string;
  assignedAt: Date;
  assignedBy: string;
}

// Permissões disponíveis no sistema
export const SYSTEM_PERMISSIONS: Permission[] = [
  // Usuários
  { id: 'users:create', name: 'Criar Usuários', description: 'Pode criar novos usuários no sistema EliteADM', resource: 'users', action: 'create' },
  { id: 'users:read', name: 'Visualizar Usuários', description: 'Pode visualizar informações de usuários', resource: 'users', action: 'read' },
  { id: 'users:update', name: 'Editar Usuários', description: 'Pode editar informações de usuários', resource: 'users', action: 'update' },
  { id: 'users:delete', name: 'Excluir Usuários', description: 'Pode excluir usuários do sistema EliteADM', resource: 'users', action: 'delete' },
  
  // Dashboard
  { id: 'dashboard:read', name: 'Visualizar Dashboard', description: 'Pode acessar o dashboard principal do EliteADM', resource: 'dashboard', action: 'read' },
  
  // Ayumi
  { id: 'ayumi:use', name: 'Usar Ayumi', description: 'Pode usar o chat da Ayumi no sistema EliteADM', resource: 'ayumi', action: 'use' },
  { id: 'ayumi:configure', name: 'Configurar Ayumi', description: 'Pode configurar regras da Ayumi no EliteADM', resource: 'ayumi', action: 'configure' },
  
  // Relatórios
  { id: 'reports:read', name: 'Visualizar Relatórios', description: 'Pode acessar relatórios do sistema EliteADM', resource: 'reports', action: 'read' },
  { id: 'reports:generate', name: 'Gerar Relatórios', description: 'Pode gerar novos relatórios no EliteADM', resource: 'reports', action: 'generate' },
  
  // Configurações
  { id: 'settings:read', name: 'Visualizar Configurações', description: 'Pode visualizar configurações do sistema EliteADM', resource: 'settings', action: 'read' },
  { id: 'settings:update', name: 'Editar Configurações', description: 'Pode modificar configurações do sistema EliteADM', resource: 'settings', action: 'update' },
  
  // Permissões
  { id: 'permissions:read', name: 'Visualizar Permissões', description: 'Pode visualizar permissões e papéis no EliteADM', resource: 'permissions', action: 'read' },
  { id: 'permissions:manage', name: 'Gerenciar Permissões', description: 'Pode criar, editar e excluir papéis e permissões no EliteADM', resource: 'permissions', action: 'manage' },
  
  // Contatos
  { id: 'contacts:read', name: 'Visualizar Contatos', description: 'Pode visualizar lista de contatos no EliteADM', resource: 'contacts', action: 'read' },
  { id: 'contacts:create', name: 'Criar Contatos', description: 'Pode criar novos contatos no EliteADM', resource: 'contacts', action: 'create' },
  { id: 'contacts:update', name: 'Editar Contatos', description: 'Pode editar contatos existentes no EliteADM', resource: 'contacts', action: 'update' },
  { id: 'contacts:delete', name: 'Excluir Contatos', description: 'Pode excluir contatos do EliteADM', resource: 'contacts', action: 'delete' },
  
  // Kanban
  { id: 'kanban:read', name: 'Visualizar Kanban', description: 'Pode visualizar o quadro kanban do EliteADM', resource: 'kanban', action: 'read' },
  { id: 'kanban:manage', name: 'Gerenciar Kanban', description: 'Pode criar, editar e excluir tarefas no EliteADM', resource: 'kanban', action: 'manage' }
];

// Papéis padrão do sistema
export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Administrador',
    description: 'Acesso total ao sistema EliteADM',
    permissions: SYSTEM_PERMISSIONS.map(p => p.id),
    isDefault: false
  },
  {
    id: 'gerente',
    name: 'Gerente',
    description: 'Gerencia equipe e processos no EliteADM',
    permissions: [
      'users:read', 'users:update',
      'dashboard:read',
      'ayumi:use', 'ayumi:configure',
      'reports:read', 'reports:generate',
      'settings:read',
      'permissions:read',
      'contacts:read', 'contacts:create', 'contacts:update',
      'kanban:read', 'kanban:manage'
    ],
    isDefault: false
  },
  {
    id: 'vendedor',
    name: 'Vendedor',
    description: 'Atende clientes e gerencia vendas no EliteADM',
    permissions: [
      'dashboard:read',
      'ayumi:use',
      'reports:read',
      'contacts:read', 'contacts:create', 'contacts:update',
      'kanban:read'
    ],
    isDefault: false
  },
  {
    id: 'instrutor',
    name: 'Instrutor',
    description: 'Instrutor de direção no EliteADM',
    permissions: [
      'dashboard:read',
      'ayumi:use',
      'reports:read'
    ],
    isDefault: false
  },
  {
    id: 'usuario',
    name: 'Usuário',
    description: 'Usuário básico do sistema EliteADM',
    permissions: [
      'dashboard:read',
      'ayumi:use'
    ],
    isDefault: true
  }
];

// Função para verificar se um usuário tem uma permissão específica
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission);
}

// Função para obter permissões de um papel
export function getRolePermissions(roleId: string): string[] {
  const role = DEFAULT_ROLES.find(r => r.id === roleId);
  return role ? role.permissions : [];
}

// Função para obter todas as permissões de um usuário baseado em seus papéis
export function getUserPermissions(userRoles: string[]): string[] {
  const permissions = new Set<string>();
  
  userRoles.forEach(roleId => {
    const rolePermissions = getRolePermissions(roleId);
    rolePermissions.forEach(permission => permissions.add(permission));
  });
  
  return Array.from(permissions);
}
