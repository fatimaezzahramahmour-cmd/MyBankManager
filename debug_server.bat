@echo off
echo ========================================
echo   Debug serveur MyBankManager
echo ========================================

echo.
echo 1. Vérification Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java non trouvé
    pause
    exit /b 1
)

echo.
echo 2. Configuration JAVA_HOME...
set JAVA_HOME=C:\Program Files\Java\jdk-17
echo JAVA_HOME=%JAVA_HOME%

echo.
echo 3. Vérification Maven...
cd Mybankmanager
call mvnw.cmd --version
if %errorlevel% neq 0 (
    echo ❌ Maven non trouvé
    pause
    exit /b 1
)

echo.
echo 4. Compilation du projet...
call mvnw.cmd clean compile
if %errorlevel% neq 0 (
    echo ❌ Erreur de compilation
    pause
    exit /b 1
)

echo.
echo 5. Démarrage du serveur...
echo Appuyez sur Ctrl+C pour arrêter
call mvnw.cmd spring-boot:run

pause 