@echo off
echo ========================================
echo  INSTALLATION SIMPLE DE MAVEN
echo ========================================
echo.

echo Option 1: Installation automatique
echo Option 2: Installation manuelle
echo Option 3: Utiliser Chocolatey (si installe)
echo Option 4: Utiliser le serveur Java simple (sans Maven)
echo.
set /p choice="Choisissez une option (1-4): "

if "%choice%"=="1" (
    echo.
    echo ========================================
    echo    INSTALLATION AUTOMATIQUE
    echo ========================================
    call install_maven_auto.bat
) else if "%choice%"=="2" (
    echo.
    echo ========================================
    echo    INSTALLATION MANUELLE
    echo ========================================
    echo.
    echo Etapes pour installer Maven manuellement :
    echo.
    echo 1. Telechargez Maven depuis :
    echo    https://maven.apache.org/download.cgi
    echo    (Choisissez apache-maven-3.9.5-bin.zip)
    echo.
    echo 2. Extraire vers : C:\Program Files\Apache\Maven
    echo.
    echo 3. Ajouter au PATH : C:\Program Files\Apache\Maven\bin
    echo    - Windows + R → sysdm.cpl → Avance → Variables
    echo    - Modifier PATH → Ajouter le chemin
    echo.
    echo 4. Redemarrer le terminal
    echo.
    echo 5. Tester avec : mvn -version
    echo.
    start https://maven.apache.org/download.cgi
) else if "%choice%"=="3" (
    echo.
    echo ========================================
    echo    INSTALLATION CHOCOLATEY
    echo ========================================
    echo.
    echo Verification de Chocolatey...
    choco --version 2>nul
    if %errorlevel% equ 0 (
        echo ✅ Chocolatey detecte
        echo Installation de Maven via Chocolatey...
        choco install maven -y
        echo.
        echo Verification...
        mvn -version
    ) else (
        echo ❌ Chocolatey non installe
        echo.
        echo Pour installer Chocolatey :
        echo 1. Ouvrez PowerShell en tant qu'administrateur
        echo 2. Executez :
        echo    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        echo 3. Puis : choco install maven
    )
) else if "%choice%"=="4" (
    echo.
    echo ========================================
    echo    SERVEUR JAVA SIMPLE
    echo ========================================
    echo.
    echo Utilisation du serveur Java simple (sans Maven) :
    echo.
    echo ✅ Pas besoin d'installer Maven
    echo ✅ Fonctionne avec Java uniquement
    echo ✅ Donnees JSON statiques pour tests
    echo ✅ Endpoints GET disponibles
    echo.
    echo Demarrage du serveur simple...
    call start_simple_server.bat
) else (
    echo Option invalide. Veuillez choisir entre 1 et 4.
)

echo.
echo ========================================
echo   INFORMATIONS UTILES
echo ========================================
echo.
echo 🔧 Prerequis Maven :
echo    - Java 8 ou superieur (✅ Vous avez Java 17)
echo    - Variable JAVA_HOME configuree
echo    - Connexion Internet pour telecharger
echo.
echo 📋 Verification Java Home :
echo    - JAVA_HOME doit pointer vers votre JDK
echo    - Exemple : C:\Program Files\Java\jdk-17.0.12
echo.
echo 🌐 Alternatives sans Maven :
echo    - Serveur Java simple (recommande pour tests)
echo    - Interface web de test (deja disponible)
echo    - Scripts cURL et PowerShell
echo.
echo 📚 Documentation :
echo    - README_BACKEND.md
echo    - https://maven.apache.org/install.html
echo.
pause
