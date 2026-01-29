@echo off
echo ========================================
echo Test: Interface Client et Messages de Succès
echo ========================================

echo.
echo 1. Démarrer le serveur (si pas déjà démarré)
echo    - Ouvrir PowerShell dans le dossier du projet
echo    - Exécuter: node simple_server.js
echo.

echo 2. Test d'inscription et interface
echo    - Ouvrir http://localhost:8081
echo    - Vérifier que les boutons "Se connecter" et "S'inscrire" sont visibles
echo    - Cliquer sur "S'inscrire"
echo    - Remplir le formulaire d'inscription
echo    - Après soumission, vérifier que l'interface change automatiquement
echo    - Les boutons doivent devenir "Mon Compte" et "Déconnexion"
echo.

echo 3. Test de navigation après inscription
echo    - Naviguer vers d'autres pages (comptes, cartes, prets, etc.)
echo    - Vérifier que l'interface reste cohérente partout
echo    - Les boutons "Mon Compte" et "Déconnexion" doivent être présents
echo    - Les boutons "Se connecter" et "S'inscrire" ne doivent plus apparaître
echo.

echo 4. Test de soumission de demande
echo    - Aller sur une page de demande (prêt, carte, ou assurance)
echo    - Remplir le formulaire
echo    - Soumettre la demande
echo    - Vérifier qu'un message centré apparaît pendant 3 secondes
echo    - Le message doit dire : "Message envoyé avec succès. Veuillez attendre une réponse dans les plus brefs délais."
echo    - Après 3 secondes, vérifier la redirection automatique vers l'accueil
echo.

echo 5. Test de déconnexion
echo    - Cliquer sur "Déconnexion"
echo    - Vérifier que l'interface revient à "Se connecter" et "S'inscrire"
echo    - Vérifier la redirection vers l'accueil
echo.

echo 6. Test de reconnexion
echo    - Se reconnecter avec le compte créé
echo    - Vérifier que l'interface change correctement
echo    - Tester à nouveau la soumission d'une demande
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
