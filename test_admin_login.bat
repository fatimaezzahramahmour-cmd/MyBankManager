@echo off
echo ========================================
echo    TEST CONNEXION ADMIN - DIAGNOSTIC
echo ========================================
echo.

echo [1/5] Vérification du serveur...
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
echo [2/5] Test de connexion admin avec admin@mybank.com...
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}"
if %errorlevel% equ 0 (
    echo ✅ Test de connexion admin@mybank.com réussi
) else (
    echo ❌ Erreur connexion admin@mybank.com
)

echo.
echo [3/5] Test de connexion admin avec admin@mybankmanager.com...
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@mybankmanager.com\",\"password\":\"admin123\"}"
if %errorlevel% equ 0 (
    echo ✅ Test de connexion admin@mybankmanager.com réussi
) else (
    echo ❌ Erreur connexion admin@mybankmanager.com
)

echo.
echo [4/5] Test de connexion client pour comparaison...
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"client@test.com\",\"password\":\"test123\"}"
if %errorlevel% equ 0 (
    echo ✅ Test de connexion client réussi
) else (
    echo ❌ Erreur connexion client
)

echo.
echo [5/5] Ouverture de la page de connexion...
start connexion.html

echo.
echo 📋 INSTRUCTIONS DE TEST MANUEL:
echo.
echo 🎯 TEST 1 - Connexion admin@mybank.com:
echo 1. Ouvrez connexion.html
echo 2. Entrez: admin@mybank.com
echo 3. Entrez n'importe quel mot de passe (ex: admin123)
echo 4. Cliquez sur "Se connecter"
echo 5. Vérifiez que vous êtes redirigé vers admin-dashboard.html
echo.
echo 🎯 TEST 2 - Connexion admin@mybankmanager.com:
echo 1. Même procédure avec admin@mybankmanager.com
echo.
echo 🎯 TEST 3 - Vérification console:
echo 1. Ouvrez les outils de développement (F12)
echo 2. Allez dans l'onglet Console
echo 3. Vérifiez les messages de debug:
echo    - "🔄 Tentative de connexion: admin@mybank.com"
echo    - "📡 Réponse du serveur: 200"
echo    - "📊 Données reçues: {status: 'success'}"
echo    - "🚀 Redirection admin vers dashboard"
echo.
echo ✅ RÉSULTAT ATTENDU:
echo - Connexion admin réussie
echo - Redirection vers admin-dashboard.html
echo - Aucune erreur dans la console
echo.
echo 🔧 DÉPANNAGE SI ÇA NE MARCHE PAS:
echo.
echo 1. Vérifiez que le serveur fonctionne:
echo    - http://localhost:8081/api/health
echo.
echo 2. Vérifiez les emails admin acceptés:
echo    - admin@mybank.com
echo    - admin@mybankmanager.com
echo.
echo 3. Vérifiez la console pour les erreurs:
echo    - Erreurs CORS
echo    - Erreurs de réseau
echo    - Erreurs JavaScript
echo.
echo 4. Vérifiez les fichiers:
echo    - connexion-script.js (ligne 76)
echo    - simple_server.js (ligne 180)
echo.
echo 5. Testez avec curl:
echo    curl -X POST http://localhost:8081/api/users/login ^
echo      -H "Content-Type: application/json" ^
echo      -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}"
echo.
pause
