-- ========================================
-- STRUCTURE COMPLETE BASE DE DONNEES MYBANKMANAGER
-- Version Professionelle et Securisee
-- ========================================

-- Supprimer la base existante si elle existe
DROP DATABASE IF EXISTS mybankmanager_complete;

-- Creer la nouvelle base de donnees
CREATE DATABASE mybankmanager_complete 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE mybankmanager_complete;

-- ========================================
-- 1. TABLES PRINCIPALES
-- ========================================

-- Table des rôles (pour une gestion flexible)
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_role_name (name)
);

-- Table des utilisateurs (complète et sécurisée)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    country VARCHAR(100) DEFAULT 'Maroc',
    role_id INT NOT NULL DEFAULT 2,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION') DEFAULT 'PENDING_VERIFICATION',
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    login_attempts INT DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_user_email (email),
    INDEX idx_user_uuid (uuid),
    INDEX idx_user_status (status),
    INDEX idx_user_role (role_id)
);

-- Table des types de comptes bancaires
CREATE TABLE account_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    minimum_balance DECIMAL(15,2) DEFAULT 0.00,
    monthly_fee DECIMAL(10,2) DEFAULT 0.00,
    interest_rate DECIMAL(5,4) DEFAULT 0.0000,
    overdraft_limit DECIMAL(15,2) DEFAULT 0.00,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des comptes bancaires
CREATE TABLE bank_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    iban VARCHAR(34) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    account_type_id INT NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    available_balance DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'MAD',
    status ENUM('ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED') DEFAULT 'ACTIVE',
    opened_date DATE DEFAULT (CURRENT_DATE),
    closed_date DATE NULL,
    overdraft_limit DECIMAL(15,2) DEFAULT 0.00,
    last_transaction_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (account_type_id) REFERENCES account_types(id),
    INDEX idx_account_number (account_number),
    INDEX idx_account_iban (iban),
    INDEX idx_account_user (user_id),
    INDEX idx_account_status (status)
);

-- Table des types de transactions
CREATE TABLE transaction_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_debit BOOLEAN NOT NULL,
    requires_approval BOOLEAN DEFAULT FALSE,
    max_daily_limit DECIMAL(15,2),
    fee_amount DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des transactions (historique non modifiable)
CREATE TABLE transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) NOT NULL UNIQUE DEFAULT (UUID()),
    reference_number VARCHAR(50) NOT NULL UNIQUE,
    from_account_id INT,
    to_account_id INT,
    transaction_type_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'MAD',
    description TEXT,
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED') DEFAULT 'PENDING',
    balance_before DECIMAL(15,2),
    balance_after DECIMAL(15,2),
    fee_amount DECIMAL(10,2) DEFAULT 0.00,
    exchange_rate DECIMAL(10,6) DEFAULT 1.000000,
    merchant_name VARCHAR(255),
    merchant_category VARCHAR(100),
    location VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    approved_by INT,
    approved_at TIMESTAMP NULL,
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (transaction_type_id) REFERENCES transaction_types(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX idx_transaction_ref (reference_number),
    INDEX idx_transaction_uuid (uuid),
    INDEX idx_transaction_from (from_account_id),
    INDEX idx_transaction_to (to_account_id),
    INDEX idx_transaction_date (created_at),
    INDEX idx_transaction_status (status),
    INDEX idx_transaction_amount (amount)
);

-- ========================================
-- 2. TABLES PRODUITS BANCAIRES
-- ========================================

-- Table des types de prêts
CREATE TABLE loan_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    min_amount DECIMAL(15,2) NOT NULL,
    max_amount DECIMAL(15,2) NOT NULL,
    min_duration_months INT NOT NULL,
    max_duration_months INT NOT NULL,
    base_interest_rate DECIMAL(5,4) NOT NULL,
    required_income DECIMAL(15,2),
    max_debt_ratio DECIMAL(5,2) DEFAULT 33.00,
    required_documents JSON,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des prêts
CREATE TABLE loans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    loan_number VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    loan_type_id INT NOT NULL,
    amount_requested DECIMAL(15,2) NOT NULL,
    amount_approved DECIMAL(15,2),
    duration_months INT NOT NULL,
    interest_rate DECIMAL(5,4) NOT NULL,
    monthly_payment DECIMAL(10,2),
    total_amount DECIMAL(15,2),
    purpose TEXT,
    status ENUM('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'ACTIVE', 'COMPLETED', 'DEFAULTED') DEFAULT 'PENDING',
    application_date DATE DEFAULT (CURRENT_DATE),
    approval_date DATE NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    outstanding_balance DECIMAL(15,2) DEFAULT 0.00,
    next_payment_date DATE NULL,
    approved_by INT,
    rejection_reason TEXT,
    documents JSON,
    guarantor_info JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (loan_type_id) REFERENCES loan_types(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX idx_loan_number (loan_number),
    INDEX idx_loan_user (user_id),
    INDEX idx_loan_status (status),
    INDEX idx_loan_dates (application_date, approval_date)
);

-- Table des types de cartes
CREATE TABLE card_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    annual_fee DECIMAL(10,2) DEFAULT 0.00,
    credit_limit_min DECIMAL(15,2),
    credit_limit_max DECIMAL(15,2),
    interest_rate DECIMAL(5,4),
    cashback_rate DECIMAL(5,4) DEFAULT 0.0000,
    rewards_program JSON,
    benefits JSON,
    required_income DECIMAL(15,2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des cartes bancaires
CREATE TABLE credit_cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    card_number VARCHAR(19) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    card_type_id INT NOT NULL,
    associated_account_id INT NOT NULL,
    credit_limit DECIMAL(15,2) NOT NULL,
    available_credit DECIMAL(15,2) NOT NULL,
    current_balance DECIMAL(15,2) DEFAULT 0.00,
    status ENUM('PENDING', 'ACTIVE', 'BLOCKED', 'EXPIRED', 'CANCELLED') DEFAULT 'PENDING',
    issue_date DATE DEFAULT (CURRENT_DATE),
    expiry_date DATE NOT NULL,
    cvv_hash VARCHAR(255),
    pin_hash VARCHAR(255),
    is_contactless BOOLEAN DEFAULT TRUE,
    daily_limit DECIMAL(10,2) DEFAULT 5000.00,
    monthly_limit DECIMAL(15,2) DEFAULT 50000.00,
    last_used TIMESTAMP NULL,
    approved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (card_type_id) REFERENCES card_types(id),
    FOREIGN KEY (associated_account_id) REFERENCES bank_accounts(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX idx_card_number (card_number),
    INDEX idx_card_user (user_id),
    INDEX idx_card_status (status),
    INDEX idx_card_expiry (expiry_date)
);

-- Table des types d'assurance
CREATE TABLE insurance_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    coverage_details JSON,
    premium_calculation JSON,
    min_coverage DECIMAL(15,2),
    max_coverage DECIMAL(15,2),
    age_restrictions JSON,
    required_documents JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des assurances
CREATE TABLE insurances (
    id INT PRIMARY KEY AUTO_INCREMENT,
    policy_number VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    insurance_type_id INT NOT NULL,
    coverage_amount DECIMAL(15,2) NOT NULL,
    premium_amount DECIMAL(10,2) NOT NULL,
    payment_frequency ENUM('MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL') DEFAULT 'MONTHLY',
    status ENUM('PENDING', 'ACTIVE', 'SUSPENDED', 'CANCELLED', 'EXPIRED') DEFAULT 'PENDING',
    start_date DATE,
    end_date DATE,
    next_payment_date DATE,
    beneficiaries JSON,
    medical_info JSON,
    documents JSON,
    approved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (insurance_type_id) REFERENCES insurance_types(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    INDEX idx_insurance_policy (policy_number),
    INDEX idx_insurance_user (user_id),
    INDEX idx_insurance_status (status)
);

-- ========================================
-- 3. TABLES DEMANDES ET WORKFLOW
-- ========================================

-- Table des types de demandes
CREATE TABLE request_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    required_fields JSON,
    approval_workflow JSON,
    auto_approval_rules JSON,
    required_documents JSON,
    processing_time_days INT DEFAULT 7,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des demandes générales
CREATE TABLE requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_number VARCHAR(20) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    request_type_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    data JSON,
    documents JSON,
    status ENUM('SUBMITTED', 'UNDER_REVIEW', 'REQUIRES_INFO', 'APPROVED', 'REJECTED', 'CANCELLED') DEFAULT 'SUBMITTED',
    priority ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') DEFAULT 'NORMAL',
    assigned_to INT,
    reviewed_by INT,
    approval_notes TEXT,
    rejection_reason TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_at TIMESTAMP NULL,
    reviewed_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (request_type_id) REFERENCES request_types(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (reviewed_by) REFERENCES users(id),
    INDEX idx_request_number (request_number),
    INDEX idx_request_user (user_id),
    INDEX idx_request_status (status),
    INDEX idx_request_assigned (assigned_to),
    INDEX idx_request_dates (submitted_at, due_date)
);

-- ========================================
-- 4. TABLES AUDIT ET LOGS
-- ========================================

-- Table des logs d'activité
CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_log_user (user_id),
    INDEX idx_log_action (action),
    INDEX idx_log_entity (entity_type, entity_id),
    INDEX idx_log_date (created_at)
);

-- Table des tentatives de connexion
CREATE TABLE login_attempts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    failure_reason VARCHAR(255),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_login_email (email),
    INDEX idx_login_ip (ip_address),
    INDEX idx_login_date (attempted_at)
);

-- Table des sessions utilisateur
CREATE TABLE user_sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_user (user_id),
    INDEX idx_session_expires (expires_at),
    INDEX idx_session_activity (last_activity)
);

-- ========================================
-- 5. VUES POUR FACILITER LES REQUETES
-- ========================================

-- Vue pour les comptes avec informations utilisateur
CREATE VIEW user_accounts_view AS
SELECT 
    ba.id,
    ba.account_number,
    ba.iban,
    ba.balance,
    ba.available_balance,
    ba.status as account_status,
    u.id as user_id,
    u.full_name,
    u.email,
    at.name as account_type,
    at.minimum_balance,
    at.monthly_fee
FROM bank_accounts ba
JOIN users u ON ba.user_id = u.id
JOIN account_types at ON ba.account_type_id = at.id;

-- Vue pour les transactions avec détails
CREATE VIEW transaction_details_view AS
SELECT 
    t.id,
    t.reference_number,
    t.amount,
    t.description,
    t.status,
    t.created_at,
    fa.account_number as from_account,
    ta.account_number as to_account,
    tt.name as transaction_type,
    tt.is_debit,
    u.full_name as user_name
FROM transactions t
LEFT JOIN bank_accounts fa ON t.from_account_id = fa.id
LEFT JOIN bank_accounts ta ON t.to_account_id = ta.id
JOIN transaction_types tt ON t.transaction_type_id = tt.id
LEFT JOIN users u ON fa.user_id = u.id OR ta.user_id = u.id;

-- Vue pour le tableau de bord administrateur
CREATE VIEW admin_dashboard_view AS
SELECT 
    (SELECT COUNT(*) FROM users WHERE status = 'ACTIVE') as active_users,
    (SELECT COUNT(*) FROM bank_accounts WHERE status = 'ACTIVE') as active_accounts,
    (SELECT COUNT(*) FROM requests WHERE status = 'SUBMITTED') as pending_requests,
    (SELECT COUNT(*) FROM loans WHERE status = 'PENDING') as pending_loans,
    (SELECT COUNT(*) FROM credit_cards WHERE status = 'PENDING') as pending_cards,
    (SELECT SUM(balance) FROM bank_accounts WHERE status = 'ACTIVE') as total_deposits,
    (SELECT SUM(outstanding_balance) FROM loans WHERE status = 'ACTIVE') as total_loans_outstanding;
