@echo off
echo ========================================
echo 🧪 TEST FORMULAIRES STANDARDISÉS
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
echo 2. Ouverture des pages de formulaires...
start http://localhost:8081/demande-pret.html
timeout 2 >nul
start http://localhost:8081/demande-carte.html
timeout 2 >nul
start http://localhost:8081/assurances.html

echo.
echo ========================================
echo 📋 TESTS À EFFECTUER :
echo ========================================
echo.
echo 🔧 TEST 1 - FORMULAIRE PRÊTS :
echo 1. Vérifiez que le formulaire a :
echo    - Section "Informations Personnelles"
echo    - Section "Type de Prêt"
echo    - Section "Informations Supplémentaires"
echo    - Champs obligatoires marqués avec *
echo    - Messages d'erreur sous chaque champ
echo.
echo 🔧 TEST 2 - FORMULAIRE CARTES :
echo 1. Vérifiez que le formulaire a :
echo    - Section "Informations Personnelles"
echo    - Section "Type de Carte"
echo    - Section "Informations Supplémentaires"
echo    - Champs obligatoires marqués avec *
echo    - Messages d'erreur sous chaque champ
echo.
echo 🔧 TEST 3 - FORMULAIRE ASSURANCES :
echo 1. Connectez-vous avec un compte utilisateur
echo 2. Cliquez sur "Demander un devis" pour une assurance
echo 3. Vérifiez que le formulaire a :
echo    - Section "Informations Personnelles"
echo    - Section "Type d'Assurance"
echo    - Section "Informations Supplémentaires"
echo    - Champs obligatoires marqués avec *
echo    - Messages d'erreur sous chaque champ
echo    - Champs pré-remplis automatiquement
echo.
echo ========================================
echo ✅ CHAMPS OBLIGATOIRES STANDARDISÉS :
echo ========================================
echo.
echo Tous les formulaires doivent avoir :
echo ✅ Nom complet *
echo ✅ Email *
echo ✅ Téléphone *
echo ✅ Date de naissance *
echo ✅ Type de service *
echo ✅ Montant/Montant de garantie *
echo ✅ Informations supplémentaires (optionnel)
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si les formulaires ne sont pas identiques :
echo 1. Vérifiez que les CSS sont chargés
echo 2. Vérifiez que les classes sont appliquées
echo 3. Vérifiez que la validation fonctionne
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause














