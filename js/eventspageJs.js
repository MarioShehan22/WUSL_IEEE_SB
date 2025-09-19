// Enhanced Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initializeEventFilters();
    initializeAnimations();
    initializeNavbarScroll();
    initializeLoadMore();

    // Smooth scrolling for navigation links
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
});

// Event Filtering System
function initializeEventFilters() {
    const allEvents = document.querySelectorAll('.event-item');
    const filterTabs = document.querySelectorAll('[data-bs-toggle="pill"]');

    filterTabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            const targetTab = e.target.getAttribute('data-bs-target');
            filterEvents(targetTab, allEvents);
        });
    });

    // Initial load - show all events
    filterEvents('#all', allEvents);
}

function filterEvents(tabTarget, allEvents) {
    const upcomingGrid = document.getElementById('upcomingEventsGrid');
    const pastGrid = document.getElementById('pastEventsGrid');

    // Clear grids
    upcomingGrid.innerHTML = '';
    pastGrid.innerHTML = '';

    if (tabTarget === '#upcoming') {
        const upcomingEvents = document.querySelectorAll('.upcoming-event');
        upcomingEvents.forEach(event => {
            const clone = event.cloneNode(true);
            clone.classList.add('fade-in');
            upcomingGrid.appendChild(clone);
        });
        animateCards(upcomingGrid.querySelectorAll('.event-item'));
    } else if (tabTarget === '#past') {
        const pastEvents = document.querySelectorAll('.past-event');
        pastEvents.forEach(event => {
            const clone = event.cloneNode(true);
            clone.classList.add('fade-in');
            pastGrid.appendChild(clone);
        });
        animateCards(pastGrid.querySelectorAll('.event-item'));
    }
}

// Animation System
function initializeAnimations() {
    // Animate event cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe initial event cards
    document.querySelectorAll('#allEventsGrid .event-item').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

function animateCards(cards) {
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        // Remove and re-add class to restart animation
        card.classList.remove('fade-in');
        setTimeout(() => {
            card.classList.add('fade-in');
        }, 10);
    });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let isLoading = false;
    let currentPage = 1;
    const itemsPerPage = 6;

    // Sample additional events data (in a real app, this would come from an API)
    const additionalEvents = [
        {
            title: "Tech Talk Series 2025",
            date: "15th of June, 2025",
            month: "Jun",
            day: "15",
            description: "Monthly tech talks featuring industry experts and emerging technologies.",
            image: "Assets/Events/tech-talk.jpg",
            link: "tech-talk.html",
            type: "upcoming",
            location: "Main Hall"
        },
        {
            title: "AI Workshop 2025",
            date: "22nd of July, 2025",
            month: "Jul",
            day: "22",
            description: "Hands-on workshop covering machine learning and artificial intelligence basics.",
            image: "Assets/Events/ai-workshop.jpg",
            link: "ai-workshop.html",
            type: "upcoming",
            location: "Computer Lab"
        },
        {
            title: "Innovation Challenge 2024",
            date: "15th of September, 2024",
            month: "Sep",
            day: "15",
            description: "Annual innovation competition showcasing creative solutions to real-world problems.",
            image: "Assets/Events/innovation.jpg",
            link: "innovation-challenge.html",
            type: "past",
            location: "Innovation Hub"
        }
    ];

    loadMoreBtn.addEventListener('click', function() {
        if (isLoading) return;

        isLoading = true;
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        loadMoreBtn.disabled = true;

        // Simulate API delay
        setTimeout(() => {
            loadMoreEvents(additionalEvents, currentPage);
            currentPage++;

            // Reset button state
            isLoading = false;
            loadMoreBtn.innerHTML = '<i class="fas fa-plus me-2"></i>Load More Events';
            loadMoreBtn.disabled = false;

            // Hide button if no more events
            if (currentPage > 2) {
                loadMoreBtn.style.display = 'none';
            }
        }, 1500);
    });
}

function loadMoreEvents(events, page) {
    const allEventsGrid = document.getElementById('allEventsGrid');
    const startIndex = (page - 1) * 3;
    const endIndex = Math.min(startIndex + 3, events.length);

    for (let i = startIndex; i < endIndex; i++) {
        const event = events[i];
        const eventCard = createEventCard(event);
        eventCard.classList.add('fade-in');
        eventCard.style.animationDelay = `${(i - startIndex) * 0.2}s`;
        allEventsGrid.appendChild(eventCard);
    }
}

function createEventCard(event) {
    const col = document.createElement('div');
    col.className = `col-xl-4 col-lg-6 col-md-6 event-item ${event.type}-event`;

    col.innerHTML = `
        <div class="event-card h-100">
            <div class="event-image-container">
                <img src="${event.image}" class="event-image" alt="${event.title}" onerror="this.src='Assets/Events/placeholder.jpg'">
                <div class="event-status ${event.type}">${event.type === 'upcoming' ? 'Upcoming' : 'Past Event'}</div>
                <div class="event-overlay">
                    <div class="event-date">
                        <span class="day">${event.day}</span>
                        <span class="month">${event.month}</span>
                    </div>
                </div>
            </div>
            <div class="event-content">
                <h5 class="event-title">${event.title}</h5>
                <p class="event-description">${event.description}</p>
                <div class="event-meta">
                    <div class="event-date-text">
                        <i class="fas fa-calendar-alt"></i>
                        ${event.date}
                    </div>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${event.location}
                    </div>
                </div>
                <a href="${event.link}" class="event-btn">
                    View Details <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;

    return col;
}

// Utility Functions
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

// Event Card Interaction Enhancement
document.addEventListener('click', function(e) {
    // Handle event card clicks for better mobile interaction
    if (e.target.closest('.event-card') && window.innerWidth <= 768) {
        const card = e.target.closest('.event-card');
        const overlay = card.querySelector('.event-overlay');

        if (overlay && !e.target.closest('.event-btn')) {
            overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
        }
    }
});

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('event-btn')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Performance Optimization
const debouncedResize = debounce(() => {
    // Handle responsive adjustments if needed
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        // Reset any inline styles that might interfere with responsive design
        card.style.height = '';
    });
}, 250);

window.addEventListener('resize', debouncedResize);

// Error Handling for Images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('event-image')) {
        e.target.src = 'Assets/Events/placeholder.jpg';
        e.target.alt = 'Event image not available';
    }
}, true);

// Accessibility Enhancements
function initializeAccessibility() {
    // Add ARIA labels to interactive elements
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const title = card.querySelector('.event-title').textContent;
        card.setAttribute('aria-label', `Event: ${title}`);
    });

    // Ensure focus management for tab navigation
    const tabButtons = document.querySelectorAll('[data-bs-toggle="pill"]');
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function() {
            this.focus();
        });
    });
}

// Initialize accessibility features
initializeAccessibility();