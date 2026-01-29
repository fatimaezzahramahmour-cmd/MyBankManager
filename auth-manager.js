/**
 * Gestionnaire d'authentification et d'interface utilisateur
 * MyBankManager - Système de gestion de session
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.init();
    }

    /**
     * Initialisation du gestionnaire d'authentification
     */
    init() {
        // Vérifier si un utilisateur est déjà connecté
        this.checkExistingSession();
        
        // Mettre à jour l'interface
        this.updateUI();
        
        // Écouter les événements de connexion/déconnexion
        this.setupEventListeners();
    }

    /**
     * Vérifier si une session existe déjà
     */
    checkExistingSession() {
        const savedUser = localStorage.getItem('currentUser');
        const savedToken = localStorage.getItem('authToken');
        
        if (savedUser && savedToken) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
                this.isAdmin = this.currentUser.email === 'admin@mybank.com';
                console.log('Session existante trouvée:', this.currentUser.email);
                console.log('Rôle:', this.isAdmin ? 'Admin' : 'Client');
            } catch (error) {
                console.error('Erreur lors du chargement de la session:', error);
                this.logout();
            }
        }
    }

    /**
     * Connexion utilisateur
     */
    async login(email, password) {
        try {
            console.log('🔄 Tentative de connexion:', email);
            
            const response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
            console.log('📡 Réponse du serveur:', response.status);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📊 Données reçues:', data);
            
            if (data.status === 'success') {
                // Vérifier si c'est l'admin
                const isAdmin = email === 'admin@mybank.com' || email === 'admin@mybankmanager.com';
                
                const user = {
                    id: data.user?.id || Date.now(),
                    email: email,
                    fullName: data.user?.name || (isAdmin ? 'Administrateur' : email.split('@')[0]),
                    role: isAdmin ? 'admin' : 'client',
                    createdAt: new Date().toISOString()
                };
                
                this.currentUser = user;
                this.isAuthenticated = true;
                this.isAdmin = isAdmin;
                
                // Sauvegarder en localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', 'token_' + Date.now());
                
                this.updateUI();
                return user;
            } else {
                throw new Error(data.message || 'Connexion échouée');
            }
        } catch (error) {
            console.error('❌ Erreur de connexion:', error);
            throw error;
        }
    }

    /**
     * Inscription utilisateur
     */
    async register(userData) {
        try {
            console.log('🔄 Tentative d\'inscription:', userData.email);
            
            // Empêcher l'inscription avec l'email admin
            if (userData.email === 'admin@mybank.com' || userData.email === 'admin@mybankmanager.com') {
                throw new Error('Cet email est réservé à l\'administration');
            }
            
            const response = await fetch('http://localhost:8081/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            console.log('📡 Réponse du serveur:', response.status);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📊 Données reçues:', data);
            
            if (data.status === 'success') {
                const user = {
                    id: data.user?.id || Date.now(),
                    email: userData.email,
                    fullName: userData.fullName || userData.email.split('@')[0],
                    role: 'client',
                    createdAt: new Date().toISOString()
                };
                
                // Connexion automatique après inscription
                this.currentUser = user;
                this.isAuthenticated = true;
                this.isAdmin = false;
                
                // Sauvegarder en localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', 'token_' + Date.now());
                
                // Ajouter à la liste des utilisateurs
                this.addUserToAdminList(user);
                
                this.updateUI();
                return user;
            } else {
                throw new Error(data.message || 'Inscription échouée');
            }
        } catch (error) {
            console.error('❌ Erreur d\'inscription:', error);
            throw error;
        }
    }

    /**
     * Déconnexion utilisateur
     */
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        
        // Supprimer les données de session
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        
        this.updateUI();
        
        // Rediriger vers la page d'accueil
        if (window.location.pathname.includes('admin-dashboard')) {
            window.location.href = 'index.html';
        }
    }

    /**
     * Mettre à jour l'interface utilisateur
     */
    updateUI() {
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) return;

        if (this.isAuthenticated && this.currentUser) {
            if (this.isAdmin) {
                // Interface admin
                headerActions.innerHTML = `
                    <div class="user-menu">
                        <button class="btn btn-primary" onclick="authManager.showAdminDashboard()">
                            <i class="fas fa-tachometer-alt"></i> Dashboard Admin
                        </button>
                        <button class="btn btn-outline" onclick="authManager.logout()">
                            <i class="fas fa-sign-out-alt"></i> Déconnexion
                        </button>
                    </div>
                `;
            } else {
                // Interface client
                headerActions.innerHTML = `
                    <div class="user-menu">
                        <button class="btn btn-primary" onclick="authManager.showUserAccount()">
                            <i class="fas fa-user"></i> Mon compte
                        </button>
                        <button class="btn btn-outline" onclick="authManager.logout()">
                            <i class="fas fa-sign-out-alt"></i> Déconnexion
                        </button>
                    </div>
                `;
            }
        } else {
            // Interface non connectée
            headerActions.innerHTML = `
                <a href="connexion.html" class="btn btn-outline">Se connecter</a>
                <a href="inscription.html" class="btn btn-primary">S'inscrire</a>
            `;
        }
    }

    /**
     * Afficher le dashboard admin
     */
    showAdminDashboard() {
        window.location.href = 'admin-dashboard.html';
    }

    /**
     * Afficher l'espace utilisateur
     */
    showUserAccount() {
        // Créer une modal pour l'espace utilisateur
        const modal = document.createElement('div');
        modal.className = 'modal user-account-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user"></i> Mon Compte</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="user-info">
                        <h4>Bienvenue, ${this.currentUser.fullName}</h4>
                        <p>Email: ${this.currentUser.email}</p>
                        <p>Membre depuis: ${new Date(this.currentUser.createdAt).toLocaleDateString()}</p>
                    </div>
                    
                    <div class="user-requests">
                        <h4>Mes Demandes</h4>
                        <div id="userRequestsList">
                            ${this.getUserRequestsHTML()}
                        </div>
                    </div>
                    
                    <div class="user-actions">
                        <button class="btn btn-primary" onclick="authManager.showMesDemandesModal()">
                            <i class="fas fa-list-alt"></i> Mes demandes
                        </button>
                        <button class="btn btn-outline" onclick="window.location.href='demande-pret.html'">
                            <i class="fas fa-hand-holding-usd"></i> Nouvelle demande de prêt
                        </button>
                        <button class="btn btn-outline" onclick="window.location.href='demande-carte.html'">
                            <i class="fas fa-credit-card"></i> Nouvelle demande de carte
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animation d'apparition
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Générer le HTML des demandes utilisateur
     */
    getUserRequestsHTML() {
        const requests = this.getUserRequests();
        
        if (requests.length === 0) {
            return `
                <div class="no-requests">
                    <i class="fas fa-inbox"></i>
                    <p>Aucune demande pour le moment</p>
                    <p>Commencez par faire une demande de prêt ou de carte !</p>
                </div>
            `;
        }
        
        return requests.map(request => `
            <div class="request-item ${request.status}">
                <div class="request-header">
                    <span class="request-type">
                        <i class="fas fa-${request.type === 'pret' ? 'hand-holding-usd' : 'credit-card'}"></i>
                        ${request.type === 'pret' ? 'Demande de prêt' : 'Demande de carte'}
                    </span>
                    <span class="request-status ${request.status}">
                        ${this.getStatusText(request.status)}
                    </span>
                </div>
                <div class="request-details">
                    <p><strong>Date:</strong> ${new Date(request.date).toLocaleDateString()}</p>
                    <p><strong>Montant:</strong> ${request.amount} DH</p>
                    <p><strong>Type:</strong> ${request.details}</p>
                </div>
            </div>
        `).join('');
    }

    /**
     * Récupérer les demandes de l'utilisateur
     */
    getUserRequests() {
        const allRequests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
        return allRequests.filter(request => request.userEmail === this.currentUser.email);
    }

    /**
     * Obtenir le texte du statut
     */
    getStatusText(status) {
        const statusTexts = {
            'pending': 'En attente',
            'approved': 'Acceptée',
            'rejected': 'Refusée'
        };
        return statusTexts[status] || status;
    }

    /**
     * Configurer les écouteurs d'événements
     */
    setupEventListeners() {
        // Écouter les soumissions de formulaires
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('login-form')) {
                e.preventDefault();
                this.handleLoginForm(e.target);
            } else if (e.target.classList.contains('register-form')) {
                e.preventDefault();
                this.handleRegisterForm(e.target);
            }
        });
    }

    /**
     * Gérer la soumission du formulaire de connexion
     */
    async handleLoginForm(form) {
        const email = form.querySelector('[name="email"]').value;
        const password = form.querySelector('[name="password"]').value;
        
        try {
            await this.login(email, password);
            this.showNotification('Connexion réussie !', 'success');
            
            // Redirection selon le rôle
            if (this.isAdmin) {
                // Rediriger l'admin vers le dashboard
                window.location.href = 'admin-dashboard.html';
            } else {
                // Rediriger les clients vers la page d'accueil
                const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = 'index.html';
                }
            }
        } catch (error) {
            this.showNotification('Erreur de connexion: ' + error.message, 'error');
        }
    }

    /**
     * Gérer la soumission du formulaire d'inscription
     */
    async handleRegisterForm(form) {
        const formData = new FormData(form);
        const userData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };
        
        try {
            await this.register(userData);
            this.showNotification('Inscription réussie ! Vous êtes maintenant connecté.', 'success');
            window.location.href = 'index.html';
        } catch (error) {
            this.showNotification('Erreur d\'inscription: ' + error.message, 'error');
        }
    }

    /**
     * Afficher une notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Vérifier si l'utilisateur est connecté
     */
    isLoggedIn() {
        return this.isAuthenticated && this.currentUser !== null;
    }

    /**
     * Vérifier si l'utilisateur est admin
     */
    isAdminUser() {
        return this.isAuthenticated && this.isAdmin;
    }

    /**
     * Obtenir l'utilisateur actuel
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Afficher la modal "Mes demandes"
     */
    showMesDemandesModal() {
        const requests = this.getUserRequests();
        
        const modal = document.createElement('div');
        modal.className = 'modal mes-demandes-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-list-alt"></i> Mes Demandes</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${requests.length === 0 ? `
                        <div class="no-requests">
                            <i class="fas fa-inbox"></i>
                            <h4>Aucune demande pour le moment</h4>
                            <p>Vous n'avez pas encore soumis de demande. Commencez par faire une demande de prêt, carte ou assurance !</p>
                            <div class="quick-actions">
                                <button class="btn btn-primary" onclick="window.location.href='demande-pret.html'">
                                    <i class="fas fa-hand-holding-usd"></i> Demander un prêt
                                </button>
                                <button class="btn btn-outline" onclick="window.location.href='demande-carte.html'">
                                    <i class="fas fa-credit-card"></i> Demander une carte
                                </button>
                                <button class="btn btn-outline" onclick="window.location.href='assurances.html'">
                                    <i class="fas fa-shield-alt"></i> Voir les assurances
                                </button>
                            </div>
                        </div>
                    ` : `
                        <div class="requests-summary">
                            <h4>Résumé de vos demandes</h4>
                            <div class="summary-stats">
                                <div class="stat-item">
                                    <span class="stat-number">${requests.length}</span>
                                    <span class="stat-label">Total</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${requests.filter(r => r.status === 'pending').length}</span>
                                    <span class="stat-label">En attente</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${requests.filter(r => r.status === 'approved').length}</span>
                                    <span class="stat-label">Approuvées</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${requests.filter(r => r.status === 'rejected').length}</span>
                                    <span class="stat-label">Refusées</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="requests-list">
                            ${requests.map(request => `
                                <div class="request-item ${request.status}">
                                    <div class="request-header">
                                        <div class="request-type">
                                            <i class="fas fa-${this.getRequestIcon(request.type, request.subType)}"></i>
                                            ${this.getRequestTypeName(request.type, request.subType)}
                                        </div>
                                        <span class="request-status ${request.status}">
                                            ${this.getStatusText(request.status)}
                                        </span>
                                    </div>
                                    <div class="request-details">
                                        <p><strong>Date:</strong> ${new Date(request.date).toLocaleDateString()}</p>
                                        ${request.amount ? `<p><strong>Montant:</strong> ${request.amount} DH</p>` : ''}
                                        ${request.insuranceValue ? `<p><strong>Valeur:</strong> ${request.insuranceValue} DH</p>` : ''}
                                        ${request.details ? `<p><strong>Type:</strong> ${request.details}</p>` : ''}
                                        ${request.subType ? `<p><strong>Type:</strong> ${request.subType}</p>` : ''}
                                    </div>
                                    ${request.status === 'pending' ? `
                                        <div class="request-actions">
                                            <button class="btn btn-sm btn-outline" onclick="authManager.cancelRequest('${request.id}')">
                                                <i class="fas fa-times"></i> Annuler
                                            </button>
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="modal-actions">
                            <button class="btn btn-primary" onclick="window.location.href='demande-pret.html'">
                                <i class="fas fa-plus"></i> Nouvelle demande
                            </button>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Animation d'apparition
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Obtenir l'icône selon le type de demande
     */
    getRequestIcon(type, subType) {
        if (type === 'pret') return 'hand-holding-usd';
        if (type === 'carte') return 'credit-card';
        if (type === 'assurance') return 'shield-alt';
        return 'file-alt';
    }

    /**
     * Obtenir le nom du type de demande
     */
    getRequestTypeName(type, subType) {
        if (type === 'pret') return 'Demande de prêt';
        if (type === 'carte') return 'Demande de carte';
        if (type === 'assurance') return subType || 'Demande d\'assurance';
        return 'Demande';
    }

    /**
     * Annuler une demande
     */
    cancelRequest(requestId) {
        const requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
        const requestIndex = requests.findIndex(r => r.id === requestId);
        
        if (requestIndex !== -1) {
            requests.splice(requestIndex, 1);
            localStorage.setItem('admin-demandes', JSON.stringify(requests));
            
            // Fermer et rouvrir la modal pour rafraîchir
            document.querySelector('.mes-demandes-modal').remove();
            this.showMesDemandesModal();
            
            this.showNotification('Demande annulée avec succès', 'success');
        }
    }

    /**
     * Protéger l'accès au dashboard admin
     */
    protectAdminAccess() {
        if (!this.isAdminUser()) {
            this.showNotification('Accès refusé. Seuls les administrateurs peuvent accéder à cette page.', 'error');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    /**
     * Ajouter un utilisateur à la liste pour l'admin dashboard
     */
    addUserToAdminList(user) {
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Vérifier si l'utilisateur n'existe pas déjà
            if (!users.find(u => u.email === user.email)) {
                const userForAdmin = {
                    id: user.id || Date.now(),
                    fullName: user.fullName || 'Utilisateur',
                    email: user.email,
                    role: user.role || 'CLIENT',
                    createdAt: new Date().toISOString()
                };
                
                users.push(userForAdmin);
                localStorage.setItem('users', JSON.stringify(users));
                
                console.log('Utilisateur ajouté à la liste admin:', userForAdmin);
            }
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur à la liste admin:', error);
        }
    }
}

// Initialiser le gestionnaire d'authentification
const authManager = new AuthManager();

// Fonctions globales pour les formulaires
function handleLogin(form) {
    authManager.handleLoginForm(form);
}

function handleRegister(form) {
    authManager.handleRegisterForm(form);
}

// Exposer pour utilisation globale
window.authManager = authManager;
