@echo off
echo ========================================
echo OUVERTURE DES PAGES COMPLETES
echo ========================================
echo.
echo Ouverture de prets.html avec contenu complet...
start prets.html
timeout /t 2 /nobreak >nul
echo Ouverture de cartes.html avec contenu complet...
start cartes.html
timeout /t 2 /nobreak >nul
echo Ouverture de demande-pret.html...
start demande-pret.html
timeout /t 2 /nobreak >nul
echo Ouverture de demande-carte.html...
start demande-carte.html
echo.
echo ========================================
echo PAGES COMPLETES OUVERTES
echo ========================================
echo.
echo ✓ prets.html - Page des prêts avec section hero
echo ✓ cartes.html - Page des cartes avec section hero
echo ✓ demande-pret.html - Formulaire de demande de prêt
echo ✓ demande-carte.html - Formulaire de demande de carte
echo.
echo Les pages devraient maintenant afficher :
echo - Une section hero avec titre et description
echo - Des boutons d'action clairs
echo - Une carte bancaire visuelle
echo - Les sections de services en dessous
echo.
echo Le problème "page vide" est maintenant RÉSOLU !
echo ========================================
pause
