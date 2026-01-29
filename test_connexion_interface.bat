@echo off
echo ========================================
echo Test: Problème Interface Après Connexion
echo ========================================

echo.
echo 1. Démarrer le serveur (si pas déjà démarré)
echo    - Ouvrir PowerShell dans le dossier du projet
echo    - Exécuter: node simple_server.js
echo.

echo 2. Ouvrir la console du navigateur
echo    - Ouvrir http://localhost:8081
echo    - Appuyer sur F12 pour ouvrir les outils de développement
echo    - Aller dans l'onglet "Console"
echo.

echo 3. Test de connexion avec logs
echo    - Cliquer sur "Se connecter"
echo    - Remplir le formulaire avec un compte existant
echo    - Soumettre le formulaire
echo    - Observer les logs dans la console
echo    - Vérifier si les messages suivants apparaissent :
echo      * "🔄 Tentative de connexion unifiée: [email]"
echo      * "✅ Connexion unifiée réussie: [email]"
echo      * "🔄 Mise à jour de l'interface - État: {...}"
echo      * "🔄 Mise à jour du header - Authentifié: true"
echo      * "✅ Header mis à jour: Mon Compte + Déconnexion"
echo.

echo 4. Vérifier l'interface après connexion
echo    - Après la connexion réussie, vérifier l'interface
echo    - Les boutons doivent être "Mon Compte" et "Déconnexion"
echo    - Si ce n'est pas le cas, noter les erreurs dans la console
echo.

echo 5. Test de navigation
echo    - Naviguer vers d'autres pages
echo    - Vérifier que l'interface reste cohérente
echo    - Observer les logs de mise à jour d'interface
echo.

echo 6. Test de déconnexion
echo    - Cliquer sur "Déconnexion"
echo    - Vérifier que l'interface revient à l'état initial
echo    - Observer les logs de déconnexion
echo.

echo ========================================
echo ✅ Test de débogage terminé
echo ========================================

echo.
echo Si le problème persiste, vérifiez :
echo - Les erreurs JavaScript dans la console
echo - Si l'élément #header-actions existe sur toutes les pages
echo - Si auth-unified.js est bien chargé
echo - Les logs de mise à jour d'interface

pause
