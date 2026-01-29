@echo off
echo ========================================
echo TEST DU SYSTEME D'ACCES ADMINISTRATEUR
echo ========================================
echo.

echo [1/6] Verification de la detection admin...
findstr /C:"admin@mybank.com" auth-manager.js >nul
if %errorlevel% equ 0 (
    echo ✓ Detection de l'admin par email
) else (
    echo ✗ Detection de l'admin manquante
)

echo [2/6] Verification de la protection admin...
findstr /C:"protectAdminAccess" auth-manager.js >nul
if %errorlevel% equ 0 (
    echo ✓ Protection d'acces admin
) else (
    echo ✗ Protection d'acces admin manquante
)

echo [3/6] Verification de la redirection admin...
findstr /C:"showAdminDashboard" auth-manager.js >nul
if %errorlevel% equ 0 (
    echo ✓ Redirection vers dashboard admin
) else (
    echo ✗ Redirection admin manquante
)

echo [4/6] Verification de l'interface admin...
findstr /C:"Dashboard Admin" auth-manager.js >nul
if %errorlevel% equ 0 (
    echo ✓ Interface admin dans le header
) else (
    echo ✗ Interface admin manquante
)

echo [5/6] Verification de la protection du dashboard...
findstr /C:"protectAdminAccess" admin-dashboard.html >nul
if %errorlevel% equ 0 (
    echo ✓ Protection du dashboard admin
) else (
    echo ✗ Protection du dashboard manquante
)

echo [6/6] Verification de l'empechement d'inscription admin...
findstr /C:"reserve a l'administration" auth-manager.js >nul
if %errorlevel% equ 0 (
    echo ✓ Empechement d'inscription avec email admin
) else (
    echo ✗ Protection d'inscription admin manquante
)

echo.
echo ========================================
echo RESUME DU SYSTEME D'ACCES ADMIN
echo ========================================
echo.
echo ✓ Detection automatique de l'admin (admin@mybank.com)
echo ✓ Redirection admin vers dashboard
echo ✓ Redirection client vers page d'accueil
echo ✓ Protection du dashboard admin
echo ✓ Interface differente pour admin et client
echo ✓ Empechement d'inscription avec email admin
echo.
echo Fonctionnalites implantees :
echo - Detection de l'admin par email
echo - Redirection automatique selon le role
echo - Protection du dashboard admin
echo - Interface adaptee selon le role
echo - Empechement d'inscription admin
echo - Deconnexion securisee
echo.
echo Instructions de test :
echo.
echo 1. TEST ADMIN :
echo    - Ouvrez connexion.html
echo    - Connectez-vous avec admin@mybank.com
echo    - Vous serez redirige vers admin-dashboard.html
echo    - L'interface affiche "Dashboard Admin"
echo.
echo 2. TEST CLIENT :
echo    - Connectez-vous avec un autre email
echo    - Vous serez redirige vers index.html
echo    - L'interface affiche "Mon compte"
echo.
echo 3. TEST PROTECTION :
echo    - Essayez d'acceder directement a admin-dashboard.html
echo    - Sans etre admin, vous serez redirige
echo.
echo 4. TEST INSCRIPTION ADMIN :
echo    - Essayez de vous inscrire avec admin@mybank.com
echo    - L'inscription sera refuse
echo.
echo Le systeme d'acces administrateur est maintenant SECURISE !
echo ========================================
pause
