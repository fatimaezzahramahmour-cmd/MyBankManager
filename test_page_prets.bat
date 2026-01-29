@echo off
echo ========================================
echo Test: Page Prêts
echo ========================================

echo.
echo 🚀 TEST DE LA PAGE PRÊTS
echo.

echo 1. Vérification du serveur
echo    - Le serveur doit être en cours d'exécution sur le port 8081
echo    - Vérifier que simple_server.js fonctionne
echo.

echo 2. Test d'accès à la page
echo    - Aller sur http://localhost:8081/prets.html
echo    - Vérifier que la page se charge complètement
echo    - Vérifier que le contenu s'affiche
echo.

echo 3. Test du simulateur de prêt
echo    - Remplir le formulaire de simulation :
echo      * Type de prêt : Prêt personnel
echo      * Montant : 50000 DH
echo      * Durée : 60 mois
echo      * Revenus : 8000 DH
echo    - Cliquer sur "Calculer ma simulation"
echo    - Vérifier que les résultats s'affichent
echo.

echo 4. Test des liens
echo    - Cliquer sur "Demander un prêt" dans les cartes
echo    - Vérifier que ça redirige vers demande-pret.html
echo    - Cliquer sur "Faire une demande de prêt" dans les résultats
echo    - Vérifier que ça redirige vers demande-pret.html
echo.

echo 5. Test de navigation
echo    - Vérifier que le menu de navigation fonctionne
echo    - Vérifier que le header s'affiche correctement
echo    - Vérifier que le footer s'affiche correctement
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si la page fonctionne :
echo    - La page se charge complètement
echo    - Le titre "Solutions de Financement" s'affiche
echo    - Les cartes de services sont visibles
echo    - Le simulateur fonctionne
echo    - Les liens redirigent correctement
echo    - Pas d'erreurs dans la console
echo.

echo ❌ Si problème :
echo    - Page blanche ou incomplète
echo    - Erreurs JavaScript dans la console
echo    - Liens qui ne fonctionnent pas
echo    - Simulateur qui ne répond pas
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si la page est blanche :
echo 1. Vérifier que prets.html existe
echo 2. Vérifier que professional-theme.css est chargé
echo 3. Vérifier que prets-simulator.js est chargé
echo 4. Vérifier les erreurs dans la console du navigateur
echo 5. Vérifier que le serveur fonctionne
echo.

echo Si le simulateur ne fonctionne pas :
echo 1. Vérifier que prets-simulator.js est chargé
echo 2. Vérifier les erreurs JavaScript
echo 3. Vérifier que les IDs correspondent
echo 4. Vérifier que les event listeners sont attachés
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
