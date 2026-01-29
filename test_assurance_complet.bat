@echo off
echo ========================================
echo 🧪 TEST ASSURANCE COMPLET
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
echo 📋 TESTS À EFFECTUER :
echo ========================================
echo.
echo 🔧 TEST 1 - SIMULATEUR :
echo 1. Allez dans la section "Simulateur d'Assurance"
echo 2. Sélectionnez un type d'assurance
echo 3. Modifiez le montant de garantie
echo 4. Vérifiez que les résultats se calculent automatiquement
echo 5. Cliquez sur "Calculer ma cotisation"
echo.
echo 🔧 TEST 2 - DEMANDE D'ASSURANCE :
echo 1. Connectez-vous avec un compte utilisateur
echo 2. Cliquez sur "Demander un devis" pour une assurance
echo 3. Vérifiez que les champs se remplissent automatiquement
echo 4. Cliquez sur "Envoyer ma demande"
echo 5. Vérifiez que le message de succès apparaît
echo 6. Vérifiez la redirection vers l'accueil
echo.
echo 🔧 TEST 3 - DASHBOARD ADMIN :
echo 1. Connectez-vous en tant qu'admin (admin@mybank.com)
echo 2. Vérifiez que la demande apparaît dans le dashboard
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si le simulateur ne fonctionne pas :
echo 1. Ouvrez la console (F12)
echo 2. Vérifiez les erreurs JavaScript
echo 3. Vérifiez que les logs apparaissent
echo.
echo Si le message de succès n'apparaît pas :
echo 1. Vérifiez que l'API répond (console)
echo 2. Vérifiez que l'overlay se crée
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause
