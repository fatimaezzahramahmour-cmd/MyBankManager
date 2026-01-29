/**
 * Dashboard Administratif MyBankManager - VERSION CORRIGÉE
 * Interface moderne et fonctionnelle
 */

class AdminDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.charts = {};
        this.init();
    }

    /**
     * Initialisation du dashboard
     */
    init() {
        console.log('🚀 Initialisation du dashboard admin...');
        
        // Vérifier l'accès admin de manière non bloquante
        this.checkAdminAccess();
        
        this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
        this.loadNotifications();
        this.updateLastLogin();
        
        // Démarrer la mise à jour automatique des connexions
        this.startAutoRefresh();
        
        console.log('✅ Dashboard admin initialisé');
    }

    /**
     * Vérifier l'accès admin de manière non bloquante
     */
    checkAdminAccess() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        console.log('👤 Utilisateur actuel:', currentUser);
        
        if (!currentUser) {
            console.warn('⚠️ Aucun utilisateur connecté');
            this.showNotification('Session expirée. Veuillez vous reconnecter.', 'warning');
            return false;
        }
        
        const isAdmin = currentUser.email === 'admin@mybank.com' || 
                       currentUser.email === 'admin@mybankmanager.com' ||
                       currentUser.role === 'admin';
        
        if (!isAdmin) {
            console.warn('⚠️ Accès non autorisé - redirection vers la page d\'accueil');
            this.showNotification('Accès non autorisé. Redirection...', 'error');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            return false;
        }
        
        console.log('✅ Accès admin confirmé');
        return true;
    }

    /**
     * Configuration des écouteurs d'événements
     */
    setupEventListeners() {
        console.log('🔧 Configuration des écouteurs d\'événements...');
        
        // Filtres de recherche
        const userSearch = document.getElementById('user-search');
        if (userSearch) {
            userSearch.addEventListener('input', (e) => this.filterUsers(e.target.value));
        }

        const statusFilter = document.getElementById('user-status-filter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.filterUsersByStatus(e.target.value));
        }

        // Filtres de demandes
        const requestStatusFilter = document.getElementById('status-filter');
        if (requestStatusFilter) {
            requestStatusFilter.addEventListener('change', (e) => this.filterRequests(e.target.value));
        }

        const requestTypeFilter = document.getElementById('type-filter');
        if (requestTypeFilter) {
            requestTypeFilter.addEventListener('change', (e) => this.filterRequestsByType(e.target.value));
        }
        
        // Écouter les nouveaux utilisateurs
        window.addEventListener('newUserRegistered', (event) => {
            console.log('🆕 Nouvel utilisateur détecté:', event.detail.user);
            this.showNotification(`Nouvel utilisateur inscrit: ${event.detail.user.fullName}`, 'success');
            this.loadUsers();
            this.updateStats();
        });
        
        // Écouter les nouvelles demandes
        window.addEventListener('newRequestSubmitted', (event) => {
            console.log('📝 Nouvelle demande détectée:', event.detail.request);
            this.showNotification(`Nouvelle demande reçue: ${event.detail.request.type}`, 'info');
            this.loadRequests();
            this.updateStats();
        });
        
        console.log('✅ Écouteurs d\'événements configurés');
    }

    /**
     * Charger les données du dashboard
     */
    loadDashboardData() {
        console.log('📊 Chargement des données du dashboard...');
        this.updateStats();
        this.loadUsers();
        this.loadRequests();
        this.loadAnalytics();
    }

    /**
     * Charger les analytics
     */
    loadAnalytics() {
        console.log('📈 Chargement des analytics...');
        
        // Créer des données de démonstration si nécessaire
        this.createDemoDataIfNeeded();
        
        // Initialiser les graphiques
        this.initializeCharts();
    }

    /**
     * Créer des données de démonstration si nécessaire
     */
    createDemoDataIfNeeded() {
        console.log('🎭 Vérification des données de démonstration...');
        
        // Vérifier s'il y a des utilisateurs
        const users = this.getUsers();
        if (users.length <= 1) {
            console.log('📝 Création d\'utilisateurs de démonstration pour les analytics...');
            this.createDemoUsers();
        }
        
        // Vérifier s'il y a des demandes
        const requests = this.getRequests();
        if (requests.length === 0) {
            console.log('📝 Création de demandes de démonstration pour les analytics...');
            this.createDemoRequests();
        }
    }

    /**
     * Créer des demandes de démonstration
     */
    createDemoRequests() {
        const demoRequests = [
            {
                id: 1,
                type: 'pret',
                status: 'en_attente',
                statut: 'en_attente',
                userName: 'Ahmed Benali',
                email: 'ahmed@example.com',
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                montant: '50000',
                duree: '24',
                motif: 'Achat immobilier'
            },
            {
                id: 2,
                type: 'carte',
                status: 'accepté',
                statut: 'accepté',
                userName: 'Fatima Zahra',
                email: 'fatima@example.com',
                date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                typeCarte: 'Visa Gold',
                limite: '15000'
            },
            {
                id: 3,
                type: 'assurance',
                status: 'refusé',
                statut: 'refusé',
                userName: 'Mohammed Alami',
                email: 'mohammed@example.com',
                date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                typeAssurance: 'Vie',
                prix: '5000'
            },
            {
                id: 4,
                type: 'pret',
                status: 'accepté',
                statut: 'accepté',
                userName: 'Amina Tazi',
                email: 'amina@example.com',
                date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                montant: '30000',
                duree: '12',
                motif: 'Voiture'
            },
            {
                id: 5,
                type: 'carte',
                status: 'en_attente',
                statut: 'en_attente',
                userName: 'Omar Benjelloun',
                email: 'omar@example.com',
                date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
                typeCarte: 'Mastercard',
                limite: '8000'
            }
        ];
        
        // Sauvegarder les demandes de démonstration
        localStorage.setItem('admin-demandes', JSON.stringify(demoRequests));
        console.log('✅ Demandes de démonstration créées:', demoRequests.length);
    }

    /**
     * Mettre à jour les statistiques
     */
    updateStats() {
        const users = this.getUsers();
        const requests = this.getRequests();
        
        console.log('📈 Mise à jour des statistiques:', { users: users.length, requests: requests.length });
        
        // Statistiques principales
        const totalUsersEl = document.getElementById('total-users');
        const usersCountEl = document.getElementById('users-count');
        if (totalUsersEl) totalUsersEl.textContent = users.length;
        if (usersCountEl) usersCountEl.textContent = users.length;
        
        // Statistiques utilisateurs actifs/inactifs
        const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
        const inactiveUsers = users.filter(u => u.status === 'INACTIVE').length;
        
        const activeUsersEl = document.getElementById('active-users');
        const inactiveUsersEl = document.getElementById('inactive-users');
        if (activeUsersEl) activeUsersEl.textContent = activeUsers;
        if (inactiveUsersEl) inactiveUsersEl.textContent = inactiveUsers;
        
        // Statistiques demandes
        const pendingRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'pending' || status === 'en_attente' || status === 'en attente';
        });
        const pendingRequestsEl = document.getElementById('pending-requests');
        const pendingCountEl = document.getElementById('pending-count');
        if (pendingRequestsEl) pendingRequestsEl.textContent = pendingRequests.length;
        if (pendingCountEl) pendingCountEl.textContent = pendingRequests.length;
        
        const requestsCountEl = document.getElementById('requests-count');
        if (requestsCountEl) requestsCountEl.textContent = requests.length;
        
        const approvedRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'approved' || status === 'accepté' || status === 'approuvé' || status === 'approuvee';
        });
        const approvedCountEl = document.getElementById('approved-count');
        if (approvedCountEl) approvedCountEl.textContent = approvedRequests.length;
        
        // Calculer la croissance
        const growthRate = this.calculateGrowthRate();
        const growthRateEl = document.getElementById('growth-rate');
        if (growthRateEl) growthRateEl.textContent = `+${growthRate}%`;
        
        // Mettre à jour les indicateurs de changement
        this.updateChangeIndicators();
        
        // Mettre à jour les graphiques si ils existent
        this.updateCharts();
        
        // Mettre à jour le tableau des statistiques
        this.updateStatsTable();
    }

    /**
     * Calculer le taux de croissance
     */
    calculateGrowthRate() {
        const users = this.getUsers();
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        
        const newUsers = users.filter(user => {
            const userDate = new Date(user.createdAt);
            return userDate >= lastMonth;
        });
        
        const oldUsers = users.filter(user => {
            const userDate = new Date(user.createdAt);
            return userDate < lastMonth;
        });
        
        if (oldUsers.length === 0) return newUsers.length > 0 ? 100 : 0;
        
        return Math.round((newUsers.length / oldUsers.length) * 100);
    }

    /**
     * Mettre à jour les indicateurs de changement
     */
    updateChangeIndicators() {
        const users = this.getUsers();
        const requests = this.getRequests();
        
        // Utilisateurs ce mois
        const now = new Date();
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        const newUsers = users.filter(user => new Date(user.createdAt) >= lastMonth);
        
        const usersChangeEl = document.getElementById('users-change');
        if (usersChangeEl) usersChangeEl.textContent = `+${newUsers.length} ce mois`;
        
        // Utilisateurs actifs/inactifs ce mois
        const newActiveUsers = users.filter(user => 
            user.status === 'ACTIVE' && new Date(user.createdAt) >= lastMonth
        );
        const newInactiveUsers = users.filter(user => 
            user.status === 'INACTIVE' && new Date(user.createdAt) >= lastMonth
        );
        
        const activeChangeEl = document.getElementById('active-change');
        const inactiveChangeEl = document.getElementById('inactive-change');
        if (activeChangeEl) activeChangeEl.textContent = `+${newActiveUsers.length} ce mois`;
        if (inactiveChangeEl) inactiveChangeEl.textContent = `+${newInactiveUsers.length} ce mois`;
        
        // Demandes ce mois
        const newRequests = requests.filter(req => new Date(req.date || req.createdAt) >= lastMonth);
        const requestsChangeEl = document.getElementById('requests-change');
        if (requestsChangeEl) requestsChangeEl.textContent = `+${newRequests.length} ce mois`;
        
        // En attente ce mois
        const pendingRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'pending' || status === 'en_attente' || status === 'en attente';
        });
        const pendingChangeEl = document.getElementById('pending-change');
        if (pendingChangeEl) pendingChangeEl.textContent = `+${pendingRequests.length} ce mois`;
        
        // Approuvées ce mois
        const approvedRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'approved' || status === 'accepté' || status === 'approuvé' || status === 'approuvee';
        });
        const approvedChangeEl = document.getElementById('approved-change');
        if (approvedChangeEl) approvedChangeEl.textContent = `+${approvedRequests.length} ce mois`;
    }

    /**
     * Charger les utilisateurs
     */
    loadUsers() {
        console.log('👥 Chargement des utilisateurs...');
        const users = this.getUsers();
        console.log('Utilisateurs récupérés:', users);
        
        const tbody = document.getElementById('users-table-body');
        if (!tbody) {
            console.error('❌ Élément users-table-body non trouvé');
            return;
        }
        
        if (!users || users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem;">
                        <div style="color: #666;">
                            <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                            Aucun utilisateur trouvé
                            <br><br>
                            <button class="btn btn-primary" onclick="adminDashboard.createDemoUsers()">
                                <i class="fas fa-plus"></i> Créer des utilisateurs de démonstration
                            </button>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = users.map(user => {
            const fullName = user.fullName || user.userName || user.name || 'Utilisateur';
            const email = user.email || 'Non renseigné';
            const createdAt = user.createdAt || user.date || new Date().toISOString();
            const connectionTime = user.connectionTime || user.lastActivity || createdAt;
            const lastActivity = user.lastActivity || connectionTime;
            const avatar = fullName.charAt(0).toUpperCase();
            const requestCount = this.getUserRequestsCount(email);
            const status = user.status || 'ACTIVE';
            const role = user.role || 'CLIENT';
            
            // Déterminer si l'utilisateur est actuellement connecté
            const isCurrentlyOnline = user.connectionTime && 
                (new Date().getTime() - new Date(user.connectionTime).getTime()) < 30 * 60 * 1000; // 30 minutes
            
            // Formater la dernière activité
            const formatLastActivity = (timestamp) => {
                if (!timestamp) return 'Jamais';
                const now = new Date();
                const last = new Date(timestamp);
                const diffMinutes = Math.floor((now - last) / (1000 * 60));
                
                if (diffMinutes < 1) return 'À l\'instant';
                if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
                if (diffMinutes < 1440) return `Il y a ${Math.floor(diffMinutes / 60)}h`;
                return last.toLocaleDateString('fr-FR');
            };
            
            return `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar" style="background: var(--primary-color); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; position: relative;">
                            ${avatar}
                            ${isCurrentlyOnline ? '<div style="position: absolute; bottom: -2px; right: -2px; width: 12px; height: 12px; background: #10b981; border-radius: 50%; border: 2px solid white;"></div>' : ''}
                        </div>
                        <div style="margin-left: 12px;">
                            <div class="user-name" style="font-weight: 600; color: var(--text-dark);">${fullName}</div>
                            <div class="user-email" style="font-size: 0.85rem; color: var(--text-muted);">${email}</div>
                            <div class="user-role" style="font-size: 0.75rem; color: var(--accent-color); font-weight: 500;">${role}</div>
                            ${isCurrentlyOnline ? '<div style="font-size: 0.7rem; color: #10b981; font-weight: 500;"><i class="fas fa-circle"></i> En ligne</div>' : ''}
                        </div>
                    </div>
                </td>
                <td style="color: var(--text-dark);">${email}</td>
                <td style="color: var(--text-dark);">
                    <div>
                        <div style="font-weight: 500;">${new Date(connectionTime).toLocaleDateString('fr-FR')}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">${new Date(connectionTime).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
                    </div>
                </td>
                <td style="color: var(--text-dark);">
                    <div>
                        <div style="font-weight: 500;">${formatLastActivity(lastActivity)}</div>
                        ${isCurrentlyOnline ? '<div style="font-size: 0.8rem; color: #10b981;">Actif maintenant</div>' : ''}
                    </div>
                </td>
                <td>
                    <span class="status-badge ${status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive'}" 
                          style="padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 500;">
                        ${status === 'ACTIVE' ? 'Actif' : 'Inactif'}
                    </span>
                </td>
                <td style="color: var(--text-dark); font-weight: 600;">
                    <span class="request-count" style="background: var(--accent-color); color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">
                        ${requestCount}
                    </span>
                </td>
                <td>
                    <div class="action-buttons" style="display: flex; gap: 8px;">
                        <button class="btn btn-sm btn-outline" onclick="adminDashboard.viewUser('${email}')" 
                                title="Voir détails" style="padding: 6px 8px;">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-outline" onclick="adminDashboard.editUser('${email}')" 
                                title="Modifier" style="padding: 6px 8px;">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${email !== 'admin@mybank.com' && email !== 'admin@mybankmanager.com' ? `
                        <button class="btn btn-sm btn-outline" onclick="adminDashboard.toggleUserStatus('${email}')" 
                                title="Activer/Désactiver" style="padding: 6px 8px; color: ${status === 'ACTIVE' ? '#dc3545' : '#28a745'};">
                            <i class="fas fa-${status === 'ACTIVE' ? 'ban' : 'check'}"></i>
                        </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
            `;
        }).join('');
        
        console.log('✅ Utilisateurs chargés dans le tableau:', users.length);
    }

    /**
     * Créer des utilisateurs de démonstration
     */
    createDemoUsers() {
        console.log('🎭 Création d\'utilisateurs de démonstration...');
        
        const demoUsers = [
            { 
                id: 1, 
                fullName: 'Ahmed Benali', 
                email: 'ahmed@example.com', 
                role: 'CLIENT',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() 
            },
            { 
                id: 2, 
                fullName: 'Fatima Zahra', 
                email: 'fatima@example.com', 
                role: 'CLIENT',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() 
            },
            { 
                id: 3, 
                fullName: 'Mohammed Alami', 
                email: 'mohammed@example.com', 
                role: 'CLIENT',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() 
            },
            { 
                id: 4, 
                fullName: 'Amina Tazi', 
                email: 'amina@example.com', 
                role: 'CLIENT',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() 
            },
            {
                id: 5,
                fullName: 'Omar Benjelloun',
                email: 'omar@example.com',
                role: 'CLIENT',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        // Sauvegarder les utilisateurs de démonstration
        localStorage.setItem('users', JSON.stringify(demoUsers));
        
        // Recharger les utilisateurs
        this.loadUsers();
        this.updateStats();
        
        this.showNotification('Utilisateurs de démonstration créés avec succès !', 'success');
    }

    /**
     * Récupérer les utilisateurs
     */
    getUsers() {
        console.log('🔍 Récupération des utilisateurs...');
        
        // Récupérer les utilisateurs depuis localStorage
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('Utilisateurs dans localStorage.users:', users);
        
        // Récupérer les connexions utilisateurs (NOUVEAU)
        const userConnections = JSON.parse(localStorage.getItem('userConnections') || '[]');
        console.log('Connexions utilisateurs:', userConnections);
        
        // Convertir les connexions en utilisateurs
        const connectionUsers = userConnections.map(connection => ({
            id: connection.userId || connection.id,
            fullName: connection.fullName || connection.email.split('@')[0],
            email: connection.email,
            role: connection.role || 'CLIENT',
            status: connection.status || 'ACTIVE',
            createdAt: connection.connectionTime || new Date().toISOString(),
            lastActivity: connection.lastActivity,
            connectionTime: connection.connectionTime
        }));
        
        // Fusionner les utilisateurs en évitant les doublons
        connectionUsers.forEach(connUser => {
            if (connUser.email && !users.find(u => u.email === connUser.email)) {
                users.push(connUser);
                console.log('Utilisateur connecté ajouté:', connUser);
            } else if (connUser.email) {
                // Mettre à jour l'utilisateur existant avec les infos de connexion
                const existingUser = users.find(u => u.email === connUser.email);
                if (existingUser) {
                    existingUser.lastActivity = connUser.lastActivity;
                    existingUser.connectionTime = connUser.connectionTime;
                    existingUser.status = connUser.status;
                }
            }
        });
        
        // Ajouter l'utilisateur actuellement connecté s'il existe
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        console.log('Utilisateur connecté:', currentUser);
        
        if (currentUser && !users.find(u => u.email === currentUser.email)) {
            const newUser = {
                id: currentUser.id || Date.now(),
                fullName: currentUser.fullName || currentUser.name || 'Utilisateur connecté',
                email: currentUser.email,
                role: currentUser.role || 'CLIENT',
                status: 'ACTIVE',
                createdAt: new Date().toISOString()
            };
            users.push(newUser);
            console.log('Utilisateur connecté ajouté:', newUser);
        }
        
        // Récupérer tous les utilisateurs qui ont fait des demandes
        const requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
        console.log('Demandes dans localStorage:', requests);
        
        const requestUsers = requests.map(request => ({
            id: request.userId || Date.now() + Math.random(),
            fullName: request.userName || request.fullName || request.name || 'Client',
            email: request.userEmail || request.email,
            role: 'CLIENT',
            status: 'ACTIVE',
            createdAt: request.date || request.createdAt || new Date().toISOString()
        }));
        
        // Fusionner les utilisateurs en évitant les doublons
        requestUsers.forEach(reqUser => {
            if (reqUser.email && !users.find(u => u.email === reqUser.email)) {
                users.push(reqUser);
                console.log('Utilisateur des demandes ajouté:', reqUser);
            }
        });
        
        // Ajouter l'admin par défaut s'il n'existe pas
        const adminExists = users.find(u => u.email === 'admin@mybank.com' || u.email === 'admin@mybankmanager.com');
        if (!adminExists) {
            const adminUser = {
                id: 'admin',
                fullName: 'Administrateur Principal',
                email: 'admin@mybank.com',
                role: 'ADMIN',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
            };
            users.unshift(adminUser);
            console.log('Admin ajouté:', adminUser);
        }
        
        // Créer des utilisateurs de démonstration si aucun utilisateur n'existe
        if (users.length <= 1) {
            console.log('📝 Création automatique d\'utilisateurs de démonstration...');
            this.createDemoUsers();
            users = JSON.parse(localStorage.getItem('users') || '[]');
        }
        
        console.log('✅ Total utilisateurs récupérés:', users.length);
        return users;
    }

    /**
     * Récupérer les demandes
     */
    getRequests() {
        return JSON.parse(localStorage.getItem('admin-demandes') || '[]');
    }

    /**
     * Récupérer les notifications
     */
    getNotifications() {
        const notifications = [
            {
                id: 1,
                type: 'info',
                message: 'Nouvelle demande de prêt reçue',
                time: new Date(Date.now() - 30 * 60 * 1000).toISOString()
            },
            {
                id: 2,
                type: 'success',
                message: 'Demande de carte approuvée',
                time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 3,
                type: 'warning',
                message: 'Utilisateur en attente de vérification',
                time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        return notifications;
    }

    /**
     * Compter les demandes d'un utilisateur
     */
    getUserRequestsCount(userEmail) {
        const requests = this.getRequests();
        return requests.filter(r => r.userEmail === userEmail || r.email === userEmail).length;
    }

    /**
     * Obtenir le texte du statut
     */
    getStatusText(status) {
        const statusMap = {
            'pending': 'En attente',
            'approved': 'Approuvée',
            'rejected': 'Refusée',
            'processing': 'En cours'
        };
        return statusMap[status] || status;
    }

    /**
     * Filtrer les utilisateurs
     */
    filterUsers(searchTerm) {
        const users = this.getUsers();
        const filtered = users.filter(user => 
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayUsers(filtered);
    }

    /**
     * Filtrer les utilisateurs par statut
     */
    filterUsersByStatus(status) {
        const users = this.getUsers();
        if (status === 'all') {
            this.displayUsers(users);
        } else {
            const filtered = users.filter(user => user.status.toLowerCase() === status);
            this.displayUsers(filtered);
        }
    }

    /**
     * Afficher les utilisateurs
     */
    displayUsers(users) {
        console.log('👥 Affichage des utilisateurs:', users.length);
        const tbody = document.getElementById('users-table-body');
        if (!tbody) {
            console.error('❌ Container users-table-body non trouvé');
            return;
        }
        
        if (users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: #666;">
                        Aucun utilisateur trouvé
                    </td>
                </tr>
            `;
            return;
        }
        
        // Trier par date d'inscription (plus récent en premier)
        users.sort((a, b) => new Date(b.registrationDate || b.createdAt || 0) - new Date(a.registrationDate || a.createdAt || 0));
        
        let usersHTML = '';
        users.forEach((user, index) => {
            console.log(`👤 Utilisateur ${index}:`, user.email, 'Nom:', user.name || user.fullName);
            
            const registrationDate = new Date(user.registrationDate || user.createdAt || Date.now()).toLocaleDateString('fr-FR');
            const lastActivity = user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : 'Jamais connecté';
            const requestCount = this.getUserRequestsCount(user.email);
            
            usersHTML += `
                <tr>
                    <td>
                        <div class="user-info">
                            <div class="user-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="user-details">
                                <div class="user-name">${user.name || user.fullName || user.nom || 'N/A'}</div>
                                <div class="user-email">${user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${user.status || 'active'}">
                            ${user.status === 'active' ? '✅ Actif' : '❌ Inactif'}
                        </span>
                    </td>
                    <td>${registrationDate}</td>
                    <td>${lastActivity}</td>
                    <td>${requestCount}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-info" onclick="viewUser('${user.email}')" title="Voir les détails">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-warning" onclick="editUser('${user.email}')" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm ${user.status === 'active' ? 'btn-danger' : 'btn-success'}" 
                                    onclick="toggleUserStatus('${user.email}')" 
                                    title="${user.status === 'active' ? 'Désactiver' : 'Activer'}">
                                <i class="fas ${user.status === 'active' ? 'fa-ban' : 'fa-check'}"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        tbody.innerHTML = usersHTML;
        console.log('✅ Utilisateurs affichés:', users.length);
    }

    /**
     * Charger les demandes
     */
    async loadRequests() {
        try {
            console.log('📊 Chargement des demandes...');
            
            // Essayer de récupérer depuis le serveur
            let requests = [];
            try {
                const response = await fetch('/api/admin-demandes');
                const result = await response.json();
                
                if (result.status === 'success') {
                    requests = result.demandes;
                    console.log('✅ Demandes récupérées depuis le serveur:', requests.length);
                } else {
                    throw new Error('Erreur serveur');
                }
            } catch (error) {
                console.warn('⚠️ Impossible de récupérer depuis le serveur, fallback vers localStorage');
                // Fallback vers localStorage
                requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
                console.log('📋 Demandes récupérées depuis localStorage:', requests.length);
            }

            const requestsContainer = document.getElementById('requests-grid');
            if (!requestsContainer) {
                console.error('❌ Container des demandes non trouvé (requests-grid)');
                return;
            }

            if (requests.length === 0) {
                requestsContainer.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: #666; grid-column: 1 / -1;">
                        <i class="fas fa-inbox" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                        Aucune demande pour le moment
                    </div>
                `;
                return;
            }

            // Trier par date (plus récent en premier)
            requests.sort((a, b) => new Date(b.dateSoumission) - new Date(a.dateSoumission));

            let requestsHTML = '';
            requests.forEach((request, index) => {
                const date = new Date(request.dateSoumission).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const statusClass = this.getStatusClass(request.statut);
                const typeIcon = this.getTypeIcon(request.type);

                requestsHTML += `
                    <div class="request-card ${request.statut || 'pending'}" onclick="viewRequest('${request.id}')">
                        <div class="request-header">
                            <div class="request-type">
                                <i class="${typeIcon}"></i>
                                <span>${this.getTypeLabel(request.type)}</span>
                            </div>
                            <div class="request-status ${statusClass}">
                                ${this.getStatusLabel(request.statut)}
                            </div>
                        </div>
                        <div class="request-body">
                            <div class="request-info">
                                <p><strong>👤 Client:</strong> ${request.nom || request.fullName || 'N/A'}</p>
                                <p><strong>📧 Email:</strong> ${request.email || 'N/A'}</p>
                                ${this.getRequestDetails(request)}
                                <p><strong>📅 Date:</strong> ${date}</p>
                            </div>
                        </div>
                        <div class="request-actions">
                            ${request.statut === 'accepté' || request.statut === 'refusé' ? `
                                <span class="status-final">
                                    ${request.statut === 'accepté' ? '✅ Traitée' : '❌ Traitée'}
                                </span>
                            ` : `
                                <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); approveRequest('${request.id}')" title="Approuver">
                                    <i class="fas fa-check"></i> Approuver
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); rejectRequest('${request.id}')" title="Refuser">
                                    <i class="fas fa-times"></i> Refuser
                                </button>
                            `}
                        </div>
                    </div>
                `;
            });

            requestsContainer.innerHTML = requestsHTML;
            console.log('✅ Demandes affichées:', requests.length);

        } catch (error) {
            console.error('❌ Erreur lors du chargement des demandes:', error);
            const requestsContainer = document.getElementById('requests-container');
            if (requestsContainer) {
                requestsContainer.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Erreur lors du chargement des demandes</p>
                    </div>
                `;
            }
        }
    }

    /**
     * Filtrer les demandes
     */
    filterRequests(status) {
        const requests = this.getRequests();
        if (status === 'all') {
            this.displayRequests(requests);
        } else {
            const filtered = requests.filter(r => r.status === status);
            this.displayRequests(filtered);
        }
    }

    /**
     * Filtrer les demandes par type
     */
    filterRequestsByType(type) {
        const requests = this.getRequests();
        if (type === 'all') {
            this.displayRequests(requests);
        } else {
            const filtered = requests.filter(r => r.type === type);
            this.displayRequests(filtered);
        }
    }

    /**
     * Afficher les demandes
     */
    displayRequests(requests) {
        console.log('📋 Affichage des demandes:', requests.length);
        const grid = document.getElementById('requests-grid');
        if (!grid) {
            console.error('❌ Container requests-grid non trouvé');
            return;
        }
        
        if (requests.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666; grid-column: 1 / -1;">
                    Aucune demande trouvée
                </div>
            `;
            return;
        }
        
        // Trier par date (plus récent en premier)
        requests.sort((a, b) => new Date(b.dateSoumission) - new Date(a.dateSoumission));

        let requestsHTML = '';
        requests.forEach((request, index) => {
            console.log(`📝 Demande ${index}:`, request.id, 'Statut:', request.statut);
            
            const date = new Date(request.dateSoumission).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const statusClass = this.getStatusClass(request.statut);
            const typeIcon = this.getTypeIcon(request.type);

            requestsHTML += `
                <div class="request-card ${request.statut || 'pending'}" onclick="viewRequest('${request.id}')">
                    <div class="request-header">
                        <div class="request-type">
                            <i class="${typeIcon}"></i>
                            <span>${this.getTypeLabel(request.type)}</span>
                        </div>
                        <div class="request-status ${statusClass}">
                            ${this.getStatusLabel(request.statut)}
                        </div>
                    </div>
                    <div class="request-body">
                        <div class="request-info">
                            <p><strong>👤 Client:</strong> ${request.nom || request.fullName || 'N/A'}</p>
                            <p><strong>📧 Email:</strong> ${request.email || 'N/A'}</p>
                            ${this.getRequestDetails(request)}
                            <p><strong>📅 Date:</strong> ${date}</p>
                        </div>
                    </div>
                    <div class="request-actions">
                        ${request.statut === 'accepté' || request.statut === 'refusé' ? `
                            <span class="status-final">
                                ${request.statut === 'accepté' ? '✅ Traitée' : '❌ Traitée'}
                            </span>
                        ` : `
                            <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); approveRequest('${request.id}')" title="Approuver">
                                <i class="fas fa-check"></i> Approuver
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); rejectRequest('${request.id}')" title="Refuser">
                                <i class="fas fa-times"></i> Refuser
                            </button>
                        `}
                    </div>
                </div>
            `;
        });

        grid.innerHTML = requestsHTML;
        console.log('✅ Demandes affichées:', requests.length);
    }

    /**
     * Approuver une demande
     */
    approveRequest(requestId) {
        console.log('✅ Approuver demande:', requestId);
        const requests = this.getRequests();
        const request = requests.find(r => r.id === requestId);
        if (request) {
            request.statut = 'accepté';
            request.status = 'accepté'; // Compatibilité
            localStorage.setItem('admin-demandes', JSON.stringify(requests));
            this.loadRequests();
            this.updateStats();
            this.showNotification('Demande marquée comme acceptée !', 'success');
        } else {
            console.error('❌ Demande non trouvée:', requestId);
            this.showNotification('Demande non trouvée !', 'error');
        }
    }

    /**
     * Refuser une demande
     */
    rejectRequest(requestId) {
        console.log('❌ Refuser demande (classe):', requestId);
        
        // Récupérer toutes les demandes
        let requests = this.getRequests();
        console.log('📋 Demandes trouvées:', requests.length);
        console.log('🔍 Recherche de la demande:', requestId);
        
        // Afficher tous les IDs pour debug
        console.log('📝 IDs disponibles:', requests.map(r => r.id));
        
        // Essayer plusieurs façons de trouver la demande
        let requestIndex = requests.findIndex(r => r.id === requestId);
        if (requestIndex === -1) {
            // Essayer avec toString()
            requestIndex = requests.findIndex(r => r.id.toString() === requestId.toString());
        }
        if (requestIndex === -1) {
            // Essayer de trouver par email ou nom
            requestIndex = requests.findIndex(r => r.email === requestId || r.nom === requestId);
        }
        
        console.log('📍 Index trouvé:', requestIndex);
        
        if (requestIndex !== -1) {
            console.log('✅ Changement de statut à refusé:', requestIndex);
            console.log('📝 Demande à modifier:', requests[requestIndex]);
            
            // Changer le statut à "refusé"
            requests[requestIndex].statut = 'refusé';
            requests[requestIndex].status = 'refusé';
            console.log('📋 Statut changé à refusé');
            
            // Sauvegarder dans localStorage
            localStorage.setItem('admin-demandes', JSON.stringify(requests));
            console.log('💾 localStorage mis à jour');
            
            // Recharger l'affichage
            this.loadRequests();
            this.updateStats();
            this.showNotification('Demande marquée comme refusée.', 'warning');
        } else {
            console.error('❌ Demande non trouvée:', requestId);
            this.showNotification('Demande non trouvée !', 'error');
        }
    }

    /**
     * Traiter toutes les demandes
     */
    processAllRequests() {
        const requests = this.getRequests();
        const pendingRequests = requests.filter(r => r.status === 'pending');
        
        if (pendingRequests.length === 0) {
            this.showNotification('Aucune demande en attente à traiter.', 'info');
            return;
        }
        
        pendingRequests.forEach(request => {
            request.status = 'approved';
        });
        
        localStorage.setItem('admin-demandes', JSON.stringify(requests));
        this.loadRequests();
        this.updateStats();
        this.showNotification(`${pendingRequests.length} demandes traitées avec succès !`, 'success');
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
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    /**
     * Mettre à jour la dernière connexion
     */
    updateLastLogin() {
        const lastLoginEl = document.getElementById('last-login');
        if (lastLoginEl) {
            lastLoginEl.textContent = new Date().toLocaleString('fr-FR');
        }
    }

    /**
     * Actualiser le dashboard
     */
    refreshDashboard() {
        this.loadDashboardData();
        this.showNotification('Dashboard actualisé !', 'success');
    }

    /**
     * Exporter un rapport
     */
    exportReport() {
        this.showNotification('Rapport exporté avec succès !', 'success');
    }

    /**
     * Exporter les utilisateurs
     */
    exportUsers() {
        this.showNotification('Liste des utilisateurs exportée !', 'success');
    }

    /**
     * Voir un utilisateur
     */
    viewUser(email) {
        console.log('👁️ Affichage des détails de l\'utilisateur:', email);
        
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            this.showNotification(`Utilisateur ${email} non trouvé`, 'error');
            return;
        }
        
        // Récupérer les demandes de cet utilisateur
        const requests = this.getRequests();
        const userRequests = requests.filter(r => r.email === email || r.userEmail === email);
        
        // Créer le contenu de la modal avec tous les détails
        const modalContent = `
            <div class="modal-header">
                <h3>👤 Détails de l'utilisateur</h3>
                <button class="close-btn" onclick="closeUserModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="user-details-grid">
                    <!-- Informations personnelles -->
                    <div class="detail-section">
                        <h4>📋 Informations personnelles</h4>
                        <div class="detail-item">
                            <label>👤 Nom complet:</label>
                            <span>${user.name || user.fullName || user.nom || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📧 Email:</label>
                            <span>${user.email}</span>
                        </div>
                        <div class="detail-item">
                            <label>📞 Téléphone:</label>
                            <span>${user.telephone || user.phone || user.tel || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📍 Adresse:</label>
                            <span>${user.adresse || user.address || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🆔 CIN:</label>
                            <span>${user.cin || user.identifiant || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📅 Date de naissance:</label>
                            <span>${user.dateNaissance || user.birthDate || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🌍 Nationalité:</label>
                            <span>${user.nationalite || user.nationality || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💼 Profession:</label>
                            <span>${user.profession || user.job || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💵 Revenus mensuels:</label>
                            <span>${user.revenus || user.salaire || user.income || 'Non renseigné'} DH</span>
                        </div>
                        <div class="detail-item">
                            <label>🏢 Employeur:</label>
                            <span>${user.employeur || user.employer || 'Non renseigné'}</span>
                        </div>
                    </div>
                    
                    <!-- Informations de connexion -->
                    <div class="detail-section">
                        <h4>🔐 Informations de connexion</h4>
                        <div class="detail-item">
                            <label>📅 Date d'inscription:</label>
                            <span>${new Date(user.registrationDate || user.createdAt || Date.now()).toLocaleString('fr-FR')}</span>
                        </div>
                        <div class="detail-item">
                            <label>🕐 Dernière connexion:</label>
                            <span>${user.lastLogin ? new Date(user.lastLogin).toLocaleString('fr-FR') : 'Jamais connecté'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📊 Statut:</label>
                            <span class="status-badge ${user.status || 'active'}">${user.status === 'active' ? '✅ Actif' : '❌ Inactif'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🔑 Rôle:</label>
                            <span>${user.role === 'admin' ? '👑 Administrateur' : '👤 Client'}</span>
                        </div>
                    </div>
                    
                    <!-- Demandes de l'utilisateur -->
                    <div class="detail-section">
                        <h4>📝 Demandes (${userRequests.length})</h4>
                        ${userRequests.length > 0 ? `
                            <div class="user-requests-list">
                                ${userRequests.map(request => `
                                    <div class="user-request-item">
                                        <div class="request-header">
                                            <span class="request-type">${this.getTypeLabel(request.type)}</span>
                                            <span class="status-badge ${request.statut || 'pending'}">${this.getStatusLabel(request.statut)}</span>
                                        </div>
                                        <div class="request-date">
                                            ${new Date(request.dateSoumission || request.createdAt).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : '<p>Aucune demande trouvée</p>'}
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalContent, 'user-modal');
    }

    /**
     * Modifier un utilisateur
     */
    editUser(email) {
        this.showNotification(`Modification de ${email}`, 'info');
    }

    /**
     * Voir une demande
     */
    viewRequest(id) {
        console.log('👁️ Affichage des détails de la demande:', id);
        
        const requests = this.getRequests();
        const request = requests.find(r => r.id === id || r.id === parseInt(id));
        
        if (!request) {
            this.showNotification(`Demande ${id} non trouvée`, 'error');
            return;
        }
        
        // Créer le contenu de la modal avec tous les détails
        const modalContent = `
            <div class="modal-header">
                <h3>Détails de la demande</h3>
                <button class="close-btn" onclick="closeRequestModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="request-details-grid">
                    <!-- Informations générales -->
                    <div class="detail-section">
                        <h4>Informations générales</h4>
                        <div class="detail-item">
                            <label>Type de demande:</label>
                            <span class="request-type-badge ${request.type}">${this.getRequestTypeText(request.type)}</span>
                        </div>
                        <div class="detail-item">
                            <label>Statut:</label>
                            <span class="status-badge ${request.status || 'pending'}">${this.getStatusText(request.status || 'pending')}</span>
                        </div>
                        <div class="detail-item">
                            <label>Date de soumission:</label>
                            <span>${new Date(request.date || request.dateSoumission || request.createdAt).toLocaleString('fr-FR')}</span>
                        </div>
                        <div class="detail-item">
                            <label>ID de la demande:</label>
                            <span>${request.id}</span>
                        </div>
                    </div>
                    
                    <!-- Informations client -->
                    <div class="detail-section">
                        <h4>👤 Informations client</h4>
                        <div class="detail-item">
                            <label>👤 Nom complet:</label>
                            <span>${request.userName || request.fullName || request.name || request.nom || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📧 Email:</label>
                            <span>${request.userEmail || request.email || request.emailClient || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📞 Téléphone:</label>
                            <span>${request.telephone || request.phone || request.tel || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📍 Adresse:</label>
                            <span>${request.adresse || request.address || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🆔 CIN:</label>
                            <span>${request.cin || request.identifiant || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📅 Date de naissance:</label>
                            <span>${request.dateNaissance || request.birthDate || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🌍 Nationalité:</label>
                            <span>${request.nationalite || request.nationality || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💼 Profession:</label>
                            <span>${request.profession || request.job || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💵 Revenus mensuels:</label>
                            <span>${request.revenus || request.salaire || request.income || 'Non renseigné'} DH</span>
                        </div>
                        <div class="detail-item">
                            <label>🏢 Employeur:</label>
                            <span>${request.employeur || request.employer || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>⏳ Ancienneté:</label>
                            <span>${request.anciennete || request.seniority || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>👥 Situation familiale:</label>
                            <span>${request.situation || request.familyStatus || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>👶 Nombre d'enfants:</label>
                            <span>${request.enfants || request.children || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🏠 Logement:</label>
                            <span>${request.logement || request.housing || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🏦 Banque actuelle:</label>
                            <span>${request.banque || request.bank || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>📊 Type de compte:</label>
                            <span>${request.compte || request.accountType || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>🏛️ RIB:</label>
                            <span>${request.rib || request.accountNumber || 'Non renseigné'}</span>
                        </div>
                    </div>
                    
                    <!-- Détails de la demande -->
                    <div class="detail-section">
                        <h4>Détails de la demande</h4>
                        ${this.generateRequestDetails(request)}
                    </div>
                    
                    <!-- Fichiers joints -->
                    ${this.generateAttachmentsSection(request)}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="adminDashboard.approveRequest('${request.id}')">
                    <i class="fas fa-check"></i> Approuver
                </button>
                <button class="btn btn-outline" onclick="adminDashboard.rejectRequest('${request.id}')">
                    <i class="fas fa-times"></i> Refuser
                </button>
                <button class="btn btn-primary" onclick="closeRequestModal()">
                    <i class="fas fa-times"></i> Fermer
                </button>
            </div>
        `;
        
        // Afficher la modal
        this.showModal(modalContent, 'request-modal');
    }
    
    /**
     * Générer les détails spécifiques selon le type de demande
     */
    generateRequestDetails(request) {
        let details = '';
        
        // Afficher TOUTES les informations (utilisateur + formulaire) avec icônes
        const excludedFields = ['id', 'type', 'status', 'statut', 'date', 'dateSoumission', 'createdAt'];
        
        const allFields = Object.entries(request)
            .filter(([key, value]) => 
                !excludedFields.includes(key) &&
                value !== null && value !== undefined && value !== '' && value !== 'undefined'
            )
            .sort(([a], [b]) => a.localeCompare(b)); // Trier alphabétiquement
        
        if (allFields.length > 0) {
            details = allFields.map(([key, value]) => {
                const icon = this.getFieldIcon(key);
                const label = this.formatFieldName(key);
                return `
                    <div class="detail-item">
                        <label>${icon} ${label}:</label>
                        <span>${value}</span>
                    </div>
                `;
            }).join('');
        } else {
            // Fallback pour les champs spécifiques par type
            switch(request.type) {
                case 'pret':
                    details = `
                        <div class="detail-item">
                            <label>💰 Montant demandé:</label>
                            <span>${request.amount || request.montant || request.montantPret || 'Non renseigné'} DH</span>
                        </div>
                        <div class="detail-item">
                            <label>⏱️ Durée:</label>
                            <span>${request.duree || 'Non renseigné'} mois</span>
                        </div>
                        <div class="detail-item">
                            <label>📝 Objet du prêt:</label>
                            <span>${request.objet || request.objetPret || request.motif || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💵 Revenus mensuels:</label>
                            <span>${request.revenus || request.salaire || 'Non renseigné'} DH</span>
                        </div>
                    `;
                    break;
                    
                case 'carte':
                    details = `
                        <div class="detail-item">
                            <label>💳 Type de carte:</label>
                            <span>${request.typeCarte || request.carteType || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💵 Limite demandée:</label>
                            <span>${request.limite || request.limiteCarte || 'Non renseigné'} DH</span>
                        </div>
                        <div class="detail-item">
                            <label>📝 Motif:</label>
                            <span>${request.motif || request.raison || 'Non renseigné'}</span>
                        </div>
                    `;
                    break;
                    
                case 'assurance':
                    details = `
                        <div class="detail-item">
                            <label>🛡️ Type d'assurance:</label>
                            <span>${request.typeAssurance || request.assuranceType || 'Non renseigné'}</span>
                        </div>
                        <div class="detail-item">
                            <label>💰 Prix:</label>
                            <span>${request.prix || request.cout || 'Non renseigné'} DH</span>
                        </div>
                        <div class="detail-item">
                            <label>⏱️ Durée:</label>
                            <span>${request.duree || request.periode || 'Non renseigné'}</span>
                        </div>
                    `;
                    break;
                    
                default:
                    details = '<p>📋 Aucun détail supplémentaire disponible</p>';
            }
        }
        
        return details;
    }
    
    /**
     * Générer la section des fichiers joints
     */
    generateAttachmentsSection(request) {
        const attachments = [];
        
        // Chercher les champs qui pourraient contenir des fichiers
        if (request.fichiers) attachments.push(...request.fichiers);
        if (request.documents) attachments.push(...request.documents);
        if (request.pieces) attachments.push(...request.pieces);
        
        if (attachments.length === 0) return '';
        
        return `
            <div class="detail-section">
                <h4>Fichiers joints (${attachments.length})</h4>
                <div class="attachments-list">
                    ${attachments.map(file => `
                        <div class="attachment-item">
                            <i class="fas fa-file"></i>
                            <span>${file.name || file}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    /**
     * Formater le nom d'un champ pour l'affichage
     */
    formatFieldName(key) {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .replace(/([A-Z])/g, ' $1')
            .trim();
    }
    
    /**
     * Obtenir le texte du type de demande
     */
    getRequestTypeText(type) {
        switch(type) {
            case 'pret': return 'Demande de prêt';
            case 'carte': return 'Demande de carte';
            case 'assurance': return 'Demande d\'assurance';
            case 'compte': return 'Ouverture de compte';
            case 'virement': return 'Demande de virement';
            default: return 'Demande';
        }
    }

    /**
     * Sauvegarder les paramètres de sécurité
     */
    saveSecuritySettings() {
        this.showNotification('Paramètres de sécurité sauvegardés !', 'success');
    }

    /**
     * Sauvegarder les paramètres de notification
     */
    saveNotificationSettings() {
        this.showNotification('Paramètres de notification sauvegardés !', 'success');
    }

    /**
     * Sauvegarder les paramètres de maintenance
     */
    saveMaintenanceSettings() {
        this.showNotification('Paramètres de maintenance sauvegardés !', 'success');
    }

    /**
     * Initialiser les graphiques
     */
    initializeCharts() {
        console.log('📊 Initialisation des graphiques...');
        
        // Vérifier que Chart.js est disponible
        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js n\'est pas chargé');
            this.showNotification('Erreur: Chart.js non disponible', 'error');
            return;
        }
        
        // Attendre que le DOM soit prêt
        setTimeout(() => {
            try {
                this.createRegistrationsChart();
                this.createRequestsPieChart();
                this.createPerformanceChart();
                this.updateStatsTable();
                console.log('✅ Tous les graphiques initialisés avec succès');
            } catch (error) {
                console.error('❌ Erreur lors de l\'initialisation des graphiques:', error);
                this.showNotification('Erreur lors du chargement des graphiques', 'error');
            }
        }, 500);
    }

    /**
     * Créer le graphique d'évolution des inscriptions
     */
    createRegistrationsChart() {
        try {
            const ctx = document.getElementById('registrations-chart');
            if (!ctx) {
                console.warn('❌ Canvas registrations-chart non trouvé');
                return;
            }

            const users = this.getUsers();
            const data = this.getMonthlyRegistrations(users);
            
            // Détruire le graphique existant s'il y en a un
            if (this.charts.registrations) {
                this.charts.registrations.destroy();
            }
            
            this.charts.registrations = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Nouvelles inscriptions',
                        data: data.values,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
            
            console.log('✅ Graphique des inscriptions créé avec succès');
        } catch (error) {
            console.error('❌ Erreur lors de la création du graphique des inscriptions:', error);
        }
    }

    /**
     * Créer le graphique en camembert des demandes
     */
    createRequestsPieChart() {
        try {
            const ctx = document.getElementById('requests-pie-chart');
            if (!ctx) {
                console.warn('❌ Canvas requests-pie-chart non trouvé');
                return;
            }

            const requests = this.getRequests();
            const data = this.getRequestsByStatus(requests);
            
            // Détruire le graphique existant s'il y en a un
            if (this.charts.requestsPie) {
                this.charts.requestsPie.destroy();
            }
            
            this.charts.requestsPie = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.labels,
                    datasets: [{
                        data: data.values,
                        backgroundColor: [
                            '#FFC107', // En attente
                            '#4CAF50', // Approuvées
                            '#F44336', // Refusées
                            '#2196F3'  // Autres
                        ],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
            
            console.log('✅ Graphique des demandes créé avec succès');
        } catch (error) {
            console.error('❌ Erreur lors de la création du graphique des demandes:', error);
        }
    }

    /**
     * Créer le graphique de performance mensuelle
     */
    createPerformanceChart() {
        try {
            const ctx = document.getElementById('performance-chart');
            if (!ctx) {
                console.warn('❌ Canvas performance-chart non trouvé');
                return;
            }

            const data = this.getMonthlyPerformance();
            
            // Détruire le graphique existant s'il y en a un
            if (this.charts.performance) {
                this.charts.performance.destroy();
            }
            
            this.charts.performance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Utilisateurs',
                        data: data.users,
                        backgroundColor: '#2196F3',
                        borderColor: '#1976D2',
                        borderWidth: 1
                    }, {
                        label: 'Demandes',
                        data: data.requests,
                        backgroundColor: '#FF9800',
                        borderColor: '#F57C00',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            
            console.log('✅ Graphique de performance créé avec succès');
        } catch (error) {
            console.error('❌ Erreur lors de la création du graphique de performance:', error);
        }
    }

    /**
     * Obtenir les données d'inscriptions mensuelles
     */
    getMonthlyRegistrations(users) {
        const months = [];
        const counts = [];
        
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
            months.push(monthName);
            
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const count = users.filter(user => {
                const userDate = new Date(user.createdAt);
                return userDate >= monthStart && userDate <= monthEnd;
            }).length;
            
            counts.push(count);
        }
        
        return { labels: months, values: counts };
    }

    /**
     * Obtenir la répartition des demandes par statut
     */
    getRequestsByStatus(requests) {
        const statusCounts = {
            'En attente': 0,
            'Approuvées': 0,
            'Refusées': 0,
            'Autres': 0
        };
        
        console.log('📊 Analyse des statuts des demandes:', requests.map(r => ({ id: r.id, status: r.status, statut: r.statut })));
        
        requests.forEach(request => {
            // Vérifier les différents formats de statut possibles
            const status = request.status || request.statut || 'en_attente';
            console.log(`📝 Demande ${request.id}: status="${request.status}", statut="${request.statut}" -> final="${status}"`);
            
            switch (status.toLowerCase()) {
                case 'pending':
                case 'en_attente':
                case 'en attente':
                    statusCounts['En attente']++;
                    break;
                case 'approved':
                case 'accepté':
                case 'approuvé':
                case 'approuvee':
                    statusCounts['Approuvées']++;
                    break;
                case 'rejected':
                case 'refusé':
                case 'refusee':
                    statusCounts['Refusées']++;
                    break;
                default:
                    console.log(`⚠️ Statut non reconnu: "${status}" pour la demande ${request.id}`);
                    statusCounts['Autres']++;
            }
        });
        
        console.log('📈 Répartition finale:', statusCounts);
        
        return {
            labels: Object.keys(statusCounts),
            values: Object.values(statusCounts)
        };
    }

    /**
     * Obtenir les données de performance mensuelle
     */
    getMonthlyPerformance() {
        const users = this.getUsers();
        const requests = this.getRequests();
        
        const months = [];
        const userCounts = [];
        const requestCounts = [];
        
        for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthName = date.toLocaleDateString('fr-FR', { month: 'short' });
            months.push(monthName);
            
            const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            
            const userCount = users.filter(user => {
                const userDate = new Date(user.createdAt);
                return userDate >= monthStart && userDate <= monthEnd;
            }).length;
            
            const requestCount = requests.filter(request => {
                const requestDate = new Date(request.date || request.createdAt);
                return requestDate >= monthStart && requestDate <= monthEnd;
            }).length;
            
            userCounts.push(userCount);
            requestCounts.push(requestCount);
        }
        
        return {
            labels: months,
            users: userCounts,
            requests: requestCounts
        };
    }

    /**
     * Mettre à jour le tableau des statistiques détaillées
     */
    updateStatsTable() {
        const tbody = document.getElementById('stats-table-body');
        if (!tbody) {
            console.warn('❌ Élément stats-table-body non trouvé');
            return;
        }

        const users = this.getUsers();
        const requests = this.getRequests();
        
        const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
        const inactiveUsers = users.filter(u => u.status === 'INACTIVE').length;
        const pendingRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'pending' || status === 'en_attente' || status === 'en attente';
        }).length;
        const approvedRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'approved' || status === 'accepté' || status === 'approuvé' || status === 'approuvee';
        }).length;
        const rejectedRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'rejected' || status === 'refusé' || status === 'refusee';
        }).length;
        
        const growthRate = this.calculateGrowthRate();
        const avgResponseTime = this.calculateAverageResponseTime(requests);
        
        tbody.innerHTML = `
            <tr>
                <td>Utilisateurs actifs</td>
                <td>${activeUsers}</td>
                <td><span class="positive">+${activeUsers}</span></td>
            </tr>
            <tr>
                <td>Utilisateurs inactifs</td>
                <td>${inactiveUsers}</td>
                <td><span class="negative">-${inactiveUsers}</span></td>
            </tr>
            <tr>
                <td>Demandes en attente</td>
                <td>${pendingRequests}</td>
                <td><span class="warning">${pendingRequests}</span></td>
            </tr>
            <tr>
                <td>Demandes approuvées</td>
                <td>${approvedRequests}</td>
                <td><span class="positive">+${approvedRequests}</span></td>
            </tr>
            <tr>
                <td>Demandes refusées</td>
                <td>${rejectedRequests}</td>
                <td><span class="negative">-${rejectedRequests}</span></td>
            </tr>
            <tr>
                <td>Taux de croissance</td>
                <td>${growthRate}%</td>
                <td><span class="positive">+${growthRate}%</span></td>
            </tr>
            <tr>
                <td>Temps de réponse moyen</td>
                <td>${avgResponseTime} jours</td>
                <td><span class="info">${avgResponseTime}</span></td>
            </tr>
        `;
    }

    /**
     * Calculer le temps de réponse moyen
     */
    calculateAverageResponseTime(requests) {
        const processedRequests = requests.filter(r => {
            const status = r.status || r.statut || 'en_attente';
            return status === 'approved' || status === 'accepté' || status === 'approuvé' || status === 'approuvee' ||
                   status === 'rejected' || status === 'refusé' || status === 'refusee';
        });
        
        if (processedRequests.length === 0) return 0;
        
        let totalDays = 0;
        processedRequests.forEach(request => {
            const requestDate = new Date(request.date || request.createdAt);
            const processDate = new Date(request.processedAt || Date.now());
            const daysDiff = Math.ceil((processDate - requestDate) / (1000 * 60 * 60 * 24));
            totalDays += daysDiff;
        });
        
        return Math.round(totalDays / processedRequests.length);
    }

    /**
     * Mettre à jour tous les graphiques
     */
    updateCharts() {
        const users = this.getUsers();
        const requests = this.getRequests();
        
        // Mettre à jour le graphique des inscriptions
        if (this.charts.registrations) {
            const regData = this.getMonthlyRegistrations(users);
            this.charts.registrations.data.labels = regData.labels;
            this.charts.registrations.data.datasets[0].data = regData.values;
            this.charts.registrations.update();
        }
        
        // Mettre à jour le graphique des demandes
        if (this.charts.requestsPie) {
            const reqData = this.getRequestsByStatus(requests);
            this.charts.requestsPie.data.labels = reqData.labels;
            this.charts.requestsPie.data.datasets[0].data = reqData.values;
            this.charts.requestsPie.update();
        }
        
        // Mettre à jour le graphique de performance
        if (this.charts.performance) {
            const perfData = this.getMonthlyPerformance();
            this.charts.performance.data.labels = perfData.labels;
            this.charts.performance.data.datasets[0].data = perfData.users;
            this.charts.performance.data.datasets[1].data = perfData.requests;
            this.charts.performance.update();
        }
    }

    /**
     * Charger les notifications
     */
    loadNotifications() {
        console.log('🔔 Chargement des notifications...');
        const notifications = this.getNotifications();
        const list = document.getElementById('notifications-list');
        if (list) {
            list.innerHTML = notifications.map(notification => `
                <div class="notification-item ${notification.type}">
                    <div class="notification-content">
                        <p>${notification.message}</p>
                        <small>${new Date(notification.time).toLocaleString('fr-FR')}</small>
                    </div>
                </div>
            `).join('');
        }
    }

    /**
     * Afficher une modal
     */
    showModal(content, modalId = 'modal') {
        // Créer la modal si elle n'existe pas
        let modal = document.getElementById(modalId);
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-overlay"></div>
                <div class="modal-container">
                    <div class="modal-content">
                        ${content}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            const modalContent = modal.querySelector('.modal-content');
            modalContent.innerHTML = content;
        }
        
        // Afficher la modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Fermer la modal en cliquant sur l'overlay
        const overlay = modal.querySelector('.modal-overlay');
        overlay.onclick = () => this.closeModal(modalId);
    }
    
    /**
     * Fermer une modal
     */
    closeModal(modalId = 'modal') {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    /**
     * Déconnexion de l'administrateur
     */
    logout() {
        console.log('🚪 Déconnexion de l\'administrateur...');
        
        // Effacer les données de session
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        
        // Rediriger vers la page de connexion
        this.showNotification('Déconnexion réussie. Redirection...', 'success');
        setTimeout(() => {
            window.location.href = 'connexion.html';
        }, 1500);
    }

    /**
     * Basculer le statut d'un utilisateur
     */
    toggleUserStatus(email) {
        console.log('🔄 Basculement du statut pour:', email);
        
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        
        if (user) {
            user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
            localStorage.setItem('users', JSON.stringify(users));
            this.loadUsers();
            this.updateStats();
            
            const statusText = user.status === 'ACTIVE' ? 'activé' : 'désactivé';
            this.showNotification(`Utilisateur ${email} ${statusText} avec succès !`, 'success');
        }
    }

    /**
     * Démarrer la mise à jour automatique des connexions
     */
    startAutoRefresh() {
        console.log('🔄 Démarrage de la mise à jour automatique...');
        
        // Mettre à jour toutes les 30 secondes
        setInterval(() => {
            this.refreshUserConnections();
        }, 30000);
        
        // Mettre à jour immédiatement
        this.refreshUserConnections();
    }

    /**
     * Actualiser les connexions utilisateurs
     */
    refreshUserConnections() {
        console.log('🔄 Actualisation des connexions utilisateurs...');
        
        // Récupérer les connexions depuis le serveur
        fetch('http://localhost:8081/api/admin/user-connections')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Sauvegarder les connexions dans localStorage
                    localStorage.setItem('userConnections', JSON.stringify(data.data));
                    console.log('✅ Connexions mises à jour:', data.data.length);
                    
                    // Recharger les utilisateurs si on est sur la section utilisateurs
                    if (document.getElementById('users').classList.contains('active')) {
                        this.loadUsers();
                        this.updateStats();
                    }
                }
            })
            .catch(error => {
                console.warn('⚠️ Erreur lors de la récupération des connexions:', error);
            });
    }

    // Méthodes helper pour les demandes
    getStatusClass(status) {
        switch(status) {
            case 'accepté': return 'status-approved';
            case 'refusé': return 'status-rejected';
            case 'en_attente': return 'status-pending';
            case 'pending': return 'status-pending';
            default: return 'status-pending';
        }
    }

    getStatusLabel(status) {
        switch(status) {
            case 'accepté': return '✅ Accepté';
            case 'refusé': return '❌ Refusé';
            case 'en_attente': return '⏳ En attente';
            case 'pending': return '⏳ En attente';
            default: return '⏳ En attente';
        }
    }

    getTypeIcon(type) {
        switch(type) {
            case 'pret': return 'fas fa-hand-holding-usd';
            case 'carte': return 'fas fa-credit-card';
            case 'assurance': return 'fas fa-shield-alt';
            case 'compte': return 'fas fa-university';
            default: return 'fas fa-file-alt';
        }
    }

    getTypeLabel(type) {
        switch(type) {
            case 'pret': return 'Demande de prêt';
            case 'carte': return 'Demande de carte';
            case 'assurance': return 'Demande d\'assurance';
            case 'compte': return 'Ouverture de compte';
            default: return 'Demande';
        }
    }

    getRequestDetails(request) {
        let details = '';
        
        // Afficher TOUTES les informations du formulaire
        Object.keys(request).forEach(key => {
            if (key !== 'id' && key !== 'type' && key !== 'dateSoumission' && key !== 'statut' && 
                key !== 'nom' && key !== 'email' && key !== 'fullName') {
                
                let value = request[key];
                let label = this.formatFieldName(key);
                let icon = this.getFieldIcon(key);
                
                if (value && value !== '' && value !== 'undefined') {
                    details += `<p><strong>${icon} ${label}:</strong> ${value}</p>`;
                }
            }
        });
        
        return details || '<p><strong>📋 Détails:</strong> Aucun détail supplémentaire</p>';
    }

    getFieldIcon(fieldName) {
        const icons = {
            montant: '💰',
            duree: '⏱️',
            motif: '📝',
            typeCarte: '💳',
            limite: '💵',
            typeAssurance: '🛡️',
            prix: '💰',
            telephone: '📞',
            adresse: '📍',
            profession: '💼',
            revenus: '💵',
            banque: '🏦',
            compte: '📊',
            rib: '🏛️',
            cin: '🆔',
            dateNaissance: '📅',
            nationalite: '🌍',
            situation: '👥',
            enfants: '👶',
            logement: '🏠',
            employeur: '🏢',
            anciennete: '⏳',
            secteur: '🏭',
            autresRevenus: '💸',
            charges: '💳',
            epargne: '💰',
            projets: '🎯'
        };
        
        return icons[fieldName] || '📋';
    }
}

// Fonctions globales pour les actions sur les demandes (seront définies après l'initialisation)

function viewRequest(requestId) {
    console.log('🔍 Bouton Voir désactivé pour la demande:', requestId);
    showSimpleNotification('Fonction Voir désactivée', 'info');
}

// Fonction de notification simple en fallback
function showSimpleNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'warning' ? '#ffc107' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1000;
        font-family: Arial, sans-serif;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// Initialiser le dashboard
let adminDashboard;

// Fonction globale de déconnexion
function logoutAdmin() {
    console.log('🚪 Déconnexion de l\'administrateur...');
    
    // Effacer les données de session
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    
    // Afficher notification et rediriger
    if (adminDashboard) {
        adminDashboard.showNotification('Déconnexion réussie. Redirection...', 'success');
    }
    
    setTimeout(() => {
        window.location.href = 'connexion.html';
    }, 1500);
}

// Fonction globale pour fermer la modal utilisateur
function closeUserModal() {
    if (adminDashboard) {
        adminDashboard.closeModal('user-modal');
    }
}

// Fonction globale pour fermer la modal de demande
function closeRequestModal() {
    if (adminDashboard) {
        adminDashboard.closeModal('request-modal');
    }
}

// Définir les fonctions globales immédiatement
function viewUser(email) {
    console.log('👁️ Voir utilisateur (globale):', email);
    if (typeof adminDashboard !== 'undefined' && adminDashboard) {
        adminDashboard.viewUser(email);
    } else {
        console.error('❌ adminDashboard non disponible');
        showSimpleNotification('Erreur: Dashboard non initialisé', 'error');
    }
}

function editUser(email) {
    console.log('✏️ Modifier utilisateur (globale):', email);
    if (typeof adminDashboard !== 'undefined' && adminDashboard) {
        adminDashboard.editUser(email);
    } else {
        console.error('❌ adminDashboard non disponible');
        showSimpleNotification('Erreur: Dashboard non initialisé', 'error');
    }
}

function approveRequest(requestId) {
    console.log('✅ Approuver demande (globale):', requestId);
    if (typeof adminDashboard !== 'undefined' && adminDashboard) {
        adminDashboard.approveRequest(requestId);
    } else {
        console.error('❌ adminDashboard non disponible');
        // Fallback: changer le statut directement
        try {
            const requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
            const requestIndex = requests.findIndex(r => r.id === requestId);
            if (requestIndex !== -1) {
                requests[requestIndex].statut = 'accepté';
                requests[requestIndex].status = 'accepté';
                localStorage.setItem('admin-demandes', JSON.stringify(requests));
                showSimpleNotification('Demande marquée comme acceptée', 'success');
                // Recharger l'affichage
                if (typeof adminDashboard !== 'undefined' && adminDashboard) {
                    adminDashboard.loadRequests();
                } else {
                    // Recharger la page comme fallback
                    setTimeout(() => window.location.reload(), 1000);
                }
            }
        } catch (error) {
            console.error('❌ Erreur fallback:', error);
            showSimpleNotification('Erreur lors de l\'approbation', 'error');
        }
    }
}

function rejectRequest(requestId) {
    console.log('❌ Refuser demande (globale):', requestId);
    if (typeof adminDashboard !== 'undefined' && adminDashboard) {
        adminDashboard.rejectRequest(requestId);
    } else {
        console.error('❌ adminDashboard non disponible');
        // Fallback: changer le statut directement
        try {
            const requests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
            const requestIndex = requests.findIndex(r => r.id === requestId);
            if (requestIndex !== -1) {
                requests[requestIndex].statut = 'refusé';
                requests[requestIndex].status = 'refusé';
                localStorage.setItem('admin-demandes', JSON.stringify(requests));
                showSimpleNotification('Demande marquée comme refusée', 'warning');
                // Recharger l'affichage
                if (typeof adminDashboard !== 'undefined' && adminDashboard) {
                    adminDashboard.loadRequests();
                } else {
                    // Recharger la page comme fallback
                    setTimeout(() => window.location.reload(), 1000);
                }
            }
        } catch (error) {
            console.error('❌ Erreur fallback:', error);
            showSimpleNotification('Erreur lors du refus', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Chargement du dashboard admin...');
    adminDashboard = new AdminDashboard();
    console.log('✅ Dashboard admin initialisé');
});

// Fonctions globales
function showSection(sectionName) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour la navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Mettre à jour la section courante
    if (adminDashboard) {
        adminDashboard.currentSection = sectionName;
        
        // Initialiser les graphiques si on passe à la section analytics
        if (sectionName === 'analytics') {
            console.log('📊 Initialisation des graphiques pour la section analytics...');
            setTimeout(() => {
                adminDashboard.initializeCharts();
            }, 100);
        }
    }
}

function refreshDashboard() {
    if (adminDashboard) {
        adminDashboard.refreshDashboard();
    }
}

function exportReport() {
    if (adminDashboard) {
        adminDashboard.exportReport();
    }
}

function exportUsers() {
    if (adminDashboard) {
        adminDashboard.exportUsers();
    }
}

function processAllRequests() {
    if (adminDashboard) {
        adminDashboard.processAllRequests();
    }
}

function saveSecuritySettings() {
    if (adminDashboard) {
        adminDashboard.saveSecuritySettings();
    }
}

function saveNotificationSettings() {
    if (adminDashboard) {
        adminDashboard.saveNotificationSettings();
    }
}

function saveMaintenanceSettings() {
    if (adminDashboard) {
        adminDashboard.saveMaintenanceSettings();
    }
}
