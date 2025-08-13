#!/usr/bin/env bash
set -euo pipefail
cd /var/www/eliteadm

echo "[1/7] Backup da configuração atual..."
cp -a /etc/nginx/sites-available/eliteadm /etc/nginx/sites-available/eliteadm.bak.$(date +%Y%m%d%H%M%S) || true

echo "[2/7] Corrigir Nginx para servir Next.js corretamente..."
cat > /etc/nginx/sites-available/eliteadm <<'NGINX'
server {
    listen 80;
    server_name eliteadm.com www.eliteadm.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name eliteadm.com www.eliteadm.com;

    ssl_certificate /etc/letsencrypt/live/eliteadm.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/eliteadm.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Assets estáticos
    location = /favicon.ico { alias /var/www/eliteadm/public/favicon.ico; access_log off; expires 30d; }
    location = /manifest.json { alias /var/www/eliteadm/public/manifest.json; access_log off; expires 30d; }
    location ~* ^/icon-(16x16|32x32|192x192|512x512)\.png$ {
        alias /var/www/eliteadm/public/$uri;
        access_log off;
        expires 30d;
    }

    # Next.js estáticos (CRÍTICO para funcionar)
    location /_next/static/ {
        proxy_pass http://localhost:3000/_next/static/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        access_log off;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Demais rotas via proxy para Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
NGINX

echo "[3/7] Aplicar configuração do Nginx..."
nginx -t && systemctl reload nginx

echo "[4/7] Garantir autenticação via API..."
# Usar AuthProvider da API no layout
if grep -q "from '@/hooks/useAuth'" app/layout.tsx; then
  sed -i "s#from '@/hooks/useAuth'#from '@/lib/context/AuthContext'#" app/layout.tsx
fi

# Substituir página de login para usar LoginForm (API)
cat > app/login/page.tsx <<'TSX'
'use client';

import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return <LoginForm />;
}
TSX

echo "[5/7] Configurar variáveis de ambiente..."
cat > .env.production <<'ENV'
NEXT_PUBLIC_API_URL=/api
JWT_SECRET=eliteadm-secret-key-$(openssl rand -hex 16)
NODE_ENV=production
ENV

echo "[6/7] Build e restart..."
npm run build --silent
pm2 restart eliteadm --update-env

echo "[7/7] Testes finais..."
sleep 2
echo "==> Teste da API de login:"
curl -s -X POST -H "Content-Type: application/json" -d '{"email":"admin@admin.com","password":"admin123"}' http://localhost:3000/api/auth/login | head -c 200; echo

echo "==> Teste dos chunks Next.js:"
for u in /_next/static/chunks/app/login/page-*.js /_next/static/chunks/app/layout-*.js /_next/static/css/*.css; do
  echo "==> $u"
  curl -sI "https://eliteadm.com$u" | head -n 1 || true
done

echo "Pronto! Atualize https://eliteadm.com/login (Ctrl+F5) e entre com admin@admin.com / admin123."

