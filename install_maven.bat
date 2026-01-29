@echo off
echo ========================================
echo   Installation de Maven
echo ========================================
echo.

echo [1/3] Vérification de Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ ERREUR: Java n'est pas installé
    pause
    exit /b 1
)
echo ✅ Java détecté
echo.

echo [2/3] Téléchargement de Maven...
echo Téléchargement en cours...
powershell -Command "& {Invoke-WebRequest -Uri 'https://archive.apache.org/dist/maven/maven-3/3.8.6/binaries/apache-maven-3.8.6-bin.zip' -OutFile 'maven.zip'}"
if %errorlevel% neq 0 (
    echo ❌ Erreur de téléchargement
    pause
    exit /b 1
)
echo ✅ Maven téléchargé
echo.

echo [3/3] Installation de Maven...
powershell -Command "& {Expand-Archive -Path 'maven.zip' -DestinationPath '.' -Force}"
if %errorlevel% neq 0 (
    echo ❌ Erreur d'extraction
    pause
    exit /b 1
)
echo ✅ Maven installé
echo.

echo Configuration des variables d'environnement...
set MAVEN_HOME=%CD%\apache-maven-3.8.6
set PATH=%PATH%;%MAVEN_HOME%\bin
echo ✅ Variables configurées
echo.

echo Test de Maven...
mvn --version
if %errorlevel% neq 0 (
    echo ❌ Erreur de configuration Maven
    pause
    exit /b 1
)
echo ✅ Maven fonctionnel
echo.

echo ========================================
echo    ✅ MAVEN INSTALLÉ AVEC SUCCÈS !
echo ========================================
echo.
echo Vous pouvez maintenant utiliser:
echo - start_java_backend.bat
echo - mvn spring-boot:run
echo.

pause 