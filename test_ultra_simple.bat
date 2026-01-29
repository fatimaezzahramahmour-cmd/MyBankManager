@echo off
echo ========================================
echo Test Ultra Simple - Diagnostic Interface
echo ========================================

echo.
echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Ouvrir http://localhost:8081
echo.

echo 3. Test de base
echo    - Ouvrir la console (F12)
echo    - Taper: console.log('Test console')
echo    - Vérifier que le message apparaît
echo.

echo 4. Test de l'élément header
echo    - Dans la console, taper:
echo      document.querySelector('#header-actions')
echo    - Si null, taper:
echo      document.querySelector('.header-actions')
echo    - Si null, taper:
echo      document.querySelectorAll('[class*="header"]')
echo.

echo 5. Test du gestionnaire d'auth
echo    - Dans la console, taper:
echo      window.unifiedAuthManager
echo    - Si undefined, le script n'est pas chargé
echo.

echo 6. Test de connexion
echo    - Aller sur connexion.html
echo    - Se connecter avec un compte client
echo    - Après connexion, vérifier l'interface
echo.

echo 7. Si problème persiste
echo    - Copier tous les logs de la console
echo    - Les coller ici pour analyse
echo.

echo ========================================
echo ✅ Test ultra simple terminé
echo ========================================

pause
