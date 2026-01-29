@echo off
echo ========================================
echo    MyBankManager - Systeme Complet
echo ========================================
echo.

echo [1/4] Verification de MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: MySQL n'est pas installe ou pas dans le PATH
    echo Veuillez installer MySQL et l'ajouter au PATH
    pause
    exit /b 1
)
echo ✓ MySQL detecte

echo.
echo [2/4] Demarrage de la base de donnees...
echo - Creation de la base de donnees...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS mybankdb;" 2>nul
if %errorlevel% neq 0 (
    echo ERREUR: Impossible de se connecter a MySQL
    echo Verifiez que MySQL est demarre et que le mot de passe est correct
    pause
    exit /b 1
)

echo - Import des donnees...
mysql -u root -p mybankdb < fix_sql_error.sql 2>nul
if %errorlevel% neq 0 (
    echo ATTENTION: Erreur lors de l'import des donnees
    echo Les donnees de test peuvent ne pas etre disponibles
)

echo ✓ Base de donnees configuree

echo.
echo [3/4] Compilation du backend Spring Boot...
cd Mybankmanager
if exist "target\classes" (
    echo - Nettoyage des anciens fichiers...
    rmdir /s /q target\classes 2>nul
)

echo - Compilation...
call mvnw.cmd clean compile -q
if %errorlevel% neq 0 (
    echo ERREUR: Compilation echouee
    echo Verifiez que Java et Maven sont installes
    pause
    exit /b 1
)
echo ✓ Backend compile

echo.
echo [4/4] Demarrage du serveur...
echo - Demarrage du serveur Spring Boot sur le port 8081...
start "MyBankManager Backend" cmd /k "call mvnw.cmd spring-boot:run"

echo - Attente du demarrage du serveur...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo    SYSTEME DEMARRE AVEC SUCCES !
echo ========================================
echo.
echo 📱 Frontend: http://localhost:8081
echo 🔧 Backend API: http://localhost:8081/api
echo 👨‍💼 Admin Dashboard: http://localhost:8081/admin-dashboard.html
echo.
echo 🔑 Comptes de test:
echo    Admin: admin@mybank.com / admin123
echo    Client: ahmed@email.com / password123
echo.
echo 💡 Pour arreter le serveur, fermez la fenetre du backend
echo.
pause 