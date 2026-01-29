/**
 * Simulateur de prêt pour MyBankManager
 * Calcul des mensualités, taux d'intérêt et éligibilité
 */

class LoanSimulator {
    constructor() {
        this.interestRates = {
            'personnel': 7.5,      // Prêt personnel
            'immobilier': 3.2,     // Prêt immobilier
            'auto': 4.8,           // Prêt automobile
            'travaux': 5.5,        // Prêt travaux
            'etudiant': 2.8        // Prêt étudiant
        };
        
        this.maxDebtRatio = 33; // Taux d'endettement maximum 33%
        
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const form = document.getElementById('loan-simulator');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.calculateLoan(form);
            });
            
            // Calcul en temps réel quand les valeurs changent
            form.addEventListener('input', () => {
                this.calculateLoan(form);
            });
        }
    }

    /**
     * Calculer les détails du prêt
     */
    calculateLoan(form) {
        const formData = new FormData(form);
        const loanType = formData.get('loanType');
        const amount = parseFloat(formData.get('amount'));
        const duration = parseInt(formData.get('duration'));
        const income = parseFloat(formData.get('income'));

        if (!loanType || !amount || !duration || !income) {
            this.hideSimulationResult();
            return;
        }

        // Obtenir le taux d'intérêt selon le type de prêt
        const annualRate = this.interestRates[loanType];
        const monthlyRate = annualRate / 100 / 12;
        
        // Calcul de la mensualité (formule de l'annuité)
        const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                              (Math.pow(1 + monthlyRate, duration) - 1);
        
        // Calculs additionnels
        const totalCost = monthlyPayment * duration;
        const totalInterest = totalCost - amount;
        const debtRatio = (monthlyPayment / income) * 100;
        
        // Afficher les résultats
        this.showSimulationResult({
            borrowedAmount: amount,
            interestRate: annualRate,
            monthlyPayment: monthlyPayment,
            totalCost: totalCost,
            totalInterest: totalInterest,
            debtRatio: debtRatio,
            income: income,
            loanType: loanType,
            duration: duration
        });
    }

    /**
     * Afficher les résultats de la simulation
     */
    showSimulationResult(data) {
        const resultDiv = document.getElementById('simulation-result');
        
        // Mettre à jour les valeurs
        document.getElementById('borrowed-amount').textContent = 
            this.formatCurrency(data.borrowedAmount);
        document.getElementById('interest-rate').textContent = 
            `${data.interestRate.toFixed(2)}%`;
        document.getElementById('monthly-payment').textContent = 
            this.formatCurrency(data.monthlyPayment);
        document.getElementById('total-cost').textContent = 
            this.formatCurrency(data.totalCost);
        document.getElementById('debt-ratio').textContent = 
            `${data.debtRatio.toFixed(1)}%`;

        // Évaluer l'éligibilité
        this.updateEligibilityStatus(data);
        
        // Afficher le résultat
        if (resultDiv) {
            resultDiv.style.display = 'block';
            
            // Faire défiler vers les résultats
            setTimeout(() => {
                resultDiv.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
            }, 100);
        }
    }

    /**
     * Mettre à jour le statut d'éligibilité
     */
    updateEligibilityStatus(data) {
        const statusDiv = document.getElementById('eligibility-status');
        if (!statusDiv) return;

        let statusHTML = '';
        let statusClass = '';
        
        if (data.debtRatio > this.maxDebtRatio) {
            statusClass = 'status-rejected';
            statusHTML = `
                <div class="eligibility-status ${statusClass}">
                    <i class="fas fa-times-circle"></i>
                    <h4>Demande non éligible</h4>
                    <p>Votre taux d'endettement (${data.debtRatio.toFixed(1)}%) dépasse le maximum autorisé (${this.maxDebtRatio}%).</p>
                    <div class="recommendations">
                        <h5>Recommandations :</h5>
                        <ul>
                            <li>Réduire le montant emprunté à ${this.formatCurrency(data.income * this.maxDebtRatio / 100 * data.duration)}</li>
                            <li>Augmenter la durée du prêt</li>
                            <li>Augmenter vos revenus mensuels</li>
                        </ul>
                    </div>
                </div>
            `;
        } else if (data.debtRatio > 25) {
            statusClass = 'status-warning';
            statusHTML = `
                <div class="eligibility-status ${statusClass}">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>Demande acceptable avec réserves</h4>
                    <p>Votre taux d'endettement (${data.debtRatio.toFixed(1)}%) est élevé. Une étude approfondie sera nécessaire.</p>
                    <div class="advantages">
                        <p><strong>Avantages :</strong> Dossier sera étudié au cas par cas</p>
                    </div>
                </div>
            `;
        } else {
            statusClass = 'status-approved';
            statusHTML = `
                <div class="eligibility-status ${statusClass}">
                    <i class="fas fa-check-circle"></i>
                    <h4>Demande éligible</h4>
                    <p>Excellent ! Votre profil correspond à nos critères d'octroi.</p>
                    <div class="advantages">
                        <h5>Vos avantages :</h5>
                        <ul>
                            <li>Taux d'endettement optimal (${data.debtRatio.toFixed(1)}%)</li>
                            <li>Traitement prioritaire de votre dossier</li>
                            <li>Possibilité de négociation du taux</li>
                        </ul>
                    </div>
                </div>
            `;
        }
        
        statusDiv.innerHTML = statusHTML;
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
     * Formater les montants en devise
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-MA', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(Math.round(amount)) + ' DH';
    }

    /**
     * Obtenir les recommandations personnalisées
     */
    getPersonalizedRecommendations(data) {
        const recommendations = [];
        
        if (data.loanType === 'immobilier' && data.duration < 180) {
            recommendations.push("Considérez une durée plus longue pour réduire vos mensualités");
        }
        
        if (data.debtRatio > 20) {
            recommendations.push("Envisagez d'augmenter votre apport personnel");
        }
        
        if (data.loanType === 'personnel' && data.amount > 100000) {
            recommendations.push("Un prêt affecté pourrait offrir de meilleures conditions");
        }
        
        return recommendations;
    }
}

/**
 * Fonction globale pour demander un prêt personnalisé
 */
function demanderPretPersonnalise() {
    // Vérifier l'authentification
    if (typeof authManager !== 'undefined' && !authManager.isLoggedIn()) {
        authManager.showNotification('Veuillez vous connecter pour faire une demande de prêt', 'warning');
        setTimeout(() => {
            window.location.href = 'connexion.html?redirect=' + encodeURIComponent(window.location.href);
        }, 2000);
        return;
    }
    
    // Rediriger vers la page de demande de prêt avec les données de simulation
    const form = document.getElementById('loan-simulator');
    const formData = new FormData(form);
    
    const params = new URLSearchParams({
        type: formData.get('loanType') || '',
        amount: formData.get('amount') || '',
        duration: formData.get('duration') || '',
        from: 'simulator'
    });
    
    window.location.href = `demande-pret.html?${params.toString()}`;
}

/**
 * Gestion des liens avec ancrage
 */
document.addEventListener('DOMContentLoaded', function() {
    // Si l'URL contient #simulateur, faire défiler vers la section
    if (window.location.hash === '#simulateur') {
        setTimeout(() => {
            const simulatorSection = document.getElementById('simulateur');
            if (simulatorSection) {
                simulatorSection.scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }, 100);
    }
});

// Initialiser le simulateur
const loanSimulator = new LoanSimulator();
