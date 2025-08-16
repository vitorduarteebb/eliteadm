# 🚀 Deploy Manual na VPS - PortalAuto

## 📋 Problema Atual
O GitHub está bloqueando o push devido às chaves de API detectadas no histórico. Para contornar isso, faremos o deploy manualmente na VPS.

## 🔧 Passos para Deploy Manual

### 1. **Conectar à VPS**
```bash
ssh root@45.79.8.82
```

### 2. **Navegar para o diretório do projeto**
```bash
cd /var/www/portalauto
```

### 3. **Verificar status atual**
```bash
git status
git log --oneline -5
```

### 4. **Fazer backup do estado atual**
```bash
cp -r . ../portalauto-backup-$(date +%Y%m%d-%H%M%S)
```

### 5. **Atualizar o repositório**
```bash
git fetch origin
git reset --hard origin/main
```

### 6. **Instalar dependências**
```bash
npm install
```

### 7. **Fazer o build de produção**
```bash
npm run build
```

### 8. **Reiniciar o serviço**
```bash
pm2 restart portalauto
```

### 9. **Verificar status**
```bash
pm2 status
pm2 logs portalauto --lines 20
```

## 🚨 Alternativa: Deploy Direto dos Arquivos

Se o Git não funcionar, você pode copiar os arquivos diretamente:

### 1. **No seu computador local, compactar os arquivos:**
```bash
# Windows (PowerShell)
Compress-Archive -Path app,components,lib,config,package.json,next.config.js,tailwind.config.js,tsconfig.json -DestinationPath portalauto-update.zip
```

### 2. **Transferir para a VPS:**
```bash
# Usar um serviço de transferência de arquivos ou
# Copiar via interface web do painel da VPS
```

### 3. **Na VPS, extrair e substituir:**
```bash
cd /var/www/portalauto
unzip portalauto-update.zip
npm install
npm run build
pm2 restart portalauto
```

## 🔑 Configuração das Variáveis de Ambiente

### 1. **Criar/editar arquivo .env.local:**
```bash
nano .env.local
```

### 2. **Adicionar as configurações:**
```bash
# OpenAI API Configuration
OPENAI_API_KEY=sua_chave_api_aqui

# Bradial API Configuration
BRADIAL_API_KEY=8LjU6QckjMey6FDt7mDEj7VU
BRADIAL_BASE_URL=https://api.bradial.com/v1

# Next.js Configuration
NEXT_PUBLIC_APP_NAME=PortalAuto - Auto Escola Onishi
NEXT_PUBLIC_APP_VERSION=1.0.0

# Production Configuration
NODE_ENV=production
```

### 3. **Salvar e sair:**
```bash
# Ctrl+X, Y, Enter
```

## 🧪 Testes Pós-Deploy

### 1. **Verificar se o servidor está rodando:**
```bash
curl http://localhost:3000
```

### 2. **Testar a API da Ayumi:**
```bash
curl -X GET http://localhost:3000/api/ayumi
```

### 3. **Verificar logs:**
```bash
pm2 logs portalauto --lines 50
```

## 🚨 Solução de Problemas

### **Erro: "Cannot find module"**
```bash
# Limpar cache e reinstalar
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### **Erro: "Port already in use"**
```bash
# Verificar processos
netstat -tulpn | grep :3000

# Matar processo se necessário
kill -9 <PID>
```

### **Erro: "Permission denied"**
```bash
# Verificar permissões
ls -la

# Corrigir se necessário
chown -R www-data:www-data .
chmod -R 755 .
```

## 📊 Verificação Final

### 1. **Status do serviço:**
```bash
pm2 status
```

### 2. **Logs em tempo real:**
```bash
pm2 logs portalauto --lines 100
```

### 3. **Teste da aplicação:**
- Acesse http://45.79.8.82:3000
- Teste a interface da Ayumi
- Teste o Kanban
- Teste o módulo de treinamento

## 🎯 Checklist de Deploy

- [ ] Conectar à VPS
- [ ] Fazer backup do estado atual
- [ ] Atualizar código (Git ou arquivos)
- [ ] Instalar dependências
- [ ] Fazer build de produção
- [ ] Configurar variáveis de ambiente
- [ ] Reiniciar serviço
- [ ] Testar funcionalidades
- [ ] Verificar logs
- [ ] Confirmar funcionamento

---

**🎉 Deploy manual concluído com sucesso!**
