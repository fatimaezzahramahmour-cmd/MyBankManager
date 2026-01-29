@echo off
echo ========================================
echo    MyBankManager - Setup Tables
echo ========================================
echo.

echo 1. Verification de la base de donnees existante...
mysql -u root -pApah. -e "USE mybankdb; SHOW TABLES;"
if %errorlevel% neq 0 (
    echo ERREUR: Impossible d'acceder a la base de donnees mybankdb
    echo Verifiez que la base de donnees existe et que le mot de passe est correct
    pause
    exit /b 1
)
echo Base de donnees mybankdb trouvee!
echo.

echo 2. Creation des tables...
mysql -u root -pApah. < create_tables.sql
if %errorlevel% neq 0 (
    echo ERREUR: Impossible de creer les tables
    echo Verifiez que le script create_tables.sql existe
    pause
    exit /b 1
)
echo Tables creees avec succes!
echo.

echo 3. Verification des tables...
mysql -u root -pApah. -e "USE mybankdb; SHOW TABLES;"
echo.

echo 4. Verification des donnees...
mysql -u root -pApah. -e "USE mybankdb; SELECT COUNT(*) as total_users FROM users; SELECT COUNT(*) as total_accounts FROM bank_accounts; SELECT COUNT(*) as total_loans FROM loans;"
echo.

echo ========================================
echo    Configuration terminee!
echo ========================================
echo.
echo Pour demarrer l'application Spring Boot:
echo 1. Ouvrez un terminal dans le dossier Mybankmanager
echo 2. Executez: mvn spring-boot:run
echo 3. Accedez a: http://localhost:8081
echo 4. Pour l'admin: http://localhost:8081/admin-dashboard.html
echo.
echo Votre base de donnees mybankdb est maintenant configuree!
echo.
pause 