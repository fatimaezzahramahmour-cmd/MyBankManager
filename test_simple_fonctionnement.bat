@echo off
echo ========================================
echo Test: Fonctionnement Simple
echo ========================================

echo.
echo 🚀 TEST SIMPLE SANS BLOQUAGE
echo.

echo 1. Test rapide
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Cliquer sur "Demandes"
echo    - Cliquer sur "Approuver" pour une demande
echo    - Vérifier que ça ne se bloque pas
echo.

echo 2. Test de refus
echo    - Cliquer sur "Refuser" pour une autre demande
echo    - Vérifier que ça ne se bloque pas
echo    - Vérifier que le statut change
echo.

echo 3. Vérification
echo    - Les boutons sont cliquables
echo    - Pas de blocage de la page
echo    - Les statuts changent
echo    - Les notifications apparaissent
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les boutons sont cliquables
echo    - Pas de blocage ou de gel
echo    - Les statuts changent
echo    - Les notifications apparaissent
echo.

echo ❌ Si problème:
echo    - Vérifier la console pour les erreurs
echo    - Vérifier que les fonctions sont définies
echo    - Vérifier que adminDashboard est initialisé
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause
