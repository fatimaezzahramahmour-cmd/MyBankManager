@echo off
echo ========================================
echo    DEBUG CONNEXION ADMIN
echo ========================================
echo.

echo [1/2] Vérification du serveur...
curl -s http://localhost:8081/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur fonctionne sur http://localhost:8081
) else (
    echo ❌ Serveur non accessible
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
    echo ✅ Serveur démarré
)

echo.
echo [2/2] Ouverture de la page de debug...
start debug_admin_login.html

echo.
echo 📋 INSTRUCTIONS DE DEBUG:
echo.
echo 1. Dans la page de debug, cliquez sur les boutons dans l'ordre:
echo    - "1. Test Serveur" (vérifier que le serveur fonctionne)
echo    - "2. Test Connexion Admin" (tester la connexion admin)
echo    - "3. Test Connexion Client" (comparaison)
echo    - "4. Test Redirection" (tester la redirection)
echo.
echo 2. Observez les messages dans le log vert
echo.
echo 3. Si le test admin réussit, vous devriez être redirigé vers admin-dashboard.html
echo.
echo 4. Si ça ne marche pas, notez les erreurs dans le log
echo.
echo 🔧 DIAGNOSTIC:
echo - Le log affiche toutes les étapes de connexion
echo - Vous pouvez voir les données échangées avec le serveur
echo - Vous pouvez voir les erreurs exactes
echo.
pause
