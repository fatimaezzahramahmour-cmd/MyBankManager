@echo off
echo ========================================
echo   MyBankManager - Test Simple
echo ========================================
echo.

echo Configuration:
echo - Backend: http://localhost:8081
echo - Database: MySQL (mybankdb)
echo - Frontend: HTML/JS
echo.

echo Compilation et démarrage...
echo.

java -cp ".;mysql-connector-java-8.0.33.jar" org.mybank.mybankmanager.SimpleBankApp

pause 