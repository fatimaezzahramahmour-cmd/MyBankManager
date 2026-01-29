@echo off
echo ========================================
echo    TEST BOUTON "VOIR DÉTAILS" UTILISATEUR
echo ========================================
echo.

echo [1/4] Vérification du serveur...
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
echo [2/4] Test de connexion client pour créer des données...
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
echo 🎯 TEST DU BOUTON "VOIR DÉTAILS":
echo.
echo 1. Dans le dashboard admin, allez dans la section "Utilisateurs"
echo.
echo 2. Localisez un utilisateur dans le tableau
echo    (vous devriez voir des utilisateurs de démonstration)
echo.
echo 3. Cliquez sur le bouton "Voir détails" (icône œil 👁️)
echo.
echo 4. Vérifiez que:
echo    - Une modal s'ouvre avec les détails de l'utilisateur
echo    - Les informations personnelles s'affichent:
echo      * Nom complet
echo      * Email
echo      * Rôle (Admin/Client)
echo      * Statut (Actif/Inactif)
echo    - Les informations de connexion s'affichent:
echo      * Date de création
echo      * Dernière connexion
echo      * Dernière activité
echo    - Les demandes de l'utilisateur s'affichent (si existantes)
echo.
echo 5. Testez les boutons de la modal:
echo    - Bouton "Modifier" (doit ouvrir la fonction d'édition)
echo    - Bouton "Fermer" (doit fermer la modal)
echo    - Clic sur l'overlay (doit fermer la modal)
echo.
echo ✅ RÉSULTAT ATTENDU:
echo - La modal s'ouvre correctement
echo - Toutes les informations utilisateur sont visibles
echo - La modal se ferme correctement
echo - Aucune erreur dans la console du navigateur
echo.
echo 🔧 DÉPANNAGE:
echo - Ouvrez les outils de développement (F12)
echo - Vérifiez la console pour les messages de debug
echo - Vérifiez que les données utilisateur existent dans localStorage
echo.
echo 📊 DONNÉES TESTÉES:
echo - Utilisateurs de démonstration automatiques
echo - Connexions utilisateurs récentes
echo - Demandes utilisateur (si existantes)
echo.
pause
