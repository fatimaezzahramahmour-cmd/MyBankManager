@echo off
echo ========================================
echo Diagnostic Complet - Problème Interface
echo ========================================

echo.
echo 🚨 PROBLÈME IDENTIFIÉ: Interface ne se met pas à jour
echo.

echo 📋 ÉTAPES DE DIAGNOSTIC:
echo.

echo 1. DÉMARRAGE DU SERVEUR
echo    node simple_server.js
echo.

echo 2. TEST DE BASE
echo    - Ouvrir http://localhost:8081/test_simple.html
echo    - Cliquer sur "Tester l'élément"
echo    - Cliquer sur "Tester AuthManager"
echo    - Vérifier les logs
echo.

echo 3. TEST DE CONNEXION
echo    - Cliquer sur "Simuler Connexion"
echo    - Vérifier si les boutons changent
echo    - Vérifier les logs
echo.

echo 4. TEST DE FORCE UPDATE
echo    - Cliquer sur "Forcer Mise à Jour"
echo    - Vérifier les logs
echo.

echo 5. TEST DES PAGES PRINCIPALES
echo    - Aller sur http://localhost:8081
echo    - Ouvrir la console (F12)
echo    - Taper: window.unifiedAuthManager
echo    - Si undefined, le script n'est pas chargé
echo.

echo 6. TEST DE CONNEXION RÉELLE
echo    - Aller sur connexion.html
echo    - Se connecter avec un compte client
echo    - Vérifier l'interface après connexion
echo.

echo 7. TEST DES FORMULAIRES
echo    - Aller sur demande-pret.html
echo    - Vérifier l'interface
echo    - Remplir et soumettre le formulaire
echo    - Vérifier le message de succès
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les boutons changent après connexion
echo    - Le message de succès apparaît
echo    - L'interface est cohérente
echo.

echo ❌ Si problème persiste:
echo    - Copier TOUS les logs de la console
echo    - Noter les erreurs JavaScript
echo    - Vérifier si auth-unified.js est chargé
echo.

echo ========================================
echo 🔧 SOLUTIONS POSSIBLES:
echo ========================================

echo 1. Problème de chargement de script
echo    - Vérifier que auth-unified.js est inclus
echo    - Vérifier l'ordre des scripts
echo.

echo 2. Problème d'élément DOM
echo    - Vérifier que #header-actions existe
echo    - Vérifier la structure HTML
echo.

echo 3. Problème de localStorage
echo    - Vérifier les données stockées
echo    - Nettoyer le localStorage si nécessaire
echo.

echo 4. Problème de timing
echo    - Le script se charge après le DOM
echo    - Utiliser DOMContentLoaded
echo.

echo ========================================
echo ✅ Diagnostic terminé
echo ========================================

echo.
echo 💡 CONSEIL: Si le problème persiste, copiez
echo    tous les logs de la console et envoyez-les
echo    pour une analyse approfondie.
echo.

pause
