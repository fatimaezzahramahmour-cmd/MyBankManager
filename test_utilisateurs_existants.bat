@echo off
echo ========================================
echo TEST DES UTILISATEURS EXISTANTS
echo ========================================
echo.

echo 🔍 Problème identifié:
echo Les utilisateurs qui ont déjà fait l'inscription ont un compte
echo mais la connexion ne fonctionne pas.
echo.

echo 1. Verification du serveur backend...
curl -s http://localhost:8081/api/auth/test >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur backend accessible
) else (
    echo ❌ Serveur backend non accessible
    echo Veuillez démarrer le serveur avec: start_mybankmanager_complete.bat
    pause
    exit /b 1
)

echo.
echo 2. Ouverture de la page de test des utilisateurs existants...
start "" "test_utilisateurs_existants.html"

echo.
echo 3. Ouverture de la page de connexion pour test manuel...
start "" "connexion.html"

echo.
echo ========================================
echo INSTRUCTIONS DE TEST
echo ========================================
echo.
echo 📋 Étapes à suivre:
echo.
echo 1. Dans la page "Test Utilisateurs Existants":
echo    - Cliquer sur "Vérifier l'État du Système"
echo    - Cliquer sur "Vérifier localStorage"
echo    - Tester la connexion avec un email existant
echo.
echo 2. Dans la page de connexion:
echo    - Essayer de se connecter avec un email qui a déjà fait l'inscription
echo    - Vérifier si la connexion fonctionne maintenant
echo.
echo 3. Si le problème persiste:
echo    - Vérifier les logs dans la console du navigateur (F12)
echo    - Vérifier les logs du serveur backend
echo.
echo 🔧 Corrections appliquées:
echo - Suppression de la vérification localStorage avant l'API
echo - Amélioration du gestionnaire unifié avec fallback
echo - Meilleure gestion des utilisateurs existants
echo.
pause
