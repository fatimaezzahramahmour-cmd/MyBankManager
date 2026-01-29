@echo off
echo ========================================
echo Test: Refus Suppression Demandes
echo ========================================

echo.
echo 🚀 TEST DE SUPPRESSION DES DEMANDES REFUSÉES
echo.

echo 1. Créer plusieurs demandes de test
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec un compte client
echo    - Remplir et soumettre 3 demandes différentes
echo.

echo 2. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Demandes"
echo    - Vérifier que les 3 demandes apparaissent
echo.

echo 3. Test d'approbation (reste visible)
echo    - Cliquer sur "Approuver" pour la première demande
echo    - Vérifier que la demande reste visible
echo    - Vérifier la notification "Demande approuvée"
echo.

echo 4. Test de refus (disparaît)
echo    - Cliquer sur "Refuser" pour la deuxième demande
echo    - Vérifier que la demande DISPARAÎT de la liste
echo    - Vérifier la notification "Demande refusée et supprimée"
echo    - Vérifier qu'il ne reste que 2 demandes
echo.

echo 5. Test de refus de la troisième
echo    - Cliquer sur "Refuser" pour la troisième demande
echo    - Vérifier qu'elle disparaît aussi
echo    - Vérifier qu'il ne reste que 1 demande (celle approuvée)
echo.

echo 6. Vérification finale
echo    - Vérifier que seule la demande approuvée reste visible
echo    - Vérifier que les demandes refusées ne réapparaissent pas
echo    - Vérifier que les statistiques sont mises à jour
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les demandes approuvées restent visibles
echo    - Les demandes refusées disparaissent complètement
echo    - Les notifications sont correctes
echo    - Les statistiques se mettent à jour
echo    - La liste se rafraîchit automatiquement
echo.

echo ❌ Si problème:
echo    - Vérifier que rejectRequest() supprime bien la demande
echo    - Vérifier que loadRequests() recharge la liste
echo    - Vérifier que localStorage est mis à jour
echo    - Vérifier que les notifications apparaissent
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les demandes refusées ne disparaissent pas:
echo 1. Vérifier que splice() supprime bien l'élément
echo 2. Vérifier que localStorage est mis à jour
echo 3. Vérifier que loadRequests() recharge la liste
echo.

echo Si les demandes approuvées disparaissent:
echo 1. Vérifier que approveRequest() ne supprime pas
echo 2. Vérifier que seules les demandes refusées sont supprimées
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
