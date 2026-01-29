@echo off
echo ========================================
echo   MyBankManager - Démarrage Direct
echo ========================================
echo.

echo Configuration JAVA_HOME...
set JAVA_HOME=C:\Program Files\Java\jdk-17
echo ✅ JAVA_HOME: %JAVA_HOME%
echo.

echo Test de Maven...
mvn --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven non trouvé, utilisation du serveur Node.js...
    echo.
    echo 🌐 Serveur Node.js: http://localhost:8081
    echo 🗄️ Base de données: MySQL (mybankdb)
    echo 📱 Frontend: test_connection_simple.html
    echo.
    node simple_server.js
) else (
    echo ✅ Maven trouvé, démarrage Spring Boot...
    echo.
    echo 🌐 Backend Java: http://localhost:8081
    echo 🗄️ Base de données: MySQL (mybankdb)
    echo 📱 Frontend: test_connection_simple.html
    echo.
    cd Mybankmanager
    mvn spring-boot:run
)

pause 