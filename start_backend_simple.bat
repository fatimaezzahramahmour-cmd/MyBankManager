@echo off
echo ========================================
echo   Démarrage MyBankManager Backend Simple
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
echo ✅ JAVA_HOME configuré
echo.

echo [3/3] Démarrage du serveur Node.js simple...
echo.
echo 🌐 URL: http://localhost:8081
echo 🗄️ Base de données: Simulée
echo 📱 Frontend: Ouvrez index.html
echo 💡 Pour arrêter: Ctrl+C
echo.

node simple_server.js

pause
