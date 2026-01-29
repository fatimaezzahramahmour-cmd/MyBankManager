@echo off
echo ========================================
echo    🚀 Test Rapide - MyBankManager
echo ========================================
echo.

echo 📋 Ouverture des pages de test...
echo.

echo [1/4] Page de diagnostic...
start "" "diagnostic_system.html"

echo [2/4] Page de connexion...
start "" "connexion.html"

echo [3/4] Page de test admin...
start "" "test_admin_login.html"

echo [4/4] Page d'accueil...
start "" "index.html"

echo.
echo ========================================
echo    ✅ Toutes les pages ouvertes !
echo ========================================
echo.
echo 📋 Instructions de test :
echo.
echo 1️⃣ DIAGNOSTIC (diagnostic_system.html) :
echo    • Cliquez sur "Lancer diagnostic complet"
echo    • Vérifiez que tous les tests passent
echo.
echo 2️⃣ CONNEXION (connexion.html) :
echo    • Les identifiants admin sont pré-remplis
echo    • Cliquez sur "Se connecter"
echo    • Vous devriez être redirigé vers admin-dashboard.html
echo.
echo 3️⃣ TEST ADMIN (test_admin_login.html) :
echo    • Le test se lance automatiquement
echo    • Vérifiez le message "✅ Test réussi !"
echo.
echo 🔧 Si le problème persiste :
echo    • Regardez les messages de debug dans connexion.html
echo    • Vérifiez la console du navigateur (F12)
echo    • Assurez-vous que JavaScript est activé
echo.

pause 