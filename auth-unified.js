/**
 * ========================================
 * GESTIONNAIRE D'AUTHENTIFICATION UNIFIÉ
 * Solution pour éviter les conflits entre AuthManager
 * ========================================
 */

class UnifiedAuthManager {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isVerified = true; // Par défaut vérifié pour simplifier
        this.isAdmin = false;
        this.init();
    }

    /**
     * Initialisation du gestionnaire
     */
    init() {
        // Initialiser l'utilisateur par défaut s'il n'existe pas
        this.initDefaultUser();
        
        this.checkExistingSession();
        this.updateUI();
        this.setupEventListeners();
        
        // Exposer globalement pour compatibilité
        window.unifiedAuthManager = this;
        window.authManager = this; // Compatibilité avec l'ancien système
        
        // Écouter les événements de changement de localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser' || e.key === 'auth_user') {
                this.checkExistingSession();
                this.updateUI();
            }
        });
        
        // Écouter l'événement d'inscription réussie
        window.addEventListener('userRegistered', (e) => {
            console.log('🆕 Utilisateur inscrit détecté:', e.detail.user);
            this.checkExistingSession();
            this.updateUI();
        });
        
        // Écouter l'événement de connexion réussie
        window.addEventListener('userLoggedIn', (e) => {
            console.log('🔐 Utilisateur connecté détecté:', e.detail.user);
            this.checkExistingSession();
            this.updateUI();
        });
    }

    /**
     * Initialiser l'utilisateur par défaut
     */
    initDefaultUser() {
        const defaultEmail = 'fatimaezzahramahmour@gmail.com';
        const defaultPassword = 'fatimaezzahramahmour@gmail.com';
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(u => u.email === defaultEmail);
        
        if (!userExists) {
            const defaultUser = {
                id: 'user_' + Date.now(),
                email: defaultEmail,
                fullName: 'Fatima Ezzahra Mahmour',
                nom: 'Fatima Ezzahra Mahmour',
                password: defaultPassword,
                role: 'client',
                status: 'active',
                verified: true,
                createdAt: new Date().toISOString(),
                registrationDate: new Date().toISOString()
            };
            
            users.push(defaultUser);
            localStorage.setItem('users', JSON.stringify(users));
            console.log('✅ Utilisateur par défaut créé:', defaultEmail);
        }
    }

    /**
     * Vérifier la session existante
     */
    checkExistingSession() {
        try {
            // Vérifier les deux systèmes de stockage possibles
            const savedUser = localStorage.getItem('currentUser') || localStorage.getItem('auth_user');
            const savedToken = localStorage.getItem('authToken') || localStorage.getItem('auth_token');
            
            if (savedUser && savedToken) {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
                this.isAdmin = this.currentUser.email === 'admin@mybank.com' || 
                              this.currentUser.email === 'admin@mybankmanager.com' ||
                              this.currentUser.role === 'admin' ||
                              this.currentUser.role === 'ADMIN';
                
                console.log('✅ Session unifiée restaurée:', {
                    email: this.currentUser.email,
                    role: this.isAdmin ? 'Admin' : 'Client',
                    verified: this.isVerified
                });
            }
        } catch (error) {
            console.error('❌ Erreur lors de la restauration de session:', error);
            this.clearSession();
        }
    }

    /**
     * Mettre à jour l'interface utilisateur
     */
    updateUI() {
        console.log('🔄 Mise à jour de l\'interface - État:', {
            authenticated: this.isAuthenticated,
            verified: this.isVerified,
            admin: this.isAdmin,
            user: this.currentUser?.email
        });
        
        // Forcer la mise à jour immédiate
        this.updateHeader();
        this.updateRequestForms();
        this.updateAuthButtons();
        
        // Vérification post-mise à jour
        setTimeout(() => {
            this.verifyUIUpdate();
        }, 100);
        
        console.log('✅ Interface mise à jour');
    }

    updateHeader() {
        console.log('🔄 Début de mise à jour du header');
        
        // Essayer plusieurs sélecteurs avec retry
        const selectors = [
            '#header-actions',
            '.header-actions',
            '[class*="header-actions"]',
            'header .header-actions',
            '.header .header-actions'
        ];
        
        let headerActions = null;
        let selectorUsed = '';
        
        for (const selector of selectors) {
            headerActions = document.querySelector(selector);
            if (headerActions) {
                selectorUsed = selector;
                console.log(`✅ Élément trouvé avec le sélecteur: ${selector}`);
                break;
            }
        }
        
        if (!headerActions) {
            console.error('❌ Aucun élément header-actions trouvé avec aucun sélecteur');
            console.log('🔍 Éléments disponibles:', document.querySelectorAll('[class*="header"]'));
            
            // Dernière tentative : chercher par contenu
            const allDivs = document.querySelectorAll('div');
            for (const div of allDivs) {
                if (div.innerHTML.includes('Se connecter') || div.innerHTML.includes('S\'inscrire')) {
                    headerActions = div;
                    selectorUsed = 'recherche par contenu';
                    console.log('✅ Élément trouvé par recherche de contenu');
                    break;
                }
            }
        }
        
        if (headerActions) {
            try {
                if (this.isAuthenticated) {
                    const newContent = `
                        <a href="mon-compte.html" class="btn btn-outline">Mon Compte</a>
                        <button onclick="unifiedAuthManager.logout()" class="btn btn-primary">Déconnexion</button>
                    `;
                    headerActions.innerHTML = newContent;
                    console.log('✅ Header mis à jour: Mon Compte + Déconnexion');
                } else {
                    const newContent = `
                        <a href="connexion.html" class="btn btn-outline">Se connecter</a>
                        <a href="inscription.html" class="btn btn-primary">S'inscrire</a>
                    `;
                    headerActions.innerHTML = newContent;
                    console.log('✅ Header mis à jour: Se connecter + S\'inscrire');
                }
                
                // Vérification immédiate
                setTimeout(() => {
                    this.verifyHeaderUpdate(headerActions);
                }, 50);
                
            } catch (error) {
                console.error('❌ Erreur lors de la mise à jour du header:', error);
            }
        } else {
            console.error('❌ Impossible de trouver l\'élément header-actions');
        }
    }

    verifyHeaderUpdate(headerActions) {
        const isAuthenticated = this.isAuthenticated;
        const hasLoginBtn = headerActions.querySelector('a[href*="connexion"]');
        const hasMonCompteBtn = headerActions.querySelector('a[href*="mon-compte"]');
        const hasLogoutBtn = headerActions.querySelector('button[onclick*="logout"]');
        
        console.log('🔍 Vérification de la mise à jour du header:', {
            authenticated: isAuthenticated,
            hasLoginBtn: !!hasLoginBtn,
            hasMonCompteBtn: !!hasMonCompteBtn,
            hasLogoutBtn: !!hasLogoutBtn
        });
        
        if (isAuthenticated && hasLoginBtn) {
            console.warn('⚠️ L\'utilisateur est connecté mais le bouton de connexion est encore visible - nouvelle tentative');
            this.updateHeader();
        } else if (!isAuthenticated && hasMonCompteBtn) {
            console.warn('⚠️ L\'utilisateur n\'est pas connecté mais le bouton Mon Compte est visible - nouvelle tentative');
            this.updateHeader();
        }
    }

    verifyUIUpdate() {
        console.log('🔍 Vérification finale de l\'interface');
        
        // Vérifier si l'interface est cohérente
        const headerActions = document.querySelector('#header-actions, .header-actions, [class*="header-actions"]');
        if (headerActions) {
            const isAuthenticated = this.isAuthenticated;
            const hasLoginBtn = headerActions.querySelector('a[href*="connexion"]');
            const hasMonCompteBtn = headerActions.querySelector('a[href*="mon-compte"]');
            
            if ((isAuthenticated && hasLoginBtn) || (!isAuthenticated && hasMonCompteBtn)) {
                console.warn('⚠️ Interface incohérente détectée - correction automatique');
                this.updateHeader();
            } else {
                console.log('✅ Interface cohérente confirmée');
            }
        }
    }

    /**
     * Mettre à jour les formulaires de demande
     */
    updateRequestForms() {
        const authMessage = document.getElementById('auth-message');
        const verificationMessage = document.getElementById('verification-message');
        const forms = ['pret-form', 'carte-form', 'insurance-form'];
        
        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (!form) return;
            
            if (!this.isAuthenticated) {
                if (authMessage) {
                    authMessage.classList.remove('hidden');
                    authMessage.style.display = 'block';
                }
                form.classList.add('disabled');
                form.style.pointerEvents = 'none';
                form.style.opacity = '0.5';
            } else if (!this.isVerified) {
                if (verificationMessage) {
                    verificationMessage.classList.remove('hidden');
                    verificationMessage.style.display = 'block';
                }
                form.classList.add('disabled');
                form.style.pointerEvents = 'none';
                form.style.opacity = '0.5';
            } else {
                if (authMessage) {
                    authMessage.classList.add('hidden');
                    authMessage.style.display = 'none';
                }
                if (verificationMessage) {
                    verificationMessage.classList.add('hidden');
                    verificationMessage.style.display = 'none';
                }
                form.classList.remove('disabled');
                form.style.pointerEvents = 'auto';
                form.style.opacity = '1';
            }
        });
    }

    /**
     * Mettre à jour les boutons d'authentification
     */
    updateAuthButtons() {
        const authButtons = document.querySelectorAll('[data-requires-auth]');
        authButtons.forEach(button => {
            if (this.isAuthenticated) {
                button.disabled = false;
                button.style.opacity = '1';
            } else {
                button.disabled = true;
                button.style.opacity = '0.5';
            }
        });
    }

    /**
     * Configurer les écouteurs d'événements
     */
    setupEventListeners() {
        // Écouter les changements de localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'currentUser' || e.key === 'authToken') {
                this.checkExistingSession();
                this.updateUI();
            }
        });

        // Écouter les clics sur les boutons d'authentification
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-requires-auth]')) {
                if (!this.isAuthenticated) {
                    e.preventDefault();
                    this.showAuthRequired();
                }
            }
        });
    }

    /**
     * Afficher le message d'authentification requise
     */
    showAuthRequired() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <h3>Authentification requise</h3>
                <p>Vous devez être connecté pour effectuer cette action.</p>
                <div class="auth-modal-actions">
                    <a href="connexion.html" class="btn btn-primary">Se connecter</a>
                    <a href="inscription.html" class="btn btn-outline">S'inscrire</a>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="btn btn-secondary">Annuler</button>
                </div>
            </div>
        `;
        
        // Styles pour le modal
        const style = document.createElement('style');
        style.textContent = `
            .auth-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .auth-modal-content {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                text-align: center;
                max-width: 400px;
            }
            .auth-modal-actions {
                margin-top: 1rem;
                display: flex;
                gap: 0.5rem;
                justify-content: center;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
    }

    /**
     * Connexion utilisateur
     */
    async login(email, password) {
        try {
            console.log('🔄 Tentative de connexion unifiée:', email);
            
            // Vérifier si c'est l'admin (accès spécial)
            const isAdmin = email === 'admin@mybank.com' || email === 'admin@mybankmanager.com';
            
            if (isAdmin) {
                // Pour l'admin, créer directement l'utilisateur admin
                const adminUser = {
                    id: 'admin_' + Date.now(),
                    email: email,
                    fullName: 'Administrateur',
                    role: 'admin',
                    verified: true,
                    createdAt: new Date().toISOString()
                };
                
                this.currentUser = adminUser;
                this.isAuthenticated = true;
                this.isVerified = true;
                this.isAdmin = true;
                
                // Sauvegarder en localStorage
                localStorage.setItem('currentUser', JSON.stringify(adminUser));
                localStorage.setItem('authToken', 'token_' + Date.now());
                
                // Forcer la mise à jour immédiate de l'interface
                this.updateUI();
                
                console.log('✅ Connexion admin réussie:', adminUser.email);
                return adminUser;
            }
            
            // Pour les utilisateurs normaux, essayer l'API d'abord
            try {
                const response = await fetch('http://localhost:8081/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                });
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data.success === true) {
                    const user = {
                        id: data.user?.id || Date.now(),
                        email: email,
                        fullName: data.user?.fullName || data.user?.name || email.split('@')[0],
                        role: 'client',
                        verified: true,
                        createdAt: new Date().toISOString()
                    };
                    
                    this.currentUser = user;
                    this.isAuthenticated = true;
                    this.isVerified = true;
                    this.isAdmin = false;
                    
                    // Sauvegarder en localStorage
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('authToken', 'token_' + Date.now());
                    
                    // Ajouter l'utilisateur à la liste des utilisateurs si pas déjà présent
                    const users = JSON.parse(localStorage.getItem('users') || '[]');
                    const existingUser = users.find(u => u.email === email);
                    if (!existingUser) {
                        users.push(user);
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                    
                    // Forcer la mise à jour immédiate de l'interface
                    this.updateUI();
                    
                    // Déclencher un événement personnalisé pour notifier les autres pages
                    window.dispatchEvent(new CustomEvent('userLoggedIn', { 
                        detail: { user: user } 
                    }));
                    
                    console.log('✅ Connexion unifiée réussie:', user.email);
                    return user;
                } else {
                    throw new Error(data.message || 'Connexion échouée');
                }
            } catch (apiError) {
                console.warn('⚠️ Erreur API, tentative avec localStorage:', apiError);
                
                // Fallback : vérifier dans localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const existingUser = users.find(u => u.email === email);
                
                if (existingUser) {
                    // Vérifier le mot de passe si disponible
                    if (existingUser.password && existingUser.password !== password) {
                        throw new Error('Mot de passe incorrect');
                    }
                    
                    // Utilisateur trouvé dans localStorage
                    const userData = {
                        id: existingUser.id,
                        email: existingUser.email,
                        fullName: existingUser.fullName || existingUser.nom || email.split('@')[0],
                        role: existingUser.role || 'client',
                        verified: true,
                        createdAt: existingUser.createdAt || new Date().toISOString()
                    };
                    
                    this.currentUser = userData;
                    this.isAuthenticated = true;
                    this.isVerified = true;
                    this.isAdmin = false;
                    
                    // Sauvegarder en localStorage
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    localStorage.setItem('authToken', 'token_' + Date.now());
                    
                    // Forcer la mise à jour immédiate de l'interface
                    this.updateUI();
                    
                    console.log('✅ Connexion localStorage réussie:', userData.email);
                    return userData;
                } else {
                    // Créer automatiquement l'utilisateur s'il n'existe pas
                    console.log('📝 Création automatique du compte pour:', email);
                    
                    const newUser = {
                        id: 'user_' + Date.now(),
                        email: email,
                        fullName: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        nom: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        password: password,
                        role: 'client',
                        status: 'active',
                        verified: true,
                        createdAt: new Date().toISOString(),
                        registrationDate: new Date().toISOString()
                    };
                    
                    // Ajouter à la liste des utilisateurs
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    // Connecter automatiquement
                    this.currentUser = newUser;
                    this.isAuthenticated = true;
                    this.isVerified = true;
                    this.isAdmin = false;
                    
                    localStorage.setItem('currentUser', JSON.stringify(newUser));
                    localStorage.setItem('authToken', 'token_' + Date.now());
                    
                    this.updateUI();
                    
                    console.log('✅ Compte créé et connexion réussie:', newUser.email);
                    return newUser;
                }
            }
        } catch (error) {
            console.error('❌ Erreur de connexion unifiée:', error);
            throw error;
        }
    }

    /**
     * Gérer l'inscription d'un nouvel utilisateur
     */
    registerUser(userData) {
        try {
            const user = {
                id: Date.now(),
                email: userData.email,
                fullName: userData.nom || userData.fullName || userData.name,
                role: 'client',
                verified: true,
                createdAt: new Date().toISOString()
            };
            
            this.currentUser = user;
            this.isAuthenticated = true;
            this.isVerified = true;
            this.isAdmin = false;
            
            // Sauvegarder en localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('authToken', 'token_' + Date.now());
            
            // Forcer la mise à jour immédiate de l'interface
            this.updateUI();
            
            // Déclencher un événement personnalisé pour notifier les autres pages
            window.dispatchEvent(new CustomEvent('userRegistered', { 
                detail: { user: user } 
            }));
            
            console.log('✅ Inscription unifiée réussie:', user.email);
            return user;
        } catch (error) {
            console.error('❌ Erreur d\'inscription unifiée:', error);
            throw error;
        }
    }

    /**
     * Déconnexion utilisateur
     */
    logout() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isVerified = false;
        this.isAdmin = false;
        
        // Nettoyer localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        
        this.updateUI();
        
        // Rediriger vers la page d'accueil
        window.location.href = 'index.html';
        
        console.log('✅ Déconnexion unifiée réussie');
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
        return this.isAdmin;
    }

    /**
     * Vérifier si l'utilisateur est vérifié
     */
    isUserVerified() {
        return this.isVerified;
    }

    /**
     * Obtenir l'utilisateur actuel
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Nettoyer la session
     */
    clearSession() {
        this.currentUser = null;
        this.isAuthenticated = false;
        this.isVerified = false;
        this.isAdmin = false;
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
    }

    /**
     * Forcer la mise à jour de l'interface (méthode de débogage)
     */
    forceUpdateUI() {
        console.log('🔧 Force update UI appelée');
        
        // Nettoyer d'abord
        this.checkExistingSession();
        
        // Mise à jour immédiate
        this.updateUI();
        
        // Retry avec délai
        setTimeout(() => {
            this.updateUI();
        }, 200);
        
        // Retry final
        setTimeout(() => {
            this.updateUI();
        }, 500);
        
        // Vérification finale
        setTimeout(() => {
            this.verifyUIUpdate();
        }, 1000);
    }

    /**
     * Afficher une notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles pour les notifications
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem;
                border-radius: 4px;
                color: white;
                z-index: 1001;
                animation: slideIn 0.3s ease;
            }
            .notification-info { background: #3b82f6; }
            .notification-success { background: #10b981; }
            .notification-warning { background: #f59e0b; }
            .notification-error { background: #ef4444; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialiser le gestionnaire unifié
const unifiedAuthManager = new UnifiedAuthManager();

// Fonctions globales pour compatibilité
function requireAuth(action, message) {
    if (!unifiedAuthManager.isLoggedIn()) {
        unifiedAuthManager.showAuthRequired();
        return false;
    }
    
    if (typeof action === 'function') {
        return action();
    }
    
    return true;
}

function checkAuth() {
    return unifiedAuthManager.isLoggedIn();
}

function getCurrentUser() {
    return unifiedAuthManager.getCurrentUser();
}

// Exposer globalement
window.requireAuth = requireAuth;
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.forceUpdateUI = () => unifiedAuthManager.forceUpdateUI();
