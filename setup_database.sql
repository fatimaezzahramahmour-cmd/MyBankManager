-- Script de configuration complète de la base de données MyBankManager
-- À exécuter dans MySQL Workbench

-- 1. Créer la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS mybankdb;
USE mybankdb;

-- 2. Créer les tables si elles n'existent pas
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'CLIENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bank_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(50) NOT NULL UNIQUE,
    account_type VARCHAR(50) NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    user_id BIGINT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS credit_cards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    card_number VARCHAR(16) NOT NULL UNIQUE,
    card_type VARCHAR(50) NOT NULL,
    expiry_date DATE NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    user_id BIGINT,
    bank_account_id BIGINT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id)
);

CREATE TABLE IF NOT EXISTS loans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    duration_months INT NOT NULL,
    monthly_payment DECIMAL(15,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    user_id BIGINT,
    status VARCHAR(50) DEFAULT 'EN_ATTENTE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_type VARCHAR(50) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    from_account_id BIGINT,
    to_account_id BIGINT,
    user_id BIGINT,
    status VARCHAR(50) DEFAULT 'EN_COURS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table pour toutes les demandes (prêts, cartes, assurances, comptes)
CREATE TABLE IF NOT EXISTS requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    request_type ENUM('LOAN', 'CREDIT_CARD', 'INSURANCE', 'ACCOUNT') NOT NULL,
    sub_type VARCHAR(100), -- Type spécifique (personnel, immobilier, auto, etc.)
    amount DECIMAL(15,2),
    details JSON, -- Données spécifiques selon le type
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    admin_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    processed_by BIGINT, -- ID de l'admin qui a traité la demande
    processed_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (processed_by) REFERENCES users(id)
);

-- 3. Insérer les données de test
-- Insérer un utilisateur admin par défaut
INSERT IGNORE INTO users (id, full_name, email, password, role) VALUES 
(1, 'Admin MyBank', 'admin@mybank.com', 'admin123', 'ADMIN');

-- Insérer quelques utilisateurs de test
INSERT IGNORE INTO users (id, full_name, email, password, role) VALUES 
(2, 'Ahmed Ben Ali', 'ahmed@email.com', 'password123', 'CLIENT'),
(3, 'Fatima Zahra', 'fatima@email.com', 'password123', 'CLIENT'),
(4, 'Mohammed Alami', 'mohammed@email.com', 'password123', 'CLIENT');

-- Insérer quelques comptes bancaires de test
INSERT IGNORE INTO bank_accounts (id, account_number, account_type, balance, user_id, status) VALUES 
(1, 'MA123456789012345678901234', 'COURANT', 15420.00, 2, 'ACTIVE'),
(2, 'MA987654321098765432109876', 'EPARGNE', 45800.00, 2, 'ACTIVE'),
(3, 'MA111111111111111111111111', 'COURANT', 25000.00, 3, 'ACTIVE'),
(4, 'MA222222222222222222222222', 'EPARGNE', 75000.00, 4, 'ACTIVE');

-- Insérer quelques cartes de crédit de test
INSERT IGNORE INTO credit_cards (id, card_number, card_type, expiry_date, cvv, user_id, bank_account_id, status) VALUES 
(1, '1234567890123456', 'VISA', '2025-12-31', '123', 2, 1, 'ACTIVE'),
(2, '9876543210987654', 'MASTERCARD', '2026-06-30', '456', 3, 3, 'ACTIVE');

-- Insérer quelques prêts de test
INSERT IGNORE INTO loans (id, loan_type, amount, interest_rate, duration_months, monthly_payment, total_amount, user_id, status) VALUES 
(1, 'PERSONNEL', 50000.00, 5.5, 24, 2200.00, 52800.00, 2, 'APPROUVE'),
(2, 'IMMOBILIER', 800000.00, 4.8, 240, 4500.00, 1080000.00, 3, 'EN_ATTENTE');

-- Insérer quelques transactions de test
INSERT IGNORE INTO transactions (id, transaction_type, amount, description, from_account_id, to_account_id, user_id, status) VALUES 
(1, 'DEPOT', 5000.00, 'Dépôt initial', 1, NULL, 2, 'COMPLETE'),
(2, 'VIREMENT', 1000.00, 'Virement vers épargne', 1, 2, 2, 'COMPLETE'),
(3, 'RETRAIT', 500.00, 'Retrait ATM', 1, NULL, 2, 'COMPLETE');

-- 4. Vérifier les données insérées
SELECT '=== VÉRIFICATION DES DONNÉES ===' as info;
SELECT COUNT(*) as nombre_utilisateurs FROM users;
SELECT COUNT(*) as nombre_comptes FROM bank_accounts;
SELECT COUNT(*) as nombre_cartes FROM credit_cards;
SELECT COUNT(*) as nombre_prets FROM loans;
SELECT COUNT(*) as nombre_transactions FROM transactions;

-- 5. Afficher les données pour vérification
SELECT '=== UTILISATEURS ===' as info;
SELECT id, full_name, email, role, created_at FROM users;

SELECT '=== COMPTES BANCAIRES ===' as info;
SELECT id, account_number, account_type, balance, user_id, status FROM bank_accounts;

SELECT '=== CARTES DE CRÉDIT ===' as info;
SELECT id, card_number, card_type, user_id, bank_account_id, status FROM credit_cards;

SELECT '=== PRÊTS ===' as info;
SELECT id, loan_type, amount, status, user_id FROM loans;

SELECT '=== TRANSACTIONS ===' as info;
SELECT id, transaction_type, amount, status, user_id FROM transactions;

-- 6. Test de connexion avec les comptes
SELECT '=== TEST COMPTES DE CONNEXION ===' as info;
SELECT 'Admin test:' as compte, 
       CASE WHEN EXISTS(SELECT 1 FROM users WHERE email = 'admin@mybank.com') 
            THEN 'EXISTE' ELSE 'N\'EXISTE PAS' END as statut;

SELECT 'Client test:' as compte,
       CASE WHEN EXISTS(SELECT 1 FROM users WHERE email = 'ahmed@email.com') 
            THEN 'EXISTE' ELSE 'N\'EXISTE PAS' END as statut;

-- 7. Résumé final
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

SELECT '✅ BASE DE DONNÉES CONFIGURÉE AVEC SUCCÈS !' as message; 