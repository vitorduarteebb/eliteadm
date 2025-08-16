@echo off
echo ========================================
echo DEPLOY FINAL PARA VPS - PORTALAUTO
echo ========================================
echo.

echo 1. Preparando deploy final...
echo.

echo 2. Criando arquivo compactado atualizado...
if exist portalauto-update.zip del portalauto-update.zip
powershell -Command "Compress-Archive -Path app,components,lib,config,package.json,next.config.js,tailwind.config.js,tsconfig.json,perguntas_respostas_autoescola.txt -DestinationPath portalauto-update.zip -Force"

echo.
echo 3. Arquivo criado: portalauto-update.zip
echo.

echo 4. INSTRUÇÕES PARA DEPLOY NA VPS:
echo.
echo    A) Conecte-se à VPS:
echo       ssh root@45.79.8.82
echo.
echo    B) Na VPS, execute:
echo       cd /var/www/portalauto
echo       cp -r . ../portalauto-backup-$(date +%%Y%%m%%d-%%H%%M%%S)
echo.
echo    C) Faça upload do arquivo portalauto-update.zip para a VPS
echo       (use o painel da VPS ou scp se funcionar)
echo.
echo    D) Na VPS, extraia e atualize:
echo       unzip portalauto-update.zip
echo       npm install
echo       npm run build
echo       pm2 restart portalauto
echo.
echo    E) Configure as variáveis de ambiente:
echo       nano .env.local
echo.
echo       Adicione:
echo       OPENAI_API_KEY=sua_chave_api_aqui
echo       BRADIAL_API_KEY=8LjU6QckjMey6FDt7mDEj7VU
echo       BRADIAL_BASE_URL=https://api.bradial.com/v1
echo       NODE_ENV=production
echo.
echo ========================================
echo DEPLOY PREPARADO!
echo ========================================
echo.
echo Arquivo: portalauto-update.zip
echo Tamanho: 
dir portalauto-update.zip | findstr portalauto-update.zip
echo.
echo Próximo passo: Fazer upload para VPS e executar comandos
echo.
pause
