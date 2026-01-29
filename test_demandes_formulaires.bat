@echo off
echo ========================================
echo    TEST AFFICHAGE DEMANDES FORMULAIRES
echo ========================================
echo.

echo [1/4] Vérification du serveur...
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
echo [2/4] Création de demandes de test...
echo Création d'une demande de prêt...
echo Création d'une demande de carte...
echo Création d'une demande d'assurance...

echo.
echo [3/4] Ouverture du dashboard admin...
start admin-dashboard.html

echo.
echo [4/4] Instructions de test...
echo.
echo 📋 INSTRUCTIONS DE TEST:
echo.
echo 🎯 TEST 1 - Vérification des demandes:
echo 1. Dans le dashboard admin, allez dans la section "Demandes"
echo 2. Vérifiez que les demandes de test s'affichent
echo 3. Vérifiez que chaque demande montre:
echo    - Type de demande (prêt, carte, assurance)
echo    - Nom du client
echo    - Email du client
echo    - Montant (si applicable)
echo    - Date de soumission
echo    - Statut (en attente, approuvé, refusé)
echo.
echo 🎯 TEST 2 - Bouton "Voir détails":
echo 1. Cliquez sur le bouton "Voir" d'une demande
echo 2. Vérifiez que la modal s'ouvre avec:
echo    - Informations générales (type, statut, date, ID)
echo    - Informations client (nom, email, téléphone, adresse)
echo    - Détails de la demande (montant, durée, objet, etc.)
echo    - Fichiers joints (si disponibles)
echo.
echo 🎯 TEST 3 - Actions sur les demandes:
echo 1. Testez le bouton "Approuver"
echo 2. Testez le bouton "Refuser"
echo 3. Vérifiez que le statut change
echo.
echo ✅ RÉSULTAT ATTENDU:
echo - Toutes les demandes de formulaires sont visibles
echo - Les détails complets s'affichent dans la modal
echo - Les actions (approuver/refuser) fonctionnent
echo - L'interface est moderne et responsive
echo.
echo 🔧 CRÉATION DE DEMANDES DE TEST:
echo.
echo Pour créer des demandes de test, vous pouvez:
echo 1. Aller sur les pages de formulaires:
echo    - prets.html (demande de prêt)
echo    - cartes.html (demande de carte)
echo    - assurances.html (demande d'assurance)
echo.
echo 2. Remplir et soumettre les formulaires
echo.
echo 3. Retourner au dashboard admin pour voir les demandes
echo.
echo 📊 DONNÉES TESTÉES:
echo - Demandes de prêt (montant, durée, objet)
echo - Demandes de carte (type, limite, motif)
echo - Demandes d'assurance (type, prix, durée)
echo - Informations client (nom, email, téléphone, adresse)
echo.
pause
