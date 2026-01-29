@echo off
echo ========================================
echo   Spring Boot Simple (Sans Base)
echo ========================================
echo.

echo [1/4] Arrêt des processus existants...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8081') do (
    taskkill /PID %%a /F >nul 2>&1
)
echo ✅ Processus arrêtés
echo.

echo [2/4] Configuration JAVA_HOME...
set JAVA_HOME=C:\Program Files\Java\jdk-17
echo ✅ JAVA_HOME configuré
echo.

echo [3/4] Nettoyage et compilation...
cd Mybankmanager
call mvnw.cmd clean compile
echo ✅ Compilation terminée
echo.

echo [4/4] Démarrage Spring Boot (version simple)...
echo.
echo 🌐 URL: http://localhost:8081
echo 📱 Frontend: Ouvrez index.html
echo 💡 Pour arrêter: Ctrl+C
echo.

call mvnw.cmd spring-boot:run -Dspring.profiles.active=simple

pause
