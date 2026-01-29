@echo off
echo ========================================
echo 🧪 TEST D'INSCRIPTION UTILISATEUR
echo ========================================

echo.
echo 1. Vérification du serveur...
netstat -ano | findstr :8081 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur Node.js fonctionne sur le port 8081
) else (
    echo ❌ Serveur Node.js non trouvé sur le port 8081
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo 2. Test de l'API d'inscription...
echo Test avec curl...

curl -X POST http://localhost:8081/api/users/register ^
  -H "Content-Type: application/json" ^
  -d "{\"fullName\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"confirmPassword\":\"password123\",\"telephone\":\"0612345678\",\"date-naissance\":\"1990-01-01\",\"adresse\":\"123 Rue Test, Ville Test\",\"conditions\":true}"

echo.
echo ========================================
echo 📋 INSTRUCTIONS DE TEST :
echo ========================================
echo.
echo 1. Ouvrez votre navigateur
echo 2. Allez sur : http://localhost:8081/inscription.html
echo 3. Remplissez le formulaire avec :
echo    - Nom complet : Test User
echo    - Email : test@example.com
echo    - Téléphone : 0612345678
echo    - Date de naissance : 01/01/1990
echo    - Adresse : 123 Rue Test, Ville Test
echo    - Mot de passe : password123
echo    - Confirmer mot de passe : password123
echo    - Cocher les conditions
echo 4. Cliquez sur "Créer mon compte"
echo.
echo 5. Vérifiez que :
echo    - Le compte est créé
echo    - L'utilisateur est connecté automatiquement
echo    - Redirection vers index.html
echo    - Le header affiche "Mon Compte" et "Déconnexion"
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si l'inscription échoue :
echo 1. Ouvrez la console du navigateur (F12)
echo 2. Vérifiez les erreurs JavaScript
echo 3. Vérifiez les requêtes réseau
echo 4. Vérifiez que l'API répond correctement
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause
