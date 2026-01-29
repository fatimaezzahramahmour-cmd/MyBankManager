@echo off
echo ========================================
echo 🧪 TEST ASSURANCE SIMPLE
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
echo 2. Ouverture de la page assurances...
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
echo 5. Vérifiez que le message de succès apparaît
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si le bouton ne fonctionne pas :
echo 1. Ouvrez la console (F12)
echo 2. Vérifiez les erreurs JavaScript
echo 3. Testez avec test_bouton_assurance.html
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause














