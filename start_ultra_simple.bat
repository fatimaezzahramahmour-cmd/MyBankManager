@echo off
echo ========================================
echo   MyBankManager - Démarrage Ultra Simple
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

echo [2/3] Compilation avec Maven...
cd Mybankmanager
call mvnw.cmd clean compile -q
if %errorlevel% neq 0 (
    echo ❌ ERREUR: Compilation échouée
    echo Vérifiez que Maven est installé
    pause
    exit /b 1
)
echo ✅ Compilation réussie
echo.

echo [3/3] Démarrage du serveur...
echo 🌐 Backend: http://localhost:8081
echo 🗄️ Base de données: MySQL (mybankdb)
echo 📱 Frontend: Ouvrez test_connection_simple.html
echo.

start "MyBankManager Backend" cmd /k "call mvnw.cmd spring-boot:run"

echo ⏳ Attente du démarrage...
timeout /t 10 /nobreak >nul

echo.
echo ========================================
echo    ✅ SYSTÈME PRÊT !
echo ========================================
echo.
echo 🌐 Test de connexion: test_connection_simple.html
echo 🏠 Site principal: index.html
echo.
echo 💡 Pour arrêter: fermez la fenêtre du serveur
echo.

pause 