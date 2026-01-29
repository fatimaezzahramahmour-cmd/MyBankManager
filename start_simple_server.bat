@echo off
echo ========================================
echo   DEMARRAGE SERVEUR SIMPLE JAVA
echo ========================================
echo.

echo [1/3] Verification de Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java n'est pas installé
    pause
    exit /b 1
)
echo ✅ Java détecté

echo.
echo [2/3] Compilation du serveur simple...
javac -cp . SimpleBankApp.java
if %errorlevel% neq 0 (
    echo ❌ Erreur de compilation
    pause
    exit /b 1
)
echo ✅ Compilation réussie

echo.
echo [3/3] Démarrage du serveur...
echo.
echo 🚀 Serveur démarré sur: http://localhost:8080
echo 📋 Endpoints disponibles:
echo    - GET  http://localhost:8080/users
echo    - GET  http://localhost:8080/accounts
echo    - GET  http://localhost:8080/loans
echo    - GET  http://localhost:8080/cards
echo    - GET  http://localhost:8080/transactions
echo.
echo ✅ Serveur en cours d'exécution...
echo.
echo Arrêtez avec Ctrl+C
echo.

java SimpleBankApp

echo.
echo 🛑 Serveur arrêté
pause