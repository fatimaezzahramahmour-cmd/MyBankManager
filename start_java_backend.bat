@echo off
echo ========================================
echo   MyBankManager - Backend Java
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

echo [2/3] Configuration JAVA_HOME...
set JAVA_HOME=C:\Program Files\Java\jdk-17
echo ✅ JAVA_HOME configuré: %JAVA_HOME%
echo.

echo [3/3] Démarrage du serveur Spring Boot...
echo 🌐 Backend: http://localhost:8081
echo 🗄️ Base de données: MySQL (mybankdb)
echo 📱 Frontend: test_connection_simple.html
echo.

cd Mybankmanager
echo Compilation et démarrage...
echo.

REM Utiliser Maven directement si installé
mvn spring-boot:run
if %errorlevel% neq 0 (
    echo.
    echo ❌ Maven non trouvé, utilisation du serveur Node.js...
    echo.
    cd ..
    node simple_server.js
)

pause 