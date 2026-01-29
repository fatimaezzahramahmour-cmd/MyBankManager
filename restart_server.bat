@echo off
echo ========================================
echo   Redémarrage du serveur MyBankManager
echo ========================================

echo.
echo 1. Arrêt des processus Java...
taskkill /F /IM java.exe 2>nul
timeout /t 3 /nobreak >nul

echo.
echo 2. Configuration de l'environnement...
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo.
echo 3. Compilation du projet...
cd Mybankmanager
call mvnw.cmd clean compile

echo.
echo 4. Démarrage du serveur Spring Boot...
echo Appuyez sur Ctrl+C pour arrêter
call mvnw.cmd spring-boot:run

pause 