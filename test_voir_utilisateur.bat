@echo off
echo ========================================
echo Test: Bouton Voir Utilisateur
echo ========================================

echo.
echo 🚀 TEST DU BOUTON VOIR UTILISATEUR
echo.

echo 1. Créer un compte utilisateur de test
echo    - Aller sur http://localhost:8081/inscription.html
echo    - Créer un nouveau compte avec des informations complètes
echo    - Remplir tous les champs (nom, email, téléphone, adresse, etc.)
echo    - Valider l'inscription
echo.

echo 2. Créer une demande pour cet utilisateur
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Se connecter avec le compte créé
echo    - Remplir le formulaire de demande
echo    - Soumettre la demande
echo.

echo 3. Test du dashboard admin
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Utilisateurs"
echo    - Vérifier que l'utilisateur apparaît dans la liste
echo.

echo 4. Test du bouton Voir
echo    - Cliquer sur l'icône "👁️" (œil) à côté de l'utilisateur
echo    - Vérifier qu'une modal s'ouvre avec:
echo      * Informations personnelles complètes
echo      * Informations de connexion
echo      * Liste des demandes de l'utilisateur
echo.

echo 5. Vérification des informations affichées
echo    - Nom complet ✓
echo    - Email ✓
echo    - Téléphone ✓
echo    - Adresse ✓
echo    - CIN ✓
echo    - Date de naissance ✓
echo    - Nationalité ✓
echo    - Profession ✓
echo    - Revenus ✓
echo    - Employeur ✓
echo    - Date d'inscription ✓
echo    - Dernière connexion ✓
echo    - Statut ✓
echo    - Rôle ✓
echo    - Demandes ✓
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Le bouton "Voir" ouvre une modal
echo    - Toutes les informations personnelles sont affichées
echo    - Les informations de connexion sont visibles
echo    - Les demandes de l'utilisateur sont listées
echo    - La modal se ferme correctement
echo.

echo ❌ Si problème:
echo    - Vérifier que le bouton "Voir" est cliquable
echo    - Vérifier que la modal s'ouvre
echo    - Vérifier que les informations sont complètes
echo    - Vérifier que les demandes sont affichées
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si la modal ne s'ouvre pas:
echo 1. Vérifier que viewUser() est correctement définie
echo 2. Vérifier que showModal() fonctionne
echo 3. Vérifier que les données utilisateur sont disponibles
echo.

echo Si les informations sont incomplètes:
echo 1. Vérifier que l'utilisateur a bien rempli tous les champs
echo 2. Vérifier que les données sont sauvegardées
echo 3. Vérifier que getUsers() retourne les bonnes données
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause















