@echo off
title Servidor Node.js

REM Instalar dependencias si no existen
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

REM Iniciar servidor en puerto 3000
echo Iniciando servidor en http://localhost:3000
node server.js

pause