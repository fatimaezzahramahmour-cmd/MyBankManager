@echo off
echo ========================================
echo    DEMARRAGE DU BACKEND SPRING BOOT
echo ========================================
echo.

echo [1/4] Verification de Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)
echo ✅ Java détecté

echo.
echo [2/4] Verification de Maven...
mvn -version
if %errorlevel% neq 0 (
    echo ❌ Maven n'est pas installé ou n'est pas dans le PATH
    echo 📥 Téléchargez Maven depuis: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)
echo ✅ Maven détecté

echo.
echo [3/4] Nettoyage et compilation...
mvn clean compile
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la compilation
    pause
    exit /b 1
)
echo ✅ Compilation réussie

echo.
echo [4/4] Démarrage du serveur Spring Boot...
echo.
echo 🚀 URL du serveur: http://localhost:8080
echo 📋 Endpoints disponibles:
echo    - POST http://localhost:8080/api/auth/register
echo    - POST http://localhost:8080/api/auth/login
echo    - GET  http://localhost:8080/api/loans
echo    - POST http://localhost:8080/api/loans
echo    - GET  http://localhost:8080/api/creditcards
echo    - POST http://localhost:8080/api/creditcards
echo    - GET  http://localhost:8080/api/admin/users
echo.
echo ⚠️  Assurez-vous que MySQL est démarré et que la base 'mybankdb' existe
echo.
echo ✅ Serveur en cours de démarrage...
echo.

mvn spring-boot:run

echo.
echo 🛑 Serveur arrêté
pause
