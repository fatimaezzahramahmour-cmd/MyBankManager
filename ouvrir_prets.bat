@echo off
echo ========================================
echo 🚀 OUVERTURE DE LA PAGE PRÊTS
echo ========================================

echo.
echo ✅ Vérification du serveur...
netstat -ano | findstr :8081 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur Node.js fonctionne sur le port 8081
) else (
    echo ❌ Serveur Node.js non trouvé sur le port 8081
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo 🌐 Ouverture de la page prêts...
echo URL: http://localhost:8081/prets.html
echo.

start http://localhost:8081/prets.html

echo.
echo ========================================
echo 📋 INSTRUCTIONS :
echo ========================================
echo.
echo 1. Si la page ne s'ouvre pas automatiquement :
echo    - Ouvrez votre navigateur
echo    - Allez sur : http://localhost:8081/prets.html
echo.
echo 2. Si vous voyez encore l'erreur "Cannot GET /loans.html" :
echo    - Fermez TOUS les onglets du navigateur
echo    - Arrêtez Live Server dans VS Code
echo    - Ouvrez un NOUVEL onglet
echo    - Allez sur : http://localhost:8081/prets.html
echo.
echo 3. N'utilisez PAS Live Server (port 5500)
echo    Utilisez UNIQUEMENT le serveur Node.js (port 8081)
echo.
echo ========================================
echo ✅ Script terminé
echo ========================================

pause














