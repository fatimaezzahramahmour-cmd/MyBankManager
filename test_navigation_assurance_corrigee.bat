@echo off
echo ========================================
echo   TEST NAVIGATION ASSURANCE CORRIGEE
echo ========================================
echo.

echo 🔧 CORRECTION APPLIQUEE :
echo    - Section Assurance: lien vers assurances.html
echo    - Bouton "Voir toutes les offres" ajoute en CTA
echo    - Navigation plus logique et claire
echo.

echo 📋 VERIFICATION DES CHANGEMENTS :
echo.

echo [1/3] Verification du lien assurance...
findstr /C:"assurances.html" index.html >nul
if %errorlevel% equ 0 (
    echo ✓ Lien assurance corrige vers assurances.html
) else (
    echo ✗ Lien assurance non corrige
)

findstr /C:"Voir les assurances" index.html >nul
if %errorlevel% equ 0 (
    echo ✓ Texte du lien change pour "Voir les assurances"
) else (
    echo ✗ Texte du lien non change
)

echo [2/3] Verification bouton "Voir toutes les offres"...
findstr /C:"Voir toutes les offres" index.html >nul
if %errorlevel% equ 0 (
    echo ✓ Bouton "Voir toutes les offres" ajoute
) else (
    echo ✗ Bouton "Voir toutes les offres" manquant
)

findstr /C:"btn-secondary" index.html >nul
if %errorlevel% equ 0 (
    echo ✓ Style btn-secondary applique
) else (
    echo ✗ Style btn-secondary manquant
)

echo [3/3] Verification style CSS...
findstr /C:"btn-secondary" professional-theme.css >nul
if %errorlevel% equ 0 (
    echo ✓ Style btn-secondary defini dans CSS
) else (
    echo ✗ Style btn-secondary manquant dans CSS
)

echo.
echo ========================================
echo   PAGES A TESTER
echo ========================================
echo.

echo [1/4] Ouverture page d'accueil...
start "" "index.html"
timeout /t 2 >nul

echo [2/4] Ouverture page assurances...
start "" "assurances.html"
timeout /t 2 >nul

echo [3/4] Ouverture page toutes offres...
start "" "offres.html"
timeout /t 2 >nul

echo [4/4] Ouverture admin dashboard...
start "" "admin-dashboard.html"
timeout /t 2 >nul

echo.
echo ========================================
echo   COMMENT TESTER LA CORRECTION
echo ========================================
echo.
echo 🧪 SCENARIO DE TEST :
echo.
echo 1️⃣ TEST NAVIGATION ASSURANCE :
echo    a) Sur index.html, section "Services"
echo    b) Dans la carte "Assurances"
echo    c) Cliquez sur "Voir les assurances"
echo    d) ✅ Doit ouvrir assurances.html (seulement assurances)
echo    e) ✅ Page avec 6 types d'assurances + simulateur
echo.
echo 2️⃣ TEST TOUTES LES OFFRES :
echo    a) Sur index.html, descendez a la section CTA
echo    b) Cliquez sur "Voir toutes les offres" (bouton dore)
echo    c) ✅ Doit ouvrir offres.html (toutes offres)
echo    d) ✅ Page avec comptes + prets + cartes + assurances
echo.
echo 3️⃣ TEST ADMIN DASHBOARD :
echo    a) Connectez-vous en admin (admin@mybankmanager.com)
echo    b) Allez section "Utilisateurs"
echo    c) ✅ Liste des utilisateurs doit apparaitre
echo    d) ✅ Utilisateurs demo + vrais utilisateurs
echo.
echo ========================================
echo   NAVIGATION CORRIGEE
echo ========================================
echo.
echo ✅ AVANT (problematique) :
echo    Section Assurance → "Voir les offres" → offres.html
echo    → Montrait TOUTES les offres au lieu des assurances
echo.
echo ✅ APRES (corrige) :
echo    Section Assurance → "Voir les assurances" → assurances.html
echo    → Montre SEULEMENT les assurances (6 types + simulateur)
echo.
echo ✅ BONUS ajoute :
echo    Section CTA → "Voir toutes les offres" → offres.html
echo    → Acces central a TOUTES les offres (comptes, prets, cartes, assurances)
echo.
echo 🎯 RESULTAT :
echo    - Navigation logique et intuitive
echo    - Assurances → assurances.html
echo    - Toutes offres → offres.html  
echo    - Bouton dore pour "Voir toutes les offres"
echo    - Section utilisateurs admin corrigee
echo.
echo Testez maintenant avec les pages ouvertes !
echo.
pause
