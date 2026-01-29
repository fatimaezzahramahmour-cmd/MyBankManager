// Script de gestion de l'inscription
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('inscription-form');
    let errorMessage = document.getElementById('registration-error');
    
    // Créer l'élément d'erreur s'il n'existe pas
    if (!errorMessage && registrationForm) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'registration-error';
        errorMessage.className = 'error-message';
        errorMessage.style.display = 'none';
        registrationForm.insertBefore(errorMessage, registrationForm.firstChild);
    }
    
    // Fonction pour afficher les erreurs
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.style.background = '#fee';
            errorMessage.style.color = '#c33';
            errorMessage.style.padding = '1rem';
            errorMessage.style.borderRadius = '8px';
            errorMessage.style.marginBottom = '1rem';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        } else {
            // Créer un élément d'erreur si il n'existe pas
            const errorDiv = document.createElement('div');
            errorDiv.id = 'registration-error';
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.cssText = 'display: block; background: #fee; color: #c33; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;';
            const form = document.getElementById('inscription-form');
            if (form) {
                form.insertBefore(errorDiv, form.firstChild);
            }
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
        console.error('❌ Erreur:', message);
    }
    
    // Fonction pour afficher le succès
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
    
    // Gestion de la soumission du formulaire
    registrationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(registrationForm);
        const data = Object.fromEntries(formData);
        
        console.log('📝 Données du formulaire:', data);
        
        // Validation des champs
        if (!validateForm(data)) {
            return;
        }
        
        // Afficher un indicateur de chargement
        const submitBtn = registrationForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
        submitBtn.disabled = true;
        
        try {
            // Appel à l'API d'inscription
            const response = await fetch('http://localhost:8081/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const responseData = await response.json();
            console.log('📡 Réponse API:', responseData);
            
            if (response.ok && (responseData.success === true || responseData.user)) {
                // Créer l'objet utilisateur complet
                const userData = {
                    id: responseData.user?.id || 'user_' + Date.now(),
                    email: data.email,
                    nom: data.fullName,
                    fullName: data.fullName || responseData.user?.fullName,
                    telephone: data.telephone,
                    adresse: data.adresse,
                    dateNaissance: data['date-naissance'],
                    password: data.password, // Stocker pour la connexion locale
                    role: 'client',
                    status: 'active',
                    verified: true,
                    registrationDate: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                };
                
                // Sauvegarder l'utilisateur dans localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                // Vérifier si l'utilisateur existe déjà
                const existingIndex = users.findIndex(u => u.email === data.email);
                if (existingIndex >= 0) {
                    users[existingIndex] = userData;
                } else {
                    users.push(userData);
                }
                localStorage.setItem('users', JSON.stringify(users));
                
                // Connecter automatiquement l'utilisateur
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('authToken', responseData.token || 'token_' + Date.now());
                
                // Utiliser le gestionnaire unifié pour mettre à jour l'interface
                if (window.unifiedAuthManager) {
                    window.unifiedAuthManager.registerUser(userData);
                    window.unifiedAuthManager.forceUpdateUI();
                }
                
                // Déclencher l'événement d'inscription
                window.dispatchEvent(new CustomEvent('userRegistered', { 
                    detail: { user: userData } 
                }));
                
                showSuccess('Compte créé avec succès ! Bienvenue ' + userData.fullName);
                
                // Redirection vers l'accueil après 2 secondes
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                
            } else {
                const errorMsg = responseData.message || responseData.error || 'Erreur lors de la création du compte.';
                
                // Si l'email existe déjà, proposer de se connecter
                if (errorMsg.includes('déjà utilisé') || errorMsg.includes('EMAIL_EXISTS')) {
                    showError('Cet email est déjà utilisé. Voulez-vous vous connecter ?');
                    setTimeout(() => {
                        if (confirm('Voulez-vous être redirigé vers la page de connexion ?')) {
                            window.location.href = 'connexion.html';
                        }
                    }, 1000);
                } else {
                    showError(errorMsg);
                }
            }
            
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            
            // Vérifier si l'email existe déjà dans localStorage
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const emailExists = existingUsers.some(u => u.email === data.email);
            
            if (emailExists) {
                showError('Cet email est déjà utilisé. Veuillez utiliser un autre email ou vous connecter.');
                return;
            }
            
            // Fallback : créer le compte localement si l'API échoue
            console.log('🔄 Tentative de création de compte en mode local...');
            
            try {
                // Créer l'objet utilisateur complet
                const userData = {
                    id: 'user_' + Date.now(),
                    email: data.email,
                    nom: data.fullName,
                    fullName: data.fullName,
                    telephone: data.telephone,
                    adresse: data.adresse,
                    dateNaissance: data['date-naissance'],
                    password: data.password, // Stocker le mot de passe pour la connexion locale
                    role: 'client',
                    status: 'active',
                    verified: true,
                    registrationDate: new Date().toISOString(),
                    createdAt: new Date().toISOString()
                };
                
                // Sauvegarder l'utilisateur dans localStorage
                existingUsers.push(userData);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                
                // Connecter automatiquement l'utilisateur
                localStorage.setItem('currentUser', JSON.stringify(userData));
                localStorage.setItem('authToken', 'token_' + Date.now());
                
                // Utiliser le gestionnaire unifié pour mettre à jour l'interface
                if (window.unifiedAuthManager) {
                    window.unifiedAuthManager.registerUser(userData);
                    window.unifiedAuthManager.forceUpdateUI();
                }
                
                // Déclencher l'événement d'inscription
                window.dispatchEvent(new CustomEvent('userRegistered', { 
                    detail: { user: userData } 
                }));
                
                showSuccess('Compte créé avec succès ! Bienvenue ' + userData.fullName);
                
                // Redirection vers l'accueil après 2 secondes
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                
            } catch (fallbackError) {
                console.error('Erreur fallback:', fallbackError);
                showError('Erreur lors de la création du compte: ' + fallbackError.message + '. Veuillez réessayer.');
            }
        } finally {
            // Restaurer le bouton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Fonction de validation du formulaire
    function validateForm(data) {
        console.log('🔍 Validation des données:', data);
        
        // Validation du nom complet
        if (!data.fullName || data.fullName.trim().length < 2) {
            showError('Le nom complet doit contenir au moins 2 caractères.');
            return false;
        }
        
        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showError('Veuillez entrer une adresse email valide.');
            return false;
        }
        
        // Validation du téléphone (accepter différents formats)
        const phoneClean = data.telephone ? data.telephone.replace(/[\s\-\(\)]/g, '') : '';
        const phoneRegex = /^[0-9]{8,15}$/;
        if (!data.telephone || !phoneRegex.test(phoneClean)) {
            showError('Veuillez entrer un numéro de téléphone valide (8 à 15 chiffres).');
            return false;
        }
        
        // Validation de la date de naissance
        if (!data['date-naissance']) {
            showError('Veuillez sélectionner votre date de naissance.');
            return false;
        }
        
        // Vérifier l'âge (minimum 18 ans)
        const birthDate = new Date(data['date-naissance']);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (age < 18 || (age === 18 && monthDiff < 0)) {
            showError('Vous devez avoir au moins 18 ans pour créer un compte.');
            return false;
        }
        
        // Validation de l'adresse
        if (!data.adresse || data.adresse.trim().length < 10) {
            showError('Veuillez entrer une adresse complète (au moins 10 caractères).');
            return false;
        }
        
        // Validation du mot de passe
        if (!data.password || data.password.length < 8) {
            showError('Le mot de passe doit contenir au moins 8 caractères.');
            return false;
        }
        
        // Validation de la confirmation du mot de passe
        if (data.password !== data.confirmPassword) {
            showError('Les mots de passe ne correspondent pas.');
            return false;
        }
        
        // Validation des conditions d'utilisation
        if (!data.conditions) {
            showError('Vous devez accepter les conditions d\'utilisation.');
            return false;
        }
        
        console.log('✅ Validation réussie');
        return true;
    }
    
    // Gestion de l'affichage/masquage des mots de passe
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Validation en temps réel des champs
    const formInputs = registrationForm.querySelectorAll('input[required]');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const fieldName = this.name;
            const fieldValue = this.value;
            const errorElement = document.getElementById(fieldName + '-error');
            
            // Réinitialiser l'erreur
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            
            // Validation spécifique selon le champ
            if (fieldName === 'email' && fieldValue) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(fieldValue)) {
                    if (errorElement) {
                        errorElement.textContent = 'Veuillez entrer une adresse email valide.';
                        errorElement.style.display = 'block';
                        errorElement.style.color = '#c33';
                    }
                }
            }
            
            if (fieldName === 'password' && fieldValue && fieldValue.length < 8) {
                if (errorElement) {
                    errorElement.textContent = 'Le mot de passe doit contenir au moins 8 caractères.';
                    errorElement.style.display = 'block';
                    errorElement.style.color = '#c33';
                }
            }
            
            if (fieldName === 'confirmPassword' && fieldValue) {
                const passwordField = registrationForm.querySelector('#password');
                if (passwordField && fieldValue !== passwordField.value) {
                    if (errorElement) {
                        errorElement.textContent = 'Les mots de passe ne correspondent pas.';
                        errorElement.style.display = 'block';
                        errorElement.style.color = '#c33';
                    }
                }
            }
        });
        
        input.addEventListener('input', function() {
            const errorElement = document.getElementById(this.name + '-error');
            if (errorElement && this.value) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    });
    
    // Gestion de la connexion avec Google
    const googleBtn = document.querySelector('.social-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showError('Connexion avec Google non disponible pour le moment.');
        });
    }
    
    // Animation CSS pour les notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .success-message {
            animation: slideIn 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 