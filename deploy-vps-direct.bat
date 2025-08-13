@echo off
echo 🚀 DEPLOY DIRETO ELITEADM PARA VPS
echo ======================================

echo.
echo 📋 Preparando arquivos para deploy...

REM Criar diretório temporário
if exist "deploy-temp" rmdir /s /q "deploy-temp"
mkdir deploy-temp

REM Copiar apenas arquivos essenciais
echo 📁 Copiando arquivos essenciais...
xcopy "app" "deploy-temp\app\" /E /I /Y
xcopy "components" "deploy-temp\components\" /E /I /Y
xcopy "hooks" "deploy-temp\hooks\" /E /I /Y
xcopy "lib" "deploy-temp\lib\" /E /I /Y
xcopy "public" "deploy-temp\public\" /E /I /Y
xcopy "config" "deploy-temp\config\" /E /I /Y
xcopy "scripts" "deploy-temp\scripts\" /E /I /Y

REM Copiar arquivos de configuração
copy "package.json" "deploy-temp\"
copy "next.config.js" "deploy-temp\"
copy "tsconfig.json" "deploy-temp\"
copy "tailwind.config.js" "deploy-temp\"
copy "postcss.config.js" "deploy-temp\"
copy "production.env" "deploy-temp\"

REM Copiar arquivos de deploy
copy "install-vps.sh" "deploy-temp\"
copy "deploy-vps.sh" "deploy-temp\"
copy "nginx.conf" "deploy-temp\"
copy "ecosystem.config.js" "deploy-temp\"
copy "eliteadm.service" "deploy-temp\"
copy "README.md" "deploy-temp\"

echo.
echo ✅ Arquivos preparados em deploy-temp/
echo.
echo 🚀 AGORA EXECUTE ESTES COMANDOS:
echo.
echo 1. Copiar para VPS:
echo    scp -r deploy-temp/* root@195.35.40.106:/tmp/eliteadm/
echo.
echo 2. Conectar na VPS:
echo    ssh root@195.35.40.106
echo.
echo 3. Instalar sistema:
echo    cd /tmp/eliteadm
echo    chmod +x install-vps.sh
echo    ./install-vps.sh
echo.
echo 4. Fazer deploy:
echo    chmod +x deploy-vps.sh
echo    ./deploy-vps.sh
echo.
echo ✅ Sistema pronto para deploy!
pause
