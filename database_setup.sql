-- Script de création de la base de données MyBankManager
-- Exécutez ce script dans MySQL pour créer la base de données

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS mybankdb;
USE mybankdb;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'CLIENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des comptes bancaires
CREATE TABLE IF NOT EXISTS bank_accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(50) NOT NULL UNIQUE,
    account_type VARCHAR(50) NOT NULL, -- COURANT, EPARGNE
    balance DECIMAL(15,2) DEFAULT 0.00,
    user_id BIGINT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des cartes de crédit
CREATE TABLE IF NOT EXISTS credit_cards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    card_number VARCHAR(16) NOT NULL UNIQUE,
    card_type VARCHAR(50) NOT NULL, -- VISA, MASTERCARD
    expiry_date DATE NOT NULL,
    cvv VARCHAR(3) NOT NULL,
    user_id BIGINT,
    bank_account_id BIGINT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (bank_account_id) REFERENCES bank_accounts(id)
);

-- Table des prêts
CREATE TABLE IF NOT EXISTS loans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    loan_type VARCHAR(50) NOT NULL, -- PERSONNEL, IMMOBILIER, AUTO
    amount DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    duration_months INT NOT NULL,
    monthly_payment DECIMAL(15,2) NOT NULL,
    total_amount DECIMAL(15,2) NOT NULL,
    user_id BIGINT,
    status VARCHAR(50) DEFAULT 'EN_ATTENTE', -- EN_ATTENTE, APPROUVE, REFUSE, EN_COURS
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des transactions
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_type VARCHAR(50) NOT NULL, -- DEPOT, RETRAIT, VIREMENT
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    from_account_id BIGINT,
    to_account_id BIGINT,
    user_id BIGINT,
    status VARCHAR(50) DEFAULT 'EN_COURS', -- EN_COURS, COMPLETE, ECHEC
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insérer un utilisateur admin par défaut
INSERT INTO users (full_name, email, password, role) VALUES 
('Admin MyBank', 'admin@mybank.com', 'admin123', 'ADMIN');

-- Insérer quelques utilisateurs de test
INSERT INTO users (full_name, email, password, role) VALUES 
('Ahmed Ben Ali', 'ahmed@email.com', 'password123', 'CLIENT'),
('Fatima Zahra', 'fatima@email.com', 'password123', 'CLIENT'),
('Mohammed Alami', 'mohammed@email.com', 'password123', 'CLIENT');

-- Insérer quelques comptes bancaires de test
INSERT INTO bank_accounts (account_number, account_type, balance, user_id) VALUES 
('MA123456789012345678901234', 'COURANT', 15420.00, 2),
('MA987654321098765432109876', 'EPARGNE', 45800.00, 2),
('MA111111111111111111111111', 'COURANT', 25000.00, 3),
('MA222222222222222222222222', 'EPARGNE', 75000.00, 4);

-- Insérer quelques cartes de crédit de test
INSERT INTO credit_cards (card_number, card_type, expiry_date, cvv, user_id, bank_account_id) VALUES 
('1234567890123456', 'VISA', '2025-12-31', '123', 2, 1),
('9876543210987654', 'MASTERCARD', '2026-06-30', '456', 3, 3);

-- Insérer quelques prêts de test
INSERT INTO loans (loan_type, amount, interest_rate, duration_months, monthly_payment, total_amount, user_id, status) VALUES 
('PERSONNEL', 50000.00, 5.5, 24, 2200.00, 52800.00, 2, 'APPROUVE'),
('IMMOBILIER', 800000.00, 4.8, 240, 4500.00, 1080000.00, 3, 'EN_ATTENTE');

-- Insérer quelques transactions de test
INSERT INTO transactions (transaction_type, amount, description, from_account_id, to_account_id, user_id, status) VALUES 
('DEPOT', 5000.00, 'Dépôt initial', 1, NULL, 2, 'COMPLETE'),
('VIREMENT', 1000.00, 'Virement vers épargne', 1, 2, 2, 'COMPLETE'),
('RETRAIT', 500.00, 'Retrait ATM', 1, NULL, 2, 'COMPLETE');

-- Afficher les données pour vérification
SELECT 'Utilisateurs:' as info;
SELECT id, full_name, email, role, created_at FROM users;

SELECT 'Comptes bancaires:' as info;
SELECT id, account_number, account_type, balance, user_id FROM bank_accounts;

SELECT 'Prêts:' as info;
SELECT id, loan_type, amount, status, user_id FROM loans;

SELECT 'Transactions:' as info;
SELECT id, transaction_type, amount, status, user_id FROM transactions; 