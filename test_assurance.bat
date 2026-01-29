@echo off
echo ========================================
echo 🧪 TEST DES DEMANDES D'ASSURANCE
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
echo 2. Test de l'API de soumission de demande...
echo Test avec curl...

curl -X POST http://localhost:8081/api/submit-demande ^
  -H "Content-Type: application/json" ^
  -d "{\"type\":\"assurance\",\"insuranceType\":\"Assurance Automobile\",\"clientName\":\"Test User\",\"clientEmail\":\"test@example.com\",\"clientPhone\":\"0612345678\",\"coverageAmount\":\"50000\",\"additionalInfo\":\"Test assurance\",\"dateSoumission\":\"2024-01-15T10:00:00.000Z\",\"statut\":\"en_attente\",\"id\":\"1234567890\"}"

echo.
echo ========================================
echo 📋 INSTRUCTIONS DE TEST :
echo ========================================
echo.
echo 1. Ouvrez votre navigateur
echo 2. Allez sur : http://localhost:8081/assurances.html
echo 3. Connectez-vous avec un compte utilisateur
echo 4. Cliquez sur "Demander un devis" pour une assurance
echo 5. Remplissez le formulaire et envoyez
echo.
echo 6. Vérifiez que :
echo    - Le message de succès apparaît
echo    - La demande est envoyée à l'admin
echo    - Redirection vers l'accueil
echo.
echo 7. Connectez-vous en tant qu'admin :
echo    - Email : admin@mybank.com
echo    - Mot de passe : admin123
echo    - Vérifiez que la demande apparaît dans le dashboard
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si les demandes n'apparaissent pas :
echo 1. Ouvrez la console du navigateur (F12)
echo 2. Vérifiez les erreurs JavaScript
echo 3. Vérifiez les requêtes réseau
echo 4. Vérifiez que l'API répond correctement
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause
