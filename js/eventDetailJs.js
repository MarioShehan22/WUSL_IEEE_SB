// Event Detail — Intermediate JS

document.addEventListener('DOMContentLoaded', () => {
    navbarScroll();
    gallerySwap();
    simpleReveal();
    trackPage(); // optional console-only tracker
});

// 1) Navbar shrink on scroll
function navbarScroll(){
    const nav = document.querySelector('.navbar');
    if(!nav) return;
    const onScroll = () => {
        if(window.scrollY > 60){ nav.classList.add('scrolled'); }
        else { nav.classList.remove('scrolled'); }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
}

// 2) Gallery thumbnail -> main swap
function gallerySwap(){
    const main = document.getElementById('mainGalleryImage');
    const thumbs = document.querySelectorAll('.thumbnail-image');
    if(!main || thumbs.length === 0) return;

    thumbs.forEach(t => {
        t.setAttribute('tabindex','0');
        t.addEventListener('click', () => setMain(t));
        t.addEventListener('keydown', (e) => {
            if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setMain(t); }
        });
    });

    function setMain(el){
        thumbs.forEach(x => x.classList.remove('active'));
        el.classList.add('active');
        // tiny fade
        main.style.opacity = '.6';
        setTimeout(() => {
            main.src = el.src;
            main.style.opacity = '1';
        }, 120);
    }
}

// 3) Simple IntersectionObserver reveal
function simpleReveal(){
    const els = document.querySelectorAll('.event-gallery-section, .event-description-section, .speaker-section, .sidebar-card, .quick-info-item');
    if(els.length === 0) return;

    if(!('IntersectionObserver' in window)){
        els.forEach(e => e.classList.add('appear'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if(en.isIntersecting){
                en.target.classList.add('reveal','appear');
                io.unobserve(en.target);
            }
        });
    }, { threshold: .12 });

    els.forEach(e => io.observe(e));
}

// 4) Optional: simple page view tracker (console)
function trackPage(){
    console.log('Event page view:', {
        title: document.title,
        path: location.pathname
    });
}
