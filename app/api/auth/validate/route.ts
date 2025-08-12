import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Mock database - Em produção, use um banco de dados real
const users = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@portalauto.com',
    role: 'admin',
    isActive: true,
    permissions: [
      {
        id: '1',
        name: 'system.admin',
        description: 'Acesso administrativo completo',
        category: 'dashboard',
        granted: true,
      },
      {
        id: '2',
        name: 'dashboard_view',
        description: 'Visualizar dashboard',
        category: 'dashboard',
        granted: true,
      },
      {
        id: '3',
        name: 'kambam_view',
        description: 'Visualizar Kambam',
        category: 'kambam',
        granted: true,
      },
      {
        id: '4',
        name: 'contacts_view',
        description: 'Visualizar contatos',
        category: 'contacts',
        granted: true,
      },
      {
        id: '5',
        name: 'ai_use',
        description: 'Usar IA',
        category: 'ai',
        granted: true,
      },
      {
        id: '6',
        name: 'users_view',
        description: 'Visualizar usuários',
        category: 'users',
        granted: true,
      },
      {
        id: '7',
        name: 'usage_view',
        description: 'Visualizar monitoramento',
        category: 'reports',
        granted: true,
      },
      {
        id: '8',
        name: 'access_control',
        description: 'Controle de acesso',
        category: 'users',
        granted: true,
      },
      {
        id: '9',
        name: 'settings_view',
        description: 'Visualizar configurações',
        category: 'dashboard',
        granted: true,
      },
    ],
    aiUsageLimit: 1000,
    aiUsageCount: 0,
    aiUsageResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
  },
  {
    id: '2',
    name: 'Usuário Teste',
    email: 'user@portalauto.com',
    role: 'user',
    isActive: true,
    permissions: [
      {
        id: '10',
        name: 'dashboard_view',
        description: 'Visualizar dashboard',
        category: 'dashboard',
        granted: true,
      },
      {
        id: '11',
        name: 'kambam_view',
        description: 'Visualizar Kambam',
        category: 'kambam',
        granted: true,
      },
      {
        id: '12',
        name: 'contacts_view',
        description: 'Visualizar contatos',
        category: 'contacts',
        granted: true,
      },
      {
        id: '13',
        name: 'ai_use',
        description: 'Usar IA',
        category: 'ai',
        granted: true,
      },
      {
        id: '14',
        name: 'usage_view',
        description: 'Visualizar monitoramento',
        category: 'reports',
        granted: true,
      },
      {
        id: '15',
        name: 'settings_view',
        description: 'Visualizar configurações',
        category: 'dashboard',
        granted: true,
      },
    ],
    aiUsageLimit: 100,
    aiUsageCount: 15,
    aiUsageResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Token não fornecido' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
      
      // Buscar usuário
      const user = users.find(u => u.id === decoded.userId);
      if (!user) {
        return NextResponse.json(
          { message: 'Usuário não encontrado' },
          { status: 404 }
        );
      }

      if (!user.isActive) {
        return NextResponse.json(
          { message: 'Usuário desativado' },
          { status: 403 }
        );
      }

      return NextResponse.json({ user });

    } catch (jwtError) {
      return NextResponse.json(
        { message: 'Token inválido' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Erro na validação do token:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
