@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    DÉMARRAGE MYBANKMANAGER COMPLET
echo    Système Bancaire Intelligent
echo ========================================
echo.

echo [1/4] Vérification de l'environnement...

:: Vérifier Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js détecté
) else (
    echo ❌ Node.js non détecté
    echo Téléchargez Node.js: https://nodejs.org/
    pause
    exit /b 1
)

:: Vérifier MySQL
echo [2/4] Vérification de MySQL...
mysql --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ MySQL détecté
    set MYSQL_AVAILABLE=1
) else (
    echo ⚠️  MySQL non détecté
    echo Le système fonctionnera en mode démo
    set MYSQL_AVAILABLE=0
)

:: Démarrer le serveur
echo [3/4] Démarrage du serveur...
start /B node simple_server.js
timeout /t 3 /nobreak >nul

:: Vérifier que le serveur fonctionne
echo [4/4] Test de connexion...
curl -s http://localhost:8081/api/test >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur démarré avec succès
) else (
    echo ❌ Erreur de démarrage du serveur
    pause
    exit /b 1
)

echo.
echo ========================================
echo    SYSTÈME DÉMARRÉ AVEC SUCCÈS !
echo ========================================
echo.
echo 🌐 ACCÈS AU SYSTÈME:
echo.
echo 📱 Site Principal: http://localhost:8081
echo 🔗 API Backend: http://localhost:8081/api/test
echo.
if %MYSQL_AVAILABLE% equ 1 (
    echo 🗄️ Base de données: ✅ Connectée
    echo 📊 Mode: Complet avec persistance
) else (
    echo 🗄️ Base de données: ⚠️ Mode démo
    echo 📊 Mode: Démonstration (pas de persistance)
    echo.
    echo 💡 Pour installer MySQL:
    echo    install_mysql_quick.bat
)

echo.
echo 🎯 FONCTIONNALITÉS DISPONIBLES:
echo.
echo ✅ Interface utilisateur complète
echo ✅ Système d'authentification
echo ✅ Gestion des comptes bancaires
echo ✅ Simulation de prêts
echo ✅ Gestion des cartes
echo ✅ Tableau de bord admin
echo.

if %MYSQL_AVAILABLE% equ 0 (
    echo ⚠️  MODE DÉMO ACTIVÉ:
    echo - Les données ne sont pas sauvegardées
    echo - Redémarrage = perte des données
    echo - Fonctionnalités complètes disponibles
    echo.
)

echo 🚀 Ouverture du site...
start http://localhost:8081

echo.
echo 📋 RACCOURCIS UTILES:
echo.
echo 🔧 Installation MySQL: install_mysql_quick.bat
echo 🧪 Test connexion: test_database_connection.bat
echo 📚 Documentation: SOLUTION_DATABASE_PROBLEM.md
echo.
echo ⏹️  Pour arrêter: Ctrl+C dans cette fenêtre
echo.
echo ========================================
echo    MyBankManager est prêt !
echo ========================================
echo.
pause





















