@echo off
echo Ajout du script d'authentification aux pages restantes...

REM Ajouter auth-manager.js à inscription.html
echo ^<script src="auth-manager.js"^>^</script^> >> inscription.html

REM Ajouter auth-manager.js à dashboard.html
powershell -Command "(Get-Content 'dashboard.html') -replace '</body>', '<script src=\"auth-manager.js\"></script>`n</body>' | Set-Content 'dashboard.html'"

REM Ajouter auth-manager.js à admin-dashboard.html
powershell -Command "(Get-Content 'admin-dashboard.html') -replace '</body>', '<script src=\"auth-manager.js\"></script>`n</body>' | Set-Content 'admin-dashboard.html'"

REM Ajouter auth-manager.js à virements.html
powershell -Command "(Get-Content 'virements.html') -replace '</body>', '<script src=\"auth-manager.js\"></script>`n</body>' | Set-Content 'virements.html'"

REM Ajouter auth-manager.js à accounts.html
powershell -Command "(Get-Content 'accounts.html') -replace '</body>', '<script src=\"auth-manager.js\"></script>`n</body>' | Set-Content 'accounts.html'"

echo Script d'authentification ajouté avec succès !
pause
