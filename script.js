// Funzione per attivare/disattivare il menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Chiudi il menu quando si fa click su un link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Animazione header durante lo scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Pulsante "torna in alto"
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll fluido per i link di navigazione
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animazione per le card dei servizi al passaggio del mouse
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Gestione del form di contatto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ottieni i valori del form
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const message = this.querySelector('textarea').value;
            
            // Qui normalmente invieresti i dati a un server
            // Per ora, mostriamo solo un messaggio di successo
            alert(`Grazie ${name} per il tuo messaggio! Ti contatteremo presto.`);
            
            // Reset del form
            this.reset();
        });
    }

    // Rivelazione animata degli elementi durante lo scroll
    const revealElements = document.querySelectorAll('.service-card, .about-text, .about-image, .gallery-item, .contact-content');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inizializza gli elementi come nascosti
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.6s ease-in-out';
    });
    
    // Esegui reveal all'inizio e durante lo scroll
    reveal();
    window.addEventListener('scroll', reveal);
    
    // Validazione dei campi del form
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value !== '') {
                this.style.borderColor = '#ff3860';
                // Opzionale: mostra un messaggio di errore
                if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.classList.add('error-message');
                    errorMessage.style.color = '#ff3860';
                    errorMessage.style.fontSize = '14px';
                    errorMessage.style.marginTop = '-15px';
                    errorMessage.style.marginBottom = '15px';
                    errorMessage.textContent = 'Per favore inserisci un indirizzo email valido';
                    this.parentNode.insertBefore(errorMessage, this.nextSibling);
                }
            } else {
                this.style.borderColor = '';
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            }
        });
    }
    
    // Mostra un messaggio di conferma quando si fa hover sul pulsante di invio
    const submitButton = document.querySelector('form .btn');
    if (submitButton) {
        submitButton.addEventListener('mouseenter', function() {
            this.setAttribute('data-original-text', this.textContent);
            this.textContent = 'Invia Ora';
        });
        
        submitButton.addEventListener('mouseleave', function() {
            if (this.getAttribute('data-original-text')) {
                this.textContent = this.getAttribute('data-original-text');
            }
        });
    }
    
    // Aggiorna l'anno del copyright automaticamente
    const copyrightYear = document.querySelector('footer p');
    if (copyrightYear) {
        const yearRegex = /\d{4}/;
        const currentYear = new Date().getFullYear();
        const originalText = copyrightYear.textContent;
        copyrightYear.textContent = originalText.replace(yearRegex, currentYear);
    }
    
    // Caricamento lazy delle immagini (simulato per i placeholder)
    const lazyItems = document.querySelectorAll('.gallery-item, .image-placeholder');
    lazyItems.forEach(item => {
        item.style.opacity = '0';
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(item);
    });
});