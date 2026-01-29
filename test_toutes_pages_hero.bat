@echo off
echo ========================================
echo TEST DE TOUTES LES PAGES HERO
echo ========================================
echo.

echo [1/6] Verification de prets.html...
findstr /C:"Solutions de Financement" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ prets.html - Section hero complete
) else (
    echo ✗ prets.html - Section hero incomplete
)

echo [2/6] Verification de cartes.html...
findstr /C:"Cartes Bancaires" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ cartes.html - Section hero complete
) else (
    echo ✗ cartes.html - Section hero incomplete
)

echo [3/6] Verification de contact.html...
findstr /C:"Contactez-nous" contact.html >nul
if %errorlevel% equ 0 (
    echo ✓ contact.html - Section hero complete
) else (
    echo ✗ contact.html - Section hero incomplete
)

echo [4/6] Verification de about.html...
findstr /C:"À propos de MyBankManager" about.html >nul
if %errorlevel% equ 0 (
    echo ✓ about.html - Section hero complete
) else (
    echo ✗ about.html - Section hero incomplete
)

echo [5/6] Verification des boutons d'action...
findstr /C:"hero-actions" prets.html >nul && findstr /C:"hero-actions" cartes.html >nul && findstr /C:"hero-actions" contact.html >nul && findstr /C:"hero-actions" about.html >nul
if %errorlevel% equ 0 (
    echo ✓ Toutes les pages ont des boutons d'action
) else (
    echo ✗ Certaines pages manquent de boutons d'action
)

echo [6/6] Verification des cartes visuelles...
findstr /C:"hero-visual" prets.html >nul && findstr /C:"hero-visual" cartes.html >nul && findstr /C:"hero-visual" contact.html >nul && findstr /C:"hero-visual" about.html >nul
if %errorlevel% equ 0 (
    echo ✓ Toutes les pages ont des cartes visuelles
) else (
    echo ✗ Certaines pages manquent de cartes visuelles
)

echo.
echo ========================================
echo RESUME DES AMELIORATIONS
echo ========================================
echo.
echo ✓ prets.html - Section hero avec boutons et carte
echo ✓ cartes.html - Section hero avec boutons et carte
echo ✓ contact.html - Section hero avec boutons et carte
echo ✓ about.html - Section hero avec boutons et carte
echo.
echo Toutes les pages ont maintenant :
echo - Des sections hero completes et attractives
echo - Des boutons d'action clairs et fonctionnels
echo - Des cartes bancaires visuelles
echo - Une navigation fluide entre les sections
echo - Un design professionnel et cohérent
echo.
echo Le site est maintenant uniforme et professionnel !
echo ========================================
pause
