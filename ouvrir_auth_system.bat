@echo off
echo ========================================
echo OUVERTURE DU SYSTEME D'AUTHENTIFICATION
echo ========================================
echo.
echo Ouverture de inscription.html...
start inscription.html
timeout /t 2 /nobreak >nul
echo Ouverture de connexion.html...
start connexion.html
timeout /t 2 /nobreak >nul
echo Ouverture de index.html...
start index.html
echo.
echo ========================================
echo SYSTEME D'AUTHENTIFICATION OUVERT
echo ========================================
echo.
echo ✓ inscription.html - Créer un compte
echo ✓ connexion.html - Se connecter
echo ✓ index.html - Page d'accueil
echo.
echo Instructions de test :
echo.
echo 1. TEST D'INSCRIPTION :
echo    - Ouvrez inscription.html
echo    - Remplissez le formulaire
echo    - Cliquez sur "Créer mon compte"
echo    - Vous serez automatiquement connecté
echo    - L'interface se met à jour (Mon compte / Déconnexion)
echo.
echo 2. TEST DE L'ESPACE UTILISATEUR :
echo    - Cliquez sur "Mon compte"
echo    - Une modal s'ouvre avec vos informations
echo    - Vous verrez vos demandes (si vous en avez faites)
echo.
echo 3. TEST DE DÉCONNEXION :
echo    - Cliquez sur "Déconnexion"
echo    - L'interface revient à "Se connecter" / "S'inscrire"
echo.
echo 4. TEST DE SESSION :
echo    - Rechargez la page
echo    - Vous restez connecté grâce au localStorage
echo.
echo 5. TEST DE DEMANDES :
echo    - Faites des demandes de prêt/carte
echo    - Elles apparaîtront dans "Mon compte"
echo.
echo Le système est maintenant COMPLET et FONCTIONNEL !
echo ========================================
pause
