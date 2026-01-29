// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initFAQ();
    initCounters();
    initLoanCalculator();
    initContactForm();
    initModals();
    initSmoothScrolling();
    initAnimations();
    updateHeaderAuth(); // Call updateHeaderAuth here
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Active navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// FAQ Accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const originalText = counter.textContent;
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        // Déterminer le suffixe basé sur le texte original
        let suffix = '';
        if (originalText.includes('M+')) {
            suffix = 'M+';
        } else if (originalText.includes('+')) {
            suffix = '+';
        } else if (originalText.includes('%')) {
            suffix = '%';
        }
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formater selon le type de suffixe
            let formattedValue = '';
            if (suffix === 'M+') {
                formattedValue = (current / 1000000).toFixed(0) + 'M+';
            } else if (suffix === '+') {
                formattedValue = current.toLocaleString() + '+';
            } else if (suffix === '%') {
                formattedValue = current + '%';
            } else {
                formattedValue = current.toLocaleString();
            }
            
            counter.textContent = formattedValue;
        }, 16);
    };

    // Intersection Observer for counters
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Loan calculator functionality
function initLoanCalculator() {
    const calculateLoan = window.calculateLoan = function() {
        const amount = parseFloat(document.getElementById('loan-amount')?.value || document.getElementById('calc-amount')?.value) || 100000;
        const term = parseFloat(document.getElementById('loan-term')?.value || document.getElementById('calc-term')?.value) || 10;
        const rate = parseFloat(document.getElementById('interest-rate')?.value || document.getElementById('calc-rate')?.value) || 5.5;

        if (amount && term && rate) {
            const monthlyRate = rate / 100 / 12;
            const numberOfPayments = term * 12;
            
            // Calculate monthly payment using loan formula
            const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            const totalPayment = monthlyPayment * numberOfPayments;
            const totalInterest = totalPayment - amount;

            // Update results
            const monthlyElement = document.getElementById('monthly-payment') || document.getElementById('monthly-result');
            const totalElement = document.getElementById('total-payment') || document.getElementById('total-result');
            const interestElement = document.getElementById('total-interest') || document.getElementById('interest-result');

            if (monthlyElement) monthlyElement.textContent = `${monthlyPayment.toFixed(2)} MAD`;
            if (totalElement) totalElement.textContent = `${totalPayment.toFixed(2)} MAD`;
            if (interestElement) interestElement.textContent = `${totalInterest.toFixed(2)} MAD`;

            // Show results with animation
            const resultContainer = document.getElementById('loan-result');
            if (resultContainer) {
                resultContainer.style.display = 'block';
                resultContainer.classList.add('fade-in');
            }
        }
    };

    // Auto-calculate on input change
    const loanInputs = document.querySelectorAll('#loan-amount, #loan-term, #interest-rate, #calc-amount, #calc-term, #calc-rate');
    loanInputs.forEach(input => {
        input.addEventListener('input', calculateLoan);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message envoyé avec succès ! Nous vous répondrons dans les 24h.', 'success');
            this.reset();
        });
    }
}

// Modal functionality
function initModals() {
    // Account modal
    window.openAccountModal = function(type = '') {
        const modal = document.getElementById('accountModal');
        const typeSelect = document.getElementById('modal-account-type') || document.getElementById('account-type');
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (typeSelect && type) {
                typeSelect.value = type;
            }
        }
    };

    window.closeAccountModal = function() {
        const modal = document.getElementById('accountModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Loan modal
    window.openLoanModal = function(type = '') {
        const modal = document.getElementById('loanModal');
        const typeSelect = document.getElementById('loan-type');
        
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            if (typeSelect && type) {
                typeSelect.value = type;
            }
        }
    };

    window.closeLoanModal = function() {
        const modal = document.getElementById('loanModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .account-card, .value-card, .team-member, .award-card, .requirement-card, .contact-card, .branch-card, .support-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
        line-height: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-message {
        flex: 1;
    }
`;
document.head.appendChild(style);

// Banking card 3D effect
function initBankingCard() {
    const bankingCard = document.querySelector('.banking-card');
    
    if (bankingCard) {
        bankingCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        bankingCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(10deg)';
        });
    }
}

// Initialize banking card effect
document.addEventListener('DOMContentLoaded', initBankingCard);

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return re.test(phone);
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        // Remove existing error states
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();
        
        // Check if field is empty
        if (!value) {
            showFieldError(input, 'Ce champ est obligatoire');
            isValid = false;
            return;
        }
        
        // Email validation
        if (input.type === 'email' && !validateEmail(value)) {
            showFieldError(input, 'Veuillez entrer une adresse email valide');
            isValid = false;
            return;
        }
        
        // Phone validation
        if (input.type === 'tel' && !validatePhone(value)) {
            showFieldError(input, 'Veuillez entrer un numéro de téléphone valide');
            isValid = false;
            return;
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(errorElement);
}

// Add error styles to CSS
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
    }
    
    .form-group input.error:focus,
    .form-group select.error:focus,
    .form-group textarea.error:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(errorStyles);

// Enhanced contact form with validation
function initEnhancedContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            setTimeout(() => {
                showNotification('Message envoyé avec succès ! Nous vous répondrons dans les 24h.', 'success');
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 2000);
        });
    }
}

// Initialize enhanced contact form
document.addEventListener('DOMContentLoaded', initEnhancedContactForm);

// Utility functions
function formatCurrency(amount, currency = 'MAD') {
    return new Intl.NumberFormat('fr-MA', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('fr-MA').format(number);
}

// Export functions for global use
window.MyBankManager = {
    calculateLoan,
    openAccountModal,
    closeAccountModal,
    openLoanModal,
    closeLoanModal,
    showNotification,
    formatCurrency,
    formatNumber
}; 

// Gestion dynamique du header selon la connexion
function updateHeaderAuth() {
    // Utiliser le gestionnaire unifié s'il est disponible
    if (window.unifiedAuthManager) {
        console.log('🔄 Mise à jour du header via script.js');
        window.unifiedAuthManager.forceUpdateUI();
        return;
    }
    
    // Fallback vers l'ancien système
    const user = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    const headerActions = document.getElementById('header-actions');
    if (!headerActions) return;
    
    if (user) {
        try {
            const userObj = JSON.parse(user);
            headerActions.innerHTML = `
                <a href="mon-compte.html" class="btn btn-outline">Mon Compte</a>
                <button onclick="logout()" class="btn btn-primary">Déconnexion</button>
            `;
        } catch (error) {
            console.error('Erreur parsing user:', error);
            headerActions.innerHTML = `
                <a href="connexion.html" class="btn btn-outline">Se connecter</a>
                <a href="inscription.html" class="btn btn-primary">S'inscrire</a>
            `;
        }
    } else {
        headerActions.innerHTML = `
            <a href="connexion.html" class="btn btn-outline">Se connecter</a>
            <a href="inscription.html" class="btn btn-primary">S'inscrire</a>
        `;
    }
}

// Fonction de déconnexion globale
function logout() {
    if (window.unifiedAuthManager) {
        window.unifiedAuthManager.logout();
    } else {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

// Exposer globalement
window.logout = logout;

// Mettre à jour le header au chargement et après un délai
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderAuth();
    // Forcer une mise à jour après un délai pour s'assurer que l'interface est correcte
    setTimeout(updateHeaderAuth, 1000);
}); 