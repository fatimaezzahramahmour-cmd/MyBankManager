@echo off
echo ========================================
echo 🔧 TEST ACCÈS REFUSÉ 403
echo ========================================

echo.
echo 1. Vérification du serveur...
netstat -ano | findstr :8081 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur Node.js fonctionne sur le port 8081
) else (
    echo ❌ Serveur Node.js non trouvé sur le port 8081
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo ========================================
echo 📋 TEST ACCÈS REFUSÉ 403
echo ========================================
echo.
echo 🔐 ÉTAPE 1: Connexion Client
echo POST http://localhost:8081/api/login
echo Content-Type: application/json
echo.
echo {
echo   "email": "client@example.com",
echo   "password": "client123"
echo }
echo.
echo ✅ Réponse attendue (200):
echo {
echo   "success": true,
echo   "message": "Connexion réussie",
echo   "user": { ... },
echo   "token": "client_token_67890"
echo }
echo.
echo 🚫 ÉTAPE 2: Tentative d'accès admin avec token client
echo GET http://localhost:8081/api/admin/demandes
echo Authorization: Bearer client_token_67890
echo.
echo ❌ Réponse attendue (403 Forbidden):
echo {
echo   "success": false,
echo   "message": "Accès refusé - Droits administrateur requis",
echo   "error": "FORBIDDEN",
echo   "code": 403
echo }
echo.
echo ========================================
echo 🔧 CONFIGURATION POSTMAN :
echo ========================================
echo.
echo 📁 Collection: MyBankManager API
echo.
echo 🔐 Requête 1: Login Client
echo Method: POST
echo URL: http://localhost:8081/api/login
echo Headers: Content-Type: application/json
echo Body (raw JSON):
echo {
echo   "email": "client@example.com",
echo   "password": "client123"
echo }
echo.
echo 🚫 Requête 2: Accès Refusé
echo Method: GET
echo URL: http://localhost:8081/api/admin/demandes
echo Headers: 
echo   Content-Type: application/json
echo   Authorization: Bearer client_token_67890
echo.
echo ========================================
echo 🧪 TESTS AUTOMATIQUES :
echo ========================================
echo.
echo Dans l'onglet "Tests" de la requête 2:
echo.
echo pm.test("Status code is 403", function () {
echo   pm.response.to.have.status(403);
echo });
echo.
echo pm.test("Response has forbidden error", function () {
echo   var jsonData = pm.response.json();
echo   pm.expect(jsonData.success).to.eql(false);
echo   pm.expect(jsonData.error).to.eql("FORBIDDEN");
echo   pm.expect(jsonData.code).to.eql(403);
echo });
echo.
echo pm.test("Message indicates admin access required", function () {
echo   var jsonData = pm.response.json();
echo   pm.expect(jsonData.message).to.include("Droits administrateur requis");
echo });
echo.
echo ========================================
echo ✅ RÉSULTAT ATTENDU :
echo ========================================
echo.
echo 🔴 Status: 403 Forbidden
echo 📄 Response Body: Message d'erreur JSON
echo ✅ Tests: Tous passent
echo.
echo ========================================
echo 🎯 POINTS À VÉRIFIER :
echo ========================================
echo.
echo 1. ✅ Le serveur répond (pas de 404)
echo 2. ✅ La connexion client fonctionne (200)
echo 3. ✅ L'accès admin est refusé (403)
echo 4. ✅ Le message d'erreur est correct
echo 5. ✅ Le code d'erreur est 403
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause




