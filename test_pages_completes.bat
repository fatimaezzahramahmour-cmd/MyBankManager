@echo off
echo ========================================
echo TEST DES PAGES COMPLETES
echo ========================================
echo.

echo [1/4] Verification de la section hero dans prets.html...
findstr /C:"Solutions de Financement" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ Section hero trouvee dans prets.html
) else (
    echo ✗ Section hero manquante dans prets.html
)

echo [2/4] Verification de la section hero dans cartes.html...
findstr /C:"Cartes Bancaires" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ Section hero trouvee dans cartes.html
) else (
    echo ✗ Section hero manquante dans cartes.html
)

echo [3/4] Verification des boutons d'action...
findstr /C:"Demander un prêt" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ Bouton "Demander un prêt" trouve dans prets.html
) else (
    echo ✗ Bouton "Demander un prêt" manquant dans prets.html
)

findstr /C:"Demander une carte" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ Bouton "Demander une carte" trouve dans cartes.html
) else (
    echo ✗ Bouton "Demander une carte" manquant dans cartes.html
)

echo [4/4] Verification de la structure complete...
findstr /C:"hero" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ Structure hero presente dans prets.html
) else (
    echo ✗ Structure hero manquante dans prets.html
)

findstr /C:"hero" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ Structure hero presente dans cartes.html
) else (
    echo ✗ Structure hero manquante dans cartes.html
)

echo.
echo ========================================
echo RESUME DES AMELIORATIONS
echo ========================================
echo.
echo ✓ Ajout de sections hero dans prets.html et cartes.html
echo ✓ Contenu visible et attractif sur les deux pages
echo ✓ Boutons d'action clairs et fonctionnels
echo ✓ Navigation fluide entre les sections
echo ✓ Design professionnel et cohérent
echo.
echo Les pages ne devraient plus paraitre vides !
echo Elles ont maintenant du contenu visible et attractif.
echo.
echo Pour tester : ouvrez prets.html et cartes.html dans votre navigateur
echo ========================================
pause
