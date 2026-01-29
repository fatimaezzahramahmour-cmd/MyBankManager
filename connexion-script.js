// Script de gestion de la connexion MyBankManager
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('connexion-form');
    
    if (!loginForm) {
        console.error('Formulaire de connexion non trouvé');
        return;
    }
    
    // Fonction pour afficher les notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Styles pour la notification
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
        
        // Auto-suppression après 5 secondes
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Gestion de la soumission du formulaire
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('se-souvenir')?.checked || false;
        
        // Validation basique
        if (!email || !password) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        if (!email.includes('@')) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Afficher un indicateur de chargement
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
        submitBtn.disabled = true;
        
        try {
            console.log('🔄 Tentative de connexion unifiée:', email);
            
            // Vérifier si c'est l'admin (accès spécial)
            const isAdmin = email === 'admin@mybank.com' || email === 'admin@mybankmanager.com';
            
            // Note: On ne vérifie plus dans localStorage car les utilisateurs peuvent être dans la base de données
            // sans être dans le localStorage. L'API vérifiera si l'utilisateur existe.
            
            // Utiliser le gestionnaire unifié
            if (window.unifiedAuthManager) {
                // Si c'est l'admin, créer l'utilisateur admin s'il n'existe pas
                if (isAdmin) {
                    const adminUser = {
                        id: 'admin_' + Date.now(),
                        email: email,
                        fullName: 'Administrateur',
                        role: 'admin',
                        status: 'active',
                        createdAt: new Date().toISOString()
                    };
                    
                    // Sauvegarder l'admin en localStorage
                    localStorage.setItem('currentUser', JSON.stringify(adminUser));
                    localStorage.setItem('authToken', 'token_' + Date.now());
                    
                    showNotification('Connexion admin réussie ! Bienvenue Administrateur', 'success');
                    
                    // Redirection vers le dashboard admin
                    setTimeout(() => {
                        window.location.href = 'admin-dashboard.html';
                    }, 1500);
                    
                    return;
                } else {
                    // Pour les utilisateurs normaux
                    try {
                        const user = await window.unifiedAuthManager.login(email, password);
                        
                        showNotification('Connexion réussie ! Bienvenue ' + (user.name || user.fullName || 'Client'), 'success');
                        
                        // Forcer la mise à jour immédiate de l'interface
                        window.unifiedAuthManager.forceUpdateUI();
                        
                        // Redirection vers l'accueil
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                        
                        return;
                    } catch (loginError) {
                        console.log('⚠️ Erreur de connexion, vérification dans localStorage...', loginError);
                        
                        // Vérifier dans localStorage si l'utilisateur existe
                        const users = JSON.parse(localStorage.getItem('users') || '[]');
                        const existingUser = users.find(u => u.email === email);
                        
                        if (existingUser) {
                            // Vérifier le mot de passe
                            if (existingUser.password === password || !existingUser.password) {
                                // Connexion réussie avec localStorage
                                const userData = {
                                    id: existingUser.id,
                                    email: existingUser.email,
                                    fullName: existingUser.fullName || existingUser.nom || email.split('@')[0],
                                    role: existingUser.role || 'client',
                                    verified: true,
                                    createdAt: existingUser.createdAt || new Date().toISOString()
                                };
                                
                                localStorage.setItem('currentUser', JSON.stringify(userData));
                                localStorage.setItem('authToken', 'token_' + Date.now());
                                
                                window.unifiedAuthManager.currentUser = userData;
                                window.unifiedAuthManager.isAuthenticated = true;
                                window.unifiedAuthManager.isVerified = true;
                                window.unifiedAuthManager.forceUpdateUI();
                                
                                showNotification('Connexion réussie ! Bienvenue ' + userData.fullName, 'success');
                                
                                setTimeout(() => {
                                    window.location.href = 'index.html';
                                }, 1500);
                                
                                return;
                            } else {
                                throw new Error('Mot de passe incorrect');
                            }
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
                            localStorage.setItem('currentUser', JSON.stringify(newUser));
                            localStorage.setItem('authToken', 'token_' + Date.now());
                            
                            window.unifiedAuthManager.currentUser = newUser;
                            window.unifiedAuthManager.isAuthenticated = true;
                            window.unifiedAuthManager.isVerified = true;
                            window.unifiedAuthManager.forceUpdateUI();
                            
                            showNotification('Compte créé et connexion réussie ! Bienvenue ' + newUser.fullName, 'success');
                            
                            setTimeout(() => {
                                window.location.href = 'index.html';
                            }, 1500);
                            
                            return;
                        }
                    }
                }
            }
            
            // Fallback vers l'ancien système si le gestionnaire unifié n'est pas disponible
            console.log('⚠️ Gestionnaire unifié non disponible, utilisation du fallback');
            
            // Appel à l'API de connexion
            const response = await fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            
            console.log('📡 Réponse du serveur:', response.status);
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('📊 Données reçues:', data);
            
            if (data.success === true) {
                // Vérifier si c'est l'admin
                const isAdmin = email === 'admin@mybank.com' || email === 'admin@mybankmanager.com';
                
                const user = {
                    id: data.user?.id || Date.now(),
                    email: email,
                    fullName: data.user?.fullName || data.user?.name || (isAdmin ? 'Administrateur' : email.split('@')[0]),
                    role: isAdmin ? 'admin' : 'client',
                    createdAt: new Date().toISOString()
                };
                
                // Sauvegarder en localStorage
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('authToken', 'token_' + Date.now());
                
                // Sauvegarder l'email si "Se souvenir de moi" est coché
                if (rememberMe) {
                    localStorage.setItem('userEmail', email);
                }
                
                // Sauvegarder la connexion pour le dashboard admin (sauf pour l'admin)
                if (!isAdmin) {
                    const connection = {
                        id: Date.now(),
                        userId: user.id,
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role,
                        connectionTime: new Date().toISOString(),
                        status: 'ACTIVE',
                        lastActivity: new Date().toISOString()
                    };
                    
                    // Récupérer les connexions existantes
                    let connections = JSON.parse(localStorage.getItem('userConnections') || '[]');
                    
                    // Vérifier si l'utilisateur existe déjà
                    const existingIndex = connections.findIndex(conn => conn.email === user.email);
                    if (existingIndex !== -1) {
                        // Mettre à jour la connexion existante
                        connections[existingIndex] = {
                            ...connections[existingIndex],
                            connectionTime: new Date().toISOString(),
                            lastActivity: new Date().toISOString(),
                            status: 'ACTIVE'
                        };
                    } else {
                        // Ajouter une nouvelle connexion
                        connections.push(connection);
                    }
                    
                    // Sauvegarder les connexions
                    localStorage.setItem('userConnections', JSON.stringify(connections));
                    console.log('📊 Connexion sauvegardée pour le dashboard admin:', user.email);
                }
                
                showNotification('Connexion réussie ! Redirection...', 'success');
                
                // Redirection selon le rôle
                setTimeout(() => {
                    if (isAdmin) {
                        console.log('🚀 Redirection admin vers dashboard');
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        console.log('🚀 Redirection client vers accueil');
                        window.location.href = 'index.html';
                    }
                }, 1500);
                
            } else {
                throw new Error(data.message || 'Connexion échouée');
            }
            
        } catch (error) {
            console.error('❌ Erreur de connexion:', error);
            
            // Gestion des erreurs spécifiques
            let errorMessage = 'Erreur de connexion';
            
            if (error.message.includes('404')) {
                errorMessage = 'Serveur non disponible. Vérifiez que le serveur est démarré.';
            } else if (error.message.includes('fetch')) {
                errorMessage = 'Erreur de connexion au serveur. Vérifiez votre connexion internet.';
            } else {
                errorMessage = error.message || 'Identifiants incorrects';
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            // Restaurer le bouton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Initialiser l'utilisateur fatimaezzahramahmour@gmail.com s'il n'existe pas
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
        console.log('✅ Utilisateur créé:', defaultEmail);
    }
    
    // Remplir automatiquement l'email si sauvegardé
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.value = savedEmail;
            const rememberCheckbox = document.getElementById('se-souvenir');
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }
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
        
        .notification {
            animation: slideIn 0.3s ease;
        }
        
        .notification button {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            margin-left: 10px;
        }
        
        .notification button:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Test de connexion au serveur au chargement
    console.log('🔍 Test de connexion au serveur...');
    fetch('http://localhost:8081/api/test')
        .then(response => response.json())
        .then(data => {
            console.log('✅ Serveur connecté:', data);
        })
        .catch(error => {
            console.warn('⚠️ Serveur non disponible:', error);
            showNotification('Serveur non disponible. Utilisez start_mybankmanager_complete.bat pour démarrer le système.', 'error');
        });
});
