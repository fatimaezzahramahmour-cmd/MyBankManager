@echo off
echo ========================================
echo Test: Connexion Admin
echo ========================================

echo.
echo 🚀 TEST DE CONNEXION ADMIN
echo.

echo 1. Test de connexion avec email admin
echo    - Aller sur http://localhost:8081/connexion.html
echo    - Entrer l'email: admin@mybank.com
echo    - Entrer n'importe quel mot de passe (admin n'a pas de mot de passe)
echo    - Cliquer sur "Se connecter"
echo.

echo 2. Vérification de la connexion admin
echo    - Vérifier le message "Connexion admin réussie ! Bienvenue Administrateur"
echo    - Vérifier la redirection vers admin-dashboard.html
echo    - Vérifier que le dashboard admin s'affiche
echo.

echo 3. Test de connexion avec email admin alternatif
echo    - Aller sur http://localhost:8081/connexion.html
echo    - Entrer l'email: admin@mybankmanager.com
echo    - Entrer n'importe quel mot de passe
echo    - Cliquer sur "Se connecter"
echo    - Vérifier que ça fonctionne aussi
echo.

echo 4. Test de connexion avec email non-admin
echo    - Aller sur http://localhost:8081/connexion.html
echo    - Entrer un email qui n'existe pas
echo    - Entrer un mot de passe
echo    - Cliquer sur "Se connecter"
echo    - Vérifier le message d'erreur "Aucun compte trouvé"
echo.

echo 5. Test de connexion avec utilisateur normal
echo    - Créer un compte utilisateur normal
echo    - Se connecter avec cet utilisateur
echo    - Vérifier que ça redirige vers index.html (pas admin-dashboard)
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - La connexion admin fonctionne avec admin@mybank.com
echo    - La connexion admin fonctionne avec admin@mybankmanager.com
echo    - Le message de bienvenue admin s'affiche
echo    - La redirection vers admin-dashboard.html fonctionne
echo    - Les utilisateurs normaux ne peuvent pas accéder au dashboard admin
echo    - Les emails inexistants affichent une erreur
echo.

echo ❌ Si problème:
echo    - Vérifier que la vérification isAdmin fonctionne
echo    - Vérifier que l'admin est créé en localStorage
echo    - Vérifier que la redirection fonctionne
echo    - Vérifier les logs dans la console
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si l'admin ne peut pas se connecter:
echo 1. Vérifier que isAdmin détecte correctement les emails admin
echo 2. Vérifier que l'admin est créé en localStorage
echo 3. Vérifier que currentUser est défini
echo 4. Vérifier que la redirection fonctionne
echo.

echo Si la redirection ne fonctionne pas:
echo 1. Vérifier que admin-dashboard.html existe
echo 2. Vérifier que le serveur fonctionne
echo 3. Vérifier que l'admin a le bon rôle
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause














