@echo off
echo ========================================
echo Test: Dashboard Admin - Affichage Demandes
echo ========================================

echo.
echo 🚀 DÉMARRAGE DU TEST
echo.

echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Test de soumission de demande
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec un compte client
echo    - Remplir et soumettre le formulaire
echo    - Vérifier que le message de succès apparaît
echo.

echo 3. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Demandes" dans le menu
echo    - Vérifier que la demande apparaît
echo.

echo 4. Test des actions
echo    - Cliquer sur "Voir" pour voir les détails
echo    - Cliquer sur "Approuver" ou "Refuser"
echo    - Vérifier que le statut change
echo.

echo 5. Test de l'API
echo    - Ouvrir http://localhost:8081/api/admin-demandes
echo    - Vérifier que la demande est dans la réponse JSON
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les demandes apparaissent dans le dashboard
echo    - Les informations utilisateur sont visibles
echo    - Les actions (Approuver/Refuser) fonctionnent
echo    - L'API retourne les données
echo.

echo ❌ Si problème:
echo    - Vérifier les logs du serveur
echo    - Vérifier les erreurs dans la console
echo    - Vérifier que les demandes sont bien envoyées
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les demandes n'apparaissent pas:
echo 1. Vérifier que le serveur affiche: "📝 Demande sauvegardée côté serveur"
echo 2. Vérifier que l'API /api/admin-demandes retourne des données
echo 3. Vérifier que localStorage contient les données
echo 4. Vérifier les erreurs JavaScript dans la console
echo 5. Vérifier que l'élément #requests-grid existe
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause




















