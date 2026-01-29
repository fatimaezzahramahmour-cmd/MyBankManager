@echo off
echo ========================================
echo    TEST SIMPLE CONNEXION ADMIN
echo ========================================
echo.

echo [1/3] Vérification du serveur...
curl -s http://localhost:8081/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur fonctionne
) else (
    echo ❌ Serveur non accessible
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo [2/3] Test API admin...
curl -s -X POST http://localhost:8081/api/users/login -H "Content-Type: application/json" -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}"
echo.
echo.

echo [3/3] Ouverture de la page de connexion...
start connexion.html

echo.
echo 📋 TEST MANUEL:
echo.
echo 1. Dans connexion.html, entrez:
echo    Email: admin@mybank.com
echo    Mot de passe: admin123
echo.
echo 2. Cliquez sur "Se connecter"
echo.
echo 3. Vérifiez la console (F12) pour les messages
echo.
echo 4. Si ça ne marche pas, essayez:
echo    Email: admin@mybankmanager.com
echo    Mot de passe: admin123
echo.
pause
