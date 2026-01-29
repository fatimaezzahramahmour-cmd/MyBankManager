// Script pour la page Mon Compte
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Chargement de la page Mon Compte');
    
    // Vérifier si l'utilisateur est connecté
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
        console.log('❌ Utilisateur non connecté, redirection vers connexion');
        window.location.href = 'connexion.html';
        return;
    }
    
    console.log('✅ Utilisateur connecté:', currentUser);
    
    // Charger les informations de l'utilisateur
    loadUserInfo(currentUser);
    
    // Charger les demandes de l'utilisateur
    loadUserRequests(currentUser.email);
    
    // Mettre à jour l'interface d'authentification
    if (window.unifiedAuthManager) {
        window.unifiedAuthManager.forceUpdateUI();
    }
});

/**
 * Charger et afficher les informations de l'utilisateur
 */
function loadUserInfo(user) {
    console.log('👤 Chargement des informations utilisateur:', user);
    
    // Message de bienvenue
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Bienvenue ${user.fullName || user.nom || user.name || 'Utilisateur'}`;
    }
    
    // Email
    const userEmail = document.getElementById('user-email');
    if (userEmail) {
        userEmail.innerHTML = `<i class="fas fa-envelope"></i> ${user.email}`;
    }
    
    // Téléphone
    const userPhone = document.getElementById('user-phone');
    if (userPhone && user.telephone) {
        userPhone.innerHTML = `<i class="fas fa-phone"></i> ${user.telephone}`;
    } else if (userPhone) {
        userPhone.style.display = 'none';
    }
}

/**
 * Charger et afficher les demandes de l'utilisateur
 */
function loadUserRequests(userEmail) {
    console.log('📝 Chargement des demandes pour:', userEmail);
    
    const requestsList = document.getElementById('requests-list');
    const noRequests = document.getElementById('no-requests');
    
    // Essayer de récupérer les demandes depuis le serveur
    fetch('http://localhost:8081/api/admin-demandes')
        .then(response => response.json())
        .then(serverRequests => {
            console.log('📡 Demandes du serveur:', serverRequests);
            displayUserRequests(serverRequests, userEmail);
        })
        .catch(error => {
            console.log('⚠️ Erreur serveur, utilisation du localStorage:', error);
            // Fallback vers localStorage
            const localRequests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
            displayUserRequests(localRequests, userEmail);
        });
}

/**
 * Afficher les demandes de l'utilisateur
 */
function displayUserRequests(allRequests, userEmail) {
    console.log('🎯 Affichage des demandes pour:', userEmail);
    console.log('📊 Toutes les demandes:', allRequests);
    
    // Filtrer les demandes de l'utilisateur
    const userRequests = allRequests.filter(request => 
        request.email === userEmail || 
        request.userEmail === userEmail ||
        request.user === userEmail
    );
    
    console.log('👤 Demandes de l\'utilisateur:', userRequests);
    
    const requestsList = document.getElementById('requests-list');
    const noRequests = document.getElementById('no-requests');
    
    // Mettre à jour les statistiques
    updateRequestStats(userRequests);
    
    if (userRequests.length === 0) {
        // Aucune demande
        requestsList.style.display = 'none';
        noRequests.style.display = 'block';
        return;
    }
    
    // Afficher les demandes
    noRequests.style.display = 'none';
    requestsList.style.display = 'block';
    
    // Trier par date (plus récent en premier)
    userRequests.sort((a, b) => new Date(b.dateSoumission || b.createdAt || 0) - new Date(a.dateSoumission || a.createdAt || 0));
    
    let requestsHTML = '';
    userRequests.forEach((request, index) => {
        console.log(`📋 Demande ${index}:`, request);
        
        const requestDate = new Date(request.dateSoumission || request.createdAt || Date.now()).toLocaleDateString('fr-FR');
        const requestTime = new Date(request.dateSoumission || request.createdAt || Date.now()).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        
        requestsHTML += `
            <div class="request-item">
                <div class="request-header">
                    <div class="request-type">
                        <i class="fas ${getRequestIcon(request.type)}"></i>
                        <span>${getRequestTypeLabel(request.type)}</span>
                    </div>
                    <div class="request-status">
                        <span class="status-badge ${getStatusClass(request.statut || request.status)}">
                            ${getStatusLabel(request.statut || request.status)}
                        </span>
                    </div>
                </div>
                <div class="request-details">
                    <div class="request-date">
                        <i class="fas fa-calendar"></i>
                        <span>${requestDate} à ${requestTime}</span>
                    </div>
                    ${request.montant ? `
                        <div class="request-amount">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>${request.montant} DH</span>
                        </div>
                    ` : ''}
                    ${request.duree ? `
                        <div class="request-duration">
                            <i class="fas fa-clock"></i>
                            <span>${request.duree} mois</span>
                        </div>
                    ` : ''}
                    ${request.motif ? `
                        <div class="request-reason">
                            <i class="fas fa-comment"></i>
                            <span>${request.motif}</span>
                        </div>
                    ` : ''}
                </div>
                ${request.statut === 'accepté' || request.status === 'accepté' ? `
                    <div class="request-success">
                        <i class="fas fa-check-circle"></i>
                        <span>Votre demande a été acceptée !</span>
                    </div>
                ` : ''}
                ${request.statut === 'refusé' || request.status === 'refusé' ? `
                    <div class="request-rejected">
                        <i class="fas fa-times-circle"></i>
                        <span>Votre demande a été refusée.</span>
                    </div>
                ` : ''}
                ${(!request.statut || request.statut === 'en attente') && (!request.status || request.status === 'en attente') ? `
                    <div class="request-pending">
                        <i class="fas fa-clock"></i>
                        <span>Votre demande est en cours de traitement...</span>
                    </div>
                ` : ''}
            </div>
        `;
    });
    
    requestsList.innerHTML = requestsHTML;
}

/**
 * Mettre à jour les statistiques des demandes
 */
function updateRequestStats(userRequests) {
    console.log('📊 Mise à jour des statistiques pour:', userRequests.length, 'demandes');
    
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    
    userRequests.forEach(request => {
        const status = request.statut || request.status || 'en attente';
        
        if (status === 'en attente' || status === 'pending') {
            pendingCount++;
        } else if (status === 'accepté' || status === 'approved') {
            approvedCount++;
        } else if (status === 'refusé' || status === 'rejected') {
            rejectedCount++;
        }
    });
    
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('approved-count').textContent = approvedCount;
    document.getElementById('rejected-count').textContent = rejectedCount;
    
    console.log('📈 Statistiques:', { pendingCount, approvedCount, rejectedCount });
}

/**
 * Obtenir l'icône pour le type de demande
 */
function getRequestIcon(type) {
    const icons = {
        'pret': 'fa-hand-holding-usd',
        'carte': 'fa-credit-card',
        'assurance': 'fa-shield-alt',
        'compte': 'fa-wallet'
    };
    return icons[type] || 'fa-file-alt';
}

/**
 * Obtenir le label pour le type de demande
 */
function getRequestTypeLabel(type) {
    const labels = {
        'pret': 'Demande de Prêt',
        'carte': 'Demande de Carte',
        'assurance': 'Demande d\'Assurance',
        'compte': 'Ouverture de Compte'
    };
    return labels[type] || 'Demande';
}

/**
 * Obtenir la classe CSS pour le statut
 */
function getStatusClass(status) {
    const classes = {
        'en attente': 'status-pending',
        'pending': 'status-pending',
        'accepté': 'status-approved',
        'approved': 'status-approved',
        'refusé': 'status-rejected',
        'rejected': 'status-rejected'
    };
    return classes[status] || 'status-pending';
}

/**
 * Obtenir le label pour le statut
 */
function getStatusLabel(status) {
    const labels = {
        'en attente': '⏳ En attente',
        'pending': '⏳ En attente',
        'accepté': '✅ Acceptée',
        'approved': '✅ Acceptée',
        'refusé': '❌ Refusée',
        'rejected': '❌ Refusée'
    };
    return labels[status] || '⏳ En attente';
}

/**
 * Fonction pour actualiser les demandes
 */
function refreshRequests() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
        loadUserRequests(currentUser.email);
        showNotification('Demandes actualisées', 'success');
    }
}

/**
 * Fonction pour afficher une notification
 */
function showNotification(message, type = 'info') {
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
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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

// Rendre les fonctions globales
window.refreshRequests = refreshRequests;
window.showNotification = showNotification;
