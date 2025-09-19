// IEEE Student Branch - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initHeroSwiper();
    initEventsSwiper();
    initStatsCounter();
    initScrollAnimations();
    initSmoothScrolling();
});

// ===== NAVBAR FUNCTIONALITY =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Active nav link based on scroll position
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
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile nav collapse on link click
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

// ===== HERO SWIPER =====
function initHeroSwiper() {
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        speed: 1000,
    });
}

// ===== EVENTS SWIPER =====
function initEventsSwiper() {
    const eventsSwiper = new Swiper('.events-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
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
            const increment = target / 100;
            const duration = 2000; // 2 seconds
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (target > 50 ? '+' : '');
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
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stat-card').closest('section') || 
                        document.querySelector('.stat-card').closest('.container');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .stat-card, .timeline-item, .gallery-item, .contact-item');
    
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

// ===== GALLERY LIGHTBOX =====
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const imgSrc = img.src;
            const imgAlt = img.alt;
            
            // Create lightbox modal
            const lightboxHTML = `
                <div class="lightbox-modal" style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                ">
                    <div style="max-width: 90%; max-height: 90%; position: relative;">
                        <img src="${imgSrc}" alt="${imgAlt}" style="
                            width: 100%;
                            height: 100%;
                            object-fit: contain;
                        ">
                        <button class="close-lightbox" style="
                            position: absolute;
                            top: -40px;
                            right: 0;
                            background: none;
                            border: none;
                            color: white;
                            font-size: 2rem;
                            cursor: pointer;
                        ">&times;</button>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', lightboxHTML);
            
            // Close lightbox functionality
            const lightbox = document.querySelector('.lightbox-modal');
            const closeBtn = document.querySelector('.close-lightbox');
            
            function closeLightbox() {
                lightbox.remove();
            }
            
            lightbox.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);
            
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
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

// Add loading animation
function showLoading() {
    const loadingHTML = `
        <div class="loading-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 300);
    }
}

// Initialize loading on page load
window.addEventListener('load', function() {
    hideLoading();
    initGalleryLightbox();
});

// Add loading on page start
showLoading();

// ===== FORM HANDLING (if needed) =====
function initContactForm() {
    const form = document.querySelector('#contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Optimize scroll performance
const optimizedScroll = throttle(function() {
    // Scroll-based functionality here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Optimize resize performance
const optimizedResize = debounce(function() {
    // Resize-based functionality here
}, 250);

window.addEventListener('resize', optimizedResize);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.closest('.gallery-item')) {
            e.preventDefault();
            focused.click();
        }
    }
});

// ARIA labels and roles
function enhanceAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'visually-hidden-focusable';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        z-index: 100000;
        padding: 8px 16px;
        background: var(--ieee-blue);
        color: white;
        text-decoration: none;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('#about') || document.querySelector('main');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility enhancements
enhanceAccessibility();

// Console welcome message
console.log(`
🎓 IEEE Student Branch - WUSL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Welcome to our website!
Advancing Technology for Humanity
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);