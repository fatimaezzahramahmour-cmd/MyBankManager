@echo off
echo ========================================
echo  TESTS API AVEC CURL - MyBankManager
echo ========================================
echo.

set API_URL=http://localhost:8080/api

echo [1/8] Verification du serveur...
curl -s --connect-timeout 5 %API_URL%/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Serveur accessible
) else (
    echo ✗ Serveur non accessible - Demarrez le backend Spring Boot
    echo.
    echo Pour demarrer le backend:
    echo 1. Ouvrez un terminal
    echo 2. Executez: .\start_backend_spring.bat
    echo.
    pause
    exit /b 1
)

echo.
echo [2/8] Test inscription utilisateur...
curl -X POST "%API_URL%/auth/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"telephone\":\"0612345678\",\"password\":\"password123\"}" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo [3/8] Test connexion utilisateur...
curl -X POST "%API_URL%/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo [4/8] Test demande de pret...
curl -X POST "%API_URL%/loans" ^
  -H "Content-Type: application/json" ^
  -d "{\"userEmail\":\"test@example.com\",\"amount\":50000,\"duration\":36,\"type\":\"personnel\",\"monthlyIncome\":8000}" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo [5/8] Test liste des prets...
curl -X GET "%API_URL%/loans" ^
  -H "Content-Type: application/json" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo [6/8] Test demande de carte...
curl -X POST "%API_URL%/creditcards" ^
  -H "Content-Type: application/json" ^
  -d "{\"userEmail\":\"test@example.com\",\"cardType\":\"gold\",\"creditLimit\":10000,\"monthlyIncome\":8000}" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo [7/8] Test liste des cartes...
curl -X GET "%API_URL%/creditcards" ^
  -H "Content-Type: application/json" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo [8/8] Test liste des utilisateurs (admin)...
curl -X GET "%API_URL%/admin/users" ^
  -H "Content-Type: application/json" ^
  -w "\nStatus: %%{http_code}\n" 2>nul
echo.

echo ========================================
echo TESTS API TERMINES
echo ========================================
echo.
echo Codes de statut HTTP:
echo - 200/201: ✓ Succès
echo - 400: ✗ Erreur de requête
echo - 404: ✗ Endpoint non trouvé
echo - 500: ✗ Erreur serveur
echo.
echo Si vous obtenez des erreurs:
echo 1. Verifiez que le backend est demarre
echo 2. Verifiez que MySQL est en cours d'execution
echo 3. Verifiez que la base 'mybankdb' existe
echo.
pause
