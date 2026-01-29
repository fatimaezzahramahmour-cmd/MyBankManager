-- Script de test pour vérifier la connexion MySQL et les données
-- À exécuter dans MySQL Workbench

-- 1. Vérifier la connexion à la base de données
SELECT '=== TEST DE CONNEXION ===' as info;
SELECT DATABASE() as base_de_donnees_courante;
SELECT VERSION() as version_mysql;

-- 2. Vérifier que la base de données mybankdb existe
SELECT '=== VÉRIFICATION BASE DE DONNÉES ===' as info;
SHOW DATABASES LIKE 'mybankdb';

-- 3. Utiliser la base de données
USE mybankdb;

-- 4. Vérifier les tables existantes
SELECT '=== TABLES DISPONIBLES ===' as info;
SHOW TABLES;

-- 5. Vérifier la structure des tables
SELECT '=== STRUCTURE TABLE USERS ===' as info;
DESCRIBE users;

SELECT '=== STRUCTURE TABLE BANK_ACCOUNTS ===' as info;
DESCRIBE bank_accounts;

SELECT '=== STRUCTURE TABLE LOANS ===' as info;
DESCRIBE loans;

SELECT '=== STRUCTURE TABLE CREDIT_CARDS ===' as info;
DESCRIBE credit_cards;

SELECT '=== STRUCTURE TABLE TRANSACTIONS ===' as info;
DESCRIBE transactions;

-- 6. Vérifier les données dans chaque table
SELECT '=== DONNÉES UTILISATEURS ===' as info;
SELECT COUNT(*) as nombre_utilisateurs FROM users;
SELECT id, full_name, email, role, created_at FROM users;

SELECT '=== DONNÉES COMPTES BANCAIRES ===' as info;
SELECT COUNT(*) as nombre_comptes FROM bank_accounts;
SELECT id, account_number, account_type, balance, user_id, status FROM bank_accounts;

SELECT '=== DONNÉES CARTES DE CRÉDIT ===' as info;
SELECT COUNT(*) as nombre_cartes FROM credit_cards;
SELECT id, card_number, card_type, user_id, bank_account_id, status FROM credit_cards;

SELECT '=== DONNÉES PRÊTS ===' as info;
SELECT COUNT(*) as nombre_prets FROM loans;
SELECT id, loan_type, amount, status, user_id FROM loans;

SELECT '=== DONNÉES TRANSACTIONS ===' as info;
SELECT COUNT(*) as nombre_transactions FROM transactions;
SELECT id, transaction_type, amount, status, user_id FROM transactions;

-- 7. Test de connexion avec les comptes de test
SELECT '=== TEST COMPTES DE CONNEXION ===' as info;
SELECT 'Admin test:' as compte, 
       CASE WHEN EXISTS(SELECT 1 FROM users WHERE email = 'admin@mybank.com') 
            THEN 'EXISTE' ELSE 'N\'EXISTE PAS' END as statut;

SELECT 'Client test:' as compte,
       CASE WHEN EXISTS(SELECT 1 FROM users WHERE email = 'ahmed@email.com') 
            THEN 'EXISTE' ELSE 'N\'EXISTE PAS' END as statut;

-- 8. Vérifier les contraintes de clés étrangères
SELECT '=== VÉRIFICATION CONTRAINTES ===' as info;
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
WHERE TABLE_SCHEMA = 'mybankdb' 
AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 9. Test de performance
SELECT '=== TEST PERFORMANCE ===' as info;
SELECT 'Temps de réponse pour requête simple:' as test;
SELECT COUNT(*) FROM users;

-- 10. Résumé final
SELECT '=== RÉSUMÉ FINAL ===' as info;
SELECT 
    'Base de données:' as element,
    CASE WHEN DATABASE() = 'mybankdb' THEN 'CONNECTÉE' ELSE 'NON CONNECTÉE' END as statut
UNION ALL
SELECT 
    'Tables:' as element,
    CONCAT((SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'mybankdb'), ' tables') as statut
UNION ALL
SELECT 
    'Utilisateurs:' as element,
    CONCAT((SELECT COUNT(*) FROM users), ' utilisateurs') as statut
UNION ALL
SELECT 
    'Comptes:' as element,
    CONCAT((SELECT COUNT(*) FROM bank_accounts), ' comptes') as statut
UNION ALL
SELECT 
    'Prêts:' as element,
    CONCAT((SELECT COUNT(*) FROM loans), ' prêts') as statut;

SELECT '✅ CONNEXION MYSQL WORKBENCH RÉUSSIE !' as message; 