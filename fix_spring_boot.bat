@echo off
echo ========================================
echo   Correction Spring Boot MyBankManager
echo ========================================
echo.

echo [1/5] Arrêt des processus existants...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo ✅ Processus arrêtés
echo.

echo [2/5] Configuration JAVA_HOME...
set JAVA_HOME=C:\Program Files\Java\jdk-17
echo ✅ JAVA_HOME configuré: %JAVA_HOME%
echo.

echo [3/5] Nettoyage Maven...
cd Mybankmanager
call mvnw.cmd clean
echo ✅ Nettoyage terminé
echo.

echo [4/5] Téléchargement des dépendances...
call mvnw.cmd dependency:resolve
echo ✅ Dépendances téléchargées
echo.

echo [5/5] Démarrage Spring Boot...
echo.
echo 🌐 URL: http://localhost:8081
echo 🗄️ Base de données: H2 (en mémoire)
echo 📱 Frontend: Ouvrez index.html
echo 💡 Pour arrêter: Ctrl+C
echo.

call mvnw.cmd spring-boot:run

pause
