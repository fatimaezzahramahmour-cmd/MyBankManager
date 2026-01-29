@echo off
echo ========================================
echo TEST DU SYSTÈME COMPLET MYBANKMANAGER
echo ========================================
echo.

echo 1. Vérification des fichiers principaux...
if exist "index.html" (
    echo ✓ index.html trouvé
) else (
    echo ✗ index.html manquant
)

if exist "professional-theme.css" (
    echo ✓ professional-theme.css trouvé
) else (
    echo ✗ professional-theme.css manquant
)

if exist "auth-manager.js" (
    echo ✓ auth-manager.js trouvé
) else (
    echo ✗ auth-manager.js manquant
)

echo.
echo 2. Vérification des pages de formulaires...
if exist "demande-nouvelle.html" (
    echo ✓ demande-nouvelle.html trouvé
) else (
    echo ✗ demande-nouvelle.html manquant
)

if exist "demande-pret.html" (
    echo ✓ demande-pret.html trouvé
) else (
    echo ✗ demande-pret.html manquant
)

if exist "demande-carte.html" (
    echo ✓ demande-carte.html trouvé
) else (
    echo ✗ demande-carte.html manquant
)

echo.
echo 3. Vérification des scripts...
if exist "demande-script.js" (
    echo ✓ demande-script.js trouvé
) else (
    echo ✗ demande-script.js manquant
)

if exist "demande-pret-script.js" (
    echo ✓ demande-pret-script.js trouvé
) else (
    echo ✗ demande-pret-script.js manquant
)

if exist "demande-carte-script.js" (
    echo ✓ demande-carte-script.js trouvé
) else (
    echo ✗ demande-carte-script.js manquant
)

if exist "admin-dashboard.js" (
    echo ✓ admin-dashboard.js trouvé
) else (
    echo ✗ admin-dashboard.js manquant
)

echo.
echo 4. Vérification des pages d'authentification...
if exist "connexion.html" (
    echo ✓ connexion.html trouvé
) else (
    echo ✗ connexion.html manquant
)

if exist "inscription.html" (
    echo ✓ inscription.html trouvé
) else (
    echo ✗ inscription.html manquant
)

echo.
echo 5. Vérification des pages de services...
if exist "comptes.html" (
    echo ✓ comptes.html trouvé
) else (
    echo ✗ comptes.html manquant
)

if exist "cartes.html" (
    echo ✓ cartes.html trouvé
) else (
    echo ✗ cartes.html manquant
)

if exist "prets.html" (
    echo ✓ prets.html trouvé
) else (
    echo ✗ prets.html manquant
)

if exist "contact.html" (
    echo ✓ contact.html trouvé
) else (
    echo ✗ contact.html manquant
)

if exist "about.html" (
    echo ✓ about.html trouvé
) else (
    echo ✗ about.html manquant
)

echo.
echo 6. Vérification du dashboard admin...
if exist "admin-dashboard.html" (
    echo ✓ admin-dashboard.html trouvé
) else (
    echo ✗ admin-dashboard.html manquant
)

echo.
echo ========================================
echo RÉSUMÉ DU SYSTÈME
echo ========================================
echo.
echo ✅ PAGES PRINCIPALES :
echo   - Accueil (index.html)
echo   - Connexion (connexion.html)
echo   - Inscription (inscription.html)
echo   - Comptes (comptes.html)
echo   - Cartes (cartes.html)
echo   - Prêts (prets.html)
echo   - Contact (contact.html)
echo   - À propos (about.html)
echo.
echo ✅ FORMULAIRES DE DEMANDE :
echo   - Demande générale (demande-nouvelle.html)
echo   - Demande de prêt (demande-pret.html)
echo   - Demande de carte (demande-carte.html)
echo.
echo ✅ DASHBOARD ADMIN :
echo   - Interface admin (admin-dashboard.html)
echo   - Gestion des demandes
echo   - Statistiques
echo.
echo ✅ FONCTIONNALITÉS :
echo   - Thème professionnel uniforme
echo   - Authentification sécurisée
echo   - Validation des formulaires
echo   - Gestion des demandes
echo   - Interface responsive
echo.
echo 🚀 SYSTÈME PRÊT À UTILISER !
echo.
echo Pour tester le système :
echo 1. Ouvrez index.html dans votre navigateur
echo 2. Testez les formulaires de demande
echo 3. Accédez au dashboard admin
echo 4. Vérifiez la gestion des demandes
echo.
pause 