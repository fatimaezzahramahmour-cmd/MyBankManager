// Script de gestion de la connexion
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');
    
    // Fonction pour afficher les erreurs
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
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
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Validation basique
        if (!email || !password) {
            showError('Veuillez remplir tous les champs');
            return;
        }
        
        if (!email.includes('@')) {
            showError('Veuillez entrer une adresse email valide');
            return;
        }
        
        // Afficher un indicateur de chargement
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
        submitBtn.disabled = true;
        
        try {
            // Appel à l'API de connexion
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.status === 'success') {
                showSuccess('Connexion réussie ! Redirection...');
                
                // Sauvegarder les informations de connexion si "Se souvenir de moi" est coché
                if (rememberMe) {
                    localStorage.setItem('userEmail', email);
                }
                
                // Redirection après 2 secondes
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 2000);
                
            } else {
                showError(data.message || 'Erreur de connexion. Vérifiez vos identifiants.');
            }
            
        } catch (error) {
            console.error('Erreur de connexion:', error);
            showError('Erreur de connexion au serveur. Veuillez réessayer.');
        } finally {
            // Restaurer le bouton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Gestion de la connexion avec Google
    const googleBtn = document.querySelector('.social-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            showError('Connexion avec Google non disponible pour le moment.');
        });
    }
    
    // Remplir automatiquement l'email si sauvegardé
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        document.getElementById('login-email').value = savedEmail;
        document.getElementById('remember-me').checked = true;
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