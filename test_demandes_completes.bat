@echo off
echo ========================================
echo Test: Demandes Complètes - Dashboard Admin
echo ========================================

echo.
echo 🚀 DÉMARRAGE DU TEST COMPLET
echo.

echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Test des demandes de prêt
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec un compte client
echo    - Remplir TOUS les champs du formulaire
echo    - Soumettre et vérifier le message de succès
echo.

echo 3. Test des demandes de carte
echo    - Aller sur http://localhost:8081/demande-carte.html
echo    - Se connecter avec un autre compte client
echo    - Remplir TOUS les champs du formulaire
echo    - Soumettre et vérifier le message de succès
echo.

echo 4. Test des demandes d'assurance
echo    - Aller sur http://localhost:8081/assurances.html
echo    - Se connecter avec un troisième compte client
echo    - Remplir le formulaire d'assurance
echo    - Soumettre et vérifier le message de succès
echo.

echo 5. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Demandes" dans le menu
echo    - Vérifier que TOUTES les demandes apparaissent
echo.

echo 6. Test des informations complètes
echo    - Cliquer sur "Voir" pour chaque demande
echo    - Vérifier que TOUS les champs du formulaire sont affichés
echo    - Vérifier que les icônes et labels sont corrects
echo.

echo 7. Test des actions
echo    - Cliquer sur "Approuver" pour une demande
echo    - Cliquer sur "Refuser" pour une autre
echo    - Vérifier que les statuts changent
echo    - Vérifier que les notifications apparaissent
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les 3 types de demandes apparaissent (Prêt, Carte, Assurance)
echo    - TOUTES les informations du formulaire sont visibles
echo    - Les boutons Approuver/Refuser/Voir fonctionnent
echo    - Les notifications apparaissent
echo    - Les statuts changent correctement
echo.

echo ❌ Si problème:
echo    - Vérifier les logs du serveur
echo    - Vérifier les erreurs JavaScript dans la console
echo    - Vérifier que les demandes sont bien envoyées
echo    - Vérifier que l'API retourne les données
echo.

echo ========================================
echo 🔧 DIAGNOSTIC SPÉCIFIQUE:
echo ========================================

echo Si les informations ne s'affichent pas complètement:
echo 1. Vérifier que getRequestDetails() affiche tous les champs
echo 2. Vérifier que getFieldIcon() a les bonnes icônes
echo 3. Vérifier que formatFieldName() traduit correctement
echo.

echo Si les boutons ne fonctionnent pas:
echo 1. Vérifier que les fonctions globales existent
echo 2. Vérifier que adminDashboard est initialisé
echo 3. Vérifier les erreurs dans la console
echo.

echo Si les assurances n'apparaissent pas:
echo 1. Vérifier que getTypeLabel() inclut 'assurance'
echo 2. Vérifier que getTypeIcon() inclut 'assurance'
echo 3. Vérifier que les demandes d'assurance sont envoyées
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
