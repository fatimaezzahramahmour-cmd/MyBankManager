@echo off
echo ========================================
echo 📊 TEST GRAPHIQUES AVEC DONNÉES
echo ========================================

echo.
echo 1. Vérification du serveur...
netstat -ano | findstr :8081 >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur Node.js fonctionne sur le port 8081
) else (
    echo ❌ Serveur Node.js non trouvé sur le port 8081
    echo Démarrage du serveur...
    start /B node simple_server.js
    timeout 3 >nul
)

echo.
echo 2. Ouverture du dashboard admin...
start http://localhost:8081/admin-dashboard.html

echo.
echo ========================================
echo 📋 ÉTAPES À SUIVRE :
echo ========================================
echo.
echo 🔧 ÉTAPE 1 - CRÉER LES DEMANDES DE TEST :
echo 1. Dans le dashboard admin, appuyez sur F12
echo 2. Allez dans l'onglet "Console"
echo 3. Copiez-collez le contenu du fichier create_test_demandes.js
echo 4. Appuyez sur Entrée
echo.
echo 🔧 ÉTAPE 2 - VÉRIFIER LES GRAPHIQUES :
echo 1. Rechargez la page (F5)
echo 2. Allez dans l'onglet "Analytics"
echo 3. Vérifiez que les graphiques affichent des données :
echo    ✅ Graphique d'évolution des demandes (ligne)
echo    ✅ Graphique de répartition par type (donut)
echo    ✅ Graphique de performance hebdomadaire (barres)
echo.
echo ========================================
echo 📊 GRAPHIQUES ATTENDUS :
echo ========================================
echo.
echo 📈 GRAPHIQUE D'ÉVOLUTION :
echo ✅ Titre : "Évolution des demandes par mois"
echo ✅ Type : Ligne avec remplissage
echo ✅ Données : 6 derniers mois
echo ✅ Axes : Nombre de demandes vs Mois
echo.
echo 🥧 GRAPHIQUE RÉPARTITION :
echo ✅ Titre : "Répartition des demandes par type"
echo ✅ Type : Donut chart
echo ✅ Données : Prêts, Cartes, Assurances
echo ✅ Légende : En bas avec couleurs
echo.
echo 📊 GRAPHIQUE PERFORMANCE :
echo ✅ Titre : "Performance hebdomadaire"
echo ✅ Type : Barres arrondies
echo ✅ Données : Jours de la semaine
echo ✅ Couleur : Vert (#10b981)
echo.
echo ========================================
echo ✅ FONCTIONNALITÉS AJOUTÉES :
echo ========================================
echo.
echo 🔧 DONNÉES DYNAMIQUES :
echo ✅ Graphiques utilisent les vraies données
echo ✅ Mise à jour automatique
echo ✅ Calculs en temps réel
echo.
echo 🎨 DESIGN AMÉLIORÉ :
echo ✅ Titres explicites
echo ✅ Axes avec labels
echo ✅ Couleurs cohérentes
echo ✅ Responsive design
echo.
echo 📈 ANALYSES INTELLIGENTES :
echo ✅ Évolution mensuelle
echo ✅ Répartition par type
echo ✅ Performance hebdomadaire
echo ✅ Données filtrées par date
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si les graphiques sont vides :
echo 1. Vérifiez que Chart.js est chargé
echo 2. Vérifiez que des demandes existent
echo 3. Vérifiez la console pour les erreurs
echo.
echo Si les données sont incorrectes :
echo 1. Vérifiez le format des dates
echo 2. Vérifiez les types de demandes
echo 3. Vérifiez que les calculs sont corrects
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause
