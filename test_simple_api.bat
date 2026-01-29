@echo off
echo ========================================
echo   TESTS API SERVEUR SIMPLE
echo ========================================
echo.

set API_URL=http://localhost:8080

echo [1/6] Verification du serveur...
curl -s --connect-timeout 5 %API_URL%/users >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Serveur accessible
) else (
    echo ✗ Serveur non accessible
    echo.
    echo Demarrez le serveur avec: .\start_simple_server.bat
    echo.
    pause
    exit /b 1
)

echo.
echo [2/6] Test des utilisateurs...
echo GET %API_URL%/users
curl -X GET "%API_URL%/users" -w "\nStatus: %%{http_code}\n\n" 2>nul

echo [3/6] Test des comptes...
echo GET %API_URL%/accounts
curl -X GET "%API_URL%/accounts" -w "\nStatus: %%{http_code}\n\n" 2>nul

echo [4/6] Test des prets...
echo GET %API_URL%/loans
curl -X GET "%API_URL%/loans" -w "\nStatus: %%{http_code}\n\n" 2>nul

echo [5/6] Test des cartes...
echo GET %API_URL%/cards
curl -X GET "%API_URL%/cards" -w "\nStatus: %%{http_code}\n\n" 2>nul

echo [6/6] Test des transactions...
echo GET %API_URL%/transactions
curl -X GET "%API_URL%/transactions" -w "\nStatus: %%{http_code}\n\n" 2>nul

echo ========================================
echo TESTS TERMINES
echo ========================================
echo.
echo Le serveur simple fonctionne avec des données JSON statiques.
echo Pour un backend complet, installez Maven et utilisez Spring Boot.
echo.
pause
