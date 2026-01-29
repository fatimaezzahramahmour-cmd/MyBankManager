@echo off
echo ========================================
echo    TEST BOUTON DÉCONNEXION ADMIN
echo ========================================
echo.

echo [1/4] Vérification du serveur...
curl -s http://localhost:8081/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur fonctionne sur http://localhost:8081
) else (
    echo ❌ Serveur non accessible
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo [2/4] Test de connexion admin...
curl -s -X POST http://localhost:8081/api/users/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@mybank.com\",\"password\":\"admin123\"}" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Connexion admin testée
) else (
    echo ❌ Erreur connexion admin
)

echo.
echo [3/4] Ouverture du dashboard admin...
start admin-dashboard.html

echo.
echo [4/4] Instructions de test...
echo.
echo 🎯 TEST DU BOUTON DÉCONNEXION:
echo.
echo 1. Dans le dashboard admin, localisez le bouton "Déconnexion" 
echo    (en haut à droite, à côté de "Administrateur")
echo.
echo 2. Cliquez sur le bouton "Déconnexion"
echo.
echo 3. Vérifiez que:
echo    - Une notification "Déconnexion réussie" apparaît
echo    - Après 1.5 secondes, vous êtes redirigé vers connexion.html
echo    - Les données de session sont effacées (localStorage)
echo.
echo ✅ RÉSULTAT ATTENDU:
echo - Le bouton répond au clic
echo - La déconnexion fonctionne correctement
echo - La redirection vers connexion.html fonctionne
echo - Aucune erreur dans la console du navigateur
echo.
echo 🔧 DÉPANNAGE:
echo - Ouvrez les outils de développement (F12)
echo - Vérifiez la console pour les messages de déconnexion
echo - Vérifiez que localStorage est bien vidé
echo.
pause




















