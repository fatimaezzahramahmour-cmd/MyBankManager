@echo off
echo ========================================
echo    MyBankManager - Test Simple
echo ========================================
echo.

echo 🧪 Test de connexion admin sans backend
echo.

echo 📋 Identifiants de test :
echo    Email: admin@mybank.com
echo    Mot de passe: admin123
echo.

echo 🚀 Démarrage du test...
echo.

echo [1/3] Ouverture de la page de connexion...
start "" "connexion.html"

echo [2/3] Attente de 3 secondes...
timeout /t 3 /nobreak >nul

echo [3/3] Ouverture de la page de test...
start "" "test_admin_login.html"

echo.
echo ========================================
echo    ✅ Test lancé !
echo ========================================
echo.
echo 📋 Instructions :
echo    1. La page connexion.html s'ouvre automatiquement
echo    2. Les identifiants admin sont pré-remplis
echo    3. Cliquez sur "Se connecter"
echo    4. Vous devriez être redirigé vers admin-dashboard.html
echo.
echo 🔧 Si le problème persiste :
echo    • Vérifiez que les fichiers HTML sont dans le bon dossier
echo    • Vérifiez que le navigateur n'a pas bloqué les popups
echo    • Regardez les messages de debug dans la page connexion.html
echo.

pause 