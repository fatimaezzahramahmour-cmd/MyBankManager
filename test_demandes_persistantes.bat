@echo off
echo ========================================
echo Test: Demandes Persistantes Dashboard
echo ========================================

echo.
echo 🚀 TEST DES DEMANDES PERSISTANTES
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
echo    - Vérifier que la demande apparaît
echo.

echo 3. Test d'approbation
echo    - Cliquer sur "Approuver" pour la demande
echo    - Vérifier que la notification apparaît
echo    - Vérifier que la demande reste visible
echo    - Vérifier que le statut change à "✅ Approuvée"
echo    - Vérifier qu'il n'y a plus qu'un bouton "Refuser"
echo.

echo 4. Test de changement de statut
echo    - Cliquer sur "Refuser" pour changer le statut
echo    - Vérifier que la notification apparaît
echo    - Vérifier que le statut change à "❌ Refusée"
echo    - Vérifier qu'il n'y a plus qu'un bouton "Approuver"
echo.

echo 5. Test de retour à l'approbation
echo    - Cliquer sur "Approuver" à nouveau
echo    - Vérifier que le statut redevient "✅ Approuvée"
echo    - Vérifier que la demande reste toujours visible
echo.

echo 6. Test du bouton "Voir"
echo    - Cliquer sur "Voir" pour voir les détails
echo    - Vérifier que toutes les informations s'affichent
echo    - Vérifier que les boutons dans la modal fonctionnent
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les demandes restent visibles après approbation/refus
echo    - Le statut change correctement avec des badges colorés
echo    - Les boutons s'adaptent selon le statut
echo    - On peut changer le statut plusieurs fois
echo    - Le bouton "Voir" affiche toujours les détails
echo.

echo ❌ Si problème:
echo    - Vérifier que les demandes ne disparaissent pas
echo    - Vérifier que les boutons changent selon le statut
echo    - Vérifier que les badges de statut s'affichent
echo    - Vérifier que les notifications apparaissent
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les demandes disparaissent:
echo 1. Vérifier que loadRequests() affiche toutes les demandes
echo 2. Vérifier que les demandes ne sont pas filtrées
echo 3. Vérifier que localStorage contient les données
echo.

echo Si les boutons ne changent pas:
echo 1. Vérifier que la logique conditionnelle fonctionne
echo 2. Vérifier que les badges de statut s'affichent
echo 3. Vérifier que les styles CSS sont chargés
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause




















