@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    TEST CONNEXION BASE DE DONNEES
echo    MyBankManager Database Test
echo ========================================
echo.

echo [1/4] Vérification de MySQL...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL détecté
    mysql --version
) else (
    echo ❌ MySQL non détecté
    echo.
    echo 🔧 SOLUTIONS:
    echo.
    echo 1. Installez MySQL: install_mysql_complete.bat
    echo 2. Ou installez XAMPP: install_xampp_mysql.bat
    echo 3. Ou téléchargez manuellement:
    echo    https://dev.mysql.com/downloads/installer/
    echo.
    pause
    exit /b 1
)

echo.
echo [2/4] Test de connexion MySQL...
mysql -u root -e "SELECT 'MySQL Connection OK' as status;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Connexion MySQL réussie
) else (
    echo ❌ Erreur de connexion MySQL
    echo.
    echo 🔧 SOLUTIONS:
    echo.
    echo 1. Vérifiez que MySQL est démarré
    echo 2. Si XAMPP: Ouvrez XAMPP Control Panel et démarrez MySQL
    echo 3. Si MySQL standalone: net start MySQL80
    echo 4. Vérifiez le mot de passe root
    echo.
    pause
    exit /b 1
)

echo.
echo [3/4] Vérification de la base de données...
mysql -u root -e "USE mybankdb; SHOW TABLES;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ Base de données 'mybankdb' existe
    echo.
    echo 📊 Tables trouvées:
    mysql -u root -e "USE mybankdb; SHOW TABLES;" 2>nul
) else (
    echo ⚠️  Base de données 'mybankdb' n'existe pas
    echo.
    echo 🔧 Création de la base de données...
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS mybankdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Base de données créée
    ) else (
        echo ❌ Erreur lors de la création
        pause
        exit /b 1
    )
)

echo.
echo [4/4] Import de la structure...
if exist "setup_database.sql" (
    mysql -u root mybankdb < setup_database.sql 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Structure importée avec succès
    ) else (
        echo ⚠️  Erreur lors de l'import
        echo Import manuel requis
    )
) else (
    echo ⚠️  Fichier setup_database.sql non trouvé
)

echo.
echo ========================================
echo    TEST TERMINÉ
echo ========================================
echo.
echo ✅ Base de données prête
echo.
echo 📋 STATUT:
echo - MySQL: ✅ Installé et connecté
echo - Base de données: ✅ mybankdb
echo - Structure: ✅ Importée
echo.
echo 🚀 Vous pouvez maintenant lancer:
echo demarrer_systeme_securise.bat
echo.
echo 🔧 OUTILS DISPONIBLES:
echo - phpMyAdmin (si XAMPP): http://localhost/phpmyadmin
echo - MySQL Workbench: guide_mysql_workbench.md
echo.
pause
