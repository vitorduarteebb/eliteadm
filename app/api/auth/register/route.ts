import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock database - Em produção, use um banco de dados real
let users = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@portalauto.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
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
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, confirmPassword } = await request.json();

    // Validar dados
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: 'As senhas não coincidem' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'A senha deve ter pelo menos 8 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se o e-mail já existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: 'E-mail já cadastrado' },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = {
      id: (Date.now()).toString(),
      name,
      email,
      password: hashedPassword,
      role: 'user' as const,
      isActive: true,
      permissions: [
        {
          id: (Date.now() + 1).toString(),
          name: 'dashboard_view',
          description: 'Visualizar dashboard',
          category: 'dashboard',
          granted: true,
        },
        {
          id: (Date.now() + 2).toString(),
          name: 'kambam_view',
          description: 'Visualizar Kambam',
          category: 'kambam',
          granted: true,
        },
        {
          id: (Date.now() + 3).toString(),
          name: 'contacts_view',
          description: 'Visualizar contatos',
          category: 'contacts',
          granted: true,
        },
        {
          id: (Date.now() + 4).toString(),
          name: 'ai_use',
          description: 'Usar IA',
          category: 'ai',
          granted: true,
        },
        {
          id: (Date.now() + 5).toString(),
          name: 'usage_view',
          description: 'Visualizar monitoramento',
          category: 'reports',
          granted: true,
        },
        {
          id: (Date.now() + 6).toString(),
          name: 'settings_view',
          description: 'Visualizar configurações',
          category: 'dashboard',
          granted: true,
        },
      ],
      aiUsageLimit: 100,
      aiUsageCount: 0,
      aiUsageResetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
      lastLogin: null,
    };

    users.push(newUser);

    // Gerar token JWT
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Remover senha da resposta
    const { password: _, ...userResponse } = newUser;

    return NextResponse.json({
      user: userResponse,
      token,
    }, { status: 201 });

  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
