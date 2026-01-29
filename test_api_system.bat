@echo off
echo ========================================
echo TEST DU SYSTEME API MYBANKMANAGER
echo ========================================
echo.

echo 1. Verification de Java...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java non trouve. Installez Java 8 ou superieur.
    pause
    exit /b 1
)
echo ✅ Java trouve

echo.
echo 2. Verification de Maven...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Maven non trouve. Utilisez install_maven.bat
    pause
    exit /b 1
)
echo ✅ Maven trouve

echo.
echo 3. Demarrage du serveur backend...
echo 🔄 Lancement du serveur Spring Boot...
start "MyBankManager Backend" cmd /k "cd /d %~dp0 && mvn spring-boot:run -f pom.xml"

echo.
echo 4. Attente du demarrage du serveur...
timeout /t 10 /nobreak >nul

echo.
echo 5. Test de connexion API...
curl -s http://localhost:8081/api/auth/test >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ API accessible
) else (
    echo ⚠️ API non accessible, attendez encore quelques secondes...
    timeout /t 5 /nobreak >nul
)

echo.
echo 6. Ouverture de la page de test...
start "" "test_api_connection.html"

echo.
echo 7. Ouverture de l'application principale...
start "" "index.html"

echo.
echo ========================================
echo SYSTEME PRET POUR LES TESTS
echo ========================================
echo.
echo 📋 Instructions:
echo 1. Attendez que le serveur soit completement demarre
echo 2. Utilisez la page de test pour verifier l'API
echo 3. Testez l'inscription et la connexion
echo 4. Vérifiez que les emails sont bien enregistres
echo.
echo 🔧 En cas de probleme:
echo - Vérifiez que le port 8081 est libre
echo - Redémarrez avec: start_mybankmanager_complete.bat
echo - Consultez les logs dans la console du serveur
echo.
pause
