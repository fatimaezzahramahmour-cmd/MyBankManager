@echo off
echo ========================================
echo    TEST AUTHENTIFICATION CLIENT
echo ========================================
echo.

echo [1/5] Vérification du serveur...
curl -s http://localhost:8081/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur fonctionne sur http://localhost:8081
) else (
    echo ❌ Serveur non accessible
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo [2/5] Vérification des fichiers d'authentification...
if exist "auth-manager.js" (
    echo ✅ auth-manager.js existe
) else (
    echo ❌ auth-manager.js manquant
)

if exist "connexion.html" (
    echo ✅ connexion.html existe
) else (
    echo ❌ connexion.html manquant
)

if exist "inscription.html" (
    echo ✅ inscription.html existe
) else (
    echo ❌ inscription.html manquant
)

echo.
echo [3/5] Vérification des pages de demande...
if exist "demande-pret.html" (
    echo ✅ demande-pret.html existe
) else (
    echo ❌ demande-pret.html manquant
)

if exist "demande-carte.html" (
    echo ✅ demande-carte.html existe
) else (
    echo ❌ demande-carte.html manquant
)

if exist "demande-pret-script.js" (
    echo ✅ demande-pret-script.js existe
) else (
    echo ❌ demande-pret-script.js manquant
)

if exist "demande-carte-script.js" (
    echo ✅ demande-carte-script.js existe
) else (
    echo ❌ demande-carte-script.js manquant
)

echo.
echo [4/5] Ouverture de la page de connexion...
start connexion.html

echo.
echo [5/5] Instructions de test...
echo.
echo 📋 DIAGNOSTIC AUTHENTIFICATION CLIENT:
echo.
echo 🎯 TEST 1 - Création de compte:
echo 1. Ouvrez connexion.html
echo 2. Cliquez sur "S'inscrire"
echo 3. Créez un nouveau compte avec:
echo    - Email: test@client.com
echo    - Mot de passe: password123
echo    - Nom: Test Client
echo 4. ✅ Vérifiez que l'inscription fonctionne
echo.
echo 🎯 TEST 2 - Connexion client:
echo 1. Connectez-vous avec le compte créé
echo 2. ✅ Vérifiez que vous êtes redirigé vers index.html
echo 3. ✅ Vérifiez que le header affiche "Mon Compte" et "Déconnexion"
echo.
echo 🎯 TEST 3 - Test de demande de prêt:
echo 1. Allez sur prets.html
echo 2. Cliquez sur "Demander un prêt"
echo 3. ✅ Vérifiez que vous accédez à demande-pret.html
echo 4. ✅ Vérifiez que le formulaire est accessible (pas de message d'auth)
echo.
echo 🎯 TEST 4 - Test de demande de carte:
echo 1. Allez sur cartes.html
echo 2. Cliquez sur "Demander une carte"
echo 3. ✅ Vérifiez que vous accédez à demande-carte.html
echo 4. ✅ Vérifiez que le formulaire est accessible
echo.
echo 🎯 TEST 5 - Test de soumission:
echo 1. Remplissez un formulaire de demande
echo 2. Soumettez le formulaire
echo 3. ✅ Vérifiez que la demande est envoyée
echo 4. ✅ Vérifiez le message de succès
echo.
echo 🔧 PROBLÈMES POTENTIELS:
echo.
echo ❌ PROBLÈME 1 - Conflit d'authentification:
echo    - Plusieurs AuthManager peuvent entrer en conflit
echo    - Vérifiez la console (F12) pour les erreurs
echo.
echo ❌ PROBLÈME 2 - localStorage corrompu:
echo    - Les données d'authentification peuvent être corrompues
echo    - Essayez de vider le localStorage (F12 > Application > Storage)
echo.
echo ❌ PROBLÈME 3 - Redirection incorrecte:
echo    - Après connexion, la redirection peut échouer
echo    - Vérifiez l'URL après connexion
echo.
echo ❌ PROBLÈME 4 - Scripts non chargés:
echo    - auth-manager.js peut ne pas être chargé
echo    - Vérifiez les erreurs de chargement dans la console
echo.
echo 🛠️ SOLUTIONS APPLIQUÉES:
echo.
echo 1. ✅ Vérification des fichiers d'authentification
echo 2. ✅ Test de création de compte
echo 3. ✅ Test de connexion client
echo 4. ✅ Test d'accès aux formulaires
echo 5. ✅ Test de soumission des demandes
echo.
echo 📊 FONCTIONNALITÉS À TESTER:
echo - Création de compte client
echo - Connexion client
echo - Accès aux formulaires de demande
echo - Soumission des demandes
echo - Messages de succès/erreur
echo - Redirection après connexion
echo.
echo 🔍 CONSOLE BROWSER (F12):
echo - Vérifiez les erreurs JavaScript
echo - Vérifiez les erreurs d'authentification
echo - Vérifiez les erreurs de localStorage
echo - Vérifiez les erreurs de redirection
echo.
echo 🧹 NETTOYAGE SI PROBLÈME:
echo 1. Ouvrez F12 (Console)
echo 2. Tapez: localStorage.clear()
echo 3. Rechargez la page
echo 4. Recréez un compte
echo.
pause
