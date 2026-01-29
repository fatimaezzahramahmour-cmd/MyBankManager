// Calculateur de Prêt Avancé
class LoanCalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.chart = null;
        this.calculate();
    }

    initializeElements() {
        // Inputs
        this.amountInput = document.getElementById('loan-amount');
        this.durationInput = document.getElementById('loan-duration');
        this.rateInput = document.getElementById('interest-rate');
        this.typeSelect = document.getElementById('loan-type');
        
        // Range sliders
        this.amountRange = document.getElementById('amount-range');
        this.durationRange = document.getElementById('duration-range');
        this.rateRange = document.getElementById('rate-range');
        
        // Results
        this.monthlyPayment = document.getElementById('monthly-payment');
        this.totalInterest = document.getElementById('total-interest');
        this.totalAmount = document.getElementById('total-amount');
        this.loanPeriod = document.getElementById('loan-period');
        
        // Chart
        this.chartCanvas = document.getElementById('loan-chart');
        this.amortizationBody = document.getElementById('amortization-body');
        
        // Calculate button
        this.calculateBtn = document.getElementById('calculate-btn');
    }

    bindEvents() {
        // Input changes
        this.amountInput.addEventListener('input', () => {
            this.amountRange.value = this.amountInput.value;
            this.calculate();
        });
        
        this.durationInput.addEventListener('input', () => {
            this.durationRange.value = this.durationInput.value;
            this.calculate();
        });
        
        this.rateInput.addEventListener('input', () => {
            this.rateRange.value = this.rateInput.value;
            this.calculate();
        });
        
        // Range slider changes
        this.amountRange.addEventListener('input', () => {
            this.amountInput.value = this.amountRange.value;
            this.calculate();
        });
        
        this.durationRange.addEventListener('input', () => {
            this.durationInput.value = this.durationRange.value;
            this.calculate();
        });
        
        this.rateRange.addEventListener('input', () => {
            this.rateInput.value = this.rateRange.value;
            this.calculate();
        });
        
        // Type change
        this.typeSelect.addEventListener('change', () => {
            this.updateRatesByType();
            this.calculate();
        });
        
        // Calculate button
        this.calculateBtn.addEventListener('click', () => {
            this.calculate();
        });
    }

    updateRatesByType() {
        const type = this.typeSelect.value;
        const rates = {
            'personal': 5.0,
            'mortgage': 3.5,
            'business': 4.5,
            'vehicle': 4.0
        };
        
        if (rates[type]) {
            this.rateInput.value = rates[type];
            this.rateRange.value = rates[type];
        }
    }

    calculate() {
        const amount = parseFloat(this.amountInput.value);
        const duration = parseInt(this.durationInput.value);
        const rate = parseFloat(this.rateInput.value);
        
        if (amount <= 0 || duration <= 0 || rate <= 0) {
            return;
        }
        
        const monthlyRate = rate / 100 / 12;
        const monthlyPayment = this.calculateMonthlyPayment(amount, monthlyRate, duration);
        const totalAmount = monthlyPayment * duration;
        const totalInterest = totalAmount - amount;
        
        // Update results
        this.monthlyPayment.textContent = this.formatCurrency(monthlyPayment);
        this.totalInterest.textContent = this.formatCurrency(totalInterest);
        this.totalAmount.textContent = this.formatCurrency(totalAmount);
        this.loanPeriod.textContent = `${Math.round(duration / 12)} ans`;
        
        // Update chart
        this.updateChart(amount, totalInterest);
        
        // Update amortization table
        this.updateAmortizationTable(amount, monthlyRate, duration, monthlyPayment);
    }

    calculateMonthlyPayment(principal, monthlyRate, duration) {
        if (monthlyRate === 0) {
            return principal / duration;
        }
        
        const x = Math.pow(1 + monthlyRate, duration);
        return principal * monthlyRate * x / (x - 1);
    }

    updateChart(principal, totalInterest) {
        const ctx = this.chartCanvas.getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Capital', 'Intérêts'],
                datasets: [{
                    data: [principal, totalInterest],
                    backgroundColor: [
                        '#1e40af',
                        '#3b82f6'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#374151',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    updateAmortizationTable(principal, monthlyRate, duration, monthlyPayment) {
        let balance = principal;
        let html = '';
        
        // Show first 12 months and last 12 months
        const showMonths = 12;
        
        for (let month = 1; month <= duration; month++) {
            const interest = balance * monthlyRate;
            const capital = monthlyPayment - interest;
            balance -= capital;
            
            // Show first 12 months
            if (month <= showMonths) {
                html += this.createAmortizationRow(month, monthlyPayment, capital, interest, Math.max(0, balance));
            }
            // Show last 12 months
            else if (month > duration - showMonths) {
                html += this.createAmortizationRow(month, monthlyPayment, capital, interest, Math.max(0, balance));
            }
            // Show ellipsis in the middle
            else if (month === showMonths + 1) {
                html += '<tr><td colspan="5" style="text-align: center; color: #6b7280;">...</td></tr>';
            }
        }
        
        this.amortizationBody.innerHTML = html;
    }

    createAmortizationRow(month, payment, capital, interest, balance) {
        return `
            <tr>
                <td>${month}</td>
                <td>${this.formatCurrency(payment)}</td>
                <td>${this.formatCurrency(capital)}</td>
                <td>${this.formatCurrency(interest)}</td>
                <td>${this.formatCurrency(balance)}</td>
            </tr>
        `;
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Mode Sombre
class DarkMode {
    constructor() {
        this.isDark = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.createToggle();
        this.applyTheme();
    }

    createToggle() {
        const header = document.querySelector('.header-actions');
        if (header) {
            const toggle = document.createElement('button');
            toggle.className = 'dark-mode-toggle';
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            toggle.title = 'Mode sombre';
            toggle.addEventListener('click', () => this.toggle());
            
            header.insertBefore(toggle, header.firstChild);
        }
    }

    toggle() {
        this.isDark = !this.isDark;
        localStorage.setItem('darkMode', this.isDark);
        this.applyTheme();
    }

    applyTheme() {
        const body = document.body;
        const toggle = document.querySelector('.dark-mode-toggle i');
        
        if (this.isDark) {
            body.classList.add('dark-mode');
            if (toggle) toggle.className = 'fas fa-sun';
        } else {
            body.classList.remove('dark-mode');
            if (toggle) toggle.className = 'fas fa-moon';
        }
    }
}

// Chat Support
class ChatSupport {
    constructor() {
        this.createChatWidget();
    }

    createChatWidget() {
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-toggle">
                <i class="fas fa-comments"></i>
                <span>Support</span>
            </div>
            <div class="chat-container">
                <div class="chat-header">
                    <h4><i class="fas fa-headset"></i> Support MyBankManager</h4>
                    <button class="chat-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="chat-messages">
                    <div class="message bot">
                        <i class="fas fa-robot"></i>
                        <div class="message-content">
                            Bonjour ! Je suis l'assistant virtuel de MyBankManager. Comment puis-je vous aider ?
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Tapez votre message...">
                    <button><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        
        document.body.appendChild(chatWidget);
        
        // Chat toggle
        const toggle = chatWidget.querySelector('.chat-toggle');
        const container = chatWidget.querySelector('.chat-container');
        const close = chatWidget.querySelector('.chat-close');
        
        toggle.addEventListener('click', () => {
            container.classList.toggle('active');
        });
        
        close.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }
}

// Notifications
class NotificationSystem {
    constructor() {
        this.init();
    }

    init() {
        // Demander la permission pour les notifications
        if ('Notification' in window) {
            Notification.requestPermission();
        }
    }

    show(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-${this.getIcon(type)}"></i>
            </div>
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Close button
        const close = notification.querySelector('.notification-close');
        close.addEventListener('click', () => {
            notification.remove();
        });
    }

    getIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loan calculator if on loans page
    if (document.getElementById('loan-amount')) {
        new LoanCalculator();
    }
    
    // Initialize dark mode
    new DarkMode();
    
    // Initialize chat support
    new ChatSupport();
    
    // Initialize notifications
    const notifications = new NotificationSystem();
    
    // Show welcome notification
    setTimeout(() => {
        notifications.show(
            'Bienvenue sur MyBankManager !',
            'Découvrez nos services bancaires innovants.',
            'info'
        );
    }, 2000);
}); 