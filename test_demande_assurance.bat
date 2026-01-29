@echo off
echo ========================================
echo 🧪 TEST DEMANDE ASSURANCE
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
echo 2. Test de l'API de soumission...
echo Test avec curl...

curl -X POST http://localhost:8081/api/submit-demande ^
  -H "Content-Type: application/json" ^
  -d "{\"type\":\"assurance\",\"insuranceType\":\"Assurance Automobile\",\"clientName\":\"Test User\",\"clientEmail\":\"test@example.com\",\"clientPhone\":\"0612345678\",\"coverageAmount\":\"50000\",\"additionalInfo\":\"Test assurance\",\"dateSoumission\":\"2024-01-15T10:00:00.000Z\",\"statut\":\"en_attente\",\"id\":\"1234567890\",\"email\":\"test@example.com\"}"

echo.
echo 3. Ouverture de la page assurances...
start http://localhost:8081/assurances.html

echo.
echo ========================================
echo 📋 INSTRUCTIONS DE TEST :
echo ========================================
echo.
echo 1. Connectez-vous avec un compte utilisateur
echo 2. Cliquez sur "Demander un devis" pour une assurance
echo 3. Vérifiez que les champs se remplissent automatiquement
echo 4. Cliquez sur "Envoyer ma demande"
echo 5. Vérifiez que :
echo    - Le message de succès apparaît
echo    - La modal se ferme
echo    - Redirection vers l'accueil après 1.5s
echo.
echo 6. Connectez-vous en tant qu'admin :
echo    - Email : admin@mybank.com
echo    - Mot de passe : admin123
echo    - Vérifiez que la demande apparaît dans le dashboard
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si la demande ne s'envoie pas :
echo 1. Ouvrez la console (F12)
echo 2. Vérifiez les logs JavaScript
echo 3. Vérifiez que l'API répond
echo.
echo Si le message n'apparaît pas :
echo 1. Vérifiez que l'overlay se crée
echo 2. Vérifiez que la modal se ferme
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause














