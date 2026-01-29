-- ========================================
-- DONNEES INITIALES MYBANKMANAGER
-- Rôles, Types, et Données de Base
-- ========================================

USE mybankmanager_complete;

-- ========================================
-- 1. ROLES ET PERMISSIONS
-- ========================================

INSERT INTO roles (name, description, permissions) VALUES
('SUPER_ADMIN', 'Super administrateur avec tous les droits', JSON_OBJECT(
    'users', JSON_ARRAY('create', 'read', 'update', 'delete'),
    'accounts', JSON_ARRAY('create', 'read', 'update', 'delete', 'freeze'),
    'transactions', JSON_ARRAY('read', 'approve', 'cancel'),
    'loans', JSON_ARRAY('read', 'approve', 'reject', 'manage'),
    'cards', JSON_ARRAY('read', 'approve', 'reject', 'manage'),
    'insurance', JSON_ARRAY('read', 'approve', 'reject', 'manage'),
    'requests', JSON_ARRAY('read', 'assign', 'approve', 'reject'),
    'reports', JSON_ARRAY('generate', 'export'),
    'system', JSON_ARRAY('backup', 'restore', 'configure')
)),
('CLIENT', 'Client standard', JSON_OBJECT(
    'accounts', JSON_ARRAY('read'),
    'transactions', JSON_ARRAY('read', 'create'),
    'loans', JSON_ARRAY('apply', 'read'),
    'cards', JSON_ARRAY('apply', 'read'),
    'insurance', JSON_ARRAY('apply', 'read'),
    'requests', JSON_ARRAY('create', 'read'),
    'profile', JSON_ARRAY('read', 'update')
)),
('ADMIN', 'Administrateur standard', JSON_OBJECT(
    'users', JSON_ARRAY('read', 'update'),
    'accounts', JSON_ARRAY('read', 'update'),
    'transactions', JSON_ARRAY('read', 'approve'),
    'loans', JSON_ARRAY('read', 'approve', 'reject'),
    'cards', JSON_ARRAY('read', 'approve', 'reject'),
    'insurance', JSON_ARRAY('read', 'approve', 'reject'),
    'requests', JSON_ARRAY('read', 'assign', 'approve', 'reject'),
    'reports', JSON_ARRAY('generate')
)),
('AGENT', 'Agent de service client', JSON_OBJECT(
    'users', JSON_ARRAY('read'),
    'accounts', JSON_ARRAY('read'),
    'transactions', JSON_ARRAY('read'),
    'requests', JSON_ARRAY('read', 'update'),
    'support', JSON_ARRAY('create', 'read', 'update')
));

-- ========================================
-- 2. UTILISATEUR ADMIN PAR DEFAUT
-- ========================================

INSERT INTO users (
    email, 
    password_hash, 
    full_name, 
    phone,
    role_id, 
    status, 
    email_verified
) VALUES (
    'admin@mybankmanager.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewV5oxzbCYW8ijYG', -- password: admin123
    'Administrateur Principal',
    '+212-6-00-00-00-00',
    1, -- SUPER_ADMIN
    'ACTIVE',
    TRUE
);

-- ========================================
-- 3. TYPES DE COMPTES BANCAIRES
-- ========================================

INSERT INTO account_types (name, description, minimum_balance, monthly_fee, interest_rate, overdraft_limit, features) VALUES
('Compte Courant Classic', 'Compte courant standard pour particuliers', 100.00, 15.00, 0.0050, 1000.00, JSON_OBJECT(
    'debit_card', true,
    'online_banking', true,
    'mobile_app', true,
    'checkbook', true,
    'overdraft', true,
    'international_transfers', false
)),
('Compte Courant Premium', 'Compte courant haut de gamme', 5000.00, 50.00, 0.0150, 10000.00, JSON_OBJECT(
    'debit_card', true,
    'credit_card_eligible', true,
    'online_banking', true,
    'mobile_app', true,
    'checkbook', true,
    'overdraft', true,
    'international_transfers', true,
    'priority_support', true,
    'insurance_discount', 10
)),
('Compte Épargne', 'Compte d\'épargne avec intérêts attractifs', 500.00, 0.00, 0.0300, 0.00, JSON_OBJECT(
    'debit_card', false,
    'online_banking', true,
    'mobile_app', true,
    'monthly_withdrawal_limit', 3,
    'goal_saving', true
)),
('Compte Business', 'Compte professionnel pour entreprises', 10000.00, 100.00, 0.0100, 50000.00, JSON_OBJECT(
    'debit_card', true,
    'online_banking', true,
    'mobile_app', true,
    'checkbook', true,
    'overdraft', true,
    'international_transfers', true,
    'bulk_payments', true,
    'payroll_services', true,
    'accounting_integration', true
));

-- ========================================
-- 4. TYPES DE TRANSACTIONS
-- ========================================

INSERT INTO transaction_types (code, name, description, is_debit, requires_approval, max_daily_limit, fee_amount) VALUES
('DEPOSIT', 'Dépôt', 'Dépôt d\'espèces ou chèque', FALSE, FALSE, NULL, 0.00),
('WITHDRAWAL', 'Retrait', 'Retrait d\'espèces au guichet ou DAB', TRUE, FALSE, 5000.00, 2.00),
('TRANSFER_INTERNAL', 'Virement Interne', 'Virement entre comptes de la même banque', TRUE, FALSE, 50000.00, 0.00),
('TRANSFER_EXTERNAL', 'Virement Externe', 'Virement vers une autre banque', TRUE, TRUE, 100000.00, 15.00),
('DIRECT_DEBIT', 'Prélèvement', 'Prélèvement automatique', TRUE, FALSE, 10000.00, 1.00),
('CARD_PAYMENT', 'Paiement Carte', 'Paiement par carte bancaire', TRUE, FALSE, 10000.00, 0.00),
('LOAN_DISBURSEMENT', 'Déblocage Prêt', 'Déblocage de fonds de prêt', FALSE, TRUE, NULL, 0.00),
('LOAN_PAYMENT', 'Remboursement Prêt', 'Paiement de mensualité de prêt', TRUE, FALSE, NULL, 0.00),
('FEE', 'Frais', 'Frais bancaires divers', TRUE, FALSE, NULL, 0.00),
('INTEREST', 'Intérêts', 'Versement d\'intérêts', FALSE, FALSE, NULL, 0.00);

-- ========================================
-- 5. TYPES DE PRETS
-- ========================================

INSERT INTO loan_types (name, description, min_amount, max_amount, min_duration_months, max_duration_months, base_interest_rate, required_income, max_debt_ratio, required_documents, features) VALUES
('Prêt Personnel', 'Prêt personnel pour projets divers', 5000.00, 500000.00, 12, 84, 0.0750, 3000.00, 33.00, JSON_ARRAY(
    'Pièce d\'identité',
    'Justificatifs de revenus (3 derniers mois)',
    'Relevés bancaires (3 derniers mois)',
    'Justificatif de domicile'
), JSON_OBJECT(
    'remboursement_anticipe', true,
    'report_echeance', 2,
    'assurance_facultative', true
)),
('Prêt Immobilier', 'Prêt pour acquisition immobilière', 100000.00, 5000000.00, 60, 300, 0.0450, 8000.00, 35.00, JSON_ARRAY(
    'Pièce d\'identité',
    'Justificatifs de revenus (6 derniers mois)',
    'Relevés bancaires (6 derniers mois)',
    'Compromis de vente',
    'Estimation du bien',
    'Assurance habitation'
), JSON_OBJECT(
    'taux_fixe', true,
    'taux_variable', true,
    'garantie_hypothecaire', true,
    'assurance_obligatoire', true
)),
('Prêt Auto', 'Prêt pour achat de véhicule', 20000.00, 800000.00, 12, 84, 0.0650, 2500.00, 30.00, JSON_ARRAY(
    'Pièce d\'identité',
    'Justificatifs de revenus (3 derniers mois)',
    'Facture pro-forma du véhicule',
    'Permis de conduire'
), JSON_OBJECT(
    'financement_neuf', true,
    'financement_occasion', true,
    'assurance_vehicule', true
)),
('Crédit Revolving', 'Crédit renouvelable', 1000.00, 100000.00, 12, 60, 0.1200, 2000.00, 25.00, JSON_ARRAY(
    'Pièce d\'identité',
    'Justificatifs de revenus (3 derniers mois)'
), JSON_OBJECT(
    'utilisation_flexible', true,
    'reconstitution_automatique', true,
    'carte_associee', true
));

-- ========================================
-- 6. TYPES DE CARTES
-- ========================================

INSERT INTO card_types (name, description, annual_fee, credit_limit_min, credit_limit_max, interest_rate, cashback_rate, rewards_program, benefits, required_income) VALUES
('Carte Débit Classic', 'Carte de débit standard', 0.00, NULL, NULL, NULL, 0.0000, NULL, JSON_OBJECT(
    'retrait_gratuit', 4,
    'paiement_sans_contact', true,
    'assurance_achat', false
), 1500.00),
('Carte Crédit Silver', 'Carte de crédit entrée de gamme', 200.00, 5000.00, 50000.00, 0.1800, 0.0050, JSON_OBJECT(
    'points_par_dh', 1,
    'bonus_inscription', 5000
), JSON_OBJECT(
    'assurance_voyage', false,
    'protection_achat', true,
    'assistance_24h', true
), 4000.00),
('Carte Crédit Gold', 'Carte de crédit milieu de gamme', 500.00, 20000.00, 200000.00, 0.1650, 0.0100, JSON_OBJECT(
    'points_par_dh', 2,
    'bonus_inscription', 15000,
    'bonus_categorie', true
), JSON_OBJECT(
    'assurance_voyage', true,
    'protection_achat', true,
    'assistance_24h', true,
    'acces_salon', false,
    'concierge', false
), 8000.00),
('Carte Crédit Platinum', 'Carte de crédit haut de gamme', 1500.00, 50000.00, 1000000.00, 0.1500, 0.0150, JSON_OBJECT(
    'points_par_dh', 3,
    'bonus_inscription', 50000,
    'bonus_voyage', 5,
    'bonus_restaurant', 3
), JSON_OBJECT(
    'assurance_voyage_premium', true,
    'protection_achat_etendue', true,
    'assistance_24h_premium', true,
    'acces_salon_prioritaire', true,
    'concierge_personnel', true,
    'surclassement_hotel', true
), 15000.00);

-- ========================================
-- 7. TYPES D'ASSURANCE
-- ========================================

INSERT INTO insurance_types (name, description, coverage_details, premium_calculation, min_coverage, max_coverage, age_restrictions, required_documents) VALUES
('Assurance Vie', 'Assurance vie et décès', JSON_OBJECT(
    'deces_naturel', 100,
    'deces_accidentel', 200,
    'invalidite_permanente', 100,
    'maladies_graves', 50
), JSON_OBJECT(
    'base_age', 'age * 0.01',
    'facteur_sante', 1.2,
    'facteur_profession', 1.1
), 50000.00, 5000000.00, JSON_OBJECT(
    'age_min', 18,
    'age_max', 65,
    'age_max_benefice', 75
), JSON_ARRAY(
    'Formulaire médical',
    'Pièce d\'identité',
    'Justificatifs de revenus'
)),
('Assurance Habitation', 'Assurance multirisque habitation', JSON_OBJECT(
    'incendie', 100,
    'degats_eaux', 100,
    'vol', 80,
    'bris_glace', 100,
    'responsabilite_civile', 'illimite',
    'relogement', 12
), JSON_OBJECT(
    'valeur_bien', 'valeur * 0.003',
    'zone_risque', 1.1,
    'systeme_securite', 0.9
), 100000.00, 10000000.00, NULL, JSON_ARRAY(
    'Attestation propriété ou bail',
    'Estimation du bien',
    'Photos du logement'
)),
('Assurance Auto', 'Assurance automobile tous risques', JSON_OBJECT(
    'responsabilite_civile', 'illimite',
    'dommages_collision', 100,
    'vol_incendie', 100,
    'bris_glace', 100,
    'assistance_panne', true,
    'vehicule_remplacement', 30
), JSON_OBJECT(
    'valeur_vehicule', 'valeur * 0.08',
    'age_vehicule', 'age > 5 ? 1.2 : 1.0',
    'bonus_malus', 'coefficient',
    'age_conducteur', 'age < 25 ? 1.5 : 1.0'
), 50000.00, 2000000.00, JSON_OBJECT(
    'age_min_conducteur', 18
), JSON_ARRAY(
    'Permis de conduire',
    'Carte grise',
    'Relevé d\'information assureur précédent'
)),
('Assurance Santé', 'Complémentaire santé', JSON_OBJECT(
    'hospitalisation', 100,
    'soins_courants', 80,
    'pharmacie', 70,
    'dentaire', 60,
    'optique', 50,
    'medecines_douces', 30
), JSON_OBJECT(
    'age_base', 'age * 15',
    'famille', 'membres * 0.8',
    'niveau_garantie', 'niveau * 1.2'
), 10000.00, 500000.00, JSON_OBJECT(
    'age_max_adhesion', 60
), JSON_ARRAY(
    'Questionnaire médical',
    'Pièce d\'identité',
    'Attestation sécurité sociale'
));

-- ========================================
-- 8. TYPES DE DEMANDES
-- ========================================

INSERT INTO request_types (code, name, description, required_fields, approval_workflow, auto_approval_rules, required_documents, processing_time_days) VALUES
('ACCOUNT_OPENING', 'Ouverture de Compte', 'Demande d\'ouverture de compte bancaire', JSON_ARRAY(
    'account_type_id',
    'initial_deposit',
    'income_source',
    'employer_info'
), JSON_OBJECT(
    'step1', 'document_verification',
    'step2', 'credit_check',
    'step3', 'manager_approval'
), JSON_OBJECT(
    'auto_approve_if', 'initial_deposit > 10000 AND credit_score > 700'
), JSON_ARRAY(
    'Pièce d\'identité',
    'Justificatif de domicile',
    'Justificatifs de revenus'
), 3),
('LOAN_APPLICATION', 'Demande de Prêt', 'Demande de prêt personnel ou immobilier', JSON_ARRAY(
    'loan_type_id',
    'amount',
    'duration',
    'purpose',
    'income',
    'expenses'
), JSON_OBJECT(
    'step1', 'eligibility_check',
    'step2', 'document_review',
    'step3', 'credit_analysis',
    'step4', 'committee_decision'
), JSON_OBJECT(
    'auto_approve_if', 'amount < 50000 AND debt_ratio < 25 AND credit_score > 750'
), JSON_ARRAY(
    'Dossier de prêt complet',
    'Justificatifs financiers',
    'Garanties'
), 7),
('CARD_APPLICATION', 'Demande de Carte', 'Demande de carte bancaire', JSON_ARRAY(
    'card_type_id',
    'credit_limit_requested',
    'usage_purpose'
), JSON_OBJECT(
    'step1', 'eligibility_check',
    'step2', 'credit_limit_calculation',
    'step3', 'approval'
), JSON_OBJECT(
    'auto_approve_if', 'existing_customer AND income > 5000'
), JSON_ARRAY(
    'Demande signée',
    'Justificatifs de revenus'
), 2),
('INSURANCE_APPLICATION', 'Demande d\'Assurance', 'Souscription à une assurance', JSON_ARRAY(
    'insurance_type_id',
    'coverage_amount',
    'beneficiaries'
), JSON_OBJECT(
    'step1', 'medical_review',
    'step2', 'risk_assessment',
    'step3', 'pricing',
    'step4', 'approval'
), JSON_OBJECT(
    'auto_approve_if', 'age < 40 AND coverage < 500000'
), JSON_ARRAY(
    'Formulaire médical',
    'Pièces justificatives'
), 5),
('ACCOUNT_CLOSURE', 'Fermeture de Compte', 'Demande de fermeture de compte', JSON_ARRAY(
    'account_id',
    'closure_reason',
    'transfer_destination'
), JSON_OBJECT(
    'step1', 'balance_verification',
    'step2', 'closure_processing'
), JSON_OBJECT(
    'auto_approve_if', 'balance = 0 AND no_pending_operations'
), JSON_ARRAY(
    'Demande signée',
    'RIB nouveau compte'
), 1),
('DISPUTE', 'Réclamation', 'Réclamation ou contestation', JSON_ARRAY(
    'dispute_type',
    'transaction_reference',
    'description',
    'evidence'
), JSON_OBJECT(
    'step1', 'investigation',
    'step2', 'resolution'
), NULL, JSON_ARRAY(
    'Preuves',
    'Documentation'
), 10);

-- Créer un index pour améliorer les performances
CREATE INDEX idx_users_email_password ON users(email, password_hash);
CREATE INDEX idx_accounts_user_status ON bank_accounts(user_id, status);
CREATE INDEX idx_transactions_accounts_date ON transactions(from_account_id, to_account_id, created_at);
CREATE INDEX idx_loans_user_status ON loans(user_id, status);
CREATE INDEX idx_cards_user_status ON credit_cards(user_id, status);

-- ========================================
-- 9. TRIGGERS POUR AUDIT ET SECURITE
-- ========================================

-- Trigger pour logger les modifications d'utilisateurs
DELIMITER //
CREATE TRIGGER user_audit_trigger
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    INSERT INTO activity_logs (user_id, action, entity_type, entity_id, old_values, new_values, created_at)
    VALUES (
        NEW.id,
        'USER_UPDATE',
        'users',
        NEW.id,
        JSON_OBJECT(
            'email', OLD.email,
            'full_name', OLD.full_name,
            'status', OLD.status,
            'role_id', OLD.role_id
        ),
        JSON_OBJECT(
            'email', NEW.email,
            'full_name', NEW.full_name,
            'status', NEW.status,
            'role_id', NEW.role_id
        ),
        NOW()
    );
END //

-- Trigger pour mettre à jour le solde disponible après transaction
CREATE TRIGGER update_balance_after_transaction
AFTER INSERT ON transactions
FOR EACH ROW
BEGIN
    IF NEW.status = 'COMPLETED' THEN
        IF NEW.from_account_id IS NOT NULL THEN
            UPDATE bank_accounts 
            SET balance = balance - NEW.amount - NEW.fee_amount,
                available_balance = balance - NEW.amount - NEW.fee_amount,
                last_transaction_date = NOW()
            WHERE id = NEW.from_account_id;
        END IF;
        
        IF NEW.to_account_id IS NOT NULL THEN
            UPDATE bank_accounts 
            SET balance = balance + NEW.amount,
                available_balance = balance + NEW.amount,
                last_transaction_date = NOW()
            WHERE id = NEW.to_account_id;
        END IF;
    END IF;
END //

-- Trigger pour générer des numéros uniques
CREATE TRIGGER generate_account_number
BEFORE INSERT ON bank_accounts
FOR EACH ROW
BEGIN
    IF NEW.account_number IS NULL OR NEW.account_number = '' THEN
        SET NEW.account_number = CONCAT('AC', LPAD(NEW.id, 10, '0'));
    END IF;
    IF NEW.iban IS NULL OR NEW.iban = '' THEN
        SET NEW.iban = CONCAT('MA64', LPAD(NEW.id, 16, '0'));
    END IF;
END //

DELIMITER ;

-- Message de confirmation
SELECT 'Base de données initialisée avec succès!' as status;
