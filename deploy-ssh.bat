@echo off
echo ========================================
echo DEPLOY VIA SSH - PORTALAUTO
echo ========================================
echo.

echo 1. Conectando à VPS via SSH...
echo.

echo 2. Execute os seguintes comandos na VPS:
echo.
echo    cd /var/www/portalauto
echo    git pull origin main
echo    npm install
echo    npm run build
echo    pm2 restart portalauto
echo.

echo 3. Ou use o comando completo:
echo    ssh root@45.79.8.82 "cd /var/www/portalauto && git pull origin main && npm install && npm run build && pm2 restart portalauto"
echo.

echo 4. Para conectar manualmente:
echo    ssh root@45.79.8.82
echo.

echo ========================================
echo INSTRUÇÕES DE DEPLOY
echo ========================================
echo.
echo Opção 1: Deploy automático (execute o comando completo)
echo Opção 2: Deploy manual (conecte via SSH e execute os comandos)
echo.
echo ========================================
pause
