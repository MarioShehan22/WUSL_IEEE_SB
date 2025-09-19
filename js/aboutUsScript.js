// IEEE Student Branch - About Us JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initStatsCounter();
    initScrollAnimations();
    initSmoothScrolling();
    initParallaxEffects();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile nav collapse on link click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ===== STATISTICS COUNTER =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        if (hasAnimated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 60; // 60 frames for smooth animation
            const duration = 2000; // 2 seconds
            const stepTime = duration / 60;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Add '+' for numbers over 50
                const displayValue = Math.floor(current);
                stat.textContent = displayValue + (target > 10 ? '+' : '');
            }, stepTime);
        });
        
        hasAnimated = true;
    }

    // Trigger animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .timeline-item, .mission-item, .about-content, .mission-image'
    );
    
    // Add animation class to elements
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-section::before, .cta-section::before');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            if (element) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    }, 10));
}

// ===== ENHANCED INTERACTIONS =====

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Timeline item click functionality
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item .card');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            timelineItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add custom styling for active state
            this.style.borderLeftColor = 'var(--ieee-light-blue)';
            this.style.transform = 'translateX(15px) scale(1.02)';
            
            // Reset other items
            timelineItems.forEach(i => {
                if (i !== this) {
                    i.style.borderLeftColor = 'var(--ieee-blue)';
                    i.style.transform = 'translateX(0) scale(1)';
                }
            });
        });
    });
});

// ===== FEATURE ITEM ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    });

    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});

// ===== TYPED TEXT EFFECT =====
function initTypedText() {
    const typedElements = document.querySelectorAll('.typed-text');
    
    typedElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// ===== LOADING ANIMATION =====
function showPageTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.innerHTML = `
        <div class="transition-content">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">Loading...</p>
        </div>
    `;
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Fade in
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    return overlay;
}

function hidePageTransition(overlay) {
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// ===== PAGE LOAD OPTIMIZATION =====
window.addEventListener('load', function() {
    // Hide any loading overlays
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        hidePageTransition(loadingOverlay);
    }
    
    // Initialize additional features after page load
    initTypedText();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// ===== ENHANCED ACCESSIBILITY =====

// Keyboard navigation for interactive elements
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        
        // Handle service cards
        if (focused.closest('.service-card')) {
            e.preventDefault();
            focused.click();
        }
        
        // Handle timeline items
        if (focused.closest('.timeline-item')) {
            e.preventDefault();
            focused.querySelector('.card').click();
        }
    }
});

// Add focus indicators
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll(
        '.service-card, .timeline-item, .feature-item, .stat-card'
    );
    
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--ieee-light-blue)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page Load Performance:', {
                    'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart + 'ms',
                    'Load Complete': perfData.loadEventEnd - perfData.loadEventStart + 'ms',
                    'Total Load Time': perfData.loadEventEnd - perfData.fetchStart + 'ms'
                });
            }
        }, 0);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Page Error:', e.error);
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🎓 IEEE Student Branch - About Us
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Learn more about our mission and vision
Join us in advancing technology for humanity!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Add custom CSS for enhanced interactions
const style = document.createElement('style');
style.textContent = `
    .page-transition {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .transition-content {
        text-align: center;
        color: var(--ieee-blue);
    }
    
    .timeline-item .card.active {
        box-shadow: 0 15px 40px rgba(0,102,204,0.2) !important;
    }
    
    .feature-item {
        cursor: pointer;
    }
    
    .service-card {
        cursor: pointer;
    }
    
    .stat-card {
        cursor: pointer;
    }
    
    body.loaded .fade-in,
    body.loaded .fade-up {
        animation-play-state: running;
    }
    
    @media (prefers-reduced-motion: reduce) {
        .service-card,
        .timeline-item .card,
        .feature-item {
            transition: none !important;
        }
    }
`;

document.head.appendChild(style);