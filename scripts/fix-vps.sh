#!/bin/bash

# fix-vps.sh - Script de diagnóstico e correção da VPS
# Execute quando SSH estiver funcionando

echo "🔧 DIAGNÓSTICO E CORREÇÃO DA VPS"
echo "=================================="

# 1. Verificar status dos serviços
echo "1️⃣ Verificando status dos serviços..."
echo "--- PM2 Status ---"
pm2 status

echo "--- Nginx Status ---"
systemctl status nginx --no-pager -l

echo "--- Node Version ---"
node -v

# 2. Verificar estrutura de pastas
echo ""
echo "2️⃣ Verificando estrutura de pastas..."
ls -la /var/www/portalauto/
echo "--- Conteúdo .env ---"
if [ -f /var/www/portalauto/.env ]; then
    cat /var/www/portalauto/.env | head -10
else
    echo "❌ Arquivo .env não encontrado!"
fi

# 3. Verificar logs do PM2
echo ""
echo "3️⃣ Verificando logs do PM2..."
if pm2 list | grep -q portalauto; then
    echo "--- Últimas 20 linhas de erro ---"
    pm2 logs portalauto --err --lines 20
    echo "--- Últimas 20 linhas de saída ---"
    pm2 logs portalauto --out --lines 20
else
    echo "❌ Aplicação portalauto não encontrada no PM2!"
fi

# 4. Verificar se o build existe
echo ""
echo "4️⃣ Verificando build do Next.js..."
if [ -d "/var/www/portalauto/.next" ]; then
    echo "✅ Pasta .next encontrada"
    ls -la /var/www/portalauto/.next/
else
    echo "❌ Pasta .next não encontrada - Build necessário!"
fi

# 5. Verificar se server.js existe (standalone)
echo ""
echo "5️⃣ Verificando server.js (standalone)..."
if [ -f "/var/www/portalauto/server.js" ]; then
    echo "✅ server.js encontrado (standalone)"
    ls -la /var/www/portalauto/server.js
else
    echo "❌ server.js não encontrado - Build standalone necessário!"
fi

# 6. Verificar configuração do Nginx
echo ""
echo "6️⃣ Verificando configuração do Nginx..."
if [ -f "/etc/nginx/sites-enabled/portalauto.conf" ]; then
    echo "✅ Configuração do Nginx encontrada"
    nginx -t
else
    echo "❌ Configuração do Nginx não encontrada!"
fi

# 7. Verificar portas em uso
echo ""
echo "7️⃣ Verificando portas em uso..."
netstat -tlnp | grep -E ':(80|443|3000|3001)'

# 8. Verificar firewall
echo ""
echo "8️⃣ Verificando firewall..."
ufw status

# 9. Tentar correções automáticas
echo ""
echo "9️⃣ Tentando correções automáticas..."

# Se não tem build, tentar fazer
if [ ! -d "/var/www/portalauto/.next" ] && [ ! -f "/var/www/portalauto/server.js" ]; then
    echo "🔨 Fazendo build do Next.js..."
    cd /var/www/portalauto
    
    # Verificar se tem package.json
    if [ -f "package.json" ]; then
        echo "📦 Instalando dependências..."
        npm ci
        
        echo "🔨 Fazendo build..."
        npm run build
        
        if [ $? -eq 0 ]; then
            echo "✅ Build realizado com sucesso!"
        else
            echo "❌ Erro no build!"
        fi
    else
        echo "❌ package.json não encontrado!"
    fi
fi

# Se tem build mas não tem server.js, tentar standalone
if [ -d "/var/www/portalauto/.next" ] && [ ! -f "/var/www/portalauto/server.js" ]; then
    echo "🔨 Configurando output standalone..."
    cd /var/www/portalauto
    
    # Criar next.config.mjs temporário
    echo 'export default { output: "standalone" }' > next.config.mjs
    
    echo "🔨 Fazendo build standalone..."
    npm run build
    
    if [ -d ".next/standalone" ]; then
        echo "✅ Build standalone realizado!"
        echo "📁 Copiando arquivos standalone..."
        cp -r .next/standalone/* .
        mkdir -p .next/static
        cp -r .next/static .next/
    else
        echo "❌ Erro no build standalone!"
    fi
fi

# 10. Reiniciar serviços
echo ""
echo "🔟 Reiniciando serviços..."
pm2 restart portalauto
systemctl reload nginx

# 11. Status final
echo ""
echo "✅ DIAGNÓSTICO E CORREÇÃO CONCLUÍDOS!"
echo ""
echo "🔧 Próximos passos manuais:"
echo "   1. Verifique os logs: pm2 logs portalauto"
echo "   2. Teste a API: curl http://localhost:3000/api/ayumi"
echo "   3. Teste o site: curl http://localhost:3000"
echo "   4. Configure o .env com credenciais reais"
echo ""
echo "🚀 Se tudo estiver funcionando, faça push para main no GitHub!"
