@echo off
echo ========================================
echo Test: Connexion Utilisateur Existant
echo ========================================

echo.
echo 🚀 TEST DE CONNEXION POUR UTILISATEUR EXISTANT
echo.

echo 1. Créer un compte utilisateur de test
echo    - Aller sur http://localhost:8081/inscription.html
echo    - Créer un nouveau compte avec des informations complètes
echo    - Remplir tous les champs (nom, email, téléphone, adresse, etc.)
echo    - Valider l'inscription
echo    - Noter l'email et le mot de passe utilisés
echo.

echo 2. Test de la page de connexion
echo    - Aller sur http://localhost:8081/connexion.html
echo    - Vérifier que la page affiche:
echo      * "💡 Vous avez déjà un compte ?"
echo      * "Connectez-vous avec votre email et mot de passe"
echo      * "Pas encore de compte ? Créer un compte"
echo.

echo 3. Test de connexion avec compte existant
echo    - Entrer l'email du compte créé
echo    - Entrer le mot de passe du compte créé
echo    - Cliquer sur "Se connecter"
echo    - Vérifier que la connexion réussit
echo    - Vérifier le message "Connexion réussie ! Bienvenue [Nom]"
echo    - Vérifier la redirection vers la page d'accueil
echo.

echo 4. Test de connexion avec compte inexistant
echo    - Aller sur http://localhost:8081/connexion.html
echo    - Entrer un email qui n'existe pas
echo    - Entrer un mot de passe
echo    - Cliquer sur "Se connecter"
echo    - Vérifier le message d'erreur "Aucun compte trouvé avec cet email"
echo.

echo 5. Test de connexion avec mot de passe incorrect
echo    - Entrer l'email du compte existant
echo    - Entrer un mauvais mot de passe
echo    - Cliquer sur "Se connecter"
echo    - Vérifier le message d'erreur approprié
echo.

echo 6. Vérification de l'interface après connexion
echo    - Après connexion réussie, vérifier que:
echo      * Le bouton "Mon Compte" apparaît
echo      * Le bouton "Déconnexion" apparaît
echo      * Les boutons "Se connecter" et "S'inscrire" disparaissent
echo      * L'interface est cohérente sur toutes les pages
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - La page de connexion est claire et informative
echo    - La connexion réussit pour les utilisateurs existants
echo    - Les messages d'erreur sont appropriés
echo    - L'interface se met à jour correctement
echo    - La redirection fonctionne
echo.

echo ❌ Si problème:
echo    - Vérifier que les utilisateurs sont sauvegardés dans localStorage
echo    - Vérifier que la validation des identifiants fonctionne
echo    - Vérifier que les messages d'erreur s'affichent
echo    - Vérifier que l'interface se met à jour
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si la connexion échoue:
echo 1. Vérifier que l'utilisateur existe dans localStorage
echo 2. Vérifier que le mot de passe est correct
echo 3. Vérifier que unifiedAuthManager fonctionne
echo 4. Vérifier les logs dans la console
echo.

echo Si l'interface ne se met pas à jour:
echo 1. Vérifier que forceUpdateUI() est appelé
echo 2. Vérifier que les boutons sont correctement ciblés
echo 3. Vérifier que auth-unified.js est chargé
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause















