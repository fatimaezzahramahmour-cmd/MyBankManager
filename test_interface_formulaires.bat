@echo off
echo ========================================
echo Test: Interface Cohérente sur Formulaires
echo ========================================

echo.
echo 1. Démarrer le serveur
echo    node simple_server.js
echo.

echo 2. Ouvrir http://localhost:8081
echo.

echo 3. Test de connexion client
echo    - Se connecter avec un compte client
echo    - Vérifier que l'interface change sur la page d'accueil
echo.

echo 4. Test de navigation vers formulaires
echo    - Aller sur demande-pret.html
echo    - Vérifier que les boutons sont "Mon Compte" et "Déconnexion"
echo    - Aller sur demande-carte.html
echo    - Vérifier que les boutons sont "Mon Compte" et "Déconnexion"
echo    - Aller sur assurances.html
echo    - Vérifier que les boutons sont "Mon Compte" et "Déconnexion"
echo.

echo 5. Test de soumission de formulaire
echo    - Remplir un formulaire (prêt, carte, ou assurance)
echo    - Soumettre le formulaire
echo    - Vérifier que le message centré apparaît pendant 3 secondes
echo    - Vérifier la redirection vers l'accueil
echo.

echo 6. Test de déconnexion
echo    - Cliquer sur "Déconnexion"
echo    - Vérifier que l'interface revient à l'état initial
echo    - Naviguer sur les formulaires
echo    - Vérifier que les boutons sont "Se connecter" et "S'inscrire"
echo.

echo ========================================
echo ✅ Test interface formulaires terminé
echo ========================================

echo.
echo Si le problème persiste, vérifiez :
echo - Les erreurs JavaScript dans la console
echo - Si auth-unified.js est chargé sur toutes les pages
echo - Si l'élément #header-actions existe sur toutes les pages
echo - Les logs de mise à jour d'interface

pause
