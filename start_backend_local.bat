@echo off
echo ========================================
echo    DEMARRAGE BACKEND AVEC MAVEN LOCAL
echo ========================================
echo.

set MAVEN_HOME=%~dp0maven
set PATH=%MAVEN_HOME%\bin;%PATH%

echo [1/4] Verification de Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installe
    pause
    exit /b 1
)
echo ✅ Java detecte

echo.
echo [2/4] Verification de Maven local...
"%MAVEN_HOME%\bin\mvn.cmd" -version
if %errorlevel% neq 0 (
    echo ❌ Maven local non trouve
    echo Executez d'abord: .\download_maven.bat puis .\extract_maven.bat
    pause
    exit /b 1
)
echo ✅ Maven local detecte

echo.
echo [3/4] Nettoyage et compilation...
"%MAVEN_HOME%\bin\mvn.cmd" clean compile
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de la compilation
    echo.
    echo Verifiez :
    echo 1. Que MySQL est demarre
    echo 2. Que la base 'mybankdb' existe
    echo 3. Les parametres dans application.properties
    pause
    exit /b 1
)
echo ✅ Compilation reussie

echo.
echo [4/4] Demarrage du serveur Spring Boot...
echo.
echo 🚀 URL du serveur: http://localhost:8080/api
echo 📋 Endpoints disponibles:
echo    - POST http://localhost:8080/api/auth/register
echo    - POST http://localhost:8080/api/auth/login
echo    - GET  http://localhost:8080/api/loans
echo    - POST http://localhost:8080/api/loans
echo    - GET  http://localhost:8080/api/creditcards
echo    - POST http://localhost:8080/api/creditcards
echo    - GET  http://localhost:8080/api/admin/users
echo.
echo ⚠️  Assurez-vous que MySQL est demarre et que la base 'mybankdb' existe
echo.
echo ✅ Serveur en cours de demarrage...
echo.

"%MAVEN_HOME%\bin\mvn.cmd" spring-boot:run

echo.
echo 🛑 Serveur arrete
pause
