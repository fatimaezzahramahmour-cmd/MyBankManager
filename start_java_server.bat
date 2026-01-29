@echo off
echo ========================================
echo   Démarrage serveur Java MyBankManager
echo ========================================

echo.
echo 1. Arrêt des processus Java...
taskkill /F /IM java.exe 2>nul

echo.
echo 2. Configuration Java...
set JAVA_HOME=C:\Program Files\Java\jdk-17
set PATH=%JAVA_HOME%\bin;%PATH%

echo.
echo 3. Vérification Java...
java -version

echo.
echo 4. Démarrage du serveur...
cd Mybankmanager
call mvnw.cmd spring-boot:run

pause 