@echo off
echo ========================================
echo    EXTRACTION MAVEN MANUELLE
echo ========================================
echo.

set MAVEN_DIR=%~dp0maven

echo [1/3] Verification du fichier telecharge...
if not exist "%MAVEN_DIR%\maven.zip" (
    echo ❌ Fichier maven.zip non trouve
    echo Executez d'abord: .\download_maven.bat
    pause
    exit /b 1
)
echo ✅ Fichier maven.zip trouve (%.0f KB) 

echo.
echo [2/3] Extraction manuelle avec PowerShell alternative...
cd /d "%MAVEN_DIR%"

:: Methode alternative pour l'extraction
powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('maven.zip', 'temp')"

if exist "temp\apache-maven-3.9.5" (
    echo ✅ Extraction reussie !
    
    echo [3/3] Organisation des fichiers...
    :: Copier tous les fichiers vers le dossier racine maven
    xcopy "temp\apache-maven-3.9.5\*" "." /E /H /C /I /Y
    
    :: Nettoyer
    rmdir /s /q "temp"
    del "maven.zip"
    
    echo ✅ Installation terminee !
) else (
    echo ❌ Erreur d'extraction
    echo.
    echo Solution manuelle :
    echo 1. Extrayez manuellement maven.zip
    echo 2. Copiez le contenu d'apache-maven-3.9.5 vers le dossier maven
    pause
    exit /b 1
)

cd /d "%~dp0"

echo.
echo ========================================
echo    VERIFICATION MAVEN
echo ========================================
echo.

if exist "%MAVEN_DIR%\bin\mvn.cmd" (
    echo ✅ Maven installe avec succes !
    echo.
    echo Test de Maven...
    "%MAVEN_DIR%\bin\mvn.cmd" -version
    
    echo.
    echo ========================================
    echo    MAVEN PRET A UTILISER
    echo ========================================
    echo.
    echo 🚀 Commandes disponibles :
    echo.
    echo 1. Backend Spring Boot complet :
    echo    .\start_backend_local.bat
    echo.
    echo 2. Serveur Java simple (deja en cours) :
    echo    .\start_simple_server.bat
    echo.
    echo 3. Interface de test :
    echo    start test-api.html
    echo.
    echo 4. Tests API avec cURL :
    echo    .\test_simple_api.bat
    echo.
) else (
    echo ❌ Probleme d'installation Maven
    echo.
    echo Solutions :
    echo 1. Extraction manuelle du fichier maven.zip
    echo 2. Installation via le site officiel Maven
    echo 3. Utilisation du serveur Java simple (sans Maven)
)

echo.
pause
