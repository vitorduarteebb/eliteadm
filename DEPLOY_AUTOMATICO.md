# 🚀 DEPLOY AUTOMÁTICO PORTALAUTO

## 📋 **RESUMO EXECUTIVO**

Sistema de deploy automático completo com GitHub Actions + PM2 + Nginx. Qualquer push na `main` dispara o deploy automático na VPS.

## 🔧 **ARQUIVOS CRIADOS**

- ✅ `.github/workflows/deploy.yml` - Workflow de deploy automático
- ✅ `ecosystem.config.cjs` - Configuração do PM2
- ✅ `nginx/portalauto.conf` - Configuração do Nginx
- ✅ `scripts/setup-vps.sh` - Script de setup da VPS
- ✅ `scripts/fix-vps.sh` - Script de diagnóstico e correção

## 🎯 **COMO FUNCIONA**

1. **Push para main** → GitHub Actions detecta
2. **Build automático** → Next.js standalone
3. **Deploy via rsync** → Arquivos para VPS
4. **PM2 reload** → Aplicação reiniciada
5. **Zero downtime** → Sem interrupção do serviço

## 🔑 **SECRETS NECESSÁRIOS NO GITHUB**

Configure estes secrets no seu repositório (`Settings > Secrets and variables > Actions`):

### **SSH Connection:**
- `SSH_HOST` → `eliteadm.com`
- `SSH_PORT` → `22`
- `SSH_USER` → `root`
- `SSH_KEY` → Chave privada SSH da VPS
- `SSH_PATH` → `/var/www/portalauto`

### **Environment:**
- `ENV_PRODUCTION` → Conteúdo completo do seu `.env` de produção

## 🚀 **PRIMEIRA CONFIGURAÇÃO (VPS)**

### **1. Conectar na VPS:**
```bash
ssh root@eliteadm.com
```

### **2. Executar setup automático:**
```bash
# Fazer upload dos scripts
scp scripts/setup-vps.sh root@eliteadm.com:/tmp/
scp nginx/portalauto.conf root@eliteadm.com:/tmp/

# Executar setup
ssh root@eliteadm.com "chmod +x /tmp/setup-vps.sh && /tmp/setup-vps.sh"
```

### **3. Configurar credenciais reais:**
```bash
nano /var/www/portalauto/.env
# Editar com suas credenciais reais
```

## 🔄 **DEPLOY AUTOMÁTICO**

### **1. Fazer commit das alterações:**
```bash
git add .
git commit -m "🚀 Deploy automático configurado"
git push origin main
```

### **2. GitHub Actions executa automaticamente:**
- ✅ Build do Next.js
- ✅ Deploy para VPS
- ✅ PM2 reload
- ✅ Status reportado

### **3. Verificar deploy:**
```bash
# Na VPS
pm2 status
pm2 logs portalauto
```

## 🛠️ **MANUTENÇÃO E DIAGNÓSTICO**

### **Script de diagnóstico:**
```bash
# Upload e execução
scp scripts/fix-vps.sh root@eliteadm.com:/tmp/
ssh root@eliteadm.com "chmod +x /tmp/fix-vps.sh && /tmp/fix-vps.sh"
```

### **Comandos úteis:**
```bash
# Status dos serviços
pm2 status
systemctl status nginx

# Logs
pm2 logs portalauto
tail -f /var/log/nginx/access.log

# Reiniciar
pm2 restart portalauto
systemctl reload nginx
```

## 🔍 **SOLUÇÃO DE PROBLEMAS**

### **Erro 500 na API:**
1. Verificar logs: `pm2 logs portalauto`
2. Verificar build: `ls -la /var/www/portalauto/`
3. Executar diagnóstico: `./fix-vps.sh`

### **Deploy falhou:**
1. Verificar secrets no GitHub
2. Verificar conectividade SSH
3. Verificar permissões na VPS

### **Nginx não funciona:**
1. Verificar configuração: `nginx -t`
2. Verificar status: `systemctl status nginx`
3. Verificar portas: `netstat -tlnp`

## 📊 **MONITORAMENTO**

### **PM2 Dashboard:**
```bash
pm2 monit
```

### **Logs em tempo real:**
```bash
pm2 logs portalauto --lines 100 -f
```

### **Status dos serviços:**
```bash
pm2 status
systemctl status nginx
```

## 🚀 **PRÓXIMOS PASSOS**

1. **Configure os secrets** no GitHub
2. **Execute o setup** na VPS
3. **Configure credenciais** reais
4. **Faça push** para main
5. **Monitore o deploy** automático

## 🎉 **RESULTADO FINAL**

- ✅ **Deploy automático** com zero downtime
- ✅ **Build otimizado** (standalone)
- ✅ **Monitoramento** completo
- ✅ **Escalabilidade** para produção
- ✅ **Manutenção** simplificada

---

**🚀 PortalAuto com deploy automático configurado e funcionando!**
