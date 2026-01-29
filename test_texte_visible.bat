@echo off
echo ========================================
echo Test: Visibilité du Texte
echo ========================================

echo.
echo 🚀 TEST DE LA VISIBILITÉ DU TEXTE
echo.

echo 1. Test des labels de formulaire
echo    - Aller sur http://localhost:8081/demande-pret.html
echo    - Vérifier que les labels sont bien visibles:
echo      * "Nom complet *" - doit être noir/foncé
echo      * "Email *" - doit être noir/foncé
echo      * "Téléphone *" - doit être noir/foncé
echo      * "Date de naissance *" - doit être noir/foncé
echo.

echo 2. Test des titres de section
echo    - Vérifier que les titres sont bien visibles:
echo      * "Informations Personnelles" - doit être noir/foncé
echo      * "Type de Prêt" - doit être noir/foncé
echo      * "Détails du Prêt" - doit être noir/foncé
echo.

echo 3. Test des champs de saisie
echo    - Cliquer dans un champ de saisie
echo    - Vérifier que le texte saisi est bien visible
echo    - Vérifier que le placeholder est lisible
echo.

echo 4. Test des messages d'erreur
echo    - Essayer de soumettre le formulaire vide
echo    - Vérifier que les messages d'erreur sont rouges et visibles
echo    - Vérifier qu'ils ne sont pas gris
echo.

echo 5. Test du message de succès
echo    - Remplir le formulaire et le soumettre (si connecté)
echo    - Vérifier que le texte dans l'overlay est bien visible:
echo      * Titre "Demande envoyée avec succès !" - doit être noir/foncé
echo      * Description - doit être noir/foncé
echo      * "Redirection automatique..." - doit être noir/foncé
echo.

echo 6. Test des messages d'authentification
echo    - Se déconnecter
echo    - Aller sur une page de demande
echo    - Vérifier que le message d'authentification est bien visible
echo    - Vérifier que le texte n'est pas gris
echo.

echo 7. Test des autres pages
echo    - Aller sur http://localhost:8081/demande-carte.html
echo    - Vérifier la même visibilité du texte
echo    - Aller sur http://localhost:8081/assurances.html
echo    - Vérifier la même visibilité du texte
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si le texte est bien visible:
echo    - Labels en noir/foncé (#2c3e50)
echo    - Titres en noir/foncé (#2c3e50)
echo    - Texte de saisie en noir/foncé (#2c3e50)
echo    - Messages d'erreur en rouge vif (#e74c3c)
echo    - Messages de succès en noir/foncé (#2c3e50)
echo    - Pas de texte gris clair
echo    - Contraste suffisant partout
echo.

echo ❌ Si problème:
echo    - Vérifier que professional-theme.css est à jour
echo    - Vérifier que les couleurs sont correctes
echo    - Vérifier que le contraste est suffisant
echo    - Vérifier que les polices sont chargées
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si le texte est gris:
echo 1. Vérifier que les couleurs CSS sont correctes
echo 2. Vérifier que les classes sont appliquées
echo 3. Vérifier qu'il n'y a pas de surcharge CSS
echo 4. Vérifier que les polices sont chargées
echo.

echo Si le contraste est insuffisant:
echo 1. Vérifier les couleurs de fond
echo 2. Vérifier les couleurs de texte
echo 3. Utiliser un outil de vérification de contraste
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause














