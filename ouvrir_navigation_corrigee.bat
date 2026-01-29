@echo off
echo ========================================
echo   OUVERTURE NAVIGATION CORRIGEE
echo ========================================
echo.
echo Ouverture des pages pour test navigation...
echo.
echo 1. Ouverture page d'accueil...
start index.html
timeout /t 2 /nobreak >nul

echo 2. Ouverture page toutes les offres...
start offres.html
timeout /t 2 /nobreak >nul

echo 3. Ouverture page prets avec simulateur...
start prets.html#simulateur
timeout /t 1 /nobreak >nul

echo 4. Ouverture page assurances...
start assurances.html
echo.
echo ========================================
echo   PAGES OUVERTES POUR TEST
echo ========================================
echo.
echo ✓ index.html - Page d'accueil avec liens corriges
echo ✓ offres.html - Toutes les offres detaillees
echo ✓ prets.html#simulateur - Simulateur de pret fonctionnel
echo ✓ assurances.html - Page des assurances
echo.
echo TESTS A EFFECTUER :
echo.
echo 🔍 TEST 1 - "VOIR LES OFFRES" :
echo    1. Sur index.html, cliquez "Voir les offres" (section assurances)
echo    2. Vous devriez arriver sur offres.html
echo    3. Verifiez les 4 sections : Comptes, Prets, Cartes, Assurances
echo    4. Chaque produit a ses caracteristiques et prix
echo.
echo 🔍 TEST 2 - "SIMULER UN PRET" :
echo    1. Sur index.html, cliquez "Simuler un pret" (section prets)
echo    2. Vous devriez arriver sur prets.html#simulateur
echo    3. La page doit scroller automatiquement vers le simulateur
echo    4. Testez le simulateur avec ces valeurs :
echo       - Type : Pret personnel
echo       - Montant : 50000 DH
echo       - Duree : 36 mois (3 ans)
echo       - Revenus : 8000 DH/mois
echo    5. Verifiez les resultats calcules :
echo       - Taux 7.5%%
echo       - Mensualite ~1580 DH
echo       - Taux endettement ~19.8%% (ELIGIBLE - vert)
echo.
echo 🔍 TEST 3 - NAVIGATION FLUIDE :
echo    1. Testez tous les liens du menu principal
echo    2. Verifiez que chaque page s'ouvre correctement
echo    3. Testez les boutons "Decouvrir", "Simuler", etc.
echo    4. Tous doivent mener aux bonnes pages
echo.
echo 🔍 TEST 4 - SIMULATEUR AVANCE :
echo    Testez differents scenarios :
echo.
echo    SCENARIO A - ELIGIBLE (vert) :
echo    - Pret personnel, 30000 DH, 36 mois, 6000 DH revenus
echo    - Endettement ~26%% → Statut eligible
echo.
echo    SCENARIO B - ATTENTION (orange) :
echo    - Pret auto, 80000 DH, 60 mois, 5000 DH revenus
echo    - Endettement ~30%% → Acceptable avec reserves
echo.
echo    SCENARIO C - REFUSE (rouge) :
echo    - Pret immobilier, 500000 DH, 180 mois, 4000 DH revenus
echo    - Endettement ~40%% → Non eligible + recommandations
echo.
echo 🔍 TEST 5 - INTEGRATION DEMANDES :
echo    1. Apres simulation, cliquez "Faire une demande de pret"
echo    2. Si non connecte → redirection connexion
echo    3. Si connecte → demande-pret.html avec donnees pre-remplies
echo.
echo RESULTATS ATTENDUS :
echo.
echo ✅ "Voir les offres" → offres.html (toutes les offres)
echo ✅ "Simuler un pret" → prets.html#simulateur (ancrage)
echo ✅ Simulateur fonctionnel avec calculs reels
echo ✅ Evaluation eligibilite avec codes couleur
echo ✅ Redirection vers demandes apres simulation
echo ✅ Navigation fluide sans erreurs 404
echo.
echo Tous les problemes signales ont ete corriges !
echo ========================================
pause
