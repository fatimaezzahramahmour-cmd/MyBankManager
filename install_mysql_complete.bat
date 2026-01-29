@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    INSTALLATION MYSQL COMPLETE
echo    MyBankManager Database Setup
echo ========================================
echo.

:: Vérifier si MySQL est déjà installé
echo [1/6] Vérification de MySQL existant...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL est déjà installé
    goto :setup_database
)

:: Créer le dossier d'installation
echo [2/6] Préparation de l'installation...
if not exist "mysql_install" mkdir mysql_install
cd mysql_install

:: Télécharger MySQL Installer
echo [3/6] Téléchargement de MySQL Installer...
echo Téléchargement en cours...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.36.0.msi' -OutFile 'mysql-installer.msi'}"

if not exist "mysql-installer.msi" (
    echo ❌ Erreur: Impossible de télécharger MySQL
    echo Téléchargement manuel requis:
    echo https://dev.mysql.com/downloads/installer/
    pause
    exit /b 1
)

:: Installer MySQL
echo [4/6] Installation de MySQL...
echo Installation en cours (cela peut prendre plusieurs minutes)...
msiexec /i mysql-installer.msi /quiet /norestart

:: Attendre que l'installation se termine
timeout /t 30 /nobreak >nul

:: Ajouter MySQL au PATH
echo [5/6] Configuration du PATH...
setx PATH "%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin" /M

:: Retourner au dossier principal
cd ..

:: Attendre que les changements prennent effet
echo Attente de la configuration...
timeout /t 5 /nobreak >nul

:setup_database
echo [6/6] Configuration de la base de données...

:: Démarrer MySQL Service
echo Démarrer MySQL Service...
net start MySQL80 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  MySQL Service non démarré automatiquement
    echo Démarrage manuel requis
)

:: Créer la base de données
echo Création de la base de données...
mysql -u root -e "CREATE DATABASE IF NOT EXISTS mybankdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Impossible de créer la base automatiquement
    echo Configuration manuelle requise
)

:: Importer la structure
echo Import de la structure de base de données...
if exist "setup_database.sql" (
    mysql -u root mybankdb < setup_database.sql 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Structure importée avec succès
    ) else (
        echo ⚠️  Import automatique échoué
    )
)

echo.
echo ========================================
echo    INSTALLATION TERMINÉE
echo ========================================
echo.
echo ✅ MySQL a été installé
echo.
echo 📋 PROCHAINES ÉTAPES:
echo.
echo 1. Redémarrez votre terminal/PowerShell
echo 2. Testez la connexion: mysql --version
echo 3. Configurez le mot de passe root si nécessaire
echo 4. Lancez le système: demarrer_systeme_securise.bat
echo.
echo 🔧 CONFIGURATION MANUELLE (si nécessaire):
echo.
echo 1. Ouvrez MySQL Workbench
echo 2. Créez une connexion:
echo    - Hostname: localhost
echo    - Port: 3306
echo    - Username: root
echo    - Password: (votre mot de passe)
echo.
echo 3. Exécutez: setup_database.sql
echo.
echo 📚 DOCUMENTATION: guide_mysql_workbench.md
echo.
pause
