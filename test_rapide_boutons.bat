@echo off
echo ========================================
echo Test Rapide: Boutons Dashboard
echo ========================================

echo.
echo 🚀 TEST RAPIDE
echo.

echo 1. Ouvrir la page de test:
echo    http://localhost:8081/test_boutons_simple.html
echo.

echo 2. Vérifier que les fonctions globales existent
echo    - Cliquer sur "Tester Fonctions Globales"
echo    - Tous doivent être verts (✅)
echo.

echo 3. Tester les boutons de simulation
echo    - Cliquer sur "Approuver", "Refuser", "Voir"
echo    - Vérifier que les notifications apparaissent
echo.

echo 4. Si les tests fonctionnent, tester le vrai dashboard:
echo    http://localhost:8081/admin-dashboard.html
echo.

echo 5. Dans le dashboard:
echo    - Se connecter avec admin@mybank.com
echo    - Aller dans "Demandes"
echo    - Tester les boutons sur une vraie demande
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si les boutons ne fonctionnent pas dans le dashboard:
echo 1. Ouvrir la console (F12)
echo 2. Vérifier les erreurs JavaScript
echo 3. Vérifier que adminDashboard est défini
echo 4. Vérifier que les fonctions globales existent
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause




















