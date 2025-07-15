// ======================
// DOM ELEMENT LOADING
// ======================

/**
 * Loads navigation and footer components
 */
function loadComponents() {
    // Load navigation
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
            // Setup hamburger menu after navigation is loaded
            setupHamburgerMenu();
            // Setup smooth scrolling after navigation is loaded
            setupSmoothScrolling();
        })
        .catch(error => console.error('Error loading navigation:', error));

    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// ======================
// ANIMATIONS & EFFECTS
// ======================

/**
 * Creates floating particle animation
 */
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

/**
 * Creates floating physics equations
 */
function createEquations() {
    const equations = [
        'E = mc²',
        'ℏ∂ψ/∂t = Ĥψ',
        '∇²φ = 4πGρ',
        'F = ma',
        'S = kᵦ ln Ω',
        'Rμν - ½gμνR = 8πTμν',
        '∫ψ*ψ dτ = 1',
        'ΔE·Δt ≥ ℏ/2'
    ];

    setInterval(() => {
        const equation = document.createElement('div');
        equation.className = 'equation';
        equation.textContent = equations[Math.floor(Math.random() * equations.length)];
        equation.style.left = Math.random() * 100 + '%';
        equation.style.animationDuration = (Math.random() * 10 + 20) + 's';
        document.body.appendChild(equation);

        setTimeout(() => {
            equation.remove();
        }, 25000);
    }, 3000);
}

/**
 * Handles scroll-triggered animations
 */
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

/**
 * Adds parallax effect to hero section
 */
function addPhysicsInteractions() {
    const hero = document.querySelector('.hero');
    let mouseX = 0, mouseY = 0;

    hero.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;

        const heroContent = document.querySelector('.hero-content');
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;

        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// ======================
// NAVIGATION
// ======================

/**
 * Handles navbar background change on scroll
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/**
 * Sets up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            closeMobileMenu();
        });
    });

    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('research').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

/**
 * Sets up mobile dropdown functionality
 */
function setupMobileDropdowns() {
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

    mobileDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');

            // Close other open dropdowns
            mobileDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Sets up hamburger menu functionality
 */
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    if (!hamburger || !mobileMenu || !mobileOverlay) return;

    hamburger.addEventListener('click', toggleMobileMenu);
    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Close all dropdowns when menu is closed
    mobileOverlay.addEventListener('click', function() {
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');

    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ======================
// INTERACTIVE ELEMENTS
// ======================

/**
 * Sets up research card hover effects
 */
function setupCardInteractions() {
    const cards = document.querySelectorAll('.research-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Handles form submission
 */
function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        if (!submitBtn) return;

        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(45deg, #4caf50, #8bc34a)';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(45deg, #64ffda, #bb86fc)';
                form.reset();
            }, 2000);
        }, 1000);
    });
}

// ======================
// INITIALIZATION
// ======================

/**
 * Main initialization function
 */
function init() {
    loadComponents();
    createParticles();
    createEquations();
    setupCardInteractions();
    setupFormSubmission();
    addPhysicsInteractions();
    setupMobileDropdowns(); // Add this line

    // Initial checks
    handleScrollAnimations();
    handleNavbarScroll();
}

// Event listeners
document.addEventListener('DOMContentLoaded', init);
window.addEventListener('scroll', function() {
    handleScrollAnimations();
    handleNavbarScroll();
});