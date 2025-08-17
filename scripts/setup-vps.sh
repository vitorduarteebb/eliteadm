#!/bin/bash

# setup-vps.sh - Script de setup completo da VPS para PortalAuto
# Execute como root ou com sudo

echo "🚀 SETUP COMPLETO DA VPS PARA PORTALAUTO"
echo "========================================="

# 1. Atualizar sistema
echo "1️⃣ Atualizando sistema..."
apt update && apt upgrade -y

# 2. Instalar Node.js 20
echo "2️⃣ Instalando Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# 3. Instalar PM2 globalmente
echo "3️⃣ Instalando PM2..."
npm install -g pm2

# 4. Instalar Nginx
echo "4️⃣ Instalando Nginx..."
apt install -y nginx

# 5. Criar pasta do app
echo "5️⃣ Criando estrutura de pastas..."
mkdir -p /var/www/portalauto
mkdir -p /var/www/portalauto/logs
chown -R $SUDO_USER:$SUDO_USER /var/www/portalauto

# 6. Configurar Nginx
echo "6️⃣ Configurando Nginx..."
cp nginx/portalauto.conf /etc/nginx/sites-available/portalauto.conf
ln -sf /etc/nginx/sites-available/portalauto.conf /etc/nginx/sites-enabled/portalauto.conf

# Remover configuração padrão
rm -f /etc/nginx/sites-enabled/default

# 7. Testar e recarregar Nginx
echo "7️⃣ Testando configuração do Nginx..."
nginx -t
systemctl reload nginx

# 8. Configurar firewall
echo "8️⃣ Configurando firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# 9. Configurar PM2 para iniciar com o sistema
echo "9️⃣ Configurando PM2 para iniciar com o sistema..."
pm2 startup

# 10. Criar arquivo .env básico
echo "🔟 Criando arquivo .env básico..."
cat > /var/www/portalauto/.env << 'EOF'
# ========================================
# CONFIGURAÇÕES DE PRODUÇÃO - PORTALAUTO
# ========================================
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1

# ========================================
# BRADIAL - INTEGRAÇÃO COM CHAT (CONTA 165)
# ========================================
BRADIAL_API_BASE=https://chat.bradial.com.br/api
BRADIAL_TOKEN=seu_token_bradial_aqui
BRADIAL_ACCOUNT_ID=165
BRADIAL_WEBHOOK_TOKEN=portalauto_webhook_token_2024_seguro

# ========================================
# OPENAI - INTEGRAÇÃO COM IA
# ========================================
OPENAI_API_KEY=sua_chave_openai_aqui

# ========================================
# GOOGLE - INTEGRAÇÃO COM CONTATOS E CALENDÁRIO
# ========================================
GOOGLE_CLIENT_ID=seu_google_client_id_aqui
GOOGLE_CLIENT_SECRET=seu_google_client_secret_aqui
GOOGLE_REDIRECT_URI=https://eliteadm.com/api/auth/google/callback
GOOGLE_CALENDAR_ID=primary

# ========================================
# CONFIGURAÇÕES DO SERVIDOR
# ========================================
NEXT_PUBLIC_APP_URL=https://eliteadm.com
JWT_SECRET=seu_jwt_secret_aqui

# ========================================
# CONFIGURAÇÕES ADICIONAIS
# ========================================
NEXTAUTH_URL=https://eliteadm.com
NEXTAUTH_SECRET=seu_nextauth_secret_aqui
EOF

# 11. Configurar permissões
echo "1️⃣1️⃣ Configurando permissões..."
chown -R $SUDO_USER:$SUDO_USER /var/www/portalauto
chmod 600 /var/www/portalauto/.env

# 12. Status final
echo ""
echo "✅ SETUP COMPLETO!"
echo ""
echo "🔗 URLs configuradas:"
echo "   - PortalAuto: http://eliteadm.com (porta 80)"
echo "   - Node.js: http://127.0.0.1:3000 (porta 3000)"
echo ""
echo "📁 Estrutura criada:"
echo "   - App: /var/www/portalauto"
echo "   - Logs: /var/www/portalauto/logs"
echo "   - Nginx: /etc/nginx/sites-available/portalauto.conf"
echo ""
echo "🚀 Próximos passos:"
echo "   1. Configure o arquivo .env com suas credenciais reais"
echo "   2. Faça push para main no GitHub (deploy automático)"
echo "   3. Configure o webhook do Bradial para eliteadm.com"
echo ""
echo "🔧 Comandos úteis:"
echo "   - Status PM2: pm2 status"
echo "   - Logs PM2: pm2 logs portalauto"
echo "   - Status Nginx: systemctl status nginx"
echo "   - Logs Nginx: tail -f /var/log/nginx/access.log"
