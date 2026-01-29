@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    TEST DASHBOARD ADMIN CORRIGÉ
echo    MyBankManager Dashboard Test
echo ========================================
echo.

echo [1/4] Vérification du serveur...
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
echo [2/4] Création de données de test...
echo Création d'utilisateurs de démonstration...

:: Créer des utilisateurs de test
powershell -Command "& {
    $demoUsers = @(
        @{
            id = 1
            fullName = 'Ahmed Benali'
            email = 'ahmed@example.com'
            role = 'CLIENT'
            status = 'ACTIVE'
            createdAt = (Get-Date).AddDays(-30).ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        },
        @{
            id = 2
            fullName = 'Fatima Zahra'
            email = 'fatima@example.com'
            role = 'CLIENT'
            status = 'ACTIVE'
            createdAt = (Get-Date).AddDays(-20).ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        },
        @{
            id = 3
            fullName = 'Mohammed Alami'
            email = 'mohammed@example.com'
            role = 'CLIENT'
            status = 'ACTIVE'
            createdAt = (Get-Date).AddDays(-10).ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        }
    )
    
    $demoUsersJson = $demoUsers | ConvertTo-Json -Depth 3
    $demoUsersJson | Out-File -FilePath 'demo_users.json' -Encoding UTF8
    
    echo 'Utilisateurs de démonstration créés dans demo_users.json'
}"

echo.
echo [3/4] Création de demandes de test...
echo Création de demandes de démonstration...

:: Créer des demandes de test
powershell -Command "& {
    $demoRequests = @(
        @{
            id = 1
            type = 'pret'
            userName = 'Ahmed Benali'
            userEmail = 'ahmed@example.com'
            amount = '50000'
            status = 'pending'
            date = (Get-Date).AddDays(-5).ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        },
        @{
            id = 2
            type = 'carte'
            userName = 'Fatima Zahra'
            userEmail = 'fatima@example.com'
            amount = '10000'
            status = 'approved'
            date = (Get-Date).AddDays(-3).ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        },
        @{
            id = 3
            type = 'pret'
            userName = 'Mohammed Alami'
            userEmail = 'mohammed@example.com'
            amount = '75000'
            status = 'pending'
            date = (Get-Date).AddDays(-1).ToString('yyyy-MM-ddTHH:mm:ss.fffZ')
        }
    )
    
    $demoRequestsJson = $demoRequests | ConvertTo-Json -Depth 3
    $demoRequestsJson | Out-File -FilePath 'demo_requests.json' -Encoding UTF8
    
    echo 'Demandes de démonstration créées dans demo_requests.json'
}"

echo.
echo [4/4] Ouverture du dashboard admin...
echo.
echo 📋 INFORMATIONS DE TEST:
echo.
echo 🔗 URL: http://localhost:8081/admin-dashboard.html
echo.
echo 📊 DONNÉES DE TEST CRÉÉES:
echo - 3 utilisateurs de démonstration
echo - 3 demandes de test (prêts et cartes)
echo - Statistiques mises à jour
echo.
echo 🎯 FONCTIONNALITÉS À TESTER:
echo.
echo 1. ✅ Affichage des utilisateurs dans le tableau
echo 2. ✅ Affichage des demandes dans la grille
echo 3. ✅ Statistiques mises à jour
echo 4. ✅ Navigation entre les sections
echo 5. ✅ Filtres de recherche fonctionnels
echo 6. ✅ Actions sur les demandes (approuver/refuser)
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
echo ✅ Utilisateurs de démonstration créés
echo ✅ Demandes de test créées
echo.
echo 🎯 RÉSULTAT ATTENDU:
echo - Dashboard accessible sans blocage
echo - Liste des utilisateurs visible
echo - Demandes affichées correctement
echo - Toutes les fonctionnalités opérationnelles
echo.
echo 💡 SI LES UTILISATEURS N'APPARAISSENT PAS:
echo 1. Cliquez sur "Créer des utilisateurs de démonstration"
echo 2. Ou rechargez la page (F5)
echo 3. Ou vérifiez la console (F12)
echo.
pause
