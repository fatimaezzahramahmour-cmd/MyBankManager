@echo off
echo ========================================
echo Test: Force Suppression Demandes
echo ========================================

echo.
echo 🚀 TEST DE SUPPRESSION FORCÉE
echo.

echo 1. Ouvrir la console du navigateur
echo    - Aller sur http://localhost:8081/admin-dashboard.html
echo    - Se connecter avec admin@mybank.com
echo    - Appuyer sur F12 pour ouvrir les outils de développement
echo    - Aller dans l'onglet "Console"
echo.

echo 2. Vérifier les demandes existantes
echo    - Cliquer sur "Demandes"
echo    - Dans la console, taper: localStorage.getItem('admin-demandes')
echo    - Copier le résultat pour vérification
echo.

echo 3. Test de suppression forcée
echo    - Dans la console, taper ces commandes une par une:
echo.
echo    // Méthode 1: Suppression directe
echo    let requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
echo    console.log('Demandes avant:', requests.length);
echo    if (requests.length > 0) { requests.shift(); }
echo    localStorage.setItem('admin-demandes', JSON.stringify(requests));
echo    console.log('Demandes après:', requests.length);
echo    window.location.reload();
echo.

echo 4. Test de suppression multiple
echo    - Si ça fonctionne, taper pour supprimer toutes les demandes:
echo.
echo    // Supprimer toutes les demandes
echo    localStorage.setItem('admin-demandes', '[]');
echo    window.location.reload();
echo.

echo 5. Test de suppression par index
echo    - Pour supprimer une demande spécifique:
echo.
echo    // Supprimer la demande à l'index 0
echo    let requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
echo    requests.splice(0, 1);
echo    localStorage.setItem('admin-demandes', JSON.stringify(requests));
echo    window.location.reload();
echo.

echo 6. Vérification finale
echo    - Vérifier que les demandes ont disparu
echo    - Vérifier que localStorage.getItem('admin-demandes') retourne '[]'
echo    - Vérifier que la page affiche "Aucune demande pour le moment"
echo.

echo ========================================
echo 📊 RÉSULTATS ATTENDUS:
echo ========================================

echo ✅ Si tout fonctionne:
echo    - Les demandes disparaissent de la liste
echo    - localStorage est mis à jour
echo    - La page se recharge automatiquement
echo    - Le message "Aucune demande" apparaît
echo.

echo ❌ Si problème:
echo    - Vérifier que localStorage est accessible
echo    - Vérifier qu'il n'y a pas d'erreurs JavaScript
echo    - Vérifier que les données sont bien au format JSON
echo.

echo ========================================
echo 🔧 DIAGNOSTIC:
echo ========================================

echo Si localStorage.getItem('admin-demandes') retourne null:
echo - Créer de nouvelles demandes d'abord
echo.

echo Si JSON.parse() échoue:
echo - Les données sont corrompues, les supprimer
echo - localStorage.removeItem('admin-demandes');
echo.

echo Si la page ne se recharge pas:
echo - Taper manuellement: window.location.reload();
echo.

echo ========================================
echo ✅ Test terminé
echo ========================================

pause















