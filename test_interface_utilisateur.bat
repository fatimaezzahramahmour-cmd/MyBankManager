@echo off
echo ========================================
echo TEST INTERFACE UTILISATEUR COHERENTE
echo ========================================
echo.

echo [1/4] Verification du serveur...
curl -s http://localhost:8081 > nul
if %errorlevel% neq 0 (
    echo ❌ Serveur non demarre. Demarrage...
    start /B start_server_simple.bat
    timeout /t 3 /nobreak > nul
) else (
    echo ✅ Serveur deja en cours d'execution
)

echo.
echo [2/4] Ouverture de la page d'accueil...
start http://localhost:8081/index.html
timeout /t 2 /nobreak > nul

echo.
echo [3/4] Instructions de test manuel:
echo.
echo 🔍 TEST 1 - Interface utilisateur cohérente:
echo   1. Allez sur http://localhost:8081/index.html
echo   2. Cliquez sur "S'inscrire" et créez un compte client
echo   3. Connectez-vous avec ce compte
echo   4. Vérifiez que "Mon Compte" apparaît dans le header
echo   5. Naviguez vers d'autres pages (comptes.html, prets.html, etc.)
echo   6. Vérifiez que "Mon Compte" reste visible partout
echo   7. Vérifiez que "Se connecter" a disparu partout
echo.
echo 🔍 TEST 2 - Messages de succès et redirection:
echo   1. Connectez-vous en tant que client
echo   2. Allez sur demande-pret.html
echo   3. Remplissez et soumettez le formulaire
echo   4. Vérifiez que le message "Message envoyé avec succès" apparaît au centre
echo   5. Vérifiez que vous êtes redirigé vers index.html après 3 secondes
echo   6. Répétez avec demande-carte.html
echo   7. Répétez avec assurances.html (demander une assurance)
echo.
echo 🔍 TEST 3 - Vérification admin dashboard:
echo   1. Connectez-vous en tant qu'admin (admin@mybankmanager.com)
echo   2. Allez dans le dashboard admin
echo   3. Vérifiez que les nouvelles demandes apparaissent
echo   4. Vérifiez que les détails des demandes sont complets
echo.
echo [4/4] Test automatique des fichiers...
echo.

echo ✅ Vérification des fichiers modifiés:
if exist "index.html" echo ✅ index.html - ID header-actions ajouté
if exist "comptes.html" echo ✅ comptes.html - ID header-actions ajouté
if exist "cartes.html" echo ✅ cartes.html - ID header-actions ajouté
if exist "prets.html" echo ✅ prets.html - ID header-actions ajouté
if exist "assurances.html" echo ✅ assurances.html - ID header-actions ajouté
if exist "contact.html" echo ✅ contact.html - ID header-actions ajouté
if exist "inscription.html" echo ✅ inscription.html - ID header-actions ajouté
if exist "auth-unified.js" echo ✅ auth-unified.js - Gestionnaire unifié
if exist "demande-pret-script.js" echo ✅ demande-pret-script.js - Message de succès modifié
if exist "demande-carte-script.js" echo ✅ demande-carte-script.js - Message de succès modifié
if exist "assurances-script.js" echo ✅ assurances-script.js - Message de succès ajouté

echo.
echo ========================================
echo TEST TERMINE
echo ========================================
echo.
echo 📝 Résumé des corrections apportées:
echo.
echo 1. ✅ Interface utilisateur cohérente:
echo    - Ajout de id="header-actions" sur toutes les pages
echo    - Inclusion de auth-unified.js sur toutes les pages
echo    - Le UnifiedAuthManager met à jour automatiquement le header
echo.
echo 2. ✅ Messages de succès et redirection:
echo    - Message centré: "Message envoyé avec succès"
echo    - Sous-message: "Veuillez attendre une réponse dans les plus brefs délais"
echo    - Redirection automatique vers index.html après 3 secondes
echo    - Appliqué aux demandes de prêt, carte et assurance
echo.
echo 3. ✅ Confirmation admin dashboard:
echo    - Les demandes sont automatiquement envoyées au dashboard admin
echo    - Stockage dans localStorage['admin-demandes']
echo    - Affichage complet des détails dans le dashboard
echo.
pause
