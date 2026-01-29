@echo off
echo ========================================
echo TEST DU DASHBOARD ADMIN
echo ========================================
echo.

echo 1. Ouverture du dashboard admin...
start admin-dashboard.html

echo 2. Ouverture de la page d'inscription pour tester...
start inscription.html

echo 3. Ouverture de la page de connexion...
start connexion.html

echo.
echo ========================================
echo INSTRUCTIONS DE TEST
echo ========================================
echo.
echo 1. Dans inscription.html :
echo    - Créez un nouveau compte client
echo    - Vérifiez qu'il apparaît dans le dashboard admin
echo.
echo 2. Dans admin-dashboard.html :
echo    - Allez dans la section "Utilisateurs"
echo    - Vérifiez que le nouvel utilisateur apparaît
echo    - Vérifiez ses informations (nom, email, rôle)
echo.
echo 3. Dans connexion.html :
echo    - Connectez-vous avec admin@mybankmanager.com
echo    - Vérifiez la redirection vers le dashboard
echo.
echo ========================================
echo TEST TERMINE
echo ========================================
pause
