-- Script SQL corrigé pour éviter les erreurs de syntaxe
-- Assurez-vous que chaque ligne est une commande SQL valide

-- Sélectionner la base de données
USE mybankdb;

-- Vérifier que la base de données existe
SELECT DATABASE() as current_database;

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

-- Vérifier les données insérées
SELECT '=== VÉRIFICATION DES DONNÉES ===' as info;
SELECT COUNT(*) as nombre_utilisateurs FROM users;
SELECT COUNT(*) as nombre_comptes FROM bank_accounts;
SELECT COUNT(*) as nombre_cartes FROM credit_cards;
SELECT COUNT(*) as nombre_prets FROM loans;
SELECT COUNT(*) as nombre_transactions FROM transactions;

SELECT 'Script exécuté avec succès!' as message; 