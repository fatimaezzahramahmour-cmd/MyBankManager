// ===== VALIDATION DU FORMULAIRE =====

function validateContactForm() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    // Validation des champs
    if (!firstName || firstName.length < 2) {
        showNotification('Veuillez entrer votre prénom (minimum 2 caractères)', 'error');
        return false;
    }
    
    if (!lastName || lastName.length < 2) {
        showNotification('Veuillez entrer votre nom (minimum 2 caractères)', 'error');
        return false;
    }
    
    if (!email || !email.includes('@')) {
        showNotification('Veuillez entrer une adresse email valide', 'error');
        return false;
    }
    
    if (!phone || phone.length < 10) {
        showNotification('Veuillez entrer un numéro de téléphone valide', 'error');
        return false;
    }
    
    if (!subject) {
        showNotification('Veuillez sélectionner un sujet', 'error');
        return false;
    }
    
    if (!message || message.length < 10) {
        showNotification('Veuillez entrer un message (minimum 10 caractères)', 'error');
        return false;
    }
    
    return true;
}

// ===== SOUMISSION DU FORMULAIRE =====

function submitContactForm(event) {
    event.preventDefault();
    
    if (!validateContactForm()) {
        return;
    }
    
    // Récupérer les données du formulaire
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simuler l'envoi du formulaire
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitButton.disabled = true;
    
    // Simulation d'un délai d'envoi
    setTimeout(() => {
        showNotification('Votre message a été envoyé avec succès ! Nous vous répondrons dans les 24h.', 'success');
        
        // Réinitialiser le formulaire
        event.target.reset();
        
        // Réinitialiser le bouton
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// ===== FAQ INTERACTIVE =====

function toggleFAQ(faqItem) {
    const isActive = faqItem.classList.contains('active');
    
    // Fermer tous les autres éléments FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Ouvrir l'élément cliqué s'il n'était pas déjà ouvert
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===== NAVIGATION MOBILE =====

function toggleMobileNav() {
    const navList = document.querySelector('.nav-list');
    const navToggle = document.querySelector('.nav-toggle');
    
    navList.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// ===== ANIMATIONS AU SCROLL =====

function animateOnScroll() {
    const elements = document.querySelectorAll('.contact-method, .agency-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// ===== NOTIFICATIONS =====

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = '#48bb78';
    } else if (type === 'error') {
        notification.style.background = '#f56565';
    } else {
        notification.style.background = '#4299e1';
    }
    
    document.body.appendChild(notification);
    
    // Supprimer la notification après 4 secondes
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== INITIALISATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter l'événement de soumission au formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }
    
    // Ajouter les événements aux questions FAQ
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            toggleFAQ(this.parentElement);
        });
    });
    
    // Ajouter l'événement au bouton de navigation mobile
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Ajouter l'événement de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animation des éléments au chargement
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});

// ===== SMOOTH SCROLL =====

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== HOVER EFFECTS =====

document.addEventListener('DOMContentLoaded', function() {
    // Effet hover sur les méthodes de contact
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Effet hover sur les cartes d'agences
    const agencyCards = document.querySelectorAll('.agency-card');
    agencyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ===== ANIMATIONS CSS =====

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
    
    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-list.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    
    .nav-toggle {
        display: none;
        flex-direction: column;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    .nav-toggle span {
        width: 25px;
        height: 3px;
        background: white;
        margin: 3px 0;
        transition: 0.3s;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style); 