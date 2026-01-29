@echo off
echo ========================================
echo Nettoyage Cache et localStorage
echo ========================================

echo.
echo 🧹 NETTOYAGE EN COURS...
echo.

echo 1. Arrêter le serveur (Ctrl+C si en cours)
echo.

echo 2. Nettoyer le cache du navigateur:
echo    - Ouvrir les outils de développement (F12)
echo    - Aller dans l'onglet "Application" ou "Storage"
echo    - Local Storage > http://localhost:8081
echo    - Cliquer droit > Clear
echo    - Session Storage > http://localhost:8081
echo    - Cliquer droit > Clear
echo.

echo 3. Nettoyer le cache du navigateur:
echo    - Ctrl+Shift+Delete
echo    - Sélectionner "Tout effacer"
echo    - Cliquer sur "Effacer les données"
echo.

echo 4. Redémarrer le serveur:
echo    node simple_server.js
echo.

echo 5. Tester avec une page propre:
echo    - Ouvrir http://localhost:8081/test_simple.html
echo    - Tester la connexion
echo.

echo ========================================
echo ✅ Nettoyage terminé
echo ========================================

echo.
echo 💡 Si le problème persiste après nettoyage,
echo    cela indique un problème de code plutôt
echo    qu'un problème de cache.
echo.

pause
