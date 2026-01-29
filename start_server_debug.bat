@echo off
echo ========================================
echo   Démarrage du serveur avec debug
echo ========================================

echo.
echo 1. Vérification de Java...
java -version

echo.
echo 2. Configuration de l'environnement...
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo.
echo 3. Vérification de MySQL...
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p"Apah." -e "SELECT 'MySQL OK' as status;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ MySQL connecté avec succès
) else (
    echo ❌ Erreur de connexion MySQL
)

echo.
echo 4. Compilation du projet...
cd Mybankmanager
call mvnw.cmd clean compile

echo.
echo 5. Démarrage du serveur Spring Boot...
echo Appuyez sur Ctrl+C pour arrêter
call mvnw.cmd spring-boot:run

pause 