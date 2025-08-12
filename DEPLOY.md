# 🚀 **GUIA DE DEPLOY - ELITEADM**

## **📋 Pré-requisitos**

- **VPS Ubuntu 25.04** (srv950816.hstgr.cloud)
- **IP:** 195.35.40.106
- **Domínio:** eliteadm.com
- **Acesso SSH root** habilitado

## **🔧 Passos para Deploy**

### **1. Preparar o Sistema Local**

```bash
# Executar o script de preparação
chmod +x deploy.sh
./deploy.sh
```

### **2. Copiar Arquivos para VPS**

```bash
# Copiar todo o projeto para a VPS
scp -r . root@195.35.40.106:/tmp/eliteadm
```

### **3. Conectar na VPS**

```bash
ssh root@195.35.40.106
```

### **4. Instalar Dependências do Sistema**

```bash
cd /tmp/eliteadm
chmod +x install-vps.sh
./install-vps.sh
```

### **5. Fazer Deploy da Aplicação**

```bash
chmod +x deploy-vps.sh
./deploy-vps.sh
```

## **🌐 Configuração do Domínio**

### **DNS Records (Configurar no seu provedor de domínio):**

```
Tipo: A
Nome: @
Valor: 195.35.40.106
TTL: 300

Tipo: A
Nome: www
Valor: 195.35.40.106
TTL: 300
```

## **🔒 SSL/HTTPS**

O sistema configurará automaticamente SSL com Let's Encrypt:
- **Domínio:** eliteadm.com
- **Renovação:** Automática (cron job)
- **Certificado:** Gratuito e válido por 90 dias

## **📊 Monitoramento**

### **Verificar Status:**

```bash
# Status da aplicação
pm2 status

# Logs da aplicação
pm2 logs eliteadm

# Status do Nginx
systemctl status nginx

# Status do sistema
htop
df -h
free -h
```

### **Comandos Úteis:**

```bash
# Reiniciar aplicação
pm2 restart eliteadm

# Parar aplicação
pm2 stop eliteadm

# Iniciar aplicação
pm2 start eliteadm

# Ver logs em tempo real
pm2 logs eliteadm --lines 100 --follow

# Reiniciar Nginx
systemctl restart nginx

# Verificar configuração do Nginx
nginx -t
```

## **🔄 Atualizações**

### **Para atualizar a aplicação:**

```bash
# 1. Fazer backup (opcional)
cp -r /var/www/eliteadm /var/www/eliteadm.backup.$(date +%Y%m%d)

# 2. Parar aplicação
pm2 stop eliteadm

# 3. Copiar novos arquivos
rm -rf /var/www/eliteadm/*
cp -r /tmp/eliteadm/* /var/www/eliteadm/

# 4. Instalar dependências e fazer build
cd /var/www/eliteadm
npm ci --only=production
npm run build

# 5. Reiniciar aplicação
pm2 start eliteadm
```

## **📁 Estrutura de Arquivos na VPS**

```
/var/www/eliteadm/
├── .next/                 # Build da aplicação
├── public/                # Arquivos estáticos
├── node_modules/          # Dependências
├── ecosystem.config.js    # Configuração PM2
├── package.json           # Dependências do projeto
└── deploy-vps.sh         # Script de deploy
```

## **🔧 Configurações de Sistema**

### **Firewall (UFW):**
- **Porta 22:** SSH
- **Porta 80:** HTTP (redireciona para HTTPS)
- **Porta 443:** HTTPS

### **Nginx:**
- **Configuração:** `/etc/nginx/sites-available/eliteadm`
- **Logs:** `/var/log/nginx/`
- **SSL:** Let's Encrypt

### **PM2:**
- **Processo:** eliteadm
- **Porta:** 3000
- **Usuário:** www-data
- **Logs:** `/var/log/eliteadm/`

## **🚨 Troubleshooting**

### **Aplicação não inicia:**
```bash
# Verificar logs
pm2 logs eliteadm

# Verificar permissões
ls -la /var/www/eliteadm

# Verificar dependências
cd /var/www/eliteadm && npm list
```

### **Nginx não funciona:**
```bash
# Verificar configuração
nginx -t

# Verificar status
systemctl status nginx

# Verificar logs
tail -f /var/log/nginx/error.log
```

### **SSL não funciona:**
```bash
# Verificar certificado
certbot certificates

# Renovar certificado
certbot renew --dry-run

# Verificar configuração SSL
openssl s_client -connect eliteadm.com:443
```

## **📞 Suporte**

- **Logs da aplicação:** `pm2 logs eliteadm`
- **Logs do Nginx:** `/var/log/nginx/`
- **Logs do sistema:** `journalctl -u eliteadm`

## **✅ Checklist de Deploy**

- [ ] Sistema local preparado (`./deploy.sh`)
- [ ] Arquivos copiados para VPS
- [ ] Dependências do sistema instaladas
- [ ] Aplicação deployada e funcionando
- [ ] SSL configurado e funcionando
- [ ] Domínio apontando para VPS
- [ ] Aplicação acessível via HTTPS
- [ ] Monitoramento configurado
- [ ] Backup configurado (opcional)

---

**🎯 Sistema EliteADM pronto para produção!**
