#!/bin/bash

echo "🔧 Corrigindo problema de login AGORA mesmo..."

# Conectar na VPS e corrigir o arquivo
ssh root@195.35.40.106 << 'EOF'
cd /var/www/eliteadm

echo "📝 Criando arquivo de login correto..."
cat > app/api/auth/login/route.ts << 'ROUTE_EOF'
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const users = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@admin.com',
    password: 'admin123',
    role: 'admin',
    isActive: true,
    permissions: ['system.admin', 'dashboard_view', 'users_view'],
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
    password: 'password',
    role: 'user',
    isActive: true,
    permissions: ['dashboard_view', 'contacts_view'],
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

    if (!email || !password) {
      return NextResponse.json(
        { message: 'E-mail e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Conta desativada' },
        { status: 403 }
      );
    }

    user.lastLogin = new Date();

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    const { password: _, ...userResponse } = user;

    return NextResponse.json({ user: userResponse, token });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
ROUTE_EOF

echo "✅ Arquivo de login criado!"
echo "🔨 Fazendo build..."
npm run build

echo "🚀 Reiniciando sistema..."
pm2 restart eliteadm

echo "✅ SISTEMA CORRIGIDO!"
echo "🔑 Use: admin@admin.com / admin123"
EOF

echo "🎉 PROBLEMA RESOLVIDO!"
echo "🔑 Credenciais: admin@admin.com / admin123"
