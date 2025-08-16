@echo off
echo ========================================
echo DEPLOY DIRETO PARA VPS - PORTALAUTO
echo ========================================
echo.

echo 1. Preparando arquivos para deploy...
echo.

echo 2. Copiando arquivos para VPS...
scp -r app/* root@45.79.8.82:/var/www/portalauto/app/
scp -r components/* root@45.79.8.82:/var/www/portalauto/components/
scp -r lib/* root@45.79.8.82:/var/www/portalauto/lib/
scp -r config/* root@45.79.8.82:/var/www/portalauto/config/
scp package.json root@45.79.8.82:/var/www/portalauto/
scp next.config.js root@45.79.8.82:/var/www/portalauto/
scp tailwind.config.js root@45.79.8.82:/var/www/portalauto/
scp tsconfig.json root@45.79.8.82:/var/www/portalauto/

echo.
echo 3. Arquivos copiados com sucesso!
echo.
echo 4. Conecte-se à VPS para finalizar o deploy:
echo    ssh root@45.79.8.82
echo.
echo 5. Na VPS, execute:
echo    cd /var/www/portalauto
echo    npm install
echo    npm run build
echo    pm2 restart portalauto
echo.
echo ========================================
echo DEPLOY CONCLUIDO!
echo ========================================
pause
