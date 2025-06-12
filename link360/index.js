// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initFAQ();
    initScrollAnimations();
    initCTAButtons();
    initParallaxEffect();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on data attributes
                if (element.hasAttribute('data-aos')) {
                    const animationType = element.getAttribute('data-aos');
                    const delay = element.getAttribute('data-aos-delay') || '0';
                    
                    setTimeout(() => {
                        switch(animationType) {
                            case 'fade-up':
                                element.classList.add('fade-in-up');
                                break;
                            case 'fade-left':
                                element.classList.add('fade-in-left');
                                break;
                            case 'fade-right':
                                element.classList.add('fade-in-right');
                                break;
                            default:
                                element.classList.add('fade-in-up');
                        }
                    }, parseInt(delay));
                }
                
                // Unobserve the element once animation is triggered
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Counter animation function
function animateCounter(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isDollar = target.includes('$');
    const isPlus = target.includes('+');
    
    let numericTarget = parseInt(target.replace(/[^\d]/g, ''));
    
    // Handle special cases for different formats
    if (isDollar && target.includes('K')) {
        numericTarget = numericTarget; // Keep as is for 25K
    }
    
    let current = 0;
    const increment = numericTarget / 50; // Animation duration control
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        
        // Format the display value
        if (isDollar && target.includes('K')) {
            element.textContent = `$${displayValue}K+`;
        } else if (isDollar) {
            element.textContent = `$${displayValue}`;
        } else if (isPercentage) {
            element.textContent = `${displayValue}%`;
        } else if (isPlus) {
            element.textContent = `${displayValue}+`;
        } else {
            element.textContent = displayValue;
        }
    }, 20);
}

// CTA buttons functionality
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('#hero-cta, .primary-button');
    const learnMoreButton = document.getElementById('learn-more');
    
    // Add click tracking and smooth interactions
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            createRippleEffect(e, this);
            
            // Track button clicks (you can integrate with analytics here)
            const buttonText = this.textContent.trim();
            console.log(`CTA Button clicked: ${buttonText}`);
        });
    });
    
    // Learn more button scroll to how it works section
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const howItWorksSection = document.getElementById('how-it-works');
            if (howItWorksSection) {
                howItWorksSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Ripple effect for buttons
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    // Ensure button has relative positioning
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    element.style.overflow = 'hidden';
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for floating elements
function initParallaxEffect() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = parallaxSpeed * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const words = originalText.split(' ');
    let currentWordIndex = 0;
    
    // This is optional - uncomment if you want typing effect
    /*
    titleElement.innerHTML = '';
    
    const typeWord = () => {
        if (currentWordIndex < words.length) {
            titleElement.innerHTML += words[currentWordIndex] + ' ';
            currentWordIndex++;
            setTimeout(typeWord, 200);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWord, 1000);
    */
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimization for scroll events
const optimizedScrollHandler = throttle(function() {
    // Handle scroll events here if needed
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Form validation (if forms are added later)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error tracking here
});

// Preloader (optional)
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
}

// Call hidePreloader when everything is loaded
window.addEventListener('load', hidePreloader);

// Progressive enhancement
if ('IntersectionObserver' in window) {
    // Modern browsers - use Intersection Observer
    initScrollAnimations();
} else {
    // Fallback for older browsers
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        element.classList.add('fade-in-up');
    });
}

// Touch device optimization
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch