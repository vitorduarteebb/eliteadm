@echo off
echo ========================================
echo Limpeza e Reinicializacao do EliteADM
echo ========================================
echo.

echo Parando processos em execucao...
taskkill /f /im node.exe 2>nul
taskkill /f /im npm.exe 2>nul
echo.

echo Limpando cache do Next.js...
if exist .next rmdir /s /q .next
echo Cache limpo!

echo Limpando cache do npm...
call npm cache clean --force
echo Cache do npm limpo!

echo Removendo node_modules...
if exist node_modules rmdir /s /q node_modules
echo node_modules removido!

echo Reinstalando dependencias...
call npm install
echo Dependencias reinstaladas!

echo.
echo ========================================
echo Limpeza concluida com sucesso!
echo ========================================
echo.
echo Para iniciar o projeto, execute:
echo npm run dev
echo.
pause
