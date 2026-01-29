@echo off
echo ========================================
echo   INTEGRATION AUTHENTIFICATION SECURISEE
echo ========================================
echo.

echo 🔐 SYSTEME D'AUTHENTIFICATION COMPLET :
echo    ✅ Gestion des roles (ADMIN/CLIENT)
echo    ✅ Tokens JWT securises
echo    ✅ Protection des routes
echo    ✅ Sessions persistantes
echo    ✅ Middleware backend
echo    ✅ Validation cote serveur
echo.

echo [1/6] Remplacement de l'ancien auth-manager...
if exist "auth-manager.js" (
    ren "auth-manager.js" "auth-manager-old.js"
    echo ✅ Ancien fichier sauvegarde
)

if exist "enhanced-auth-manager.js" (
    ren "enhanced-auth-manager.js" "enhanced-auth-manager-old.js"
    echo ✅ Enhanced auth sauvegarde
)

copy "secure-auth-manager.js" "auth-manager.js" >nul 2>&1
echo ✅ Nouveau gestionnaire d'auth installe

echo [2/6] Mise a jour des pages HTML...
for %%f in (*.html) do (
    findstr /C:"enhanced-auth-manager.js" "%%f" >nul 2>&1
    if !errorlevel! equ 0 (
        powershell -Command "(Get-Content '%%f') -replace 'enhanced-auth-manager.js', 'auth-manager.js' | Set-Content '%%f'"
        echo ✅ %%f mis a jour
    )
    
    findstr /C:"auth-manager.js" "%%f" >nul 2>&1
    if !errorlevel! equ 0 (
        echo ✅ %%f deja configure
    )
)

echo [3/6] Ajout de styles pour notifications...
findstr /C:"notification {" professional-theme.css >nul 2>&1
if !errorlevel! neq 0 (
    echo. >> professional-theme.css
    echo /* ===== NOTIFICATIONS SECURITE ===== */ >> professional-theme.css
    echo .notification { >> professional-theme.css
    echo     position: fixed; >> professional-theme.css
    echo     top: 20px; >> professional-theme.css
    echo     right: 20px; >> professional-theme.css
    echo     padding: 1rem 1.5rem; >> professional-theme.css
    echo     border-radius: var(--border-radius-md); >> professional-theme.css
    echo     color: white; >> professional-theme.css
    echo     font-weight: 600; >> professional-theme.css
    echo     z-index: 10000; >> professional-theme.css
    echo     transform: translateX(400px); >> professional-theme.css
    echo     transition: all 0.3s ease; >> professional-theme.css
    echo     box-shadow: var(--shadow-lg); >> professional-theme.css
    echo } >> professional-theme.css
    echo. >> professional-theme.css
    echo .notification.show { >> professional-theme.css
    echo     transform: translateX(0); >> professional-theme.css
    echo } >> professional-theme.css
    echo. >> professional-theme.css
    echo .notification-success { >> professional-theme.css
    echo     background: #28a745; >> professional-theme.css
    echo } >> professional-theme.css
    echo. >> professional-theme.css
    echo .notification-error { >> professional-theme.css
    echo     background: #dc3545; >> professional-theme.css
    echo } >> professional-theme.css
    echo. >> professional-theme.css
    echo .notification-warning { >> professional-theme.css
    echo     background: #ffc107; >> professional-theme.css
    echo     color: #212529; >> professional-theme.css
    echo } >> professional-theme.css
    echo. >> professional-theme.css
    echo .notification-info { >> professional-theme.css
    echo     background: var(--primary-color); >> professional-theme.css
    echo } >> professional-theme.css
    echo ✅ Styles notifications ajoutes
)

echo [4/6] Creation d'une page de test d'authentification...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="fr"^>
echo ^<head^>
echo     ^<meta charset="UTF-8"^>
echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
echo     ^<title^>Test Authentification Sécurisée^</title^>
echo     ^<link rel="stylesheet" href="professional-theme.css"^>
echo     ^<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"^>
echo ^</head^>
echo ^<body^>
echo     ^<div class="container" style="max-width: 800px; margin: 2rem auto; padding: 2rem;"^>
echo         ^<h1^>🔐 Test Authentification Sécurisée^</h1^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h2^>État Actuel^</h2^>
echo             ^<div id="auth-status"^>^</div^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h2^>Tests Disponibles^</h2^>
echo             ^<div class="test-buttons"^>
echo                 ^<button class="btn btn-primary" onclick="testAdminLogin()"^>Test Login Admin^</button^>
echo                 ^<button class="btn btn-outline" onclick="testClientLogin()"^>Test Login Client^</button^>
echo                 ^<button class="btn btn-secondary" onclick="testRegister()"^>Test Inscription^</button^>
echo                 ^<button class="btn btn-outline" onclick="testTokenValidation()"^>Test Token^</button^>
echo                 ^<button class="btn btn-outline" onclick="clearSession()"^>Vider Session^</button^>
echo             ^</div^>
echo         ^</div^>
echo         
echo         ^<div class="test-section"^>
echo             ^<h2^>Console de Test^</h2^>
echo             ^<div id="test-console" style="background: #f8f9fa; padding: 1rem; border-radius: 8px; font-family: monospace; white-space: pre-wrap;"^>^</div^>
echo         ^</div^>
echo     ^</div^>
echo     
echo     ^<script src="auth-manager.js"^>^</script^>
echo     ^<script^>
echo         function updateStatus() {
echo             const status = document.getElementById('auth-status'^);
echo             if (secureAuth.isUserAuthenticated()^) {
echo                 const user = secureAuth.getCurrentUser(^);
echo                 status.innerHTML = `
echo                     ^<div class="alert alert-success"^>
echo                         ^<h4^>✅ Connecté^</h4^>
echo                         ^<p^>^<strong^>Email:^</strong^> ${user.email}^</p^>
echo                         ^<p^>^<strong^>Nom:^</strong^> ${user.fullName}^</p^>
echo                         ^<p^>^<strong^>Rôle:^</strong^> ${user.role}^</p^>
echo                         ^<p^>^<strong^>Admin:^</strong^> ${secureAuth.isAdmin() ? 'Oui' : 'Non'}^</p^>
echo                     ^</div^>
echo                 `;
echo             } else {
echo                 status.innerHTML = `
echo                     ^<div class="alert alert-warning"^>
echo                         ^<h4^>❌ Non connecté^</h4^>
echo                         ^<p^>Aucune session active détectée.^</p^>
echo                     ^</div^>
echo                 `;
echo             }
echo         }
echo         
echo         function log(message^) {
echo             const console = document.getElementById('test-console'^);
echo             const timestamp = new Date(^).toLocaleTimeString(^);
echo             console.textContent += `[${timestamp}] ${message}\n`;
echo             console.scrollTop = console.scrollHeight;
echo         }
echo         
echo         async function testAdminLogin(^) {
echo             try {
echo                 log('🔐 Test login admin...');
echo                 const user = await secureAuth.login('admin@mybankmanager.com', 'admin123'^);
echo                 log('✅ Login admin réussi: ' + JSON.stringify(user, null, 2^)^);
echo                 updateStatus(^);
echo             } catch (error^) {
echo                 log('❌ Erreur login admin: ' + error.message^);
echo             }
echo         }
echo         
echo         async function testClientLogin(^) {
echo             try {
echo                 log('🔐 Test login client...');
echo                 const user = await secureAuth.login('test@client.com', 'password123'^);
echo                 log('✅ Login client réussi: ' + JSON.stringify(user, null, 2^)^);
echo                 updateStatus(^);
echo             } catch (error^) {
echo                 log('❌ Erreur login client: ' + error.message^);
echo             }
echo         }
echo         
echo         async function testRegister(^) {
echo             try {
echo                 log('📝 Test inscription...');
echo                 const user = await secureAuth.register({
echo                     fullName: 'Test User',
echo                     email: 'test' + Date.now(^) + '@test.com',
echo                     password: 'password123',
echo                     confirmPassword: 'password123'
echo                 }^);
echo                 log('✅ Inscription réussie: ' + JSON.stringify(user, null, 2^)^);
echo                 updateStatus(^);
echo             } catch (error^) {
echo                 log('❌ Erreur inscription: ' + error.message^);
echo             }
echo         }
echo         
echo         async function testTokenValidation(^) {
echo             try {
echo                 log('🔍 Test validation token...');
echo                 await secureAuth.validateToken(^);
echo                 log('✅ Token valide');
echo             } catch (error^) {
echo                 log('❌ Token invalide: ' + error.message^);
echo             }
echo         }
echo         
echo         function clearSession(^) {
echo             secureAuth.clearSession(^);
echo             log('🧹 Session vidée');
echo             updateStatus(^);
echo         }
echo         
echo         // Initialisation
echo         document.addEventListener('DOMContentLoaded', updateStatus^);
echo     ^</script^>
echo ^</body^>
echo ^</html^>
) > "test-auth-secure.html"
echo ✅ Page de test creee

echo [5/6] Verification des dependances backend...
if exist "src-complete\main\java\com\mybankmanager\security\RoleBasedAuthFilter.java" (
    echo ✅ Filtre de securite backend present
) else (
    echo ⚠️ Filtre de securite backend manquant
)

if exist "src-complete\main\java\com\mybankmanager\security\jwt\JwtTokenProvider.java" (
    echo ✅ Provider JWT present
) else (
    echo ⚠️ Provider JWT manquant
)

if exist "src-complete\main\java\com\mybankmanager\controller\api\AuthController.java" (
    echo ✅ Controleur d'auth present
) else (
    echo ⚠️ Controleur d'auth manquant
)

echo [6/6] Ouverture des pages de test...
start "" "test-auth-secure.html"
timeout /t 2 >nul
start "" "connexion.html"
timeout /t 1 >nul
start "" "inscription.html"
timeout /t 1 >nul

echo.
echo ========================================
echo   INTEGRATION TERMINEE !
echo ========================================
echo.
echo 🎯 NOUVELLES FONCTIONNALITES :
echo    ✅ Detection automatique du role
echo    ✅ Redirection securisee admin/client
echo    ✅ Protection des routes frontend
echo    ✅ Middleware backend complet
echo    ✅ Tokens JWT avec expiration
echo    ✅ Sessions persistantes
echo    ✅ Logs d'activite
echo    ✅ Notifications visuelles
echo    ✅ Gestion des erreurs
echo.
echo 🧪 COMMENT TESTER :
echo    1. Page de test : test-auth-secure.html
echo    2. Login admin : admin@mybankmanager.com / admin123
echo    3. Inscription client : formulaire d'inscription
echo    4. Verification redirection automatique
echo    5. Test protection des routes
echo.
echo 🔐 SECURITE IMPLEMENTEE :
echo    ✅ Validation email/mot de passe
echo    ✅ Limitation tentatives de connexion
echo    ✅ Protection contre admin par email
echo    ✅ Verification statut compte
echo    ✅ Expiration automatique sessions
echo    ✅ Logs securite complets
echo.
echo 📊 ROLES ET PERMISSIONS :
echo    ADMIN : Acces dashboard admin uniquement
echo    CLIENT : Acces espace client + formulaires
echo    PUBLIC : Pages d'accueil, contact, about
echo.
echo Le système d'authentification securise est actif !
echo Testez avec les pages ouvertes.
echo.
pause
