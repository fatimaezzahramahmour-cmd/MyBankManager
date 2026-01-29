@echo off
echo ========================================
echo    TEST AUTOMATIQUE POSTMAN - MyBankManager
echo ========================================
echo.

echo [1/5] Verification du serveur...
netstat -an | findstr :8081 >nul
if %errorlevel% neq 0 (
    echo ❌ Serveur non demarre sur le port 8081
    echo 🔧 Demarrage du serveur...
    start "MyBankManager Server" node simple_server.js
    timeout /t 3 /nobreak >nul
) else (
    echo ✅ Serveur deja en cours d'execution
)

echo.
echo [2/5] Test de connexion API...
curl -s http://localhost:8081/api/test
if %errorlevel% neq 0 (
    echo ❌ Erreur de connexion a l'API
    goto :error
) else (
    echo ✅ API accessible
)

echo.
echo [3/5] Test de connexion admin...
curl -s -X POST http://localhost:8081/api/users/login -H "Content-Type: application/json" -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}"
if %errorlevel% neq 0 (
    echo ❌ Erreur de connexion admin
    goto :error
) else (
    echo ✅ Connexion admin reussie
)

echo.
echo [4/5] Test dashboard admin...
curl -s http://localhost:8081/api/admin/dashboard
if %errorlevel% neq 0 (
    echo ❌ Erreur dashboard admin
    goto :error
) else (
    echo ✅ Dashboard admin accessible
)

echo.
echo [5/5] Test soumission demande...
curl -s -X POST http://localhost:8081/api/submit-demande -H "Content-Type: application/json" -d "{\"type\":\"pret\",\"email\":\"test@example.com\",\"montant\":10000}"
if %errorlevel% neq 0 (
    echo ❌ Erreur soumission demande
    goto :error
) else (
    echo ✅ Soumission demande reussie
)

echo.
echo ========================================
echo ✅ TOUS LES TESTS REUSSIS !
echo ========================================
echo.
echo 📋 Instructions Postman:
echo 1. Ouvrir Postman
echo 2. Importer le fichier: postman_test_collection.json
echo 3. Tester les endpoints dans l'ordre
echo.
echo 🔗 URLs principales:
echo - Test: http://localhost:8081/api/test
echo - Login: http://localhost:8081/api/users/login
echo - Dashboard: http://localhost:8081/api/admin/dashboard
echo.
echo 📖 Guide complet: GUIDE_POSTMAN_DEPANNAGE.md
echo.
pause
goto :end

:error
echo.
echo ========================================
echo ❌ ERREUR DETECTEE
echo ========================================
echo.
echo 🔧 Solutions possibles:
echo 1. Verifier que Node.js est installe
echo 2. Verifier que le port 8081 est libre
echo 3. Redemarrer le serveur: node simple_server.js
echo 4. Consulter le guide: GUIDE_POSTMAN_DEPANNAGE.md
echo.
pause

:end
