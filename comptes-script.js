// Script de gestion des comptes bancaires
document.addEventListener('DOMContentLoaded', function() {
    // Données de test pour les comptes
    const sampleAccounts = [
        {
            id: 1,
            name: "Compte Courant Principal",
            number: "1234 5678 9012 3456",
            balance: 15420.50,
            currency: "MAD",
            type: "courant",
            status: "actif",
            lastTransaction: "2025-08-05"
        },
        {
            id: 2,
            name: "Compte Épargne",
            number: "9876 5432 1098 7654",
            balance: 45680.75,
            currency: "MAD",
            type: "épargne",
            status: "actif",
            lastTransaction: "2025-08-04"
        },
        {
            id: 3,
            name: "Compte Professionnel",
            number: "1111 2222 3333 4444",
            balance: 89250.00,
            currency: "MAD",
            type: "professionnel",
            status: "actif",
            lastTransaction: "2025-08-03"
        }
    ];

    // Fonction pour formater le montant
    function formatAmount(amount) {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 2
        }).format(amount);
    }

    // Fonction pour masquer le numéro de compte
    function maskAccountNumber(number) {
        return number.replace(/(\d{4})\s(\d{4})\s(\d{4})\s(\d{4})/, '$1 **** **** $4');
    }

    // Fonction pour créer une carte de compte
    function createAccountCard(account) {
        return `
            <div class="service-card account-card" data-account-id="${account.id}">
                <div class="service-icon">
                    <i class="fas fa-${getAccountIcon(account.type)}"></i>
                </div>
                <h3>${account.name}</h3>
                <div class="account-details">
                    <p class="account-number">${maskAccountNumber(account.number)}</p>
                    <p class="account-balance">${formatAmount(account.balance)}</p>
                    <p class="account-type">${account.type.charAt(0).toUpperCase() + account.type.slice(1)}</p>
                </div>
                <div class="account-actions">
                    <button class="btn btn-outline btn-small" onclick="viewAccount(${account.id})">
                        <i class="fas fa-eye"></i>
                        Voir détails
                    </button>
                    <button class="btn btn-primary btn-small" onclick="transferMoney(${account.id})">
                        <i class="fas fa-exchange-alt"></i>
                        Transférer
                    </button>
                </div>
            </div>
        `;
    }

    // Fonction pour obtenir l'icône selon le type de compte
    function getAccountIcon(type) {
        const icons = {
            'courant': 'wallet',
            'épargne': 'piggy-bank',
            'professionnel': 'briefcase',
            'jeune': 'graduation-cap'
        };
        return icons[type] || 'wallet';
    }

    // Fonction pour charger les comptes
    function loadAccounts() {
        const container = document.getElementById('accounts-container');
        const noAccounts = document.getElementById('no-accounts');
        
        // Simuler un chargement
        container.innerHTML = `
            <div class="account-card loading">
                <div class="account-skeleton">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line"></div>
                </div>
            </div>
        `;

        // Simuler un délai de chargement
        setTimeout(() => {
            if (sampleAccounts.length === 0) {
                container.style.display = 'none';
                noAccounts.style.display = 'block';
            } else {
                container.innerHTML = sampleAccounts.map(createAccountCard).join('');
                updateSummary();
            }
        }, 1000);
    }

    // Fonction pour mettre à jour le résumé
    function updateSummary() {
        const totalBalance = sampleAccounts.reduce((sum, account) => sum + account.balance, 0);
        const activeAccounts = sampleAccounts.filter(account => account.status === 'actif').length;

        document.getElementById('total-balance').textContent = formatAmount(totalBalance);
        document.getElementById('active-accounts').textContent = activeAccounts;
    }

    // Fonction pour actualiser les comptes
    window.refreshAccounts = function() {
        const refreshBtn = document.querySelector('button[onclick="refreshAccounts()"]');
        const originalText = refreshBtn.innerHTML;
        
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualisation...';
        refreshBtn.disabled = true;

        setTimeout(() => {
            loadAccounts();
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
            
            // Afficher une notification de succès
            showNotification('Comptes actualisés avec succès !', 'success');
        }, 1500);
    };

    // Fonction pour ajouter un nouveau compte
    window.addNewAccount = function() {
        showNotification('Fonctionnalité en cours de développement...', 'info');
    };

    // Fonction pour voir les détails d'un compte
    window.viewAccount = function(accountId) {
        const account = sampleAccounts.find(acc => acc.id === accountId);
        if (account) {
            showNotification(`Ouverture des détails du compte: ${account.name}`, 'info');
        }
    };

    // Fonction pour transférer de l'argent
    window.transferMoney = function(accountId) {
        const account = sampleAccounts.find(acc => acc.id === accountId);
        if (account) {
            showNotification(`Transfert depuis: ${account.name}`, 'info');
        }
    };

    // Fonction pour afficher des notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        // Couleurs selon le type
        const colors = {
            'success': '#10b981',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Charger les comptes au démarrage
    loadAccounts();
}); 