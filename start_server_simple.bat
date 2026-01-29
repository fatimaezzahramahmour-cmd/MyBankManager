@echo off
echo ========================================
echo   Démarrage du serveur MyBankManager
echo ========================================

echo.
echo 1. Vérification de Java...
java -version
if %errorlevel% neq 0 (
    echo ERREUR: Java n'est pas installé ou pas dans le PATH
    pause
    exit /b 1
)

echo.
echo 2. Vérification de MySQL...
net start MySQL80 2>nul
if %errorlevel% neq 0 (
    echo ATTENTION: MySQL n'est pas démarré
    echo Démarrage de MySQL...
    net start MySQL80
)

echo.
echo 3. Configuration de l'environnement...
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo.
echo 4. Compilation du projet...
cd Mybankmanager
call mvnw.cmd clean compile
if %errorlevel% neq 0 (
    echo ERREUR: Échec de la compilation
    pause
    exit /b 1
)

echo.
echo 5. Démarrage du serveur Spring Boot...
call mvnw.cmd spring-boot:run

echo.
echo Serveur démarré sur http://localhost:8081
echo.
echo Endpoints disponibles:
echo - GET  http://localhost:8081/api/users
echo - POST http://localhost:8081/api/users/login
echo - GET  http://localhost:8081/bankaccounts
echo - GET  http://localhost:8081/api/creditcards
echo - GET  http://localhost:8081/api/loans
echo.
echo Appuyez sur Ctrl+C pour arrêter le serveur
pause 