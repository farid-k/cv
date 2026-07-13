/* ============================================================
   MAIN.JS - Portfolio Interactions
   ============================================================ */

// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeader();
    initSmoothScroll();
    initProgressBar();
    initBackToTop();
    initProjectFilter();
    initProjectModal();
    initContactForm();
    removePreloader();
});

// ============================================================
// PRELOADER
// ============================================================

function removePreloader() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 500);
}

// ============================================================
// THEME TOGGLE
// ============================================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    setTheme(savedTheme);
    
    // Toggle button listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// ============================================================
// HEADER & NAVIGATION
// ============================================================

function initHeader() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = nav.querySelectorAll('.nav__link');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.querySelector('.nav__list').classList.toggle('show');
        });
    }
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            nav.querySelector('.nav__list').classList.remove('show');
            updateActiveNav(link.getAttribute('href'));
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function updateActiveNav(href) {
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav__link[href="${href}"]`)?.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`.nav__link[href="#${sectionId}"]`)?.classList.add('active');
        }
    });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================================
// PROGRESS BAR
// ============================================================

function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
}

// ============================================================
// BACK TO TOP
// ============================================================

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// PROJECT FILTER
// ============================================================

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Trigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================================
// PROJECT DETAIL MODAL
// ============================================================

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const modalImage = modal.querySelector('.project-modal__image');
    const modalCategory = modal.querySelector('.project-modal__category');
    const modalTitle = modal.querySelector('.project-modal__title');
    const modalDescription = modal.querySelector('.project-modal__description');
    const modalDetails = modal.querySelector('.project-modal__details');
    const modalTags = modal.querySelector('.project-modal__tags');
    const modalLink = modal.querySelector('.project-modal__link');
    const closeButtons = modal.querySelectorAll('[data-close-modal]');
    const projectCards = document.querySelectorAll('.project-card');

    const openModal = (card) => {
        const image = card.querySelector('.project-card__image');
        const category = card.querySelector('.project-card__category')?.textContent || '';
        const title = card.querySelector('.project-card__title')?.textContent || '';
        const description = card.querySelector('.project-card__description')?.textContent || '';
        const tagsContent = card.querySelector('.project-card__tags')?.innerHTML || '';
        const link = card.getAttribute('data-link') || '#';
        const linkText = card.getAttribute('data-link-text') || 'Voir le projet';
        const details = card.getAttribute('data-details') || '';

        modalImage.src = image?.src || '';
        modalImage.alt = image?.alt || title;
        modalCategory.textContent = category;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalDetails.textContent = details;
        modalTags.innerHTML = tagsContent;
        modalLink.href = link;
        modalLink.textContent = linkText;

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.closest('a, button')) {
                event.stopPropagation();
                openModal(card);
                return;
            }
            openModal(card);
        });

        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(card);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
}

// ============================================================
// CONTACT FORM
// ============================================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Note: This is a demo. In production, you would send this to a server
        // Example with Formspree: https://formspree.io/
        // Or your own backend endpoint
        
        console.log('Form data:', data);
        
        // Simulate sending
        setTimeout(() => {
            showNotification('Message envoyé! Merci de votre contact.', 'success');
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    });
}

function validateForm() {
    const errors = {};
    const form = document.getElementById('contactForm');
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Validate name
    if (!name.value.trim()) {
        errors.name = 'Le nom est requis';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        errors.email = 'L\'email est requis';
    } else if (!emailRegex.test(email.value)) {
        errors.email = 'Veuillez entrer un email valide';
    }
    
    // Validate subject
    if (!subject.value.trim()) {
        errors.subject = 'Le sujet est requis';
    }
    
    // Validate message
    if (!message.value.trim()) {
        errors.message = 'Le message est requis';
    }
    
    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    
    // Display errors
    if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach(field => {
            const errorEl = document.getElementById(`${field}Error`);
            if (errorEl) {
                errorEl.textContent = errors[field];
            }
        });
        return false;
    }
    
    return true;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations
if (!document.querySelector('style[data-notifications]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notifications', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================================
// INTERSECTION OBSERVER - FADE IN ANIMATIONS
// ============================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .timeline__item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ============================================================
// UTILITIES
// ============================================================

// Update nav on page load
window.addEventListener('load', updateActiveNavOnScroll);

// ============================================================
// END OF MAIN.JS
// ============================================================
