@echo off
echo ========================================
echo 📊 TEST DASHBOARD AVEC DEMANDES
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
echo 🔧 ÉTAPE 2 - VÉRIFIER LES STATISTIQUES :
echo 1. Rechargez la page (F5)
echo 2. Allez dans l'onglet "Demandes"
echo 3. Vérifiez que vous voyez maintenant :
echo    ✅ En attente: 5 demandes
echo    ✅ Approuvées: 3 demandes  
echo    ✅ Refusées: 3 demandes
echo    ✅ Total: 11 demandes
echo.
echo 🔧 ÉTAPE 3 - VÉRIFIER LES DÉTAILS :
echo 1. Vérifiez la section "Vue d'ensemble" :
echo    ✅ Pourcentages calculés (45% en attente, 27% approuvées, 27% refusées)
echo    ✅ Demandes urgentes: 2 (plus de 3 jours)
echo    ✅ Demandes traîtées aujourd'hui: 0
echo.
echo 2. Vérifiez la section "Répartition par type" :
echo    ✅ Prêts: 4 demandes
echo    ✅ Cartes: 4 demandes
echo    ✅ Assurances: 3 demandes
echo.
echo ========================================
echo 📊 DEMANDES CRÉÉES :
echo ========================================
echo.
echo 💰 PRÊTS (4) :
echo - PRET001: En attente - Ahmed Benali (50k DH)
echo - PRET002: Approuvée - Fatima Zahra (75k DH)
echo - PRET003: Refusée - Mohammed Alami (100k DH)
echo - URGENT001: En attente - Youssef Benjelloun (30k DH) - URGENT
echo.
echo 💳 CARTES (4) :
echo - CARTE001: En attente - Amina Tazi (5k DH)
echo - CARTE002: Approuvée - Hassan El Fassi (3k DH)
echo - CARTE003: Refusée - Leila Mansouri (10k DH)
echo - URGENT002: En attente - Sara El Khadiri (2k DH) - URGENT
echo.
echo 🛡️ ASSURANCES (3) :
echo - ASSUR001: En attente - Karim Idrissi (25k DH)
echo - ASSUR002: Approuvée - Nadia Benslimane (50k DH)
echo - ASSUR003: Refusée - Omar Cherkaoui (100k DH)
echo.
echo ========================================
echo ✅ RÉSULTATS ATTENDUS :
echo ========================================
echo.
echo 📊 STATISTIQUES :
echo ✅ En attente: 5 demandes (45%)
echo ✅ Approuvées: 3 demandes (27%)
echo ✅ Refusées: 3 demandes (27%)
echo ✅ Total: 11 demandes
echo.
echo 🚨 URGENCES :
echo ✅ Demandes urgentes: 2 (plus de 3 jours)
echo ✅ Demandes traîtées aujourd'hui: 0
echo.
echo 📈 RÉPARTITION :
echo ✅ Prêts: 4 demandes
echo ✅ Cartes: 4 demandes  
echo ✅ Assurances: 3 demandes
echo.
echo ========================================
echo 🔧 DIAGNOSTIC :
echo ========================================
echo.
echo Si les statistiques restent à 0 :
echo 1. Vérifiez que le code JavaScript a été exécuté
echo 2. Vérifiez la console pour les messages de succès
echo 3. Rechargez la page après avoir créé les demandes
echo.
echo Si les calculs sont incorrects :
echo 1. Vérifiez que les demandes ont le bon format
echo 2. Vérifiez que les statuts sont corrects
echo 3. Vérifiez que les dates sont valides
echo.
echo ========================================
echo ✅ Test terminé
echo ========================================

pause














