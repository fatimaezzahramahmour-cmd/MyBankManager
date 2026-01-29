// Configuration de l'API
const API_BASE_URL = 'http://localhost:8081';

// Classe pour gérer les appels API
class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Méthode générique pour les requêtes
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== UTILISATEURS =====
    async login(email, password) {
        return this.request('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    async register(userData) {
        return this.request('/api/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async getUsers() {
        return this.request('/api/users');
    }

    async getUserById(id) {
        return this.request(`/api/users/${id}`);
    }

    // ===== COMPTES BANCAIRES =====
    async getBankAccounts() {
        return this.request('/bankaccounts');
    }

    async getBankAccountById(id) {
        return this.request(`/bankaccounts/${id}`);
    }

    async createBankAccount(accountData) {
        return this.request('/bankaccounts', {
            method: 'POST',
            body: JSON.stringify(accountData)
        });
    }

    async updateBankAccount(id, accountData) {
        return this.request(`/bankaccounts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(accountData)
        });
    }

    // ===== CARTES DE CRÉDIT =====
    async getCreditCards() {
        return this.request('/api/creditcards');
    }

    async createCreditCard(cardData) {
        return this.request('/api/creditcards', {
            method: 'POST',
            body: JSON.stringify(cardData)
        });
    }

    // ===== PRÊTS =====
    async getLoans() {
        return this.request('/api/loans');
    }

    async createLoan(loanData) {
        return this.request('/api/loans', {
            method: 'POST',
            body: JSON.stringify(loanData)
        });
    }

    // ===== TRANSACTIONS =====
    async getTransactions() {
        return this.request('/api/transactions');
    }

    async createTransaction(transactionData) {
        return this.request('/api/transactions', {
            method: 'POST',
            body: JSON.stringify(transactionData)
        });
    }

    // ===== DASHBOARD ADMIN =====
    async getDashboardStats() {
        return this.request('/api/admin/dashboard');
    }

    async getRecentUsers() {
        return this.request('/api/admin/users/recent');
    }

    async getPendingLoans() {
        return this.request('/api/admin/loans/pending');
    }
}

// Instance globale de l'API
const api = new ApiService();

// Fonctions utilitaires pour l'interface utilisateur
const UI = {
    // Afficher un message de succès
    showSuccess(message) {
        this.showNotification(message, 'success');
    },

    // Afficher un message d'erreur
    showError(message) {
        this.showNotification(message, 'error');
    },

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },

    // Afficher un loader
    showLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loader);
    },

    // Cacher le loader
    hideLoader() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.remove();
        }
    },

    // Rediriger vers une page
    redirect(url) {
        window.location.href = url;
    }
};

// Export pour utilisation dans d'autres fichiers
window.api = api;
window.UI = UI; 