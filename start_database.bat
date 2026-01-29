@echo off
echo ========================================
echo    MyBankManager - Setup Database
echo ========================================
echo.

echo 1. Demarrage de MySQL...
net start mysql80
if %errorlevel% neq 0 (
    echo ERREUR: Impossible de demarrer MySQL
    echo Verifiez que MySQL est installe et configure
    pause
    exit /b 1
)
echo MySQL demarre avec succes!
echo.

echo 2. Creation de la base de donnees...
mysql -u root -pApah. < database_setup.sql
if %errorlevel% neq 0 (
    echo ERREUR: Impossible de creer la base de donnees
    echo Verifiez que le mot de passe MySQL est correct
    pause
    exit /b 1
)
echo Base de donnees creee avec succes!
echo.

echo 3. Verification de la base de donnees...
mysql -u root -pApah. -e "USE mybankdb; SHOW TABLES;"
echo.

echo ========================================
echo    Base de donnees prete!
echo ========================================
echo.
echo Pour demarrer l'application Spring Boot:
echo 1. Ouvrez un terminal dans le dossier Mybankmanager
echo 2. Executez: mvn spring-boot:run
echo 3. Accedez a: http://localhost:8081
echo 4. Pour l'admin: http://localhost:8081/admin-dashboard.html
echo.
pause 