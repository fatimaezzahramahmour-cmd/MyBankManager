@echo off
echo ========================================
echo    Test Fix XHR - MyBankManager
echo ========================================
echo.

echo [1/4] Verification du serveur Node.js...
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ Serveur Node.js deja en cours d'execution
) else (
    echo ❌ Serveur Node.js non trouve
    echo 🔄 Demarrage du serveur...
    start "MyBankManager Backend" cmd /k "node simple_server.js"
    timeout /t 3 /nobreak >nul
)

echo.
echo [2/4] Ouverture des pages de test...
start http://localhost:8081
timeout /t 1 /nobreak >nul
start test_fix_xhr.html
timeout /t 1 /nobreak >nul
start test_xhr_connection.html
timeout /t 1 /nobreak >nul
start test_auth_xhr.html

echo.
echo [3/4] Instructions de test:
echo.
echo 📋 ETAPES DE TEST:
echo 1. Dans test_fix_xhr.html:
echo    - Cliquez sur "Tester la Connexion"
echo    - Cliquez sur "Tester Dashboard Admin" 
echo    - Cliquez sur "Lancer Test Complet"
echo.
echo 2. Vérifiez que tous les tests passent ✅
echo.
echo 3. Si des erreurs persistent:
echo    - Ouvrez F12 (Console)
echo    - Vérifiez les erreurs réseau
echo    - Contactez le support
echo.

echo [4/4] Test de connexion rapide...
curl -s http://localhost:8081/api/test >nul 2>&1
if "%ERRORLEVEL%"=="0" (
    echo ✅ Backend accessible via curl
) else (
    echo ❌ Backend non accessible via curl
)

echo.
echo ========================================
echo    Test termine!
echo ========================================
echo.
echo 💡 Si les tests echouent:
echo    - Vérifiez que le port 8081 est libre
echo    - Redémarrez le serveur: node simple_server.js
echo    - Vérifiez les logs dans la console du serveur
echo.
pause
