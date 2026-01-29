@echo off
echo ========================================
echo   Arrêt des serveurs sur le port 8081
echo ========================================
echo.

echo [1/2] Recherche des processus sur le port 8081...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081') do (
    echo Processus trouvé: %%a
    taskkill /PID %%a /F
    echo ✅ Processus %%a arrêté
)

echo.
echo [2/2] Vérification...
netstat -ano | findstr :8081
if %errorlevel% equ 0 (
    echo ⚠️  Il reste encore des processus sur le port 8081
) else (
    echo ✅ Port 8081 libéré
)

echo.
echo Prêt pour redémarrer le serveur Spring Boot
pause
