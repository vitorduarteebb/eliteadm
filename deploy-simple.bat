@echo off
echo 🚀 Preparando EliteADM para deploy na VPS...

echo.
echo 📋 Arquivos de deploy criados:
echo   - install-vps.sh (script de instalação na VPS)
echo   - deploy-vps.sh (script de deploy na VPS)
echo   - nginx.conf (configuração do Nginx)
echo   - ecosystem.config.js (configuração do PM2)
echo   - eliteadm.service (configuração do systemd)
echo   - production.env (variáveis de ambiente)

echo.
echo 🚀 PARA FAZER DEPLOY NA VPS:
echo.
echo 1. Copie os arquivos para a VPS:
echo    scp -r . root@195.35.40.106:/tmp/eliteadm
echo.
echo 2. Conecte na VPS:
echo    ssh root@195.35.40.106
echo.
echo 3. Execute a instalação:
echo    cd /tmp/eliteadm
echo    chmod +x install-vps.sh
echo    ./install-vps.sh
echo.
echo 4. Execute o deploy:
echo    chmod +x deploy-vps.sh
echo    ./deploy-vps.sh
echo.
echo ✅ Sistema preparado para produção!
pause
