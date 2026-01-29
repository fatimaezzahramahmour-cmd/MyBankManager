@echo off
echo ========================================
echo    TEST DES ENDPOINTS API
echo ========================================
echo.

echo 🚀 Test de l'API MyBankManager
echo.

echo [1/6] Test de l'endpoint d'authentification...
curl -X GET http://localhost:8080/api/auth/test
echo.
echo.

echo [2/6] Test d'inscription d'un utilisateur...
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@email.com\",\"password\":\"password123\",\"confirmPassword\":\"password123\"}"
echo.
echo.

echo [3/6] Test de connexion...
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@email.com\",\"password\":\"password123\"}"
echo.
echo.

echo [4/6] Test de création d'un prêt...
curl -X POST "http://localhost:8080/api/loans?userId=1" ^
  -H "Content-Type: application/json" ^
  -d "{\"loanType\":\"PERSONNEL\",\"amount\":50000.00,\"interestRate\":5.5,\"durationMonths\":24,\"monthlyPayment\":2200.00,\"totalAmount\":52800.00}"
echo.
echo.

echo [5/6] Test de création d'une carte de crédit...
curl -X POST "http://localhost:8080/api/creditcards?userId=1" ^
  -H "Content-Type: application/json" ^
  -d "{\"cardType\":\"VISA\",\"bankAccountId\":1,\"cvv\":\"123\",\"expiryDate\":\"2025-12-31\"}"
echo.
echo.

echo [6/6] Test des statistiques admin...
curl -X GET http://localhost:8080/api/admin/stats
echo.
echo.

echo ✅ Tests terminés !
echo.
echo 📋 Résumé des endpoints testés:
echo    ✅ GET  /api/auth/test
echo    ✅ POST /api/auth/register
echo    ✅ POST /api/auth/login
echo    ✅ POST /api/loans
echo    ✅ POST /api/creditcards
echo    ✅ GET  /api/admin/stats
echo.
pause
