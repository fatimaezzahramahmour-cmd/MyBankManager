@echo off
echo ========================================
echo Test: Statuts Français Dashboard
echo ========================================

echo.
echo 🚀 TEST DES STATUTS EN FRANÇAIS
echo.

echo 1. Créer une demande de test
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec un compte client
echo    - Remplir le formulaire et soumettre
echo.

echo 2. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Demandes"
echo    - Vérifier que la demande apparaît avec "⏳ En attente"
echo.

echo 3. Test d'approbation (change à "Accepté")
echo    - Cliquer sur "Approuver" pour la demande
echo    - Vérifier que le statut change à "✅ Accepté" (vert)
echo    - Vérifier la notification "Demande marquée comme acceptée"
echo    - Vérifier que la demande reste visible
echo.

echo 4. Test de refus (change à "Refusé")
echo    - Créer une nouvelle demande
echo    - Cliquer sur "Refuser" pour cette demande
echo    - Vérifier que le statut change à "❌ Refusé" (rouge)
echo    - Vérifier la notification "Demande marquée comme refusée"
echo    - Vérifier que la demande reste visible
echo.

echo 5. Vérification des couleurs
echo    - ✅ Accepté : Badge vert
echo    - ❌ Refusé : Badge rouge
echo    - ⏳ En attente : Badge jaune
echo.

echo 6. Test de changement de statut
echo    - Cliquer sur "Approuver" pour une demande refusée
echo    - Vérifier qu'elle change à "✅ Accepté"
echo    - Cliquer sur "Refuser" pour une demande acceptée
echo    - Vérifier qu'elle change à "❌ Refusé"
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les demandes restent visibles après action
echo    - Le statut change avec des emojis français
echo    - Les couleurs correspondent aux statuts
echo    - Les notifications sont en français
echo    - On peut changer le statut plusieurs fois
echo.

echo ❌ Si problème:
echo    - Vérifier que les statuts s'affichent correctement
echo    - Vérifier que les couleurs sont bonnes
echo    - Vérifier que les notifications apparaissent
echo    - Vérifier que les demandes ne disparaissent pas
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les statuts ne changent pas:
echo 1. Vérifier que approveRequest() change à "accepté"
echo 2. Vérifier que rejectRequest() change à "refusé"
echo 3. Vérifier que getStatusLabel() affiche les bons emojis
echo.

echo Si les couleurs sont incorrectes:
echo 1. Vérifier que getStatusClass() retourne les bonnes classes
echo 2. Vérifier que les styles CSS sont chargés
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause




















