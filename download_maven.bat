@echo off
echo ========================================
echo    TELECHARGEMENT MAVEN PORTABLE
echo ========================================
echo.

set MAVEN_VERSION=3.9.5
set MAVEN_DIR=%~dp0maven
set MAVEN_URL=https://archive.apache.org/dist/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip

echo [1/4] Verification de Java...
java -version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installe
    pause
    exit /b 1
)
echo ✅ Java detecte

echo.
echo [2/4] Verification de Maven local...
if exist "%MAVEN_DIR%\bin\mvn.cmd" (
    echo ✅ Maven deja telecharge !
    "%MAVEN_DIR%\bin\mvn.cmd" -version
    goto :configure
)

echo.
echo [3/4] Telechargement de Maven %MAVEN_VERSION%...
echo Telechargement vers: %MAVEN_DIR%
echo.

:: Creer le dossier maven local
if not exist "%MAVEN_DIR%" mkdir "%MAVEN_DIR%"

:: Telecharger avec PowerShell
echo Telechargement en cours...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%MAVEN_URL%' -OutFile '%MAVEN_DIR%\maven.zip'}"

if not exist "%MAVEN_DIR%\maven.zip" (
    echo ❌ Echec du telechargement
    echo.
    echo Solutions :
    echo 1. Verifiez votre connexion Internet
    echo 2. Telechargez manuellement: %MAVEN_URL%
    echo 3. Utilisez le serveur Java simple
    pause
    exit /b 1
)

echo ✅ Telechargement termine

echo.
echo [4/4] Extraction de Maven...
powershell -Command "Expand-Archive -Path '%MAVEN_DIR%\maven.zip' -DestinationPath '%MAVEN_DIR%\temp' -Force"

:: Deplacer les fichiers
if exist "%MAVEN_DIR%\temp\apache-maven-%MAVEN_VERSION%" (
    xcopy "%MAVEN_DIR%\temp\apache-maven-%MAVEN_VERSION%\*" "%MAVEN_DIR%\" /E /H /C /I /Y
    rmdir /s /q "%MAVEN_DIR%\temp"
    del "%MAVEN_DIR%\maven.zip"
    echo ✅ Maven extrait avec succes !
) else (
    echo ❌ Erreur lors de l'extraction
    pause
    exit /b 1
)

:configure
echo.
echo ========================================
echo    CONFIGURATION MAVEN LOCAL
echo ========================================
echo.

:: Creer un script de demarrage avec Maven local
echo @echo off > start_backend_local.bat
echo echo ======================================== >> start_backend_local.bat
echo echo    DEMARRAGE BACKEND AVEC MAVEN LOCAL >> start_backend_local.bat
echo echo ======================================== >> start_backend_local.bat
echo echo. >> start_backend_local.bat
echo set MAVEN_HOME=%MAVEN_DIR% >> start_backend_local.bat
echo set PATH=%MAVEN_DIR%\bin;%%PATH%% >> start_backend_local.bat
echo. >> start_backend_local.bat
echo echo [1/4] Verification de Java... >> start_backend_local.bat
echo java -version >> start_backend_local.bat
echo if %%errorlevel%% neq 0 ( >> start_backend_local.bat
echo     echo ❌ Java n'est pas installe >> start_backend_local.bat
echo     pause >> start_backend_local.bat
echo     exit /b 1 >> start_backend_local.bat
echo ^) >> start_backend_local.bat
echo echo ✅ Java detecte >> start_backend_local.bat
echo. >> start_backend_local.bat
echo echo [2/4] Verification de Maven local... >> start_backend_local.bat
echo "%MAVEN_DIR%\bin\mvn.cmd" -version >> start_backend_local.bat
echo echo ✅ Maven local detecte >> start_backend_local.bat
echo. >> start_backend_local.bat
echo echo [3/4] Nettoyage et compilation... >> start_backend_local.bat
echo "%MAVEN_DIR%\bin\mvn.cmd" clean compile >> start_backend_local.bat
echo if %%errorlevel%% neq 0 ( >> start_backend_local.bat
echo     echo ❌ Erreur lors de la compilation >> start_backend_local.bat
echo     pause >> start_backend_local.bat
echo     exit /b 1 >> start_backend_local.bat
echo ^) >> start_backend_local.bat
echo echo ✅ Compilation reussie >> start_backend_local.bat
echo. >> start_backend_local.bat
echo echo [4/4] Demarrage du serveur Spring Boot... >> start_backend_local.bat
echo echo. >> start_backend_local.bat
echo echo 🚀 URL du serveur: http://localhost:8080 >> start_backend_local.bat
echo echo 📋 Endpoints disponibles: >> start_backend_local.bat
echo echo    - POST http://localhost:8080/api/auth/register >> start_backend_local.bat
echo echo    - POST http://localhost:8080/api/auth/login >> start_backend_local.bat
echo echo    - GET  http://localhost:8080/api/loans >> start_backend_local.bat
echo echo    - POST http://localhost:8080/api/loans >> start_backend_local.bat
echo echo    - GET  http://localhost:8080/api/creditcards >> start_backend_local.bat
echo echo    - POST http://localhost:8080/api/creditcards >> start_backend_local.bat
echo echo    - GET  http://localhost:8080/api/admin/users >> start_backend_local.bat
echo echo. >> start_backend_local.bat
echo echo ⚠️  Assurez-vous que MySQL est demarre et que la base 'mybankdb' existe >> start_backend_local.bat
echo echo. >> start_backend_local.bat
echo echo ✅ Serveur en cours de demarrage... >> start_backend_local.bat
echo echo. >> start_backend_local.bat
echo. >> start_backend_local.bat
echo "%MAVEN_DIR%\bin\mvn.cmd" spring-boot:run >> start_backend_local.bat
echo. >> start_backend_local.bat
echo echo 🛑 Serveur arrete >> start_backend_local.bat
echo pause >> start_backend_local.bat

echo ✅ Script start_backend_local.bat cree !

echo.
echo ========================================
echo    MAVEN PORTABLE PRET !
echo ========================================
echo.
echo ✅ Maven %MAVEN_VERSION% installe localement
echo 📁 Repertoire: %MAVEN_DIR%
echo.

echo Verification finale...
"%MAVEN_DIR%\bin\mvn.cmd" -version

echo.
echo 🚀 Prochaines etapes :
echo.
echo 1. Pour Spring Boot complet :
echo    .\start_backend_local.bat
echo.
echo 2. Pour tests immediats :
echo    .\start_simple_server.bat (deja en cours)
echo.
echo 3. Interface de test :
echo    start test-api.html
echo.
echo 4. Tests cURL :
echo    .\test_simple_api.bat
echo.
pause
