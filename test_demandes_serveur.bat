@echo off
echo ========================================
echo Test: Demandes avec Serveur et Base de Données
echo ========================================

echo.
echo 🚀 DÉMARRAGE DU TEST
echo.

echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Test de l'API serveur
echo    - Ouvrir http://localhost:8081/api/test
echo    - Vérifier que la réponse est: {"status":"success","message":"Server is running"}
echo.

echo 3. Test de soumission de demande
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec un compte client
echo    - Remplir le formulaire de demande de prêt
echo    - Soumettre le formulaire
echo    - Vérifier que le message de succès apparaît
echo    - Vérifier la redirection vers l'accueil
echo.

echo 4. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec un compte admin
echo    - Vérifier que la demande apparaît dans la section "Demandes"
echo    - Cliquer sur "Voir détails" pour voir les informations complètes
echo.

echo 5. Test de l'API des demandes
echo    - Ouvrir http://localhost:8081/api/admin-demandes
echo    - Vérifier que la demande est dans la réponse JSON
echo.

echo 6. Test de localStorage (fallback)
echo    - Ouvrir la console (F12)
echo    - Taper: localStorage.getItem('admin-demandes')
echo    - Vérifier que les données sont aussi sauvegardées localement
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Le message de succès apparaît après soumission
echo    - La redirection vers l'accueil fonctionne
echo    - La demande apparaît dans le dashboard admin
echo    - L'API retourne les données
echo    - localStorage contient aussi les données
echo.

echo ❌ Si problème:
echo    - Vérifier les logs du serveur
echo    - Vérifier les erreurs dans la console
echo    - Vérifier que le serveur est bien démarré
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les demandes n'apparaissent pas:
echo 1. Vérifier que le serveur affiche: "📝 Demande sauvegardée côté serveur"
echo 2. Vérifier que l'API /api/admin-demandes retourne des données
echo 3. Vérifier que localStorage contient les données
echo 4. Vérifier les erreurs JavaScript dans la console
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
