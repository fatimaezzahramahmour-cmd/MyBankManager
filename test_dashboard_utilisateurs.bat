@echo off
echo ========================================
echo TEST AFFICHAGE UTILISATEURS DASHBOARD
echo ========================================
echo.

echo 1. Nettoyage des données de test...
echo    - Suppression des utilisateurs de test
echo    - Conservation de l'admin principal

echo 2. Ouverture des pages de test...
start admin-dashboard.html
timeout /t 2 /nobreak >nul
start inscription.html
timeout /t 2 /nobreak >nul
start connexion.html

echo.
echo ========================================
echo SCENARIO DE TEST COMPLET
echo ========================================
echo.
echo ETAPE 1 - VERIFICATION DASHBOARD VIDE :
echo   1. Dans admin-dashboard.html
echo   2. Allez dans la section "Utilisateurs"
echo   3. Vérifiez qu'il n'y a que l'admin principal
echo   4. Notez le nombre d'utilisateurs affiché
echo.
echo ETAPE 2 - CREATION NOUVEAU CLIENT :
echo   1. Dans inscription.html
echo   2. Créez un compte avec :
echo      - Nom: Test Client
echo      - Email: test@example.com
echo      - Mot de passe: test123
echo   3. Vérifiez le message de succès
echo   4. Attendez la redirection vers mon-compte.html
echo.
echo ETAPE 3 - VERIFICATION DASHBOARD ADMIN :
echo   1. Retournez sur admin-dashboard.html
echo   2. Rafraîchissez la page (F5)
echo   3. Allez dans la section "Utilisateurs"
echo   4. Vérifiez que "Test Client" apparaît
echo   5. Vérifiez ses informations :
echo      - Nom: Test Client
echo      - Email: test@example.com
echo      - Rôle: CLIENT
echo      - Statut: Actif
echo      - Date: Aujourd'hui
echo.
echo ETAPE 4 - CREATION DEUXIEME CLIENT :
echo   1. Créez un autre compte :
echo      - Nom: Second Client
echo      - Email: second@example.com
echo      - Mot de passe: second123
echo   2. Vérifiez qu'il apparaît aussi dans le dashboard
echo.
echo ETAPE 5 - VERIFICATION STATISTIQUES :
echo   1. Dans admin-dashboard.html
echo   2. Vérifiez que le nombre d'utilisateurs a augmenté
echo   3. Vérifiez les statistiques du dashboard principal
echo.
echo ========================================
echo VERIFICATIONS AUTOMATIQUES
echo ========================================
echo.

echo Vérification des fichiers JavaScript...
if exist "secure-auth-manager.js" (
    echo ✓ secure-auth-manager.js trouvé
) else (
    echo ✗ secure-auth-manager.js manquant
)

if exist "admin-dashboard.js" (
    echo ✓ admin-dashboard.js trouvé
) else (
    echo ✗ admin-dashboard.js manquant
)

echo.
echo Vérification des pages HTML...
if exist "admin-dashboard.html" (
    echo ✓ admin-dashboard.html trouvé
) else (
    echo ✗ admin-dashboard.html manquant
)

if exist "inscription.html" (
    echo ✓ inscription.html trouvé
) else (
    echo ✗ inscription.html manquant
)

echo.
echo ========================================
echo INSTRUCTIONS DE DEBUG
echo ========================================
echo.
echo Si les utilisateurs n'apparaissent pas :
echo.
echo 1. Ouvrez la console du navigateur (F12)
echo 2. Allez dans l'onglet "Console"
echo 3. Cherchez les messages commençant par :
echo    - 🔄 Ajout utilisateur à la liste admin
echo    - ✅ Utilisateur ajouté avec succès
echo    - 🆕 Nouvel utilisateur détecté
echo    - Récupération des utilisateurs...
echo.
echo 4. Vérifiez localStorage :
echo    - Ouvrez F12 > Application > Storage > Local Storage
echo    - Cherchez la clé "users"
echo    - Vérifiez le contenu JSON
echo.
echo ========================================
echo TEST TERMINE
echo ========================================
pause
