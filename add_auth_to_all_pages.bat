@echo off
echo Ajout du script d'authentification à toutes les pages HTML...

REM Traiter chaque fichier individuellement
echo Traitement de connexion.html...
if exist "connexion.html" (
    powershell -Command "(Get-Content 'connexion.html') -replace '<script src=\"([^\"]+\.js)\"></script>', '<script src=\"auth-manager.js\"></script>`n    <script src=\"$1\"></script>' | Set-Content 'connexion.html'"
    echo ✓ Script ajouté à connexion.html
) else (
    echo ! Fichier connexion.html non trouvé
)

echo Traitement de inscription.html...
if exist "inscription.html" (
    powershell -Command "(Get-Content 'inscription.html') -replace '<script src=\"([^\"]+\.js)\"></script>', '<script src=\"auth-manager.js\"></script>`n    <script src=\"$1\"></script>' | Set-Content 'inscription.html'"
    echo ✓ Script ajouté à inscription.html
) else (
    echo ! Fichier inscription.html non trouvé
)

echo Traitement de dashboard.html...
if exist "dashboard.html" (
    powershell -Command "(Get-Content 'dashboard.html') -replace '<script src=\"([^\"]+\.js)\"></script>', '<script src=\"auth-manager.js\"></script>`n    <script src=\"$1\"></script>' | Set-Content 'dashboard.html'"
    echo ✓ Script ajouté à dashboard.html
) else (
    echo ! Fichier dashboard.html non trouvé
)

echo Traitement de admin-dashboard.html...
if exist "admin-dashboard.html" (
    powershell -Command "(Get-Content 'admin-dashboard.html') -replace '<script src=\"([^\"]+\.js)\"></script>', '<script src=\"auth-manager.js\"></script>`n    <script src=\"$1\"></script>' | Set-Content 'admin-dashboard.html'"
    echo ✓ Script ajouté à admin-dashboard.html
) else (
    echo ! Fichier admin-dashboard.html non trouvé
)

echo.
echo Traitement terminé !
pause


