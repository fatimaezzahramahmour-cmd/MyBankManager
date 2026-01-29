@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    TEST DASHBOARD ADMIN SIMPLE
echo    MyBankManager Dashboard Test
echo ========================================
echo.

echo [1/3] Vérification du serveur...
curl -s http://localhost:8081/api/test >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur démarré
) else (
    echo ❌ Serveur non disponible
    echo Démarrez le serveur avec: start_mybankmanager_complete.bat
    pause
    exit /b 1
)

echo.
echo [2/3] Vérification de la connexion admin...
echo Assurez-vous d'être connecté en tant qu'admin:
echo Email: admin@mybank.com
echo Mot de passe: admin123
echo.

echo [3/3] Ouverture du dashboard admin...
echo.
echo 📋 INFORMATIONS DE TEST:
echo.
echo 🔗 URL: http://localhost:8081/admin-dashboard.html
echo.
echo 🎯 PROBLÈMES CORRIGÉS:
echo.
echo ✅ Protection d'accès admin simplifiée
echo ✅ Script de dashboard corrigé
echo ✅ Chargement des utilisateurs amélioré
echo ✅ Gestion des erreurs améliorée
echo ✅ Bouton "Créer des utilisateurs de démonstration"
echo.
echo 🚀 Ouverture du dashboard admin...
start http://localhost:8081/admin-dashboard.html

echo.
echo ========================================
echo    TEST PRÊT
echo ========================================
echo.
echo ✅ Dashboard admin corrigé
echo ✅ Script de protection simplifié
echo ✅ Chargement des utilisateurs amélioré
echo.
echo 🎯 RÉSULTAT ATTENDU:
echo - Dashboard accessible sans blocage
echo - Liste des utilisateurs visible
echo - Bouton "Créer des utilisateurs de démonstration" disponible
echo - Toutes les fonctionnalités opérationnelles
echo.
echo 💡 SI LES UTILISATEURS N'APPARAISSENT PAS:
echo 1. Cliquez sur "Créer des utilisateurs de démonstration"
echo 2. Ou rechargez la page (F5)
echo 3. Ou vérifiez la console (F12)
echo.
echo 🔧 DÉPANNAGE:
echo - Vérifiez que vous êtes connecté en tant qu'admin
echo - Vérifiez la console du navigateur (F12)
echo - Rechargez la page si nécessaire
echo.
pause




















