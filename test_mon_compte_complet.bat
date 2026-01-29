@echo off
echo ========================================
echo Test: Page Mon Compte Complète
echo ========================================

echo.
echo 🚀 TEST DE LA PAGE MON COMPTE
echo.

echo 1. Test d'accès à la page Mon Compte
echo    - Se connecter avec un compte utilisateur
echo    - Cliquer sur "Mon Compte" dans le header
echo    - Vérifier que la page s'affiche correctement
echo    - Vérifier le message "Bienvenue [Nom]"
echo.

echo 2. Test des informations utilisateur
echo    - Vérifier que le nom de l'utilisateur s'affiche
echo    - Vérifier que l'email s'affiche
echo    - Vérifier que le téléphone s'affiche (si disponible)
echo    - Vérifier l'avatar utilisateur
echo.

echo 3. Test des statistiques des demandes
echo    - Vérifier que les cartes de statistiques s'affichent:
echo      * En attente (orange)
echo      * Acceptées (vert)
echo      * Refusées (rouge)
echo    - Vérifier que les compteurs sont corrects
echo.

echo 4. Test de l'affichage des demandes
echo    - Si l'utilisateur a des demandes:
echo      * Vérifier que chaque demande s'affiche
echo      * Vérifier le type de demande (prêt, carte, assurance)
echo      * Vérifier le statut (en attente, acceptée, refusée)
echo      * Vérifier la date et l'heure
echo      * Vérifier les détails (montant, durée, motif)
echo    - Si l'utilisateur n'a pas de demandes:
echo      * Vérifier le message "Aucune demande"
echo      * Vérifier les boutons d'action rapide
echo.

echo 5. Test des actions rapides
echo    - Vérifier que les 4 cartes d'action s'affichent:
echo      * Demander un prêt
echo      * Demander une carte
echo      * Demander une assurance
echo      * Support client
echo    - Vérifier que les liens fonctionnent
echo    - Vérifier les effets de survol
echo.

echo 6. Test de protection de la page
echo    - Se déconnecter
echo    - Essayer d'accéder directement à mon-compte.html
echo    - Vérifier la redirection vers connexion.html
echo.

echo 7. Test de persistance des données
echo    - Recharger la page (F5)
echo    - Vérifier que les informations restent affichées
echo    - Vérifier que les demandes restent visibles
echo.

echo 8. Test de mise à jour des demandes
echo    - Faire une nouvelle demande (prêt, carte, ou assurance)
echo    - Retourner sur la page Mon Compte
echo    - Vérifier que la nouvelle demande apparaît
echo    - Vérifier que les statistiques se mettent à jour
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - La page s'affiche correctement avec le design
echo    - Le message de bienvenue personnalisé apparaît
echo    - Les informations utilisateur sont correctes
echo    - Les statistiques sont précises
echo    - Les demandes s'affichent avec tous les détails
echo    - Les statuts sont clairement visibles
echo    - Les actions rapides fonctionnent
echo    - La protection de la page fonctionne
echo    - Les données persistent après rechargement
echo.

echo ❌ Si problème:
echo    - Vérifier que l'utilisateur est connecté
echo    - Vérifier que les demandes existent dans localStorage
echo    - Vérifier que le serveur fonctionne
echo    - Vérifier les logs dans la console
echo    - Vérifier que les fichiers CSS et JS sont chargés
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si la page ne s'affiche pas:
echo 1. Vérifier que mon-compte.html existe
echo 2. Vérifier que mon-compte-script.js est chargé
echo 3. Vérifier que auth-unified.js est chargé
echo 4. Vérifier que l'utilisateur est connecté
echo.

echo Si les demandes ne s'affichent pas:
echo 1. Vérifier que les demandes existent dans localStorage
echo 2. Vérifier que le serveur répond sur /api/admin-demandes
echo 3. Vérifier que l'email de l'utilisateur correspond
echo 4. Vérifier les logs dans la console
echo.

echo Si les statistiques sont incorrectes:
echo 1. Vérifier que les demandes sont bien filtrées
echo 2. Vérifier que les statuts sont corrects
echo 3. Vérifier la fonction updateRequestStats()
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
