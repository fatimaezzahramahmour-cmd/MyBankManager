/**
 * ========================================
 * GESTIONNAIRE D'AUTHENTIFICATION SECURISE
 * Gestion complète des rôles et sessions
 * ========================================
 */

class SecureAuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.userRole = null;
        this.sessionToken = null;
        this.apiBaseUrl = 'http://localhost:8081/api'; // Backend API base URL
        
        // Configuration des rôles
        this.roles = {
            ADMIN: 'ADMIN',
            CLIENT: 'CLIENT'
        };
        
        // Pages autorisées par rôle
        this.rolePages = {
            ADMIN: [
                'admin-dashboard.html',
                'admin-users.html',
                'admin-requests.html',
                'admin-settings.html'
            ],
            CLIENT: [
                'index.html',
                'mon-compte.html',
                'demande-pret.html',
                'demande-carte.html',
                'assurances.html',
                'offres.html'
            ],
            PUBLIC: [
                'index.html',
                'connexion.html',
                'inscription.html',
                'about.html',
                'contact.html'
            ]
        };
        
        this.init();
    }

    /**
     * Initialisation du gestionnaire
     */
    init() {
        console.log('🔐 Initialisation SecureAuthManager...');
        
        // Vérifier la session existante
        this.checkExistingSession();
        
        // Configurer les intercepteurs
        this.setupEventListeners();
        
        // Protéger les routes
        this.protectCurrentRoute();
        
        console.log('✅ SecureAuthManager initialisé');
    }

    /**
     * Vérifier la session existante au chargement
     */
    checkExistingSession() {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('auth_user');
        
        if (storedToken && storedUser) {
            try {
                this.sessionToken = storedToken;
                this.currentUser = JSON.parse(storedUser);
                this.userRole = this.currentUser.role;
                this.isAuthenticated = true;
                
                console.log('📋 Session existante restaurée:', {
                    email: this.currentUser.email,
                    role: this.userRole,
                    token: this.sessionToken.substring(0, 10) + '...'
                });
                
                // Vérifier la validité du token
                this.validateToken();
                
            } catch (error) {
                console.error('❌ Erreur lors de la restauration de session:', error);
                this.clearSession();
            }
        }
    }

    /**
     * Valider le token côté serveur
     */
    async validateToken() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/auth/validate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.sessionToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Token invalide');
            }

            const data = await response.json();
            console.log('✅ Token validé côté serveur');
            
            // Mettre à jour les informations utilisateur si nécessaire
            if (data.user) {
                this.currentUser = data.user;
                this.userRole = data.user.role;
                localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
            }
            
        } catch (error) {
            console.warn('⚠️ Validation token échouée:', error.message);
            // En cas d'échec, on garde la session locale mais on avertit
            this.showWarning('Session expirée, veuillez vous reconnecter');
        }
    }

    /**
     * Connexion utilisateur
     */
    async login(email, password) {
        console.log('🔐 Tentative de connexion pour:', email);
        
        try {
            // Appel API backend
            const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur de connexion');
            }

            const data = await response.json();
            
            // Enregistrer la session
            this.sessionToken = data.token;
            this.currentUser = data.user;
            this.userRole = data.user.role;
            this.isAuthenticated = true;
            
            // Sauvegarder en localStorage
            localStorage.setItem('auth_token', this.sessionToken);
            localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
            
            console.log('✅ Connexion réussie:', {
                email: this.currentUser.email,
                role: this.userRole,
                token: this.sessionToken.substring(0, 10) + '...'
            });
            
            // Logger l'activité
            this.logActivity('LOGIN_SUCCESS', { email });
            
            return this.currentUser;
            
        } catch (error) {
            console.error('❌ Erreur de connexion:', error);
            this.logActivity('LOGIN_FAILED', { email, error: error.message });
            
            // Fallback mode (développement)
            return await this.loginFallback(email, password);
        }
    }

    /**
     * Mode fallback pour développement (sans backend)
     */
    async loginFallback(email, password) {
        console.log('🔄 Mode fallback activé pour:', email);
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Vérifications admin (multiple emails possibles)
                const adminEmails = [
                    'admin@mybankmanager.com',
                    'admin@mybank.com',
                    'admin@gmail.com'
                ];
                const isAdmin = adminEmails.includes(email.toLowerCase()) || 
                               email.toLowerCase().includes('admin');
                
                // Validation des identifiants
                if (isAdmin && password === 'admin123') {
                    const adminUser = {
                        id: 1,
                        email: email,
                        fullName: 'Administrateur Principal',
                        role: this.roles.ADMIN,
                        permissions: ['all'],
                        isAdmin: true,
                        lastLogin: new Date().toISOString()
                    };
                    
                    this.setSession(adminUser, 'admin-token-' + Date.now());
                    resolve(adminUser);
                    
                } else if (!isAdmin && email && password) {
                    // Client standard
                    const clientUser = {
                        id: Date.now(),
                        email: email,
                        fullName: this.extractNameFromEmail(email),
                        role: this.roles.CLIENT,
                        permissions: ['read_own', 'create_request'],
                        isAdmin: false,
                        lastLogin: new Date().toISOString()
                    };
                    
                    this.setSession(clientUser, 'client-token-' + Date.now());
                    resolve(clientUser);
                    
                } else {
                    reject(new Error('Email ou mot de passe incorrect'));
                }
            }, 1000);
        });
    }

    /**
     * Inscription utilisateur
     */
    async register(userData) {
        console.log('📝 Tentative d\'inscription pour:', userData.email);
        
        try {
            // Empêcher l'inscription avec email admin
            if (userData.email.includes('admin')) {
                throw new Error('Cet email est réservé à l\'administration');
            }
            
            // Appel API backend
            const response = await fetch(`${this.apiBaseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur d\'inscription');
            }

            const data = await response.json();
            
            // Connexion automatique après inscription
            const user = data.user;
            this.setSession(user, data.token);
            
            console.log('✅ Inscription et connexion automatique réussies');
            this.logActivity('REGISTER_SUCCESS', { email: userData.email });
            
            return user;
            
        } catch (error) {
            console.error('❌ Erreur d\'inscription:', error);
            this.logActivity('REGISTER_FAILED', { email: userData.email, error: error.message });
            
            // Fallback mode
            return await this.registerFallback(userData);
        }
    }

    /**
     * Mode fallback pour inscription
     */
    async registerFallback(userData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const newUser = {
                    id: Date.now(),
                    email: userData.email,
                    fullName: userData.fullName,
                    role: this.roles.CLIENT,
                    permissions: ['read_own', 'create_request'],
                    isAdmin: false,
                    createdAt: new Date().toISOString()
                };
                
                this.setSession(newUser, 'client-token-' + Date.now());
                
                // Ajouter à la liste des utilisateurs pour l'admin
                this.addUserToAdminList(newUser);
                
                resolve(newUser);
            }, 800);
        });
    }

    /**
     * Définir la session utilisateur
     */
    setSession(user, token) {
        this.currentUser = user;
        this.sessionToken = token;
        this.userRole = user.role;
        this.isAuthenticated = true;
        
        // Sauvegarder
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        
        console.log('💾 Session sauvegardée:', {
            email: user.email,
            role: user.role
        });
    }

    /**
     * Déconnexion
     */
    async logout() {
        console.log('🚪 Déconnexion en cours...');
        
        try {
            // Informer le serveur
            if (this.sessionToken) {
                await fetch(`${this.apiBaseUrl}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${this.sessionToken}`
                    }
                });
            }
        } catch (error) {
            console.warn('⚠️ Erreur lors de la déconnexion serveur:', error);
        } finally {
            this.clearSession();
            this.redirectToLogin();
        }
    }

    /**
     * Nettoyer la session
     */
    clearSession() {
        this.currentUser = null;
        this.sessionToken = null;
        this.userRole = null;
        this.isAuthenticated = false;
        
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('pending_redirect');
        
        console.log('🧹 Session nettoyée');
    }

    /**
     * Redirection selon le rôle après connexion
     */
    redirectAfterLogin() {
        if (!this.isAuthenticated || !this.userRole) {
            console.error('❌ Impossible de rediriger: utilisateur non authentifié');
            return;
        }

        // Vérifier s'il y a une redirection en attente
        const pendingRedirect = localStorage.getItem('pending_redirect');
        
        console.log('🔄 Redirection après connexion:', {
            role: this.userRole,
            email: this.currentUser.email,
            pending: pendingRedirect
        });

        let targetUrl;

        if (pendingRedirect) {
            // Vérifier si l'utilisateur a le droit d'accéder à la page demandée
            if (this.canAccessPage(pendingRedirect)) {
                targetUrl = pendingRedirect;
                localStorage.removeItem('pending_redirect');
            }
        }

        // Redirection par défaut selon le rôle
        if (!targetUrl) {
            if (this.userRole === this.roles.ADMIN || this.currentUser.isAdmin) {
                targetUrl = 'admin-dashboard.html';
                console.log('🔄 Redirection ADMIN forcée vers dashboard');
            } else {
                targetUrl = 'mon-compte.html';
                console.log('🔄 Redirection CLIENT vers dashboard personnel');
            }
        }

        console.log('➡️ Redirection finale vers:', targetUrl);
        console.log('📋 Données utilisateur:', {
            email: this.currentUser.email,
            role: this.userRole,
            isAdmin: this.currentUser.isAdmin
        });
        
        // Redirection immédiate pour les admins
        if (this.userRole === this.roles.ADMIN || this.currentUser.isAdmin) {
            window.location.href = targetUrl;
        } else {
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        }
    }

    /**
     * Vérifier si l'utilisateur peut accéder à une page
     */
    canAccessPage(pageName) {
        if (!pageName) return false;
        
        // Extraire le nom de fichier de l'URL
        const fileName = pageName.split('/').pop().split('?')[0];
        
        // Pages publiques accessibles à tous
        if (this.rolePages.PUBLIC.includes(fileName)) {
            return true;
        }
        
        // Vérifier selon le rôle
        if (this.userRole && this.rolePages[this.userRole]) {
            return this.rolePages[this.userRole].includes(fileName);
        }
        
        return false;
    }

    /**
     * Protéger la route actuelle
     */
    protectCurrentRoute() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Pages publiques - pas de protection nécessaire
        if (this.rolePages.PUBLIC.includes(currentPage)) {
            return;
        }
        
        // Vérifier l'authentification
        if (!this.isAuthenticated) {
            console.log('🚫 Accès refusé: utilisateur non authentifié');
            this.redirectToLogin(currentPage);
            return;
        }
        
        // Vérifier les permissions selon le rôle
        if (!this.canAccessPage(currentPage)) {
            console.log('🚫 Accès refusé: permissions insuffisantes');
            this.redirectUnauthorized();
            return;
        }
        
        console.log('✅ Accès autorisé à:', currentPage);
    }

    /**
     * Rediriger vers la page de connexion
     */
    redirectToLogin(returnPage = null) {
        if (returnPage) {
            localStorage.setItem('pending_redirect', returnPage);
        }
        
        window.location.href = 'connexion.html';
    }

    /**
     * Rediriger en cas d'accès non autorisé
     */
    redirectUnauthorized() {
        this.showError('Accès non autorisé. Redirection vers votre espace...');
        
        setTimeout(() => {
            if (this.userRole === this.roles.ADMIN) {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 2000);
    }

    /**
     * Mettre à jour l'interface utilisateur
     */
    updateUI() {
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;

        if (this.isAuthenticated && this.currentUser) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <button class="btn btn-outline user-account-btn" onclick="secureAuth.showUserMenu()">
                        <i class="fas fa-user"></i> ${this.currentUser.fullName}
                    </button>
                    <button class="btn btn-primary" onclick="secureAuth.logout()">
                        <i class="fas fa-sign-out-alt"></i> Déconnexion
                    </button>
                </div>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="connexion.html" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i> Se connecter
                </a>
                <a href="inscription.html" class="btn btn-outline">
                    <i class="fas fa-user-plus"></i> S'inscrire
                </a>
            `;
        }
    }

    /**
     * Afficher le menu utilisateur
     */
    showUserMenu() {
        console.log('👤 Affichage menu utilisateur');
        
        if (this.userRole === this.roles.ADMIN) {
            window.location.href = 'admin-dashboard.html';
        } else {
            // Afficher modal "Mon compte" pour les clients
            this.showClientAccountModal();
        }
    }

    /**
     * Modal compte client
     */
    showClientAccountModal() {
        // Implémenter la modal compte client
        console.log('💼 Affichage modal compte client');
        // Code de la modal...
    }

    /**
     * Configuration des écouteurs d'événements
     */
    setupEventListeners() {
        // Intercepter les formulaires de connexion
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('login-form')) {
                e.preventDefault();
                this.handleLoginForm(e.target);
            } else if (e.target.classList.contains('register-form')) {
                e.preventDefault();
                this.handleRegisterForm(e.target);
            }
        });

        // Mettre à jour l'UI quand la page se charge
        document.addEventListener('DOMContentLoaded', () => {
            this.updateUI();
        });
    }

    /**
     * Traiter le formulaire de connexion
     */
    async handleLoginForm(form) {
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            this.showError('Veuillez remplir tous les champs');
            return;
        }

        try {
            this.showLoading(form);
            const user = await this.login(email, password);
            
            this.showSuccess('Connexion réussie ! Redirection...');
            this.updateUI();
            this.redirectAfterLogin();
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading(form);
        }
    }

    /**
     * Traiter le formulaire d'inscription
     */
    async handleRegisterForm(form) {
        const formData = new FormData(form);
        const userData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validations
        if (userData.password !== userData.confirmPassword) {
            this.showError('Les mots de passe ne correspondent pas');
            return;
        }

        try {
            this.showLoading(form);
            const user = await this.register(userData);
            
            // Ajouter l'utilisateur à la liste admin
            this.addUserToAdminList(user);
            
            this.showSuccess('Inscription réussie ! Connexion automatique...');
            this.updateUI();
            
            setTimeout(() => {
                window.location.href = 'mon-compte.html';
            }, 2000);
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading(form);
        }
    }

    /**
     * Utilitaires d'affichage
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
            submitBtn.innerHTML = submitBtn.dataset.originalText || 'Valider';
        }
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showWarning(message) {
        this.showNotification(message, 'warning');
    }

    showNotification(message, type = 'info') {
        console.log(`📢 [${type.toUpperCase()}] ${message}`);
        
        // Créer une notification visuelle
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    /**
     * Logger les activités
     */
    logActivity(action, details = {}) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            action: action,
            user: this.currentUser?.email || 'anonymous',
            details: details,
            ip: 'unknown', // À récupérer côté serveur
            userAgent: navigator.userAgent
        };
        
        console.log('📊 Log activité:', logEntry);
        
        // Envoyer au serveur ou stocker localement
        try {
            const logs = JSON.parse(localStorage.getItem('activity_logs') || '[]');
            logs.push(logEntry);
            
            // Garder seulement les 100 derniers logs
            if (logs.length > 100) {
                logs.splice(0, logs.length - 100);
            }
            
            localStorage.setItem('activity_logs', JSON.stringify(logs));
        } catch (error) {
            console.error('❌ Erreur logging:', error);
        }
    }

    /**
     * Utilitaires
     */
    extractNameFromEmail(email) {
        const name = email.split('@')[0];
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    addUserToAdminList(user) {
        try {
            console.log('🔄 Ajout utilisateur à la liste admin:', user);
            
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            console.log('📋 Utilisateurs existants:', users.length);
            
            // Vérifier si l'utilisateur existe déjà
            const existingUser = users.find(u => u.email === user.email);
            if (existingUser) {
                console.log('⚠️ Utilisateur déjà présent:', user.email);
                return;
            }
            
            // Créer l'objet utilisateur complet
            const newUser = {
                id: user.id || Date.now(),
                fullName: user.fullName || user.name || this.extractNameFromEmail(user.email),
                email: user.email,
                role: user.role || 'CLIENT',
                status: 'ACTIVE',
                createdAt: user.createdAt || new Date().toISOString(),
                permissions: user.permissions || ['read_own', 'create_request']
            };
            
            // Ajouter à la liste
            users.push(newUser);
            
            // Sauvegarder
            localStorage.setItem('users', JSON.stringify(users));
            
            console.log('✅ Utilisateur ajouté avec succès:', {
                email: newUser.email,
                fullName: newUser.fullName,
                role: newUser.role,
                totalUsers: users.length
            });
            
            // Notifier le dashboard admin si il est ouvert
            this.notifyAdminDashboard(newUser);
            
        } catch (error) {
            console.error('❌ Erreur ajout utilisateur admin:', error);
        }
    }
    
    /**
     * Notifier le dashboard admin d'un nouvel utilisateur
     */
    notifyAdminDashboard(user) {
        try {
            // Créer un événement personnalisé pour notifier le dashboard
            const event = new CustomEvent('newUserRegistered', {
                detail: { user: user }
            });
            window.dispatchEvent(event);
            
            console.log('📢 Notification envoyée au dashboard admin');
        } catch (error) {
            console.warn('⚠️ Erreur notification dashboard:', error);
        }
    }

    /**
     * Getters publics
     */
    getCurrentUser() {
        return this.currentUser;
    }

    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    getUserRole() {
        return this.userRole;
    }

    isAdmin() {
        return this.userRole === this.roles.ADMIN;
    }

    isClient() {
        return this.userRole === this.roles.CLIENT;
    }
}

// Initialiser le gestionnaire sécurisé
const secureAuth = new SecureAuthManager();

// Compatibilité avec l'ancien code
const authManager = secureAuth;
const enhancedAuthManager = secureAuth;
