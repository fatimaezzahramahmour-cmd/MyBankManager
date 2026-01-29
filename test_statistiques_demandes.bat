@echo off
echo ========================================
echo 📊 TEST STATISTIQUES DÉTAILLÉES
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
echo 📋 TESTS À EFFECTUER :
echo ========================================
echo.
echo 📊 TEST 1 - STATISTIQUES PRINCIPALES :
echo 1. Connectez-vous en tant qu'admin :
echo    - Email : admin@mybank.com
echo    - Mot de passe : admin123
echo.
echo 2. Allez dans l'onglet "Demandes"
echo 3. Vérifiez le header avec statistiques :
echo    ✅ Nombre de demandes en attente
echo    ✅ Nombre de demandes approuvées
echo    ✅ Nombre de demandes refusées
echo    ✅ Total des demandes
echo.
echo 📊 TEST 2 - STATISTIQUES DÉTAILLÉES :
echo 1. Vérifiez la section "Vue d'ensemble" :
echo    ✅ Cartes avec icônes colorées
echo    ✅ Pourcentages calculés automatiquement
echo    ✅ Demandes urgentes (plus de 3 jours)
echo    ✅ Demandes traîtées aujourd'hui
echo    ✅ Date de mise à jour
echo.
echo 📊 TEST 3 - RÉPARTITION PAR TYPE :
echo 1. Vérifiez la section "Répartition par type" :
echo    ✅ Nombre de demandes de prêts
echo    ✅ Nombre de demandes de cartes
echo    ✅ Nombre de demandes d'assurances
echo    ✅ Icônes spécifiques à chaque type
echo.
echo 📊 TEST 4 - MISE À JOUR EN TEMPS RÉEL :
echo 1. Créez une nouvelle demande :
echo    - Allez sur http://localhost:8081/assurances.html
echo    - Connectez-vous avec un compte utilisateur
echo    - Soumettez une demande d'assurance
echo.
echo 2. Retournez au dashboard admin
echo 3. Vérifiez que les statistiques se mettent à jour :
echo    ✅ Total augmente
echo    ✅ Demandes en attente augmente
echo    ✅ Pourcentages recalculés
echo.
echo ========================================
echo ✅ FONCTIONNALITÉS AJOUTÉES :
echo ========================================
echo.
echo 📊 STATISTIQUES DÉTAILLÉES :
echo ✅ Compteurs en temps réel
echo ✅ Pourcentages automatiques
echo ✅ Demandes urgentes (3+ jours)
echo ✅ Demandes traîtées aujourd'hui
echo ✅ Répartition par type de service
echo ✅ Date de dernière mise à jour
echo.
echo 🎨 DESIGN AMÉLIORÉ :
echo ✅ Cartes avec design moderne
echo ✅ Icônes colorées par statut/type
echo ✅ Animations au survol
echo ✅ Layout responsive
echo ✅ Couleurs cohérentes
echo.
echo 🔧 CALCULS INTELLIGENTS :
echo ✅ Pourcentages basés sur le total
echo ✅ Détection des demandes urgentes
echo ✅ Comptage des demandes du jour
echo ✅ Mise à jour automatique
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si les statistiques ne s'affichent pas :
echo 1. Vérifiez que le JavaScript est chargé
echo 2. Vérifiez la console pour les erreurs
echo 3. Vérifiez que des demandes existent
echo.
echo Si les calculs sont incorrects :
echo 1. Vérifiez le format des dates
echo 2. Vérifiez les valeurs de statut
echo 3. Vérifiez les types de demandes
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause














