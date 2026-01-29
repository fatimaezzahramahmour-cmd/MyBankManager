@echo off
echo ========================================
echo Test: Disparition des Boutons
echo ========================================

echo.
echo 🚀 TEST DE DISPARITION DES BOUTONS
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
echo    - Vérifier que les boutons "Approuver" et "Refuser" sont visibles
echo.

echo 3. Test d'approbation (boutons disparaissent)
echo    - Cliquer sur "Approuver" pour la demande
echo    - Vérifier que le statut change à "✅ Accepté" (vert)
echo    - Vérifier que les boutons "Approuver" et "Refuser" DISPARAISSENT
echo    - Vérifier qu'il y a juste "✅ Traitée" à la place
echo    - Vérifier la notification "Demande marquée comme acceptée"
echo.

echo 4. Test de refus (boutons disparaissent)
echo    - Créer une nouvelle demande
echo    - Cliquer sur "Refuser" pour cette demande
echo    - Vérifier que le statut change à "❌ Refusé" (rouge)
echo    - Vérifier que les boutons "Approuver" et "Refuser" DISPARAISSENT
echo    - Vérifier qu'il y a juste "❌ Traitée" à la place
echo    - Vérifier la notification "Demande marquée comme refusée"
echo.

echo 5. Vérification finale
echo    - Les demandes en attente ont les boutons
echo    - Les demandes acceptées/refusées n'ont plus de boutons
echo    - Seul le statut "Traitée" est affiché
echo    - Les demandes restent visibles dans la liste
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les demandes en attente ont les boutons "Approuver" + "Refuser"
echo    - Après action, les boutons disparaissent
echo    - Le statut "Traitée" apparaît à la place des boutons
echo    - Les demandes restent visibles dans la liste
echo    - Les notifications sont correctes
echo.

echo ❌ Si problème:
echo    - Vérifier que les boutons disparaissent après action
echo    - Vérifier que "Traitée" apparaît à la place
echo    - Vérifier que les demandes ne disparaissent pas
echo    - Vérifier que les notifications apparaissent
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les boutons ne disparaissent pas:
echo 1. Vérifier la logique conditionnelle dans l'affichage
echo 2. Vérifier que le statut change correctement
echo 3. Vérifier que loadRequests() recharge l'affichage
echo.

echo Si "Traitée" n'apparaît pas:
echo 1. Vérifier que le span .status-final s'affiche
echo 2. Vérifier que les styles CSS sont chargés
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause















