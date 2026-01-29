@echo off
echo ========================================
echo    TEST LIEN VERS OFFRES ASSURANCE
echo ========================================
echo.

echo [1/3] Vérification du serveur...
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
echo [2/3] Ouverture de la page d'accueil...
start index.html

echo.
echo [3/3] Instructions de test...
echo.
echo 📋 INSTRUCTIONS DE TEST:
echo.
echo 🎯 TEST 1 - Vérification du lien:
echo 1. Dans la page d'accueil, trouvez la section "Nos Services Bancaires"
echo 2. Cherchez la carte "Assurances"
echo 3. Cliquez sur "Voir les assurances"
echo 4. ✅ Vous devez être redirigé vers assurances.html#offres
echo 5. ✅ La page doit s'ouvrir directement sur la section des offres
echo.
echo 🎯 TEST 2 - Vérification des offres:
echo 1. Vérifiez que la section "Nos Offres d'Assurance" s'affiche
echo 2. Vérifiez que 6 types d'assurance sont présentés:
echo    - Assurance Automobile (25 DH/mois)
echo    - Assurance Habitation (15 DH/mois)
echo    - Assurance Santé (45 DH/mois)
echo    - Assurance Vie (100 DH/mois)
echo    - Assurance Voyage (8 DH/jour)
echo    - Assurance Professionnelle (35 DH/mois)
echo.
echo 🎯 TEST 3 - Test des boutons:
echo 1. Cliquez sur "Demander un devis" pour une assurance
echo 2. ✅ Si non connecté: modal de connexion requise
echo 3. ✅ Si connecté: formulaire de demande
echo.
echo 🎯 TEST 4 - Test du simulateur:
echo 1. Descendez vers la section "Simulateur d'Assurance"
echo 2. Remplissez le formulaire de simulation
echo 3. Cliquez sur "Calculer ma cotisation"
echo 4. ✅ Vérifiez que le résultat s'affiche
echo.
echo ✅ RÉSULTAT ATTENDU:
echo - Le lien "Voir les assurances" mène directement aux offres
echo - La section #offres s'affiche automatiquement
echo - Toutes les offres d'assurance sont visibles
echo - Les boutons "Demander un devis" fonctionnent
echo - Le simulateur calcule correctement
echo.
echo 🔧 CORRECTIONS APPORTÉES:
echo.
echo 1. ✅ Lien corrigé dans index.html:
echo    - AVANT: href="assurances.html"
echo    - APRÈS: href="assurances.html#offres"
echo.
echo 2. ✅ Section #offres ajoutée dans assurances.html:
echo    - 6 cartes d'offres d'assurance
echo    - Prix et caractéristiques détaillés
echo    - Boutons d'action fonctionnels
echo.
echo 3. ✅ Section simulateur ajoutée:
echo    - Formulaire de calcul interactif
echo    - Affichage des résultats
echo    - Modal de demande d'assurance
echo.
echo 4. ✅ Styles CSS ajoutés:
echo    - Design moderne des cartes d'offres
echo    - Effets de survol et animations
echo    - Layout responsive
echo.
echo 📊 FONCTIONNALITÉS TESTÉES:
echo - Navigation directe vers les offres
echo - Affichage des 6 types d'assurance
echo - Prix et garanties pour chaque offre
echo - Boutons de demande de devis
echo - Simulateur de cotisation
echo - Modal d'authentification
echo.
pause
