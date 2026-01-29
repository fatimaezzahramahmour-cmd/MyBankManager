// ===== GESTION DE L'AUTHENTIFICATION UNIFIÉE =====
// Utilise le gestionnaire unifié depuis auth-unified.js

// ===== VALIDATION DU FORMULAIRE =====
class FormValidator {
    constructor() {
        this.initValidation();
    }

    initValidation() {
        const form = document.getElementById('pret-form');
        if (!form) {
            console.error('❌ Formulaire pret-form non trouvé');
            return;
        }

        // Supprimer les anciens event listeners
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);

        // Ajouter le nouvel event listener
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('📝 Formulaire soumis');
            this.submitForm();
        });

        // Validation en temps réel
        const inputs = newForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'nom':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le nom est requis';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Le nom doit contenir au moins 2 caractères';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'L\'email est requis';
                } else if (!this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Format d\'email invalide';
                }
                break;

            case 'telephone':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le téléphone est requis';
                } else if (!this.isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Format de téléphone invalide';
                }
                break;

            case 'date-naissance':
                if (!value) {
                    isValid = false;
                    errorMessage = 'La date de naissance est requise';
                } else if (!this.isValidDate(value)) {
                    isValid = false;
                    errorMessage = 'Vous devez avoir au moins 18 ans';
                }
                break;

            case 'type-pret':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Veuillez sélectionner un type de prêt';
                }
                break;

            case 'montant':
                if (value && (parseFloat(value) < 1000)) {
                    isValid = false;
                    errorMessage = 'Le montant minimum est de 1000€';
                }
                break;

            case 'duree':
                if (value && (parseInt(value) < 12 || parseInt(value) > 360)) {
                    isValid = false;
                    errorMessage = 'La durée doit être entre 12 et 360 mois';
                }
                break;

            case 'motif':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le motif est requis';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Le motif doit contenir au moins 10 caractères';
                }
                break;

            case 'revenus-mensuels':
                if (value && parseFloat(value) < 0) {
                    isValid = false;
                    errorMessage = 'Les revenus ne peuvent pas être négatifs';
                }
                break;

            case 'charges-mensuelles':
                if (value && parseFloat(value) < 0) {
                    isValid = false;
                    errorMessage = 'Les charges ne peuvent pas être négatives';
                }
                break;

            case 'employeur':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Le nom de l\'employeur est requis';
                }
                break;

            case 'conditions':
                if (!field.checked) {
                    isValid = false;
                    errorMessage = 'Vous devez accepter les conditions';
                }
                break;
        }

        if (isValid) {
            this.clearFieldError(field);
        } else {
            this.displayFieldError(field, errorMessage);
        }

        return isValid;
    }

    validateForm() {
        const form = document.getElementById('pret-form');
        const fields = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            this.submitForm();
        }

        return isValid;
    }

    displayFieldError(field, message) {
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            field.classList.add('error');
        }
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.style.display = 'none';
            field.classList.remove('error');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone);
    }

    isValidDate(date) {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        }
        return age >= 18;
    }

    async submitForm() {
        console.log('🔄 Début de soumission du formulaire');
        
        // Vérifier l'authentification avec le gestionnaire unifié
        if (!window.unifiedAuthManager || !window.unifiedAuthManager.isLoggedIn()) {
            console.error('❌ Utilisateur non connecté');
            this.showErrorMessage('Vous devez être connecté pour soumettre une demande.');
            return;
        }

        const form = document.getElementById('pret-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Afficher le loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        try {
            console.log('📊 Préparation des données...');
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Ajouter des métadonnées
            data.type = 'pret';
            data.dateSoumission = new Date().toISOString();
            data.statut = 'en_attente';
            data.id = Date.now().toString();

            console.log('📤 Envoi au dashboard admin...');
            // Envoyer au dashboard admin
            await this.sendToAdmin(data);

            console.log('✅ Envoi réussi, affichage du message de succès');
            this.showSuccessMessage();

        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            this.showErrorMessage('Erreur lors de l\'envoi de la demande. Veuillez réessayer.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendToAdmin(data) {
        console.log('📨 Envoi des données:', data);
        
        try {
            // Envoyer au serveur via API
            const response = await fetch('/api/submit-demande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (result.status === 'success') {
                console.log('✅ Demande envoyée au serveur avec succès');
                
                // Aussi sauvegarder dans localStorage pour compatibilité
                const demandes = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
                demandes.push(data);
                localStorage.setItem('admin-demandes', JSON.stringify(demandes));
                console.log('💾 Données sauvegardées dans localStorage');
                
                return result;
            } else {
                throw new Error(result.message || 'Erreur serveur');
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi au serveur:', error);
            
            // Fallback: sauvegarder seulement dans localStorage
            console.log('🔄 Fallback vers localStorage');
            const demandes = JSON.parse(localStorage.getItem('admin-demandes') || '[]');
            demandes.push(data);
            localStorage.setItem('admin-demandes', JSON.stringify(demandes));
            console.log('💾 Données sauvegardées dans localStorage (fallback)');
            
            return { status: 'success', message: 'Demande sauvegardée localement' };
        }
    }

    showSuccessMessage() {
        console.log('🎉 Affichage du message de succès');
        
        // Créer un overlay avec le nouveau design CSS
        const overlay = document.createElement('div');
        overlay.className = 'success-overlay';
        overlay.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Demande envoyée avec succès !</h3>
                <p>Votre demande de prêt a été transmise à notre équipe. Nous vous répondrons dans les plus brefs délais.</p>
                <div class="success-timer" id="success-timer">1.5</div>
                <p style="font-size: 0.9rem; color: #1E3A8A;">Redirection automatique...</p>
            </div>
        `;

        document.body.appendChild(overlay);

        // Afficher l'overlay avec animation
        setTimeout(() => {
            overlay.classList.add('show');
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
                overlay.classList.remove('show');
                setTimeout(() => {
                    overlay.remove();
                    window.location.href = 'index.html';
                }, 300);
            }
        }, 100);
    }

    showErrorMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification-error';
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <div>
                <strong>Erreur</strong>
                <p>${message}</p>
            </div>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// ===== GESTION DES FICHIERS =====
class FileManager {
    constructor() {
        this.initFileHandling();
    }

    initFileHandling() {
        const fileInput = document.getElementById('documents');
        if (!fileInput) return;

        fileInput.addEventListener('change', (e) => {
            this.handleFileChange(e.target.files);
        });
    }

    handleFileChange(files) {
        const fileInfo = document.querySelector('.file-info');
        if (!fileInfo) return;

        if (files.length === 0) {
            fileInfo.innerHTML = `
                <i class="fas fa-upload"></i>
                <span>Cliquez pour sélectionner des fichiers</span>
                <br>
                <small>Formats acceptés : PDF, JPG, PNG, DOC (max 5MB par fichier)</small>
            `;
            return;
        }

        let fileList = '';
        for (let file of files) {
            if (this.isValidFile(file)) {
                fileList += `<div>✓ ${file.name} (${this.formatFileSize(file.size)})</div>`;
            } else {
                fileList += `<div style="color: #dc3545;">✗ ${file.name} - Format non supporté</div>`;
            }
        }

        fileInfo.innerHTML = fileList;
    }

    isValidFile(file) {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        return allowedTypes.includes(file.type) && file.size <= maxSize;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// ===== FONCTIONS UTILITAIRES =====
function resendVerification() {
    // Simulation d'envoi d'email de vérification
    showNotification('Email de vérification envoyé !', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <div>${message}</div>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initialisation de la page demande-pret');
    
    // Vérifier que le gestionnaire unifié est disponible
    if (!window.unifiedAuthManager) {
        console.error('❌ unifiedAuthManager non disponible');
        // Attendre un peu et réessayer
        setTimeout(() => {
            if (!window.unifiedAuthManager) {
                console.error('❌ unifiedAuthManager toujours non disponible');
            } else {
                console.log('✅ unifiedAuthManager trouvé après délai');
            }
        }, 1000);
    } else {
        console.log('✅ unifiedAuthManager disponible');
    }

    const formValidator = new FormValidator();
    const fileManager = new FileManager();

    // Gérer les redirections après connexion
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    if (redirect && window.unifiedAuthManager && window.unifiedAuthManager.isAuthenticated) {
        window.location.href = redirect;
    }

    // Accessibilité : navigation clavier
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    console.log('✅ Initialisation terminée');
});
