@echo off
echo ========================================
echo 🔧 TEST API POSTMAN
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
echo 📋 REQUÊTES POSTMAN À TESTER :
echo ========================================
echo.
echo 🔐 1. CONNEXION ADMIN :
echo POST http://localhost:8081/api/login
echo Content-Type: application/json
echo.
echo {
echo   "email": "admin@mybank.com",
echo   "password": "admin123"
echo }
echo.
echo 🔐 2. CONNEXION CLIENT :
echo POST http://localhost:8081/api/login
echo Content-Type: application/json
echo.
echo {
echo   "email": "client@example.com",
echo   "password": "client123"
echo }
echo.
echo 🚫 3. ACCÈS REFUSÉ - CLIENT TENTE D'ACCÉDER AUX DEMANDES ADMIN :
echo GET http://localhost:8081/api/admin/demandes
echo Authorization: Bearer client_token_67890
echo.
echo ✅ 4. ACCÈS AUTORISÉ - ADMIN RÉCUPÈRE LES DEMANDES :
echo GET http://localhost:8081/api/admin/demandes
echo Authorization: Bearer admin_token_12345
echo.
echo ✅ 5. ADMIN APPROUVE UNE DEMANDE :
echo PUT http://localhost:8081/api/admin/demandes/PRET001/approve
echo Authorization: Bearer admin_token_12345
echo Content-Type: application/json
echo.
echo {
echo   "commentaire": "Demande approuvée après vérification"
echo }
echo.
echo ✅ 6. ADMIN REFUSE UNE DEMANDE :
echo PUT http://localhost:8081/api/admin/demandes/PRET002/reject
echo Authorization: Bearer admin_token_12345
echo Content-Type: application/json
echo.
echo {
echo   "raison": "Documents incomplets",
echo   "commentaire": "Veuillez fournir les documents manquants"
echo }
echo.
echo ✅ 7. STATISTIQUES ADMIN :
echo GET http://localhost:8081/api/admin/stats
echo Authorization: Bearer admin_token_12345
echo.
echo ========================================
echo ✅ RÉPONSES ATTENDUES :
echo ========================================
echo.
echo 🔐 CONNEXION RÉUSSIE (200) :
echo {
echo   "success": true,
echo   "message": "Connexion réussie",
echo   "user": { ... },
echo   "token": "admin_token_12345"
echo }
echo.
echo 🚫 ACCÈS REFUSÉ (403) :
echo {
echo   "success": false,
echo   "message": "Accès refusé - Droits administrateur requis",
echo   "error": "FORBIDDEN",
echo   "code": 403
echo }
echo.
echo ❌ CRÉDENTIALS INVALIDES (401) :
echo {
echo   "success": false,
echo   "message": "Email ou mot de passe incorrect",
echo   "error": "INVALID_CREDENTIALS",
echo   "code": 401
echo }
echo.
echo ========================================
echo 🔧 CONFIGURATION POSTMAN :
echo ========================================
echo.
echo 📁 Variables d'environnement :
echo BASE_URL: http://localhost:8081
echo ADMIN_TOKEN: admin_token_12345
echo CLIENT_TOKEN: client_token_67890
echo.
echo 📋 Headers par défaut :
echo Content-Type: application/json
echo Authorization: Bearer {{ADMIN_TOKEN}}
echo.
echo 🧪 Tests automatiques :
echo pm.test("Status code is 200", function () {
echo   pm.response.to.have.status(200);
echo });
echo.
echo pm.test("Response has success field", function () {
echo   var jsonData = pm.response.json();
echo   pm.expect(jsonData.success).to.eql(true);
echo });
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause














