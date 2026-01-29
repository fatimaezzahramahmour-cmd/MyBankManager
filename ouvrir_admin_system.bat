@echo off
echo ========================================
echo OUVERTURE DU SYSTEME D'ACCES ADMIN
echo ========================================
echo.
echo Ouverture de connexion.html...
start connexion.html
timeout /t 2 /nobreak >nul
echo Ouverture de inscription.html...
start inscription.html
timeout /t 2 /nobreak >nul
echo Ouverture de admin-dashboard.html...
start admin-dashboard.html
echo.
echo ========================================
echo SYSTEME D'ACCES ADMIN OUVERT
echo ========================================
echo.
echo ✓ connexion.html - Test de connexion admin
echo ✓ inscription.html - Test d'inscription (protection admin)
echo ✓ admin-dashboard.html - Dashboard admin (protege)
echo.
echo Instructions de test du systeme admin :
echo.
echo 1. TEST CONNEXION ADMIN :
echo    - Ouvrez connexion.html
echo    - Email: admin@mybank.com
echo    - Mot de passe: (n'importe quoi)
echo    - Resultat: Redirection vers admin-dashboard.html
echo    - Interface: "Dashboard Admin" / "Deconnexion"
echo.
echo 2. TEST CONNEXION CLIENT :
echo    - Meme page connexion.html
echo    - Email: client@example.com
echo    - Mot de passe: (n'importe quoi)
echo    - Resultat: Redirection vers index.html
echo    - Interface: "Mon compte" / "Deconnexion"
echo.
echo 3. TEST PROTECTION DASHBOARD :
echo    - Ouvrez admin-dashboard.html directement
echo    - Sans etre connecte en tant qu'admin
echo    - Resultat: Redirection vers index.html
echo    - Message: "Acces refuse. Seuls les administrateurs..."
echo.
echo 4. TEST INSCRIPTION ADMIN :
echo    - Ouvrez inscription.html
echo    - Essayez de vous inscrire avec admin@mybank.com
echo    - Resultat: "Cet email est reserve a l'administration"
echo.
echo 5. TEST INTERFACE DIFFERENTE :
echo    - Connectez-vous en tant qu'admin
echo    - L'interface affiche "Dashboard Admin"
echo    - Connectez-vous en tant que client
echo    - L'interface affiche "Mon compte"
echo.
echo 6. TEST SESSION PERSISTANTE :
echo    - Connectez-vous en tant qu'admin
echo    - Rechargez la page
echo    - Vous restez admin
echo    - Meme chose pour les clients
echo.
echo Le systeme d'acces administrateur est maintenant :
echo ✓ SECURISE - Protection du dashboard admin
echo ✓ INTELLIGENT - Detection automatique du role
echo ✓ REDIRIGE - Vers la bonne page selon le role
echo ✓ INTERFACE - Adaptee selon le role
echo ✓ PERSISTANT - Session memorisee
echo ✓ PROTEGE - Empeche l'inscription admin
echo ========================================
pause
