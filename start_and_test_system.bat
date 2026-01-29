@echo off
echo ========================================
echo    MyBankManager - Test System
echo ========================================
echo.

echo [1/4] Vérification de Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ ERREUR: Java n'est pas installé ou pas dans le PATH
    pause
    exit /b 1
)
echo ✅ Java est installé
echo.

echo [2/4] Vérification de MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  ATTENTION: MySQL n'est pas détecté dans le PATH
    echo    Assurez-vous que MySQL est installé et en cours d'exécution
    echo.
) else (
    echo ✅ MySQL est détecté
)
echo.

echo [3/4] Démarrage du backend Spring Boot...
echo    Port: 8081
echo    Base de données: mybankdb
echo    Admin email: admin@mybank.com
echo    Admin password: admin123
echo.

cd Mybankmanager
start "MyBankManager Backend" cmd /k "call mvnw.cmd spring-boot:run"

echo [4/4] Attente du démarrage du serveur...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo    🎉 Système prêt !
echo ========================================
echo.
echo 📋 Informations de connexion :
echo    • Frontend: http://localhost:8080 (ou ouvrir index.html)
echo    • Backend: http://localhost:8081
echo    • Admin: admin@mybank.com / admin123
echo.
echo 🧪 Tests disponibles :
echo    • Test admin: http://localhost:8080/test_admin_login.html
echo    • Connexion: http://localhost:8080/connexion.html
echo    • Dashboard admin: http://localhost:8080/admin-dashboard.html
echo.
echo 💡 Pour tester la connexion admin :
echo    1. Ouvrez connexion.html dans votre navigateur
echo    2. Entrez: admin@mybank.com
echo    3. Entrez: admin123
echo    4. Cliquez sur "Se connecter"
echo.
echo ⏳ Le serveur backend démarre en arrière-plan...
echo    Attendez quelques secondes avant de tester la connexion.
echo.

pause 