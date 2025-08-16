#!/bin/bash

echo "========================================="
echo "CORREÇÃO COMPLETA DA VPS - PORTALAUTO"
echo "========================================="
echo

# 1. Instalar dependências necessárias
echo "1. Instalando dependências..."
apt update
apt install -y unzip curl wget git

# 2. Verificar se o diretório existe
echo "2. Verificando estrutura de diretórios..."
if [ ! -d "/var/www" ]; then
    echo "Criando diretório /var/www..."
    mkdir -p /var/www
fi

# 3. Criar diretório do projeto
echo "3. Criando diretório do projeto..."
mkdir -p /var/www/portalauto
cd /var/www/portalauto

# 4. Verificar se já existe um projeto
if [ -f "package.json" ]; then
    echo "4. Projeto existente encontrado, fazendo backup..."
    cp -r . ../portalauto-backup-$(date +%Y%m%d-%H%M%S)
    echo "Backup criado com sucesso!"
else
    echo "4. Nenhum projeto existente encontrado."
fi

# 5. Verificar se o arquivo de atualização existe
echo "5. Verificando arquivo de atualização..."
if [ -f "portalauto-update.zip" ]; then
    echo "Arquivo encontrado! Extraindo..."
    unzip -o portalauto-update.zip
    echo "Arquivos extraídos com sucesso!"
else
    echo "Arquivo portalauto-update.zip não encontrado!"
    echo "Por favor, faça upload do arquivo primeiro."
    echo "Use: scp portalauto-update.zip root@45.79.8.82:/var/www/portalauto/"
    exit 1
fi

# 6. Instalar dependências Node.js
echo "6. Instalando dependências Node.js..."
if [ -f "package.json" ]; then
    npm install
    echo "Dependências instaladas com sucesso!"
else
    echo "ERRO: package.json não encontrado após extração!"
    exit 1
fi

# 7. Fazer build de produção
echo "7. Fazendo build de produção..."
npm run build
if [ $? -eq 0 ]; then
    echo "Build concluído com sucesso!"
else
    echo "ERRO: Falha no build!"
    exit 1
fi

# 8. Configurar PM2
echo "8. Configurando PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "Instalando PM2..."
    npm install -g pm2
fi

# 9. Parar processo existente se houver
pm2 stop portalauto 2>/dev/null || true
pm2 delete portalauto 2>/dev/null || true

# 10. Iniciar aplicação
echo "9. Iniciando aplicação com PM2..."
pm2 start npm --name "portalauto" -- start
pm2 save
pm2 startup

# 11. Verificar status
echo "10. Verificando status..."
pm2 status
echo
echo "========================================="
echo "DEPLOY CONCLUÍDO COM SUCESSO!"
echo "========================================="
echo
echo "Próximos passos:"
echo "1. Configure as variáveis de ambiente:"
echo "   nano .env.local"
echo
echo "2. Adicione:"
echo "   OPENAI_API_KEY=sua_chave_api_aqui"
echo "   BRADIAL_API_KEY=8LjU6QckjMey6FDt7mDEj7VU"
echo "   BRADIAL_BASE_URL=https://api.bradial.com/v1"
echo "   NODE_ENV=production"
echo
echo "3. Reinicie o serviço:"
echo "   pm2 restart portalauto"
echo
echo "4. Teste a aplicação:"
echo "   curl http://localhost:3000"
echo
echo "========================================="
