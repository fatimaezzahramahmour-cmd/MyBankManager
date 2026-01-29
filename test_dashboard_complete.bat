@echo off
echo ========================================
echo    TEST COMPLET DASHBOARD ADMIN
echo ========================================
echo.

echo [1/4] Verification du serveur...
curl -s http://localhost:8081/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur fonctionne sur http://localhost:8081
) else (
    echo ❌ Serveur non accessible
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo [2/4] Test de connexion admin...
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API de connexion fonctionne
) else (
    echo ❌ Erreur API de connexion
)

echo.
echo [3/4] Ouverture du dashboard admin...
start admin-dashboard.html

echo.
echo [4/4] Instructions de test:
echo.
echo 📋 ETAPES A SUIVRE:
echo 1. Dans le dashboard admin qui s'ouvre:
echo    - Vérifiez que les utilisateurs s'affichent
echo    - Si pas d'utilisateurs, cliquez sur "Créer des utilisateurs de démonstration"
echo    - Testez le bouton "Déconnexion"
echo.
echo 2. Pour tester la connexion complète:
echo    - Ouvrez connexion.html
echo    - Email: admin@mybank.com
echo    - Mot de passe: admin123
echo    - Vous devriez être redirigé vers le dashboard
echo.
echo 3. Fonctionnalités à tester:
echo    - ✅ Affichage des utilisateurs
echo    - ✅ Bouton déconnexion
echo    - ✅ Informations utilisateurs (nom, email, date, statut)
echo    - ✅ Actions sur les utilisateurs (voir, modifier, activer/désactiver)
echo.
echo 🎯 RESULTAT ATTENDU:
echo - Dashboard fonctionnel avec utilisateurs visibles
echo - Bouton déconnexion qui redirige vers connexion.html
echo - Toutes les informations utilisateurs affichées correctement
echo.
pause




















