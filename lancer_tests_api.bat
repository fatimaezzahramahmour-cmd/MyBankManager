@echo off
echo ========================================
echo   LANCEUR DE TESTS API - MyBankManager
echo ========================================
echo.
echo Alternatives à Postman disponibles :
echo.
echo 1. Interface Web de test (Recommandé)
echo 2. Tests cURL (Ligne de commande)
echo 3. Tests PowerShell (Moderne)
echo 4. Démarrer le backend Spring Boot
echo 5. Vérifier MySQL
echo.
set /p choice="Choisissez une option (1-5): "

if "%choice%"=="1" (
    echo.
    echo ========================================
    echo    INTERFACE WEB DE TEST
    echo ========================================
    echo.
    echo ✓ Ouverture de l'interface web de test...
    echo.
    echo 📝 Fonctionnalités :
    echo - Interface graphique moderne
    echo - Tests de tous les endpoints
    echo - Réponses formatées JSON
    echo - Vérification du statut du serveur
    echo - Formulaires pré-remplis
    echo.
    start test-api.html
    echo ✓ Interface web ouverte dans votre navigateur
) else if "%choice%"=="2" (
    echo.
    echo ========================================
    echo        TESTS CURL
    echo ========================================
    echo.
    call test_api_curl.bat
) else if "%choice%"=="3" (
    echo.
    echo ========================================
    echo    TESTS POWERSHELL
    echo ========================================
    echo.
    echo Lancement des tests PowerShell...
    powershell -ExecutionPolicy Bypass -File test_api_powershell.ps1
) else if "%choice%"=="4" (
    echo.
    echo ========================================
    echo   DEMARRAGE BACKEND SPRING BOOT
    echo ========================================
    echo.
    call start_backend_spring.bat
) else if "%choice%"=="5" (
    echo.
    echo ========================================
    echo    VERIFICATION MYSQL
    echo ========================================
    echo.
    echo Vérification de MySQL...
    mysql --version 2>nul
    if %errorlevel% equ 0 (
        echo ✓ MySQL detecté
        echo.
        echo Test de connexion à la base de données...
        mysql -u root -p -e "SHOW DATABASES; USE mybankdb; SHOW TABLES;" 2>nul
        if %errorlevel% equ 0 (
            echo ✓ Base de données accessible
        ) else (
            echo ✗ Problème d'accès à la base de données
            echo.
            echo Pour créer la base de données :
            echo 1. Connectez-vous à MySQL : mysql -u root -p
            echo 2. Créez la base : CREATE DATABASE mybankdb;
            echo 3. Quittez : exit
        )
    ) else (
        echo ✗ MySQL non détecté
        echo.
        echo Téléchargez MySQL depuis: https://dev.mysql.com/downloads/mysql/
    )
) else (
    echo Option invalide. Veuillez choisir entre 1 et 5.
)

echo.
echo ========================================
echo   INFORMATIONS UTILES
echo ========================================
echo.
echo 🌐 URL Backend : http://localhost:8080/api
echo 📋 Endpoints disponibles :
echo    - POST /api/auth/register   (Inscription)
echo    - POST /api/auth/login      (Connexion)
echo    - GET  /api/loans           (Liste prêts)
echo    - POST /api/loans           (Créer prêt)
echo    - GET  /api/creditcards     (Liste cartes)
echo    - POST /api/creditcards     (Créer carte)
echo    - GET  /api/admin/users     (Liste utilisateurs)
echo.
echo 🔧 Prérequis :
echo    - Java 11 ou supérieur
echo    - Maven 3.6 ou supérieur
echo    - MySQL 8.0 ou supérieur
echo    - Base de données 'mybankdb'
echo.
echo 📚 Documentation :
echo    - README_BACKEND.md
echo    - test_postman_endpoints.md
echo.
pause
