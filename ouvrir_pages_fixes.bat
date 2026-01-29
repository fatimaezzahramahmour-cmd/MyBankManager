@echo off
echo ========================================
echo OUVERTURE DES PAGES CORRIGEES
echo ========================================
echo.
echo Ouverture de prets.html...
start prets.html
timeout /t 2 /nobreak >nul
echo Ouverture de cartes.html...
start cartes.html
timeout /t 2 /nobreak >nul
echo Ouverture de demande-pret.html...
start demande-pret.html
timeout /t 2 /nobreak >nul
echo Ouverture de demande-carte.html...
start demande-carte.html
echo.
echo ========================================
echo PAGES OUVERTES DANS LE NAVIGATEUR
echo ========================================
echo.
echo ✓ prets.html - Page des prêts et crédits
echo ✓ cartes.html - Page des cartes bancaires  
echo ✓ demande-pret.html - Formulaire de demande de prêt
echo ✓ demande-carte.html - Formulaire de demande de carte
echo.
echo Les pages devraient maintenant s'afficher correctement
echo avec le thème professionnel et les liens fonctionnels.
echo.
pause
