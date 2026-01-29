@echo off
echo ========================================
echo Test: Connexion Client et Interface
echo ========================================

echo.
echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Ouvrir http://localhost:8081
echo.

echo 3. Test de connexion client
echo    - Cliquer sur "Se connecter"
echo    - Utiliser un compte client (pas admin)
echo    - Après connexion, vérifier l'interface
echo    - Les boutons doivent être "Mon Compte" et "Déconnexion"
echo.

echo 4. Si le problème persiste
echo    - Ouvrir la console (F12)
echo    - Taper: forceUpdateUI()
echo    - Vérifier les logs
echo.

echo 5. Test de navigation
echo    - Aller sur d'autres pages
echo    - Vérifier que l'interface reste cohérente
echo.

echo 6. Test de déconnexion
echo    - Cliquer sur "Déconnexion"
echo    - Vérifier que l'interface revient à l'état initial
echo.

echo ========================================
echo ✅ Test connexion client terminé
echo ========================================

echo.
echo Si le problème persiste, vérifiez :
echo - Les erreurs JavaScript dans la console
echo - Si l'élément #header-actions existe
echo - Si auth-unified.js est bien chargé
echo - Les logs de mise à jour d'interface

pause
