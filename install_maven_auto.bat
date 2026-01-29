@echo off
echo ========================================
echo  INSTALLATION AUTOMATIQUE DE MAVEN
echo ========================================
echo.

set MAVEN_VERSION=3.9.5
set MAVEN_HOME=C:\Program Files\Apache\Maven
set MAVEN_URL=https://archive.apache.org/dist/maven/maven-3/%MAVEN_VERSION%/binaries/apache-maven-%MAVEN_VERSION%-bin.zip
set TEMP_DIR=%TEMP%\maven_install

echo [1/6] Verification de Java...
java -version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installe. Installez Java d'abord.
    pause
    exit /b 1
)
echo ✅ Java detecte

echo.
echo [2/6] Verification de Maven existant...
mvn -version 2>nul
if %errorlevel% equ 0 (
    echo ✅ Maven est deja installe !
    mvn -version
    pause
    exit /b 0
)
echo ⚠️  Maven non detecte, installation en cours...

echo.
echo [3/6] Creation du repertoire temporaire...
if not exist "%TEMP_DIR%" mkdir "%TEMP_DIR%"
cd /d "%TEMP_DIR%"

echo.
echo [4/6] Telechargement de Maven %MAVEN_VERSION%...
echo URL: %MAVEN_URL%
echo.
echo ⚠️  Ceci peut prendre quelques minutes selon votre connexion...
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri '%MAVEN_URL%' -OutFile 'maven.zip'}"

if not exist "maven.zip" (
    echo ❌ Echec du telechargement
    echo.
    echo Solutions alternatives :
    echo 1. Telecharger manuellement depuis: https://maven.apache.org/download.cgi
    echo 2. Utiliser le serveur Java simple (sans Maven)
    echo 3. Installer via chocolatey: choco install maven
    pause
    exit /b 1
)
echo ✅ Telechargement termine

echo.
echo [5/6] Installation de Maven...
echo Extraction vers: %MAVEN_HOME%
powershell -Command "Expand-Archive -Path 'maven.zip' -DestinationPath 'C:\Program Files\Apache\' -Force"

if exist "C:\Program Files\Apache\apache-maven-%MAVEN_VERSION%" (
    if exist "%MAVEN_HOME%" rmdir /s /q "%MAVEN_HOME%"
    ren "C:\Program Files\Apache\apache-maven-%MAVEN_VERSION%" "Maven"
    echo ✅ Maven installe dans: %MAVEN_HOME%
) else (
    echo ❌ Erreur lors de l'installation
    pause
    exit /b 1
)

echo.
echo [6/6] Configuration des variables d'environnement...
echo Ajout de Maven au PATH...

:: Ajouter Maven au PATH pour cette session
set PATH=%MAVEN_HOME%\bin;%PATH%

:: Ajouter Maven au PATH de maniere permanente
powershell -Command "& {$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine'); $env:Path += ';%MAVEN_HOME%\bin'; [Environment]::SetEnvironmentVariable('Path', $env:Path, 'Machine')}"

echo.
echo ========================================
echo   INSTALLATION MAVEN TERMINEE
echo ========================================
echo.
echo ✅ Maven %MAVEN_VERSION% installe avec succes !
echo 📁 Repertoire: %MAVEN_HOME%
echo.

echo Verification finale...
"%MAVEN_HOME%\bin\mvn" -version

if %errorlevel% equ 0 (
    echo.
    echo ✅ Installation reussie ! Maven est pret a utiliser.
    echo.
    echo Prochaines etapes :
    echo 1. Redemarrez votre terminal pour recharger le PATH
    echo 2. Executez: .\start_backend_spring.bat
    echo 3. Testez avec: .\lancer_tests_api.bat
) else (
    echo.
    echo ❌ Probleme de configuration. Redemarrez votre terminal.
    echo.
    echo Si le probleme persiste :
    echo 1. Ajoutez manuellement %MAVEN_HOME%\bin au PATH
    echo 2. Ou utilisez le serveur Java simple
)

echo.
echo Nettoyage...
cd /d "%~dp0"
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"

echo.
pause
