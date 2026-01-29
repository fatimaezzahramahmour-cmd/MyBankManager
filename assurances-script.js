/**
 * Script pour la page des assurances
 * Gestion des demandes d'assurance avec authentification
 */

class AssuranceManager {
    constructor() {
        this.insuranceTypes = {
            'auto': 'Assurance Automobile',
            'habitation': 'Assurance Habitation',
            'sante': 'Assurance Santé',
            'vie': 'Assurance Vie',
            'voyage': 'Assurance Voyage',
            'professionnelle': 'Assurance Professionnelle'
        };
        
        this.basePrices = {
            'auto': 25,
            'habitation': 15,
            'sante': 45,
            'vie': 100,
            'voyage': 8,
            'professionnelle': 35
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSimulator();
        this.setupButtonHandlers();
    }

    setupEventListeners() {
        // Écouter les soumissions de formulaire
        document.addEventListener('submit', (e) => {
            console.log('📝 Événement submit détecté:', e.target.id);
            if (e.target.id === 'insurance-simulator') {
                e.preventDefault();
                console.log('🧮 Calcul de simulation...');
                this.calculateInsurance(e.target);
            } else if (e.target.id === 'insurance-form') {
                e.preventDefault();
                console.log('📤 Soumission de demande d\'assurance...');
                this.submitInsuranceRequest();
            }
        });
    }

    setupSimulator() {
        const form = document.getElementById('insurance-simulator');
        if (form) {
            console.log('🧮 Simulateur initialisé');
            
            // Calculer en temps réel quand les valeurs changent
            form.addEventListener('input', () => {
                console.log('📊 Changement détecté dans le simulateur');
                this.calculateInsurance(form);
            });
            
            // Calculer au chargement si des valeurs sont présentes
            const typeSelect = form.querySelector('#insurance-type');
            const amountInput = form.querySelector('#coverage-amount');
            const durationSelect = form.querySelector('#duration');
            
            if (typeSelect && amountInput && durationSelect) {
                if (typeSelect.value && amountInput.value && durationSelect.value) {
                    console.log('🔄 Calcul initial du simulateur');
                    this.calculateInsurance(form);
                }
            }
        } else {
            console.log('❌ Formulaire simulateur non trouvé');
        }
    }

    setupButtonHandlers() {
        // Gestionnaire direct pour le bouton d'envoi
        const submitBtn = document.querySelector('#insurance-form button[type="submit"]');
        if (submitBtn) {
            console.log('🔘 Bouton d\'envoi trouvé, ajout du gestionnaire...');
            submitBtn.addEventListener('click', (e) => {
                console.log('🔘 Clic sur le bouton d\'envoi détecté');
                e.preventDefault();
                this.submitInsuranceRequest();
            });
        } else {
            console.log('❌ Bouton d\'envoi non trouvé');
        }
        
        // Remplir automatiquement les champs si l'utilisateur est connecté
        if (window.unifiedAuthManager && window.unifiedAuthManager.isLoggedIn()) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            if (currentUser.fullName) {
                const nameInput = document.getElementById('client-name');
                const emailInput = document.getElementById('client-email');
                const phoneInput = document.getElementById('client-phone');
                const dateInput = document.getElementById('client-date-naissance');
                
                if (nameInput) nameInput.value = currentUser.fullName;
                if (emailInput) emailInput.value = currentUser.email || '';
                if (phoneInput) phoneInput.value = currentUser.telephone || '';
                if (dateInput) dateInput.value = currentUser.dateNaissance || '';
            }
        }
    }

    /**
     * Demander une assurance spécifique
     */
    demanderAssurance(type) {
        // Vérifier l'authentification
        if (!window.unifiedAuthManager || !window.unifiedAuthManager.isLoggedIn()) {
            this.showAuthRequired();
            return;
        }

        this.showInsuranceForm(type);
    }

    /**
     * Afficher le message de connexion requise
     */
    showAuthRequired() {
        const modal = document.getElementById('insurance-modal');
        const authRequired = document.getElementById('auth-required');
        const insuranceForm = document.getElementById('insurance-form');
        
        if (modal && authRequired && insuranceForm) {
            authRequired.style.display = 'block';
            insuranceForm.style.display = 'none';
            modal.style.display = 'flex';
            
            // Animation d'apparition
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }

    /**
     * Afficher le formulaire de demande d'assurance
     */
    showInsuranceForm(type) {
        const modal = document.getElementById('insurance-modal');
        const authRequired = document.getElementById('auth-required');
        const insuranceForm = document.getElementById('insurance-form');
        const modalTitle = document.getElementById('modal-title');
        const typeInput = document.getElementById('insurance-type-form');
        
        if (modal && authRequired && insuranceForm) {
            authRequired.style.display = 'none';
            insuranceForm.style.display = 'block';
            modal.style.display = 'flex';
            
            // Mettre à jour le titre et le type
            if (modalTitle) {
                modalTitle.textContent = `Demande - ${this.insuranceTypes[type]}`;
            }
            if (typeInput) {
                typeInput.value = this.insuranceTypes[type];
            }
            
            // Remplir automatiquement les champs si l'utilisateur est connecté
            if (window.unifiedAuthManager && window.unifiedAuthManager.isLoggedIn()) {
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                if (currentUser.fullName) {
                    const nameInput = document.getElementById('client-name');
                    const emailInput = document.getElementById('client-email');
                    const phoneInput = document.getElementById('client-phone');
                    const dateInput = document.getElementById('client-date-naissance');
                    
                    if (nameInput) nameInput.value = currentUser.fullName;
                    if (emailInput) emailInput.value = currentUser.email || '';
                    if (phoneInput) phoneInput.value = currentUser.telephone || '';
                    if (dateInput) dateInput.value = currentUser.dateNaissance || '';
                }
            }
            
            // Animation d'apparition
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }

    /**
     * Fermer la modal
     */
    closeInsuranceModal() {
        const modal = document.getElementById('insurance-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Calculer la cotisation d'assurance
     */
    calculateInsurance(form) {
        const formData = new FormData(form);
        const type = formData.get('insuranceType');
        const coverageAmount = parseInt(formData.get('coverageAmount'));
        const duration = parseInt(formData.get('duration'));

        console.log('🧮 Calcul assurance:', { type, coverageAmount, duration });

        if (!type || !coverageAmount || !duration) {
            console.log('❌ Données manquantes pour le calcul');
            this.hideSimulationResult();
            return;
        }

        // Calcul de base selon le type
        let basePrice = this.basePrices[type] || 50;
        console.log('💰 Prix de base:', basePrice);
        
        // Ajustements selon le montant de garantie
        let coverageFactor = Math.log10(coverageAmount / 10000) * 0.2 + 1;
        console.log('📊 Facteur de couverture:', coverageFactor);
        
        // Calcul final
        let monthlyPremium = Math.round(basePrice * coverageFactor);
        let annualPremium = monthlyPremium * 12;
        let totalPremium = annualPremium * (duration / 12);
        
        console.log('💵 Résultats:', { monthlyPremium, annualPremium, totalPremium });
        
        // Afficher les résultats
        this.showSimulationResult(monthlyPremium, annualPremium, totalPremium);
    }

    /**
     * Afficher les résultats de simulation
     */
    showSimulationResult(monthly, annual, total) {
        const resultDiv = document.getElementById('simulation-result');
        const monthlySpan = document.getElementById('monthly-premium');
        const annualSpan = document.getElementById('annual-premium');
        const totalSpan = document.getElementById('total-premium');

        if (resultDiv && monthlySpan && annualSpan && totalSpan) {
            monthlySpan.textContent = `${monthly} DH`;
            annualSpan.textContent = `${annual} DH`;
            totalSpan.textContent = `${total} DH`;
            resultDiv.style.display = 'block';
        }
    }

    /**
     * Masquer les résultats de simulation
     */
    hideSimulationResult() {
        const resultDiv = document.getElementById('simulation-result');
        if (resultDiv) {
            resultDiv.style.display = 'none';
        }
    }

    /**
     * Soumettre une demande d'assurance
     */
    async submitInsuranceRequest() {
        console.log('🔄 Début de soumission de la demande d\'assurance');
        
        // Vérifier l'authentification
        if (!window.unifiedAuthManager || !window.unifiedAuthManager.isLoggedIn()) {
            this.showNotification('Vous devez être connecté pour soumettre une demande.', 'warning');
            return;
        }

        const form = document.getElementById('insurance-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Afficher le loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        let data = null;

        try {
            console.log('📊 Préparation des données...');
            const formData = new FormData(form);
            data = Object.fromEntries(formData.entries());
            
            // Validation des champs obligatoires
            if (!this.validateInsuranceForm(data)) {
                return;
            }
            
            // Ajouter des métadonnées
            data.type = 'assurance';
            data.dateSoumission = new Date().toISOString();
            data.statut = 'en_attente';
            data.id = Date.now().toString();
            
            // Ajouter l'email de l'utilisateur connecté
            const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            data.email = currentUser.email || data.clientEmail;

            console.log('📤 Envoi au serveur...');
            console.log('📊 Données à envoyer:', data);
            
            // Envoyer au serveur via API
            const response = await fetch('/api/submit-demande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('📡 Réponse du serveur:', result);
            
            if (result.status === 'success') {
                console.log('✅ Demande envoyée au serveur avec succès');
                
                // Aussi sauvegarder dans localStorage pour compatibilité
                const existingRequests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
                existingRequests.push(data);
                localStorage.setItem('admin-demandes', JSON.stringify(existingRequests));
                console.log('💾 Données sauvegardées dans localStorage');
                
                console.log('✅ Envoi réussi, affichage du message de succès');
                this.showSuccessMessage();
            } else {
                throw new Error(result.message || 'Erreur serveur');
            }

        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            
            // Fallback: sauvegarder seulement dans localStorage
            if (data) {
                console.log('🔄 Fallback vers localStorage');
                const existingRequests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
                existingRequests.push(data);
                localStorage.setItem('admin-demandes', JSON.stringify(existingRequests));
                console.log('💾 Données sauvegardées dans localStorage (fallback)');
            }
            
            this.showSuccessMessage();
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    /**
     * Valider le formulaire d'assurance
     */
    validateInsuranceForm(data) {
        console.log('🔍 Validation du formulaire assurance:', data);
        
        // Réinitialiser les messages d'erreur
        this.clearErrorMessages();
        
        let isValid = true;
        
        // Validation du nom complet
        if (!data.clientName || data.clientName.trim().length < 2) {
            this.showFieldError('client-name-error', 'Le nom complet doit contenir au moins 2 caractères.');
            isValid = false;
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.clientEmail || !emailRegex.test(data.clientEmail)) {
            this.showFieldError('client-email-error', 'Veuillez entrer une adresse email valide.');
            isValid = false;
        }
        
        // Validation du téléphone
        const phoneRegex = /^[0-9]{10}$/;
        if (!data.clientPhone || !phoneRegex.test(data.clientPhone.replace(/\s/g, ''))) {
            this.showFieldError('client-phone-error', 'Veuillez entrer un numéro de téléphone valide (10 chiffres).');
            isValid = false;
        }
        
        // Validation de la date de naissance
        if (!data.clientDateNaissance) {
            this.showFieldError('client-date-naissance-error', 'Veuillez sélectionner votre date de naissance.');
            isValid = false;
        }
        
        // Validation du type d'assurance
        if (!data.insuranceType) {
            this.showFieldError('insurance-type-error', 'Le type d\'assurance est requis.');
            isValid = false;
        }
        
        // Validation du montant de garantie
        if (!data.coverageAmount || data.coverageAmount < 10000 || data.coverageAmount > 1000000) {
            this.showFieldError('coverage-amount-error', 'Le montant de garantie doit être entre 10 000 et 1 000 000 DH.');
            isValid = false;
        }
        
        if (!isValid) {
            this.showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
        }
        
        return isValid;
    }
    
    /**
     * Afficher une erreur de champ
     */
    showFieldError(fieldId, message) {
        const errorElement = document.getElementById(fieldId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    /**
     * Effacer tous les messages d'erreur
     */
    clearErrorMessages() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    /**
     * Sauvegarder la demande d'assurance
     */
    saveInsuranceRequest(request) {
        // Récupérer les demandes existantes
        const existingRequests = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
        
        // Ajouter la nouvelle demande
        existingRequests.push(request);
        
        // Sauvegarder
        localStorage.setItem('admin-demandes', JSON.stringify(existingRequests));
        
        console.log('Demande d\'assurance sauvegardée:', request);
    }

    /**
     * Demander un devis personnalisé
     */
    demanderDevisPersonnalise() {
        if (!window.unifiedAuthManager || !window.unifiedAuthManager.isLoggedIn()) {
            this.showNotification('Veuillez vous connecter pour demander un devis personnalisé', 'warning');
            setTimeout(() => {
                window.location.href = 'connexion.html';
            }, 2000);
            return;
        }

        // Ouvrir le formulaire avec les données de simulation
        const simulatorForm = document.getElementById('insurance-simulator');
        const formData = new FormData(simulatorForm);
        const type = formData.get('type');
        
        if (type) {
            this.demanderAssurance(type);
        } else {
            this.showNotification('Veuillez d\'abord effectuer une simulation', 'warning');
        }
    }

    /**
     * Afficher le message de succès centré
     */
    showSuccessMessage() {
        console.log('🎉 Affichage du message de succès');
        
        // Fermer la modal d'assurance
        this.closeInsuranceModal();
        
        // Créer un overlay avec le nouveau design CSS
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        overlay.innerHTML = `
            <div class="success-message" style="
                background: white;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                max-width: 500px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            ">
                <i class="fas fa-check-circle" style="
                    font-size: 60px;
                    color: #28a745;
                    margin-bottom: 20px;
                    display: block;
                "></i>
                <h3 style="
                    color: #1E3A8A;
                    font-size: 24px;
                    margin-bottom: 15px;
                    font-weight: 600;
                ">Demande envoyée avec succès !</h3>
                <p style="
                    color: #2c3e50;
                    font-size: 16px;
                    margin-bottom: 20px;
                    line-height: 1.5;
                ">Votre demande d'assurance a été transmise à notre équipe. Nous vous répondrons dans les plus brefs délais.</p>
                <div class="success-timer" id="success-timer" style="
                    font-size: 18px;
                    font-weight: bold;
                    color: #1E3A8A;
                    margin-bottom: 10px;
                ">1.5</div>
                <p style="
                    font-size: 14px;
                    color: #1E3A8A;
                    font-weight: 500;
                ">Redirection automatique vers l'accueil...</p>
            </div>
        `;

        document.body.appendChild(overlay);

        // Afficher l'overlay avec animation
        setTimeout(() => {
            overlay.style.opacity = '1';
            const message = overlay.querySelector('.success-message');
            message.style.transform = 'scale(1)';
        }, 100);

        // Timer de 1.5 secondes avec animation
        let timeLeft = 1.5;
        const timerElement = document.getElementById('success-timer');
        
        console.log('⏱️ Démarrage du timer:', timeLeft);
        
        const timer = setInterval(() => {
            timeLeft -= 0.1;
            console.log('⏱️ Timer:', timeLeft.toFixed(1));
            
            if (timerElement) {
                timerElement.textContent = timeLeft.toFixed(1);
                // Animation de pulsation
                timerElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    timerElement.style.transform = 'scale(1)';
                }, 50);
            }
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                console.log('🔄 Redirection vers l\'accueil...');
                // Animation de fermeture
                overlay.style.opacity = '0';
                const message = overlay.querySelector('.success-message');
                message.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    overlay.remove();
                    window.location.href = 'index.html';
                }, 300);
            }
        }, 100);
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
        
        // Animation d'apparition
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Fonctions globales pour les événements onclick
function demanderAssurance(type) {
    assuranceManager.demanderAssurance(type);
}

function closeInsuranceModal() {
    assuranceManager.closeInsuranceModal();
}

function demanderDevisPersonnalise() {
    assuranceManager.demanderDevisPersonnalise();
}

// Initialiser le gestionnaire d'assurances
const assuranceManager = new AssuranceManager();

// Fermer la modal en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    const modal = document.getElementById('insurance-modal');
    if (e.target === modal) {
        assuranceManager.closeInsuranceModal();
    }
});

// Gérer la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        assuranceManager.closeInsuranceModal();
    }
});
