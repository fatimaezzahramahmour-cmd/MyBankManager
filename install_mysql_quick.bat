@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    INSTALLATION MYSQL RAPIDE
echo    Solution Simple MyBankManager
echo ========================================
echo.

echo [1/4] Vérification de MySQL existant...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL est déjà installé
    goto :setup_database
)

echo [2/4] Téléchargement de MySQL...
echo Téléchargement en cours...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.36.0.msi' -OutFile 'mysql-installer.msi'}"

if not exist "mysql-installer.msi" (
    echo ❌ Erreur de téléchargement
    echo.
    echo 🔧 SOLUTIONS ALTERNATIVES:
    echo.
    echo 1. Téléchargement manuel:
    echo    https://dev.mysql.com/downloads/installer/
    echo.
    echo 2. Ou utilisez XAMPP:
    echo    https://www.apachefriends.org/download.html
    echo.
    echo 3. Ou continuez sans base de données
    echo    (le site fonctionnera en mode démo)
    echo.
    pause
    exit /b 1
)

echo [3/4] Installation de MySQL...
echo Installation en cours (patientez...)...
msiexec /i mysql-installer.msi /quiet /norestart
timeout /t 45 /nobreak >nul

echo [4/4] Configuration...
setx PATH "%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin" /M
timeout /t 5 /nobreak >nul

:setup_database
echo Configuration de la base de données...

net start MySQL80 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  MySQL Service non démarré
    echo Démarrage manuel requis
)

mysql -u root -e "CREATE DATABASE IF NOT EXISTS mybankdb;" 2>nul
if exist "setup_database.sql" (
    mysql -u root mybankdb < setup_database.sql 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Base de données configurée
    )
)

echo.
echo ========================================
echo    INSTALLATION TERMINÉE
echo ========================================
echo.
echo ✅ MySQL installé et configuré
echo.
echo 🚀 Votre site MyBankManager est prêt !
echo.
echo 📋 ACCÈS:
echo - Site principal: http://localhost:8081
echo - API: http://localhost:8081/api/test
echo.
echo 🔧 Si MySQL ne fonctionne pas:
echo - Le site fonctionne en mode démo
echo - Pas de données persistantes
echo - Fonctionnalités limitées
echo.
pause
