@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    INSTALLATION XAMPP + MYSQL
echo    Solution Alternative MyBankManager
echo ========================================
echo.

:: Vérifier si XAMPP est déjà installé
echo [1/5] Vérification de XAMPP existant...
if exist "C:\xampp\mysql\bin\mysql.exe" (
    echo ✅ XAMPP MySQL est déjà installé
    goto :setup_database
)

:: Créer le dossier d'installation
echo [2/5] Préparation de l'installation...
if not exist "xampp_install" mkdir xampp_install
cd xampp_install

:: Télécharger XAMPP
echo [3/5] Téléchargement de XAMPP...
echo Téléchargement en cours (environ 150MB)...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe/download' -OutFile 'xampp-installer.exe'}"

if not exist "xampp-installer.exe" (
    echo ❌ Erreur: Impossible de télécharger XAMPP
    echo Téléchargement manuel requis:
    echo https://www.apachefriends.org/download.html
    echo.
    echo Ou utilisez: install_mysql_complete.bat
    pause
    exit /b 1
)

:: Installer XAMPP
echo [4/5] Installation de XAMPP...
echo Installation en cours (cela peut prendre plusieurs minutes)...
xampp-installer.exe --mode unattended --launchapps 0

:: Attendre que l'installation se termine
timeout /t 60 /nobreak >nul

:: Retourner au dossier principal
cd ..

:: Ajouter MySQL au PATH
echo [5/5] Configuration du PATH...
setx PATH "%PATH%;C:\xampp\mysql\bin" /M

:setup_database
echo Configuration de la base de données...

:: Démarrer MySQL via XAMPP
echo Démarrer MySQL Service...
if exist "C:\xampp\xampp-control.exe" (
    start /B C:\xampp\xampp-control.exe
    echo ✅ XAMPP Control Panel ouvert
    echo Veuillez démarrer MySQL depuis le panneau de contrôle
    timeout /t 10 /nobreak >nul
) else (
    echo ⚠️  XAMPP Control Panel non trouvé
)

:: Créer la base de données
echo Création de la base de données...
C:\xampp\mysql\bin\mysql.exe -u root -e "CREATE DATABASE IF NOT EXISTS mybankdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Impossible de créer la base automatiquement
    echo Assurez-vous que MySQL est démarré dans XAMPP
)

:: Importer la structure
echo Import de la structure de base de données...
if exist "setup_database.sql" (
    C:\xampp\mysql\bin\mysql.exe -u root mybankdb < setup_database.sql 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Structure importée avec succès
    ) else (
        echo ⚠️  Import automatique échoué
    )
)

echo.
echo ========================================
echo    INSTALLATION XAMPP TERMINÉE
echo ========================================
echo.
echo ✅ XAMPP avec MySQL a été installé
echo.
echo 📋 PROCHAINES ÉTAPES:
echo.
echo 1. Redémarrez votre terminal/PowerShell
echo 2. Ouvrez XAMPP Control Panel
echo 3. Démarrez MySQL et Apache
echo 4. Testez: mysql --version
echo 5. Lancez le système: demarrer_systeme_securise.bat
echo.
echo 🔧 CONFIGURATION MANUELLE:
echo.
echo 1. Ouvrez XAMPP Control Panel
echo 2. Cliquez "Start" pour MySQL
echo 3. Cliquez "Start" pour Apache (optionnel)
echo 4. Ouvrez phpMyAdmin: http://localhost/phpmyadmin
echo 5. Créez la base: mybankdb
echo 6. Importez: setup_database.sql
echo.
echo 📚 DOCUMENTATION: guide_mysql_workbench.md
echo.
echo 🎯 AVANTAGES XAMPP:
echo - Installation plus simple
echo - Interface graphique
echo - phpMyAdmin inclus
echo - Apache + PHP inclus
echo.
pause
