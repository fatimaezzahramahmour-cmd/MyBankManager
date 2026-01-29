/**
 * Protection automatique des formulaires de demande
 * Assure que seuls les utilisateurs connectés peuvent soumettre des demandes
 */

class FormProtection {
    constructor() {
        this.protectedForms = [
            'demande-pret',
            'demande-carte', 
            'insurance-form',
            'loan-simulator'
        ];
        
        this.protectedButtons = [
            '[onclick*="demanderAssurance"]',
            '[onclick*="demanderPret"]',
            '[onclick*="demanderCarte"]',
            '[onclick*="demande"]',
            '.insurance-btn',
            '.demande-btn'
        ];
        
        this.init();
    }

    init() {
        this.protectForms();
        this.protectButtons();
        this.setupDynamicProtection();
    }

    /**
     * Protéger les formulaires existants
     */
    protectForms() {
        this.protectedForms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                this.addFormProtection(form);
            }
        });
    }

    /**
     * Protéger les boutons de demande
     */
    protectButtons() {
        this.protectedButtons.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                this.addButtonProtection(button);
            });
        });
    }

    /**
     * Protection dynamique pour les éléments ajoutés après le chargement
     */
    setupDynamicProtection() {
        // Observer les modifications du DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        this.protectNewElement(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Protéger un nouvel élément ajouté dynamiquement
     */
    protectNewElement(element) {
        // Vérifier si c'est un formulaire protégé
        if (element.tagName === 'FORM' && this.isProtectedForm(element)) {
            this.addFormProtection(element);
        }

        // Vérifier les boutons à l'intérieur de l'élément
        this.protectedButtons.forEach(selector => {
            const buttons = element.querySelectorAll ? element.querySelectorAll(selector) : [];
            buttons.forEach(button => {
                this.addButtonProtection(button);
            });
        });
    }

    /**
     * Vérifier si un formulaire doit être protégé
     */
    isProtectedForm(form) {
        return this.protectedForms.some(formId => 
            form.id === formId || form.classList.contains(formId)
        );
    }

    /**
     * Ajouter la protection à un formulaire
     */
    addFormProtection(form) {
        if (form.dataset.protected === 'true') return; // Déjà protégé

        form.dataset.protected = 'true';
        
        // Intercepter la soumission
        form.addEventListener('submit', (e) => {
            if (!this.checkAuthentication(e)) {
                e.preventDefault();
                return false;
            }
        });

        // Désactiver les champs si non connecté
        this.updateFormAccess(form);
    }

    /**
     * Ajouter la protection à un bouton
     */
    addButtonProtection(button) {
        if (button.dataset.protected === 'true') return; // Déjà protégé

        button.dataset.protected = 'true';
        
        // Sauvegarder l'handler original
        const originalOnClick = button.onclick;
        const originalHandler = button.getAttribute('onclick');
        
        // Créer un nouveau handler protégé
        const protectedHandler = (e) => {
            if (!this.checkAuthentication(e)) {
                e.preventDefault();
                return false;
            }
            
            // Exécuter l'handler original si authentifié
            if (originalOnClick) {
                return originalOnClick.call(button, e);
            } else if (originalHandler) {
                return eval(originalHandler);
            }
        };

        // Remplacer l'handler
        button.onclick = protectedHandler;
        button.removeAttribute('onclick');
    }

    /**
     * Vérifier l'authentification
     */
    checkAuthentication(event) {
        // Utiliser enhancedAuthManager si disponible, sinon authManager
        const authMgr = window.enhancedAuthManager || window.authManager;
        
        if (!authMgr || !authMgr.isLoggedIn()) {
            this.showAuthenticationRequired(event.target);
            return false;
        }

        return true;
    }

    /**
     * Afficher le message d'authentification requise
     */
    showAuthenticationRequired(element) {
        // Créer la modal
        const modal = document.createElement('div');
        modal.className = 'modal auth-required-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-user-lock"></i> Connexion requise</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="auth-required-message">
                        <div class="message-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h4>Accès sécurisé</h4>
                        <p>Vous devez créer un compte ou vous connecter pour effectuer cette action.</p>
                        <p class="security-note">Cette mesure garantit la sécurité de vos données et transactions.</p>
                        
                        <div class="auth-actions">
                            <a href="inscription.html" class="btn btn-primary">
                                <i class="fas fa-user-plus"></i> Créer un compte
                            </a>
                            <a href="connexion.html" class="btn btn-outline">
                                <i class="fas fa-sign-in-alt"></i> Se connecter
                            </a>
                        </div>
                        
                        <div class="benefits">
                            <h5>Avec un compte, vous pouvez :</h5>
                            <ul>
                                <li><i class="fas fa-check"></i> Faire des demandes de prêt et cartes</li>
                                <li><i class="fas fa-check"></i> Suivre l'état de vos demandes</li>
                                <li><i class="fas fa-check"></i> Accéder à votre espace personnel</li>
                                <li><i class="fas fa-check"></i> Gérer vos informations en sécurité</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Sauvegarder l'URL pour redirection après connexion
        localStorage.setItem('pending_redirect', window.location.href);
        
        // Animation d'apparition
        setTimeout(() => modal.classList.add('show'), 10);
        
        // Auto-suppression après 10 secondes
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 10000);
    }

    /**
     * Mettre à jour l'accès aux formulaires selon l'état d'authentification
     */
    updateFormAccess(form) {
        const authMgr = window.enhancedAuthManager || window.authManager;
        const isAuthenticated = authMgr && authMgr.isLoggedIn();
        
        if (!isAuthenticated) {
            // Ajouter un overlay sur le formulaire
            this.addFormOverlay(form);
        } else {
            // Retirer l'overlay s'il existe
            this.removeFormOverlay(form);
        }
    }

    /**
     * Ajouter un overlay au formulaire
     */
    addFormOverlay(form) {
        let overlay = form.querySelector('.form-auth-overlay');
        if (overlay) return; // Overlay déjà présent

        overlay = document.createElement('div');
        overlay.className = 'form-auth-overlay';
        overlay.innerHTML = `
            <div class="overlay-content">
                <i class="fas fa-lock"></i>
                <h4>Connexion requise</h4>
                <p>Connectez-vous pour accéder à ce formulaire</p>
                <div class="overlay-actions">
                    <a href="connexion.html" class="btn btn-primary">Se connecter</a>
                    <a href="inscription.html" class="btn btn-outline">S'inscrire</a>
                </div>
            </div>
        `;

        // Positionner l'overlay
        form.style.position = 'relative';
        form.appendChild(overlay);
    }

    /**
     * Retirer l'overlay du formulaire
     */
    removeFormOverlay(form) {
        const overlay = form.querySelector('.form-auth-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    /**
     * Mettre à jour tous les formulaires protégés
     */
    updateAllForms() {
        this.protectedForms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form) {
                this.updateFormAccess(form);
            }
        });
    }

    /**
     * Protéger un formulaire spécifique par son ID
     */
    protectFormById(formId) {
        const form = document.getElementById(formId);
        if (form) {
            this.addFormProtection(form);
        }
    }

    /**
     * Protéger tous les boutons avec un sélecteur spécifique
     */
    protectButtonsBySelector(selector) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(button => {
            this.addButtonProtection(button);
        });
    }
}

// Initialiser la protection des formulaires
document.addEventListener('DOMContentLoaded', () => {
    window.formProtection = new FormProtection();
    
    // Mettre à jour lors des changements d'authentification
    document.addEventListener('auth-changed', () => {
        if (window.formProtection) {
            window.formProtection.updateAllForms();
        }
    });
});

// Fonctions globales pour la compatibilité
function requireAuth(action, message) {
    const authMgr = window.enhancedAuthManager || window.authManager;
    if (!authMgr || !authMgr.isLoggedIn()) {
        if (window.formProtection) {
            window.formProtection.showAuthenticationRequired(document.body);
        }
        return false;
    }
    
    if (typeof action === 'function') {
        return action();
    }
    
    return true;
}

function protectAction(callback) {
    return function(event) {
        if (requireAuth(callback)) {
            return callback.apply(this, arguments);
        }
        return false;
    };
}
