/**
 * Gestionnaire d'authentification amélioré avec backend
 * Gestion des rôles, protection des routes, et intégration API
 */

class EnhancedAuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.apiBaseUrl = 'http://localhost:8081/api';
        
        // Initialiser au chargement
        this.init();
    }

    init() {
        this.loadSession();
        this.updateUI();
        this.setupEventListeners();
    }

    /**
     * Configuration des écouteurs d'événements
     */
    setupEventListeners() {
        // Écouter les soumissions de formulaires de connexion
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('login-form')) {
                e.preventDefault();
                this.handleLoginForm(e.target);
            } else if (e.target.classList.contains('register-form')) {
                e.preventDefault();
                this.handleRegisterForm(e.target);
            }
        });

        // Écouter les clics sur les boutons de déconnexion
        document.addEventListener('click', (e) => {
            if (e.target.closest('[onclick*="logout"]')) {
                e.preventDefault();
                this.logout();
            }
        });
    }

    /**
     * Charger la session depuis localStorage
     */
    loadSession() {
        try {
            const savedUser = localStorage.getItem('auth_user');
            const savedToken = localStorage.getItem('auth_token');
            
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
                this.isAdmin = this.currentUser.isAdmin || this.currentUser.role === 'ADMIN';
                
                // Vérifier la validité du token (optionnel)
                if (savedToken) {
                    this.verifyTokenValidity();
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la session:', error);
            this.clearSession();
        }
    }

    /**
     * Sauvegarder la session
     */
    saveSession(user, token = null) {
        try {
            localStorage.setItem('auth_user', JSON.stringify(user));
            if (token) {
                localStorage.setItem('auth_token', token);
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la session:', error);
        }
    }

    /**
     * Effacer la session
     */
    clearSession() {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isAdmin = false;
    }

    /**
     * Vérifier la validité du token
     */
    async verifyTokenValidity() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/verify`, {
                headers: this.getAuthHeaders()
            });
            
            if (!response.ok) {
                this.clearSession();
                this.updateUI();
            }
        } catch (error) {
            console.warn('Impossible de vérifier le token:', error);
        }
    }

    /**
     * Obtenir les headers d'authentification
     */
    getAuthHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        if (this.currentUser) {
            headers['X-User-Id'] = this.currentUser.id.toString();
        }
        
        return headers;
    }

    /**
     * Gérer le formulaire de connexion
     */
    async handleLoginForm(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            this.showLoading(form);
            const user = await this.login(email, password);
            
            // Redirection selon le rôle avec debug
            console.log('Redirection après connexion pour:', user.email, 'Rôle:', user.role, 'IsAdmin:', user.isAdmin);
            
            if (user.isAdmin || user.role === 'ADMIN' || user.email === 'admin@mybankmanager.com') {
                console.log('Redirection vers dashboard admin');
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1000);
            } else {
                console.log('Redirection vers espace client');
                // Vérifier s'il y a une redirection en attente
                const redirectUrl = localStorage.getItem('pending_redirect');
                if (redirectUrl) {
                    localStorage.removeItem('pending_redirect');
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 1000);
                } else {
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }
            }
        } catch (error) {
            this.showError(form, error.message);
        } finally {
            this.hideLoading(form);
        }
    }

    /**
     * Gérer le formulaire d'inscription
     */
    async handleRegisterForm(form) {
        const formData = new FormData(form);
        const userData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validation côté client
        if (userData.password !== userData.confirmPassword) {
            this.showError(form, 'Les mots de passe ne correspondent pas');
            return;
        }

        try {
            this.showLoading(form);
            const user = await this.register(userData);
            
            // Connexion automatique après inscription
            console.log('Inscription réussie, connexion automatique pour:', user.email);
            this.showSuccess(form, 'Inscription réussie ! Connexion automatique en cours...');
            
            // Sauvegarder la session automatiquement
            this.saveSession(user, 'temp-token-' + Date.now());
            
            // Ajouter l'utilisateur à la liste pour l'admin
            this.addUserToAdminList(user);
            
            // Mettre à jour l'interface immédiatement
            this.updateUI();
            
            // Redirection avec délai pour voir le message
            setTimeout(() => {
                console.log('Redirection après inscription vers index.html');
                window.location.href = 'index.html';
            }, 2000);
            
        } catch (error) {
            this.showError(form, error.message);
        } finally {
            this.hideLoading(form);
        }
    }

    /**
     * Connecter un utilisateur
     */
    async login(email, password) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success && data.user) {
                const user = data.user;
                
                this.currentUser = user;
                this.isAuthenticated = true;
                this.isAdmin = user.isAdmin || user.role === 'ADMIN';
                
                // Sauvegarder la session
                this.saveSession(user, data.token);
                
                // Mettre à jour l'interface
                this.updateUI();
                
                return user;
            } else {
                throw new Error(data.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur API, utilisation du fallback:', error);
            return this.loginFallback(email, password);
        }
    }

    /**
     * Méthode de connexion de secours (simulation)
     */
    async loginFallback(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isAdmin = email === 'admin@mybankmanager.com' || email.includes('admin');
                
                if ((email === 'admin@mybankmanager.com' && password === 'admin123') ||
                    (email && password && email !== 'admin@mybankmanager.com')) {
                    
                    const user = {
                        id: isAdmin ? 1 : Date.now(),
                        email: email,
                        fullName: isAdmin ? 'Administrateur Principal' : 'Utilisateur',
                        role: isAdmin ? 'ADMIN' : 'CLIENT',
                        isAdmin: isAdmin
                    };
                    
                    console.log('Connexion réussie pour:', email, 'Rôle:', user.role, 'IsAdmin:', user.isAdmin);
                    
                    this.currentUser = user;
                    this.isAuthenticated = true;
                    this.isAdmin = isAdmin;
                    
                    // Sauvegarder la session
                    this.saveSession(user);
                    
                    // Mettre à jour l'interface
                    this.updateUI();
                    
                    resolve(user);
                } else {
                    reject(new Error('Email ou mot de passe incorrect'));
                }
            }, 1000);
        });
    }

    /**
     * Inscrire un nouvel utilisateur
     */
    async register(userData) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success && data.user) {
                const user = data.user;
                
                this.currentUser = user;
                this.isAuthenticated = true;
                this.isAdmin = false; // Les nouveaux utilisateurs sont toujours des clients
                
                // Sauvegarder la session
                this.saveSession(user, data.token);
                
                // Mettre à jour l'interface
                this.updateUI();
                
                return user;
            } else {
                throw new Error(data.message || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Erreur API, utilisation du fallback:', error);
            return this.registerFallback(userData);
        }
    }

    /**
     * Méthode d'inscription de secours (simulation)
     */
    async registerFallback(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Empêcher l'inscription avec l'email admin
                if (userData.email === 'admin@mybankmanager.com') {
                    reject(new Error('Cet email est réservé à l\'administration'));
                    return;
                }

                const user = {
                    id: Date.now(),
                    email: userData.email,
                    fullName: userData.fullName,
                    role: 'CLIENT',
                    isAdmin: false
                };
                
                this.currentUser = user;
                this.isAuthenticated = true;
                this.isAdmin = false;
                
                // Sauvegarder la session
                this.saveSession(user);
                
                // Mettre à jour l'interface
                this.updateUI();
                
                resolve(user);
            }, 1000);
        });
    }

    /**
     * Déconnecter l'utilisateur
     */
    logout() {
        this.clearSession();
        this.updateUI();
        
        // Rediriger vers la page d'accueil
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        }
        
        this.showNotification('Vous avez été déconnecté avec succès', 'success');
    }

    /**
     * Mettre à jour l'interface utilisateur
     */
    updateUI() {
        const headerActions = document.getElementById('header-actions');
        if (!headerActions) return;

        if (this.isAuthenticated && this.currentUser) {
            if (this.isAdmin) {
                // Interface admin
                headerActions.innerHTML = `
                    <button class="btn btn-outline" onclick="enhancedAuthManager.showAdminDashboard()">
                        <i class="fas fa-tachometer-alt"></i> Dashboard Admin
                    </button>
                    <button class="btn btn-primary" onclick="enhancedAuthManager.logout()">
                        <i class="fas fa-sign-out-alt"></i> Déconnexion
                    </button>
                `;
            } else {
                // Interface client
                headerActions.innerHTML = `
                    <button class="btn btn-outline" onclick="enhancedAuthManager.showUserAccount()">
                        <i class="fas fa-user"></i> Mon compte
                    </button>
                    <button class="btn btn-primary" onclick="enhancedAuthManager.logout()">
                        <i class="fas fa-sign-out-alt"></i> Déconnexion
                    </button>
                `;
            }
        } else {
            // Interface non connecté
            headerActions.innerHTML = `
                <a href="connexion.html" class="btn btn-outline">Se connecter</a>
                <a href="inscription.html" class="btn btn-primary">S'inscrire</a>
            `;
        }
    }

    /**
     * Vérifier l'authentification pour les actions protégées
     */
    requireAuth(message = 'Vous devez être connecté pour effectuer cette action') {
        if (!this.isAuthenticated) {
            this.showNotification(message, 'warning');
            
            // Sauvegarder l'URL actuelle pour redirection après connexion
            localStorage.setItem('pending_redirect', window.location.href);
            
            setTimeout(() => {
                window.location.href = 'connexion.html';
            }, 2000);
            
            return false;
        }
        return true;
    }

    /**
     * Vérifier les droits d'admin
     */
    requireAdmin() {
        if (!this.isAuthenticated || !this.isAdmin) {
            this.showNotification('Accès réservé aux administrateurs', 'error');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    /**
     * Protéger l'accès au dashboard admin
     */
    protectAdminAccess() {
        return this.requireAdmin();
    }

    /**
     * Afficher le dashboard admin
     */
    showAdminDashboard() {
        if (this.requireAdmin()) {
            window.location.href = 'admin-dashboard.html';
        }
    }

    /**
     * Afficher le compte utilisateur
     */
    showUserAccount() {
        // Implementation existante de la modal utilisateur
        this.showMesDemandesModal();
    }

    /**
     * Créer une demande protégée
     */
    async createProtectedRequest(requestData) {
        if (!this.requireAuth('Vous devez être connecté pour faire une demande')) {
            return null;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/requests`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify(requestData)
            });

            const data = await response.json();

            if (response.ok) {
                this.showNotification('Demande envoyée avec succès !', 'success');
                return data;
            } else {
                throw new Error(data.error || 'Erreur lors de l\'envoi de la demande');
            }
        } catch (error) {
            console.error('Erreur API:', error);
            this.showNotification('Erreur: ' + error.message, 'error');
            return null;
        }
    }

    /**
     * Obtenir les demandes de l'utilisateur
     */
    async getUserRequests() {
        if (!this.isAuthenticated) return [];

        try {
            const response = await fetch(`${this.apiBaseUrl}/requests/my-requests`, {
                headers: this.getAuthHeaders()
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Erreur lors du chargement des demandes');
            }
        } catch (error) {
            console.error('Erreur API:', error);
            // Fallback vers localStorage
            return this.getUserRequestsFromStorage();
        }
    }

    /**
     * Fallback pour obtenir les demandes depuis localStorage
     */
    getUserRequestsFromStorage() {
        if (!this.currentUser) return [];
        
        const allRequests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
        return allRequests.filter(request => request.userEmail === this.currentUser.email);
    }

    /**
     * Afficher les états de chargement et messages
     */
    showLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
        }
    }

    hideLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.originalText || 'Envoyer';
        }
    }

    showError(form, message) {
        this.showMessage(form, message, 'error');
    }

    showSuccess(form, message) {
        this.showMessage(form, message, 'success');
    }

    showMessage(form, message, type) {
        let messageDiv = form.querySelector('.form-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'form-message';
            form.insertBefore(messageDiv, form.firstChild);
        }
        
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    /**
     * Afficher une notification système
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
        
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Méthodes de compatibilité avec l'ancien AuthManager
    isLoggedIn() {
        return this.isAuthenticated;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdminUser() {
        return this.isAuthenticated && this.isAdmin;
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

// Initialiser le gestionnaire d'authentification amélioré
const enhancedAuthManager = new EnhancedAuthManager();

// Compatibilité avec l'ancien code
const authManager = enhancedAuthManager;
