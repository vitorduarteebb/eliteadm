import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock database - Em produção, use um banco de dados real
const users = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@admin.com',
    password: 'admin123', // Senha simples para teste
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
    lastLogin: null,
  },
  {
    id: '2',
    name: 'Usuário Teste',
    email: 'user@portalauto.com',
    password: 'password', // Senha simples para teste
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

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar dados
    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar usuário
    const user = users.find(u => u.email === email);
    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar senha (comparação simples)
    const isValidPassword = password === user.password;
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    // Verificar se o usuário está ativo
    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Conta desativada. Entre em contato com o administrador.' },
        { status: 403 }
      );
    }

    // Atualizar último login
    user.lastLogin = new Date();

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Remover senha da resposta
    const { password: _, ...userResponse } = user;

    return NextResponse.json({
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
