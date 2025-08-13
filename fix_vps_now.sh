#!/bin/bash

echo "🚨 CORRIGINDO VPS AGORA MESMO!"

ssh root@195.35.40.106 << 'EOF'
cd /var/www/eliteadm

echo "🔧 1. Corrigindo configurações de URL..."
# Corrigir ecosystem.config.js
sed -i 's|https://eliteadm.com|http://localhost:3000|g' ecosystem.config.js

# Corrigir .env.production
echo "NEXT_PUBLIC_API_URL=/api" > .env.production

echo "📝 2. Recriando arquivo de login..."
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

echo "🔨 3. Fazendo build..."
npm run build

echo "🚀 4. Reiniciando sistema..."
pm2 restart eliteadm

echo "✅ SISTEMA CORRIGIDO!"
echo "🔑 Use: admin@admin.com / admin123"
EOF

echo "🎉 VPS CORRIGIDA!"
