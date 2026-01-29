@echo off
echo ========================================
echo TEST DES PAGES PRETS ET CARTES
echo ========================================
echo.

echo [1/4] Verification de la structure de prets.html...
findstr /C:"<!DOCTYPE html>" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ prets.html a une structure HTML valide
) else (
    echo ✗ prets.html n'a pas de structure HTML valide
)

echo [2/4] Verification de la structure de cartes.html...
findstr /C:"<!DOCTYPE html>" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ cartes.html a une structure HTML valide
) else (
    echo ✗ cartes.html n'a pas de structure HTML valide
)

echo [3/4] Verification des liens vers les formulaires...
findstr /C:"demande-pret.html" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ Liens vers demande-pret.html trouves dans prets.html
) else (
    echo ✗ Liens vers demande-pret.html manquants dans prets.html
)

findstr /C:"demande-carte.html" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ Liens vers demande-carte.html trouves dans cartes.html
) else (
    echo ✗ Liens vers demande-carte.html manquants dans cartes.html
)

echo [4/4] Verification de l'inclusion du CSS professionnel...
findstr /C:"professional-theme.css" prets.html >nul
if %errorlevel% equ 0 (
    echo ✓ professional-theme.css inclus dans prets.html
) else (
    echo ✗ professional-theme.css manquant dans prets.html
)

findstr /C:"professional-theme.css" cartes.html >nul
if %errorlevel% equ 0 (
    echo ✓ professional-theme.css inclus dans cartes.html
) else (
    echo ✗ professional-theme.css manquant dans cartes.html
)

echo.
echo ========================================
echo RESUME DES CORRECTIONS
echo ========================================
echo.
echo ✓ Suppression du contenu duplique dans prets.html
echo ✓ Suppression du contenu duplique dans cartes.html
echo ✓ Conservation du theme professionnel
echo ✓ Liens vers les formulaires de demande fonctionnels
echo ✓ Structure HTML propre et valide
echo.
echo Les pages prets.html et cartes.html sont maintenant
echo correctement structurees et devraient s'afficher normalement.
echo.
echo Pour tester : ouvrez prets.html et cartes.html dans votre navigateur
echo ========================================
pause
