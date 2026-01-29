@echo off
echo ========================================
echo TEST XHR CONNECTION - MyBankManager
echo ========================================
echo.

echo 1. Vérification de Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé
    echo 💡 Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js détecté

echo.
echo 2. Arrêt des serveurs existants...
taskkill /f /im node.exe >nul 2>&1
echo ✅ Serveurs arrêtés

echo.
echo 3. Démarrage du serveur backend...
start "MyBankManager Backend" cmd /k "node simple_server.js"
echo ✅ Serveur démarré en arrière-plan

echo.
echo 4. Attente du démarrage du serveur...
timeout /t 3 /nobreak >nul

echo.
echo 5. Ouverture de la page de test...
start test_xhr_connection.html
echo ✅ Page de test ouverte

echo.
echo 6. Ouverture du serveur backend dans le navigateur...
start http://localhost:8081
echo ✅ Interface backend ouverte

echo.
echo ========================================
echo INSTRUCTIONS DE TEST
echo ========================================
echo.
echo 1. Dans test_xhr_connection.html:
echo    - Cliquez sur "Vérifier le serveur"
echo    - Testez les différents endpoints
echo    - Lancez le diagnostic complet
echo.
echo 2. Vérifiez que le statut affiche "En ligne"
echo.
echo 3. Si les tests échouent:
echo    - Vérifiez que le serveur est démarré
echo    - Consultez la console du navigateur (F12)
echo    - Vérifiez les logs du serveur
echo.
echo ========================================
echo SERVEUR BACKEND
echo ========================================
echo.
echo Le serveur backend est démarré sur:
echo 🌐 URL: http://localhost:8081
echo 📊 API: http://localhost:8081/api/test
echo.
echo Pour arrêter le serveur:
echo - Fermez la fenêtre cmd du serveur
echo - Ou exécutez: taskkill /f /im node.exe
echo.
echo ========================================
pause
