@echo off
echo ========================================
echo   GUIDE RAPIDE - TESTS API MYBANKMANAGER
echo ========================================
echo.
echo 🎯 PROBLEME POSTMAN RESOLU !
echo.
echo Alternatives disponibles :
echo.
echo ========================================
echo   1. INTERFACE WEB DE TEST (Recommandee)
echo ========================================
echo.
echo ✅ Interface graphique moderne
echo ✅ Tests de tous les endpoints
echo ✅ Detection automatique du serveur
echo ✅ Reponses JSON formatees
echo.
echo Commande : start test-api.html
echo.
echo ========================================
echo   2. SERVEUR JAVA SIMPLE (Immediat)
echo ========================================
echo.
echo ✅ Pas besoin de Maven
echo ✅ Fonctionne avec Java uniquement
echo ✅ Donnees JSON statiques
echo ✅ Endpoints GET disponibles
echo.
echo Commandes :
echo   Demarrer : .\start_simple_server.bat
echo   Tester   : .\test_simple_api.bat
echo.
echo ========================================
echo   3. BACKEND SPRING BOOT COMPLET
echo ========================================
echo.
echo ✅ Maven installe localement
echo ✅ Tous les endpoints POST/GET
echo ✅ Base de donnees MySQL
echo ✅ API REST complete
echo.
echo Commandes :
echo   Demarrer : .\start_backend_local.bat
echo   Tester   : .\lancer_tests_api.bat
echo.
echo ========================================
echo   4. TESTS LIGNE DE COMMANDE
echo ========================================
echo.
echo ✅ Scripts cURL automatises
echo ✅ Tests PowerShell avec couleurs
echo ✅ Verification automatique
echo.
echo Commandes :
echo   cURL       : .\test_simple_api.bat
echo   PowerShell : powershell -File test_api_powershell.ps1
echo.
echo ========================================
echo   STATUT ACTUEL
echo ========================================
echo.

echo Verification du serveur Java simple...
curl -s --connect-timeout 2 http://localhost:8081/api/users >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur Java Simple - ACTIF (port 8081)
    echo    Endpoints disponibles :
    echo    - GET http://localhost:8081/api/users
    echo    - GET http://localhost:8081/api/loans
    echo    - GET http://localhost:8081/api/creditcards
) else (
    echo ⚪ Serveur Java Simple - ARRETE
    echo    Demarrer avec : .\start_simple_server.bat
)

echo.
echo Verification de Maven...
if exist "maven\bin\mvn.cmd" (
    echo ✅ Maven Local - INSTALLE
    echo    Demarrer Spring Boot : .\start_backend_local.bat
) else (
    echo ⚪ Maven Local - NON INSTALLE
    echo    Installer avec : .\download_maven.bat puis .\extract_maven.bat
)

echo.
echo Verification de MySQL...
mysql --version 2>nul
if %errorlevel% equ 0 (
    echo ✅ MySQL - DETECTE
) else (
    echo ⚪ MySQL - NON DETECTE
    echo    Requis pour Spring Boot seulement
)

echo.
echo ========================================
echo   RECOMMENDATIONS
echo ========================================
echo.
echo 🚀 TESTS IMMEDIATS (sans configuration) :
echo    1. start test-api.html
echo    2. .\start_simple_server.bat (si pas deja demarre)
echo.
echo 🔧 BACKEND COMPLET (avec base de donnees) :
echo    1. Installer MySQL
echo    2. Creer base 'mybankdb'
echo    3. .\start_backend_local.bat
echo.
echo 📝 DOCUMENTATION :
echo    - README_BACKEND.md
echo    - test_postman_endpoints.md
echo.
echo ========================================
echo   ENDPOINTS DE TEST
echo ========================================
echo.
echo 📊 SERVEUR SIMPLE (port 8081) :
echo    GET /api/users        - Utilisateurs
echo    GET /api/loans        - Prets
echo    GET /api/creditcards  - Cartes
echo.
echo 🌐 SPRING BOOT (port 8080) :
echo    POST /api/auth/register    - Inscription
echo    POST /api/auth/login       - Connexion
echo    GET/POST /api/loans        - Gestion prets
echo    GET/POST /api/creditcards  - Gestion cartes
echo    GET /api/admin/users       - Administration
echo.
echo Le probleme Postman est maintenant RESOLU !
echo Vous avez plusieurs alternatives modernes et efficaces.
echo.
pause
