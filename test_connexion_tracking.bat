@echo off
echo ========================================
echo    TEST SUIVI CONNEXIONS UTILISATEURS
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
echo [2/4] Test de connexion client...
echo Test avec email: client@test.com
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"client@test.com\",\"password\":\"test123\"}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Connexion client testée
) else (
    echo ❌ Erreur connexion client
)

echo.
echo [3/4] Test de connexion admin...
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Connexion admin testée
) else (
    echo ❌ Erreur connexion admin
)

echo.
echo [4/4] Ouverture du dashboard admin...
start admin-dashboard.html

echo.
echo 📋 INSTRUCTIONS DE TEST:
echo.
echo 🎯 TEST 1 - Connexion client:
echo 1. Ouvrez connexion.html dans un autre onglet
echo 2. Connectez-vous avec un email client (ex: client@test.com)
echo 3. Vérifiez que l'utilisateur apparaît dans le dashboard admin
echo.
echo 🎯 TEST 2 - Suivi en temps réel:
echo 1. Dans le dashboard admin, vérifiez la colonne "Dernière connexion"
echo 2. Vérifiez la colonne "Dernière activité"
echo 3. Vérifiez l'indicateur "En ligne" (point vert)
echo.
echo 🎯 TEST 3 - Informations affichées:
echo - Nom complet de l'utilisateur
echo - Email
echo - Date/heure de connexion
echo - Statut (actif/inactif)
echo - Dernière activité
echo - Nombre de demandes
echo.
echo ✅ RESULTAT ATTENDU:
echo - Les connexions clients sont visibles dans le dashboard
echo - Les informations de connexion sont à jour
echo - L'indicateur "En ligne" fonctionne
echo - Les données se mettent à jour automatiquement
echo.
pause




















