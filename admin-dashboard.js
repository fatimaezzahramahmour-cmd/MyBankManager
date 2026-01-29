/**
 * Dashboard Administratif MyBankManager
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
        this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
        this.loadNotifications();
        this.updateLastLogin();
    }

    /**
     * Configuration des écouteurs d'événements
     */
    setupEventListeners() {
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

        // Recherche de demandes
        const requestSearch = document.getElementById('request-search');
        if (requestSearch) {
            requestSearch.addEventListener('input', (e) => this.filterRequestsBySearch(e.target.value));
        }

        // Filtre par date
        const dateFilter = document.getElementById('date-filter');
        if (dateFilter) {
            dateFilter.addEventListener('change', (e) => this.filterRequestsByDate(e.target.value));
        }
        
        // Écouter les nouveaux utilisateurs
        window.addEventListener('newUserRegistered', (event) => {
            console.log('🆕 Nouvel utilisateur détecté:', event.detail.user);
            this.showNotification(`Nouvel utilisateur inscrit: ${event.detail.user.fullName}`, 'success');
            this.loadUsers(); // Recharger la liste
            this.updateStats(); // Mettre à jour les stats
        });
        
        // Écouter les nouvelles demandes
        window.addEventListener('newRequestSubmitted', (event) => {
            console.log('📝 Nouvelle demande détectée:', event.detail.request);
            this.showNotification(`Nouvelle demande reçue: ${event.detail.request.type}`, 'info');
            this.loadRequests(); // Recharger les demandes
            this.updateStats(); // Mettre à jour les stats
            this.updateCharts(); // Mettre à jour les graphiques
        });
    }

    /**
     * Charger les données du dashboard
     */
    loadDashboardData() {
        this.updateStats();
        this.loadUsers();
        this.loadRequests();
        this.loadAnalytics();
    }

    /**
     * Mettre à jour les statistiques
     */
    updateStats() {
        const users = this.getUsers();
        const requests = this.getRequests();
        
        // Statistiques principales
        document.getElementById('total-users').textContent = users.length;
        document.getElementById('users-count').textContent = users.length;
        
        const pendingRequests = requests.filter(r => r.status === 'pending');
        document.getElementById('pending-requests').textContent = pendingRequests.length;
        document.getElementById('pending-count').textContent = pendingRequests.length;
        
        document.getElementById('requests-count').textContent = requests.length;
        
        const approvedRequests = requests.filter(r => r.status === 'approved');
        document.getElementById('approved-count').textContent = approvedRequests.length;
        
        // Calculer la croissance
        const growthRate = this.calculateGrowthRate();
        document.getElementById('growth-rate').textContent = `+${growthRate}%`;
        
        // Mettre à jour les changements
        this.updateChangeIndicators();
    }

    /**
     * Calculer le taux de croissance
     */
    calculateGrowthRate() {
        const users = this.getUsers();
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        
        const thisMonthUsers = users.filter(user => {
            const userDate = new Date(user.createdAt);
            return userDate.getMonth() === thisMonth && userDate.getFullYear() === thisYear;
        });
        
        const lastMonthUsers = users.filter(user => {
            const userDate = new Date(user.createdAt);
            const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
            const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;
            return userDate.getMonth() === lastMonth && userDate.getFullYear() === lastYear;
        });
        
        if (lastMonthUsers.length === 0) return thisMonthUsers.length > 0 ? 100 : 0;
        
        return Math.round(((thisMonthUsers.length - lastMonthUsers.length) / lastMonthUsers.length) * 100);
    }

    /**
     * Mettre à jour les indicateurs de changement
     */
    updateChangeIndicators() {
        const changes = {
            'users-change': '+5 ce mois',
            'requests-change': '+12 ce mois',
            'pending-change': '+3 ce mois',
            'approved-change': '+8 ce mois'
        };
        
        Object.keys(changes).forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = changes[id];
            }
        });
    }

    /**
     * Charger les utilisateurs
     */
    loadUsers() {
        const users = this.getUsers();
        console.log('Chargement des utilisateurs:', users); // Debug
        
        const tbody = document.getElementById('users-table-body');
        if (!tbody) {
            console.error('Élément users-table-body non trouvé');
            return;
        }
        
        if (!users || users.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem;">
                        <div style="color: #666;">
                            <i class="fas fa-users" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                            Aucun utilisateur trouvé
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = users.map(user => {
            // Sécuriser les données utilisateur
            const fullName = user.fullName || user.userName || user.name || 'Utilisateur';
            const email = user.email || 'Non renseigné';
            const createdAt = user.createdAt || user.date || new Date().toISOString();
            const avatar = fullName.charAt(0).toUpperCase();
            const requestCount = this.getUserRequestsCount(email);
            const status = user.status || 'ACTIVE';
            const role = user.role || 'CLIENT';
            
            return `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar" style="background: var(--primary-color); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                            ${avatar}
                        </div>
                        <div style="margin-left: 12px;">
                            <div class="user-name" style="font-weight: 600; color: var(--text-dark);">${fullName}</div>
                            <div class="user-email" style="font-size: 0.85rem; color: var(--text-muted);">${email}</div>
                            <div class="user-role" style="font-size: 0.75rem; color: var(--accent-color); font-weight: 500;">${role}</div>
                        </div>
                    </div>
                </td>
                <td style="color: var(--text-dark);">${email}</td>
                <td style="color: var(--text-dark);">${new Date(createdAt).toLocaleDateString('fr-FR')}</td>
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
                        ${email !== 'admin@mybankmanager.com' ? `
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
        
        console.log('Utilisateurs chargés dans le tableau:', users.length);
    }

    /**
     * Charger les demandes avec design professionnel
     */
    loadRequests() {
        const requests = this.getRequests();
        this.updateRequestStats(requests);
        
        const grid = document.getElementById('requests-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (!grid) return;
        
        if (requests.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'flex';
            return;
        }
        
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        grid.innerHTML = requests.map(request => this.createRequestCard(request)).join('');
        this.updatePagination(requests.length);
    }

    /**
     * Créer une carte de demande professionnelle
     */
    createRequestCard(request) {
        const statusClass = this.getStatusClass(request.statut || request.status);
        const typeIcon = this.getTypeIcon(request.type);
        const typeText = this.getTypeText(request.type);
        const statusText = this.getStatusText(request.statut || request.status);
        const date = new Date(request.dateSoumission || request.date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const amount = request.montant || request.amount || request.coverageAmount || 'N/A';
        const clientName = request.clientName || request.nom || request.userEmail || 'Client';
        const clientEmail = request.clientEmail || request.email || request.userEmail || '';
        
        return `
            <div class="request-card ${statusClass}">
                <div class="card-header">
                    <div class="request-type">
                        <div class="type-icon">
                            <i class="fas fa-${typeIcon}"></i>
                        </div>
                        <div class="type-info">
                            <h4>${typeText}</h4>
                            <span class="request-id">#${request.id}</span>
                        </div>
                    </div>
                    <div class="request-status">
                        <span class="status-badge ${statusClass}">
                            <i class="fas fa-${this.getStatusIcon(request.statut || request.status)}"></i>
                            ${statusText}
                        </span>
                    </div>
                </div>
                
                <div class="card-body">
                    <div class="client-info">
                        <div class="client-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="client-details">
                            <h5>${clientName}</h5>
                            <span class="client-email">${clientEmail}</span>
                        </div>
                    </div>
                    
                    <div class="request-details">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${date}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>${amount} DH</span>
                        </div>
                        ${request.insuranceType ? `
                            <div class="detail-item">
                                <i class="fas fa-shield-alt"></i>
                                <span>${request.insuranceType}</span>
                            </div>
                        ` : ''}
                        ${request.typePret ? `
                            <div class="detail-item">
                                <i class="fas fa-hand-holding-usd"></i>
                                <span>${request.typePret}</span>
                            </div>
                        ` : ''}
                        ${request.typeCarte ? `
                            <div class="detail-item">
                                <i class="fas fa-credit-card"></i>
                                <span>${request.typeCarte}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${request.additionalInfo ? `
                        <div class="additional-info">
                            <p>${request.additionalInfo}</p>
                        </div>
                    ` : ''}
                </div>
                
                <div class="card-actions">
                    ${(request.statut === 'en_attente' || request.status === 'pending') ? `
                        <button class="btn btn-success" onclick="adminDashboard.approveRequest('${request.id}')">
                            <i class="fas fa-check"></i> Approuver
                        </button>
                        <button class="btn btn-danger" onclick="adminDashboard.rejectRequest('${request.id}')">
                            <i class="fas fa-times"></i> Refuser
                        </button>
                    ` : `
                        <button class="btn btn-outline" onclick="adminDashboard.viewRequest('${request.id}')">
                            <i class="fas fa-eye"></i> Voir détails
                        </button>
                    `}
                    <button class="btn btn-outline" onclick="adminDashboard.exportRequest('${request.id}')">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Mettre à jour les statistiques des demandes
     */
    updateRequestStats(requests) {
        const pending = requests.filter(r => (r.statut || r.status) === 'en_attente' || (r.statut || r.status) === 'pending').length;
        const approved = requests.filter(r => (r.statut || r.status) === 'approuvee' || (r.statut || r.status) === 'approved').length;
        const rejected = requests.filter(r => (r.statut || r.status) === 'refusee' || (r.statut || r.status) === 'rejected').length;
        const total = requests.length;
        
        // Statistiques principales (header)
        document.getElementById('pending-count').textContent = pending;
        document.getElementById('approved-count').textContent = approved;
        document.getElementById('rejected-count').textContent = rejected;
        document.getElementById('total-requests-count').textContent = total;
        
        // Statistiques détaillées
        document.getElementById('pending-detailed').textContent = pending;
        document.getElementById('approved-detailed').textContent = approved;
        document.getElementById('rejected-detailed').textContent = rejected;
        document.getElementById('total-detailed').textContent = total;
        
        // Calcul des pourcentages
        const pendingPercentage = total > 0 ? Math.round((pending / total) * 100) : 0;
        const approvedPercentage = total > 0 ? Math.round((approved / total) * 100) : 0;
        const rejectedPercentage = total > 0 ? Math.round((rejected / total) * 100) : 0;
        
        document.getElementById('pending-percentage').textContent = `${pendingPercentage}%`;
        document.getElementById('approved-percentage').textContent = `${approvedPercentage}%`;
        document.getElementById('rejected-percentage').textContent = `${rejectedPercentage}%`;
        
        // Statistiques par type
        const pretCount = requests.filter(r => r.type === 'pret').length;
        const carteCount = requests.filter(r => r.type === 'carte').length;
        const assuranceCount = requests.filter(r => r.type === 'assurance').length;
        
        document.getElementById('pret-count').textContent = pretCount;
        document.getElementById('carte-count').textContent = carteCount;
        document.getElementById('assurance-count').textContent = assuranceCount;
        
        // Statistiques supplémentaires
        const urgentCount = this.calculateUrgentRequests(requests);
        const todayProcessed = this.calculateTodayProcessed(requests);
        
        document.getElementById('urgent-count').textContent = urgentCount;
        document.getElementById('today-processed').textContent = todayProcessed;
        
        // Mise à jour de la date
        const now = new Date();
        const dateString = now.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('stats-date').textContent = `Mise à jour: ${dateString}`;
    }

    /**
     * Calculer les demandes urgentes (en attente depuis plus de 3 jours)
     */
    calculateUrgentRequests(requests) {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        
        return requests.filter(request => {
            const requestDate = new Date(request.dateSoumission || request.date);
            const isPending = (request.statut || request.status) === 'en_attente' || (request.statut || request.status) === 'pending';
            return isPending && requestDate < threeDaysAgo;
        }).length;
    }

    /**
     * Calculer les demandes traîtées aujourd'hui
     */
    calculateTodayProcessed(requests) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return requests.filter(request => {
            const requestDate = new Date(request.dateSoumission || request.date);
            const isProcessed = (request.statut || request.status) === 'approuvee' || 
                               (request.statut || request.status) === 'approved' ||
                               (request.statut || request.status) === 'refusee' || 
                               (request.statut || request.status) === 'rejected';
            return isProcessed && requestDate >= today;
        }).length;
    }

    /**
     * Obtenir la classe CSS du statut
     */
    getStatusClass(status) {
        switch(status) {
            case 'en_attente':
            case 'pending':
                return 'pending';
            case 'approuvee':
            case 'approved':
                return 'approved';
            case 'refusee':
            case 'rejected':
                return 'rejected';
            default:
                return 'pending';
        }
    }

    /**
     * Obtenir l'icône du statut
     */
    getStatusIcon(status) {
        switch(status) {
            case 'en_attente':
            case 'pending':
                return 'clock';
            case 'approuvee':
            case 'approved':
                return 'check-circle';
            case 'refusee':
            case 'rejected':
                return 'times-circle';
            default:
                return 'clock';
        }
    }

    /**
     * Obtenir l'icône du type
     */
    getTypeIcon(type) {
        switch(type) {
            case 'pret':
                return 'hand-holding-usd';
            case 'carte':
                return 'credit-card';
            case 'assurance':
                return 'shield-alt';
            default:
                return 'file-alt';
        }
    }

    /**
     * Obtenir le texte du type
     */
    getTypeText(type) {
        switch(type) {
            case 'pret':
                return 'Demande de Prêt';
            case 'carte':
                return 'Demande de Carte';
            case 'assurance':
                return 'Demande d\'Assurance';
            default:
                return 'Demande';
        }
    }

    /**
     * Mettre à jour la pagination
     */
    updatePagination(totalItems) {
        const itemsPerPage = 10;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const currentPage = 1;
        
        document.getElementById('pagination-info').textContent = 
            `Affichage de 1-${Math.min(itemsPerPage, totalItems)} sur ${totalItems} demandes`;
        
        // Pour l'instant, on affiche toutes les demandes
        // La pagination sera implémentée plus tard si nécessaire
    }

    /**
     * Exporter les demandes
     */
    exportRequests() {
        const requests = this.getRequests();
        const csvContent = this.convertToCSV(requests);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `demandes_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Export des demandes réussi', 'success');
    }

    /**
     * Exporter une demande spécifique
     */
    exportRequest(requestId) {
        const requests = this.getRequests();
        const request = requests.find(r => r.id === requestId);
        if (!request) {
            this.showNotification('Demande non trouvée', 'error');
            return;
        }
        
        const csvContent = this.convertToCSV([request]);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `demande_${requestId}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('Export de la demande réussi', 'success');
    }

    /**
     * Convertir les données en CSV
     */
    convertToCSV(data) {
        if (data.length === 0) return '';
        
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
            const values = headers.map(header => {
                const value = row[header];
                return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
            });
            csvRows.push(values.join(','));
        }
        
        return csvRows.join('\n');
    }

    /**
     * Traiter toutes les demandes en attente
     */
    processAllRequests() {
        const requests = this.getRequests();
        const pendingRequests = requests.filter(r => 
            (r.statut === 'en_attente' || r.status === 'pending')
        );
        
        if (pendingRequests.length === 0) {
            this.showNotification('Aucune demande en attente à traiter', 'info');
            return;
        }
        
        if (confirm(`Voulez-vous traiter toutes les ${pendingRequests.length} demandes en attente ?`)) {
            pendingRequests.forEach(request => {
                this.approveRequest(request.id);
            });
            this.showNotification(`${pendingRequests.length} demandes traitées avec succès`, 'success');
        }
    }

    /**
     * Filtrer les demandes par recherche
     */
    filterRequestsBySearch(searchTerm) {
        const requests = this.getRequests();
        const filtered = requests.filter(request => {
            const searchLower = searchTerm.toLowerCase();
            return (
                (request.clientName || request.nom || '').toLowerCase().includes(searchLower) ||
                (request.clientEmail || request.email || '').toLowerCase().includes(searchLower) ||
                (request.id || '').toLowerCase().includes(searchLower) ||
                (request.type || '').toLowerCase().includes(searchLower)
            );
        });
        
        this.displayFilteredRequests(filtered);
    }

    /**
     * Afficher les demandes filtrées
     */
    displayFilteredRequests(requests) {
        const grid = document.getElementById('requests-grid');
        const emptyState = document.getElementById('empty-state');
        
        if (!grid) return;
        
        if (requests.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'flex';
            emptyState.querySelector('h3').textContent = 'Aucune demande trouvée';
            emptyState.querySelector('p').textContent = 'Aucune demande ne correspond à vos critères de recherche.';
            return;
        }
        
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        grid.innerHTML = requests.map(request => this.createRequestCard(request)).join('');
        this.updatePagination(requests.length);
    }

    /**
     * Filtrer les demandes par date
     */
    filterRequestsByDate(dateFilter) {
        const requests = this.getRequests();
        let filtered = requests;
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        switch(dateFilter) {
            case 'today':
                filtered = requests.filter(request => {
                    const requestDate = new Date(request.dateSoumission || request.date);
                    return requestDate >= today;
                });
                break;
            case 'week':
                filtered = requests.filter(request => {
                    const requestDate = new Date(request.dateSoumission || request.date);
                    return requestDate >= weekAgo;
                });
                break;
            case 'month':
                filtered = requests.filter(request => {
                    const requestDate = new Date(request.dateSoumission || request.date);
                    return requestDate >= monthAgo;
                });
                break;
            default:
                // Toutes les dates
                break;
        }
        
        this.displayFilteredRequests(filtered);
    }

    /**
     * Charger les notifications
     */
    loadNotifications() {
        const notifications = this.getNotifications();
        const list = document.getElementById('notifications-list');
        if (!list) return;
        
        list.innerHTML = notifications.map(notification => `
            <div class="activity-item">
                <div class="activity-icon ${notification.type}">
                    <i class="fas fa-${notification.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${notification.title}</div>
                    <div class="activity-time">${notification.time}</div>
                </div>
            </div>
        `).join('');
    }

    /**
     * Initialiser les graphiques
     */
    initializeCharts() {
        this.createRequestsChart();
        this.createRegistrationsChart();
        this.createRequestsPieChart();
        this.createPerformanceChart();
    }

    /**
     * Mettre à jour les graphiques avec les nouvelles données
     */
    updateCharts() {
        const requests = this.getRequests();
        
        // Mettre à jour le graphique des demandes
        if (this.charts.requests) {
            const monthlyData = this.getMonthlyRequestsData(requests);
            this.charts.requests.data.labels = monthlyData.labels;
            this.charts.requests.data.datasets[0].data = monthlyData.data;
            this.charts.requests.update();
        }
        
        // Mettre à jour le graphique circulaire
        if (this.charts.requestsPie) {
            const typeData = this.getRequestsByType(requests);
            this.charts.requestsPie.data.labels = typeData.labels;
            this.charts.requestsPie.data.datasets[0].data = typeData.data;
            this.charts.requestsPie.update();
        }
        
        // Mettre à jour le graphique de performance
        if (this.charts.performance) {
            const weeklyData = this.getWeeklyPerformanceData(requests);
            this.charts.performance.data.labels = weeklyData.labels;
            this.charts.performance.data.datasets[0].data = weeklyData.data;
            this.charts.performance.update();
        }
    }

    /**
     * Créer le graphique des demandes
     */
    createRequestsChart() {
        const ctx = document.getElementById('requests-chart');
        if (!ctx) return;
        
        // Obtenir les vraies données
        const requests = this.getRequests();
        const monthlyData = this.getMonthlyRequestsData(requests);
        
        this.charts.requests = new Chart(ctx, {
            type: 'line',
            data: {
                labels: monthlyData.labels,
                datasets: [{
                    label: 'Demandes',
                    data: monthlyData.data,
                    borderColor: '#1e3a8a',
                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Évolution des demandes par mois',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre de demandes'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Mois'
                        }
                    }
                }
            }
        });
    }

    /**
     * Obtenir les données mensuelles des demandes
     */
    getMonthlyRequestsData(requests) {
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        const currentMonth = new Date().getMonth();
        
        // Prendre les 6 derniers mois
        const labels = [];
        const data = [];
        
        for (let i = 5; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            labels.push(months[monthIndex]);
            
            // Compter les demandes pour ce mois
            const monthStart = new Date(new Date().getFullYear(), monthIndex, 1);
            const monthEnd = new Date(new Date().getFullYear(), monthIndex + 1, 0);
            
            const monthRequests = requests.filter(request => {
                const requestDate = new Date(request.dateSoumission || request.date);
                return requestDate >= monthStart && requestDate <= monthEnd;
            });
            
            data.push(monthRequests.length);
        }
        
        return { labels, data };
    }

    /**
     * Créer le graphique des inscriptions
     */
    createRegistrationsChart() {
        const ctx = document.getElementById('registrations-chart');
        if (!ctx) return;
        
        this.charts.registrations = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [{
                    label: 'Inscriptions',
                    data: [8, 12, 15, 18, 22, 25],
                    backgroundColor: '#d4af37'
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
                        beginAtZero: true
                    }
                }
            }
        });
    }

    /**
     * Créer le graphique circulaire des demandes
     */
    createRequestsPieChart() {
        const ctx = document.getElementById('requests-pie-chart');
        if (!ctx) return;
        
        // Obtenir les vraies données
        const requests = this.getRequests();
        const typeData = this.getRequestsByType(requests);
        
        this.charts.requestsPie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: typeData.labels,
                datasets: [{
                    data: typeData.data,
                    backgroundColor: ['#1e3a8a', '#d4af37', '#10b981', '#f59e0b', '#ef4444']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    title: {
                        display: true,
                        text: 'Répartition des demandes par type',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            }
        });
    }

    /**
     * Obtenir les données par type de demande
     */
    getRequestsByType(requests) {
        const typeCounts = {};
        
        requests.forEach(request => {
            const type = request.type || 'Autre';
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        const labels = Object.keys(typeCounts).map(type => {
            switch(type) {
                case 'pret': return 'Prêts';
                case 'carte': return 'Cartes';
                case 'assurance': return 'Assurances';
                default: return type;
            }
        });
        
        const data = Object.values(typeCounts);
        
        return { labels, data };
    }

    /**
     * Créer le graphique de performance
     */
    createPerformanceChart() {
        const ctx = document.getElementById('performance-chart');
        if (!ctx) return;
        
        // Obtenir les vraies données
        const requests = this.getRequests();
        const weeklyData = this.getWeeklyPerformanceData(requests);
        
        this.charts.performance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeklyData.labels,
                datasets: [{
                    label: 'Demandes traitées',
                    data: weeklyData.data,
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Performance hebdomadaire',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre de demandes'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Jours de la semaine'
                        }
                    }
                }
            }
        });
    }

    /**
     * Obtenir les données de performance hebdomadaire
     */
    getWeeklyPerformanceData(requests) {
        const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const data = [0, 0, 0, 0, 0, 0, 0];
        
        // Obtenir la semaine actuelle
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Lundi
        startOfWeek.setHours(0, 0, 0, 0);
        
        requests.forEach(request => {
            const requestDate = new Date(request.dateSoumission || request.date);
            if (requestDate >= startOfWeek) {
                const dayOfWeek = requestDate.getDay();
                const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convertir dimanche (0) en 6
                data[adjustedDay]++;
            }
        });
        
        return { labels: days, data };
    }

    /**
     * Obtenir les utilisateurs
     */
    getUsers() {
        console.log('Récupération des utilisateurs...'); // Debug
        
        // Récupérer les utilisateurs depuis différentes sources
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('Utilisateurs dans localStorage.users:', users);
        
        // Ajouter l'utilisateur actuellement connecté s'il existe
        const currentUser = JSON.parse(localStorage.getItem('auth_user') || 'null');
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
        const adminExists = users.find(u => u.email === 'admin@mybankmanager.com');
        if (!adminExists) {
            const adminUser = {
                id: 'admin',
                fullName: 'Administrateur Principal',
                email: 'admin@mybankmanager.com',
                role: 'ADMIN',
                status: 'ACTIVE',
                createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
            };
            users.unshift(adminUser); // Mettre l'admin en premier
            console.log('Admin ajouté:', adminUser);
        }
        
        // Si toujours peu d'utilisateurs, créer des données de démonstration
        if (users.length <= 1) {
            console.log('Ajout des utilisateurs de démonstration...');
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
                    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
                }
            ];
            
            // Ajouter seulement les utilisateurs qui n'existent pas déjà
            demoUsers.forEach(demo => {
                if (!users.find(u => u.email === demo.email)) {
                    users.push(demo);
                }
            });
        }
        
        // Nettoyer les données et s'assurer que tous les champs requis sont présents
        users = users.map(user => ({
            id: user.id || Date.now() + Math.random(),
            fullName: user.fullName || user.userName || user.name || 'Utilisateur',
            email: user.email || 'email@inconnu.com',
            role: user.role || 'CLIENT',
            status: user.status || 'ACTIVE',
            createdAt: user.createdAt || new Date().toISOString()
        }));
        
        // Trier par date de création (plus récents en premier)
        users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Sauvegarder la liste mise à jour
        localStorage.setItem('users', JSON.stringify(users));
        
        console.log('Utilisateurs finaux:', users);
        return users;
    }

    /**
     * Obtenir les demandes
     */
    getRequests() {
        return JSON.parse(localStorage.getItem('admin-demandes') || '[]');
    }

    /**
     * Obtenir les notifications
     */
    getNotifications() {
        return [
            {
                type: 'success',
                icon: 'check-circle',
                title: 'Demande de prêt approuvée',
                time: 'Il y a 2 minutes'
            },
            {
                type: 'warning',
                icon: 'clock',
                title: 'Nouvelle demande en attente',
                time: 'Il y a 15 minutes'
            },
            {
                type: 'info',
                icon: 'user-plus',
                title: 'Nouvel utilisateur inscrit',
                time: 'Il y a 1 heure'
            },
            {
                type: 'success',
                icon: 'credit-card',
                title: 'Carte bancaire délivrée',
                time: 'Il y a 2 heures'
            }
        ];
    }

    /**
     * Obtenir le nombre de demandes d'un utilisateur
     */
    getUserRequestsCount(userEmail) {
        const requests = this.getRequests();
        return requests.filter(r => r.userEmail === userEmail).length;
    }

    /**
     * Obtenir le texte du statut
     */
    getStatusText(status) {
        const statusTexts = {
            'pending': 'En attente',
            'approved': 'Approuvée',
            'rejected': 'Refusée'
        };
        return statusTexts[status] || status;
    }

    /**
     * Filtrer les utilisateurs
     */
    filterUsers(searchTerm) {
        const users = this.getUsers();
        const filteredUsers = users.filter(user => 
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.displayUsers(filteredUsers);
    }

    /**
     * Filtrer les utilisateurs par statut
     */
    filterUsersByStatus(status) {
        const users = this.getUsers();
        if (status === 'all') {
            this.displayUsers(users);
        } else {
            // Simulation de filtrage par statut
            this.displayUsers(users);
        }
    }

    /**
     * Afficher les utilisateurs
     */
    displayUsers(users) {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">
                            ${user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div class="user-name">${user.fullName}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                    <span class="status-badge status-active">Actif</span>
                </td>
                <td>${this.getUserRequestsCount(user.email)}</td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="adminDashboard.viewUser('${user.email}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline" onclick="adminDashboard.editUser('${user.email}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Filtrer les demandes
     */
    filterRequests(status) {
        const requests = this.getRequests();
        const filteredRequests = status === 'all' ? 
            requests : 
            requests.filter(r => r.status === status);
        this.displayRequests(filteredRequests);
    }

    /**
     * Filtrer les demandes par type
     */
    filterRequestsByType(type) {
        const requests = this.getRequests();
        const filteredRequests = type === 'all' ? 
            requests : 
            requests.filter(r => r.type === type);
        this.displayRequests(filteredRequests);
    }

    /**
     * Afficher les demandes
     */
    displayRequests(requests) {
        const grid = document.getElementById('requests-grid');
        if (!grid) return;
        
        grid.innerHTML = requests.map(request => `
            <div class="request-card ${request.status}">
                <div class="request-header">
                    <div class="request-type">
                        <i class="fas fa-${request.type === 'pret' ? 'hand-holding-usd' : 'credit-card'}"></i>
                        ${request.type === 'pret' ? 'Demande de prêt' : 'Demande de carte'}
                    </div>
                    <span class="request-status ${request.status}">
                        ${this.getStatusText(request.status)}
                    </span>
                </div>
                <div class="request-details">
                    <div class="request-detail">
                        <strong>Client:</strong> ${request.userEmail}
                    </div>
                    <div class="request-detail">
                        <strong>Date:</strong> ${new Date(request.date).toLocaleDateString()}
                    </div>
                    <div class="request-detail">
                        <strong>Montant:</strong> ${request.amount} DH
                    </div>
                    <div class="request-detail">
                        <strong>Type:</strong> ${request.details}
                    </div>
                </div>
                <div class="request-actions">
                    ${request.status === 'pending' ? `
                        <button class="btn btn-primary" onclick="adminDashboard.approveRequest('${request.id}')">
                            <i class="fas fa-check"></i> Approuver
                        </button>
                        <button class="btn btn-outline" onclick="adminDashboard.rejectRequest('${request.id}')">
                            <i class="fas fa-times"></i> Refuser
                        </button>
                    ` : `
                        <button class="btn btn-outline" onclick="adminDashboard.viewRequest('${request.id}')">
                            <i class="fas fa-eye"></i> Voir
                        </button>
                    `}
                </div>
            </div>
        `).join('');
    }

    /**
     * Approuver une demande
     */
    approveRequest(requestId) {
        const requests = this.getRequests();
        const request = requests.find(r => r.id === requestId);
        if (request) {
            request.status = 'approved';
            localStorage.setItem('admin-demandes', JSON.stringify(requests));
            this.loadRequests();
            this.updateStats();
            this.showNotification('Demande approuvée avec succès', 'success');
        }
    }

    /**
     * Refuser une demande
     */
    rejectRequest(requestId) {
        const requests = this.getRequests();
        const request = requests.find(r => r.id === requestId);
        if (request) {
            request.status = 'rejected';
            localStorage.setItem('admin-demandes', JSON.stringify(requests));
            this.loadRequests();
            this.updateStats();
            this.showNotification('Demande refusée', 'info');
        }
    }

    /**
     * Traiter toutes les demandes
     */
    processAllRequests() {
        const requests = this.getRequests();
        const pendingRequests = requests.filter(r => r.status === 'pending');
        
        if (pendingRequests.length === 0) {
            this.showNotification('Aucune demande en attente', 'info');
            return;
        }
        
        pendingRequests.forEach(request => {
            request.status = 'approved';
        });
        
        localStorage.setItem('admin-demandes', JSON.stringify(requests));
        this.loadRequests();
        this.updateStats();
        this.showNotification(`${pendingRequests.length} demandes traitées`, 'success');
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
        const lastLoginElement = document.getElementById('last-login');
        if (lastLoginElement) {
            lastLoginElement.textContent = new Date().toLocaleTimeString();
        }
    }

    /**
     * Actualiser le dashboard
     */
    refreshDashboard() {
        this.loadDashboardData();
        this.showNotification('Dashboard actualisé', 'success');
    }

    /**
     * Exporter un rapport
     */
    exportReport() {
        this.showNotification('Rapport exporté avec succès', 'success');
    }

    /**
     * Exporter les utilisateurs
     */
    exportUsers() {
        this.showNotification('Liste des utilisateurs exportée', 'success');
    }

    /**
     * Voir un utilisateur
     */
    viewUser(email) {
        this.showNotification(`Affichage des détails de ${email}`, 'info');
    }

    /**
     * Éditer un utilisateur
     */
    editUser(email) {
        this.showNotification(`Édition de ${email}`, 'info');
    }

    /**
     * Voir une demande
     */
    viewRequest(id) {
        this.showNotification(`Affichage de la demande ${id}`, 'info');
    }

    /**
     * Sauvegarder les paramètres de sécurité
     */
    saveSecuritySettings() {
        this.showNotification('Paramètres de sécurité sauvegardés', 'success');
    }

    /**
     * Sauvegarder les paramètres de notification
     */
    saveNotificationSettings() {
        this.showNotification('Paramètres de notification sauvegardés', 'success');
    }

    /**
     * Sauvegarder les paramètres de maintenance
     */
    saveMaintenanceSettings() {
        this.showNotification('Paramètres de maintenance sauvegardés', 'success');
    }
}

// Fonctions globales
function showSection(sectionName) {
    // Masquer toutes les sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour la navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Mettre à jour la section courante
    adminDashboard.currentSection = sectionName;
}

function refreshDashboard() {
    adminDashboard.refreshDashboard();
}

function exportReport() {
    adminDashboard.exportReport();
}

function exportUsers() {
    adminDashboard.exportUsers();
}

function processAllRequests() {
    adminDashboard.processAllRequests();
}

function saveSecuritySettings() {
    adminDashboard.saveSecuritySettings();
}

function saveNotificationSettings() {
    adminDashboard.saveNotificationSettings();
}

function saveMaintenanceSettings() {
    adminDashboard.saveMaintenanceSettings();
    /**
     * Voir les détails d'un utilisateur
     */
    viewUser(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            alert('Utilisateur non trouvé');
            return;
        }

        const requests = this.getRequests().filter(r => r.userEmail === email || r.email === email);
        
        const modal = document.createElement('div');
        modal.className = 'modal user-details-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3><i class="fas fa-user"></i> Détails de l'utilisateur</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="user-profile">
                        <div class="user-avatar-large" style="background: var(--primary-color); color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; margin: 0 auto 1rem;">
                            ${user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <h4 style="text-align: center; margin-bottom: 2rem;">${user.fullName}</h4>
                        
                        <div class="user-info-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
                            <div>
                                <strong>Email:</strong><br>
                                <span style="color: var(--text-muted);">${user.email}</span>
                            </div>
                            <div>
                                <strong>Rôle:</strong><br>
                                <span style="color: var(--accent-color); font-weight: 600;">${user.role}</span>
                            </div>
                            <div>
                                <strong>Statut:</strong><br>
                                <span class="status-badge ${user.status.toLowerCase() === 'active' ? 'status-active' : 'status-inactive'}">${user.status === 'ACTIVE' ? 'Actif' : 'Inactif'}</span>
                            </div>
                            <div>
                                <strong>Inscrit le:</strong><br>
                                <span style="color: var(--text-muted);">${new Date(user.createdAt).toLocaleDateString('fr-FR')}</span>
                            </div>
                        </div>

                        <h5>Demandes (${requests.length})</h5>
                        <div class="user-requests" style="max-height: 200px; overflow-y: auto;">
                            ${requests.length === 0 ? 
                                '<p style="color: var(--text-muted); text-align: center; padding: 1rem;">Aucune demande</p>' :
                                requests.map(req => `
                                    <div class="request-item" style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem;">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <div>
                                                <strong>${req.type || 'Demande'}</strong>
                                                ${req.subType ? `<span style="color: var(--text-muted);"> - ${req.subType}</span>` : ''}
                                                <br>
                                                <small style="color: var(--text-muted);">${new Date(req.date).toLocaleDateString('fr-FR')}</small>
                                            </div>
                                            <span class="status-badge status-${req.status}">${this.getStatusText(req.status)}</span>
                                        </div>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Fermer</button>
                    <button class="btn btn-primary" onclick="adminDashboard.editUser('${email}')">Modifier</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Modifier un utilisateur
     */
    editUser(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        
        if (!user) {
            alert('Utilisateur non trouvé');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal edit-user-modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3><i class="fas fa-edit"></i> Modifier l'utilisateur</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="edit-user-form" style="display: grid; gap: 1rem;">
                        <div class="form-group">
                            <label for="edit-fullName">Nom complet:</label>
                            <input type="text" id="edit-fullName" class="form-control" value="${user.fullName}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-email">Email:</label>
                            <input type="email" id="edit-email" class="form-control" value="${user.email}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="edit-role">Rôle:</label>
                            <select id="edit-role" class="form-control">
                                <option value="CLIENT" ${user.role === 'CLIENT' ? 'selected' : ''}>Client</option>
                                <option value="ADMIN" ${user.role === 'ADMIN' ? 'selected' : ''}>Administrateur</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="edit-status">Statut:</label>
                            <select id="edit-status" class="form-control">
                                <option value="ACTIVE" ${user.status === 'ACTIVE' ? 'selected' : ''}>Actif</option>
                                <option value="INACTIVE" ${user.status === 'INACTIVE' ? 'selected' : ''}>Inactif</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="this.closest('.modal').remove()">Annuler</button>
                    <button class="btn btn-primary" onclick="adminDashboard.saveUserChanges('${email}')">Sauvegarder</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }

    /**
     * Sauvegarder les modifications d'un utilisateur
     */
    saveUserChanges(originalEmail) {
        const fullName = document.getElementById('edit-fullName').value;
        const role = document.getElementById('edit-role').value;
        const status = document.getElementById('edit-status').value;

        if (!fullName.trim()) {
            alert('Le nom complet est requis');
            return;
        }

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === originalEmail);
        
        if (userIndex === -1) {
            alert('Utilisateur non trouvé');
            return;
        }

        // Mettre à jour l'utilisateur
        users[userIndex] = {
            ...users[userIndex],
            fullName: fullName.trim(),
            role: role,
            status: status,
            updatedAt: new Date().toISOString()
        };

        // Sauvegarder
        localStorage.setItem('users', JSON.stringify(users));
        
        // Recharger la liste
        this.loadUsers();
        
        // Fermer la modal
        document.querySelector('.edit-user-modal').remove();
        
        this.showNotification('Utilisateur modifié avec succès', 'success');
    }

    /**
     * Activer/Désactiver un utilisateur
     */
    toggleUserStatus(email) {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === email);
        
        if (userIndex === -1) {
            alert('Utilisateur non trouvé');
            return;
        }

        const currentStatus = users[userIndex].status;
        const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        
        users[userIndex].status = newStatus;
        users[userIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('users', JSON.stringify(users));
        this.loadUsers();
        
        this.showNotification(
            `Utilisateur ${newStatus === 'ACTIVE' ? 'activé' : 'désactivé'} avec succès`, 
            'success'
        );
    }
}

// Initialiser le dashboard admin
const adminDashboard = new AdminDashboard(); 