@echo off
echo ========================================
echo Test: Boutons Dashboard Admin
echo ========================================

echo.
echo 🚀 DÉMARRAGE DU TEST DES BOUTONS
echo.

echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Créer une demande de test
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec un compte client
echo    - Remplir TOUS les champs du formulaire
echo    - Soumettre et vérifier le message de succès
echo.

echo 3. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Demandes" dans le menu
echo    - Vérifier que la demande apparaît
echo.

echo 4. Test du bouton "Voir"
echo    - Cliquer sur "Voir" pour la demande
echo    - Vérifier que TOUTES les informations du formulaire s'affichent
echo    - Vérifier que les icônes sont présentes
echo    - Vérifier que les informations sont complètes
echo.

echo 5. Test du bouton "Approuver"
echo    - Dans la modal, cliquer sur "Approuver"
echo    - Vérifier que la notification apparaît
echo    - Vérifier que le statut change à "Approuvée"
echo    - Vérifier que la demande disparaît de la liste
echo.

echo 6. Test du bouton "Refuser"
echo    - Créer une nouvelle demande
echo    - Cliquer sur "Refuser"
echo    - Vérifier que la notification apparaît
echo    - Vérifier que le statut change à "Refusée"
echo.

echo 7. Test des boutons dans la grille
echo    - Cliquer sur "Approuver" directement dans la grille
echo    - Cliquer sur "Refuser" directement dans la grille
echo    - Vérifier que les actions fonctionnent
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Le bouton "Voir" affiche TOUTES les informations
echo    - Le bouton "Approuver" change le statut
echo    - Le bouton "Refuser" change le statut
echo    - Les notifications apparaissent
echo    - Les actions fonctionnent dans la grille
echo.

echo ❌ Si problème:
echo    - Vérifier les erreurs JavaScript dans la console
echo    - Vérifier que les fonctions globales existent
echo    - Vérifier que adminDashboard est initialisé
echo    - Vérifier que les demandes ont un ID unique
echo.

echo ========================================
echo 🔧 DIAGNOSTIC SPÉCIFIQUE:
echo ========================================

echo Si les boutons ne fonctionnent pas:
echo 1. Ouvrir la console (F12)
echo 2. Vérifier les erreurs JavaScript
echo 3. Vérifier que les fonctions globales existent
echo 4. Vérifier que adminDashboard est défini
echo.

echo Si "Voir" n'affiche pas toutes les informations:
echo 1. Vérifier que generateRequestDetails() fonctionne
echo 2. Vérifier que getFieldIcon() retourne les icônes
echo 3. Vérifier que formatFieldName() traduit correctement
echo.

echo Si Approuver/Refuser ne changent pas le statut:
echo 1. Vérifier que approveRequest() et rejectRequest() existent
echo 2. Vérifier que les demandes ont un ID unique
echo 3. Vérifier que localStorage est mis à jour
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
