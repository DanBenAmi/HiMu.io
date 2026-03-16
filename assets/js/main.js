/* ============================================================
   HiMu Project Page — Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initNavHighlight();
    initTableTabs();
    initCopyBibtex();
    initLightbox();
});

/* ---- Sticky Navbar ---- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            links.classList.remove('open');
        });
    });
}

/* ---- Scroll Reveal ---- */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ---- Active Nav Highlighting ---- */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
}

/* ---- Results Table Tabs ---- */
function initTableTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.table-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panels.forEach(panel => {
                panel.style.display = panel.dataset.panel === target ? '' : 'none';
            });
        });
    });
}

/* ---- Copy BibTeX ---- */
function initCopyBibtex() {
    const btn = document.getElementById('copyBibtex');
    const code = document.getElementById('bibtexCode');

    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(code.textContent).then(() => {
            btn.classList.add('copied');
            btn.querySelector('.copy-text').style.display = 'none';
            btn.querySelector('.copy-check').style.display = 'inline';

            setTimeout(() => {
                btn.classList.remove('copied');
                btn.querySelector('.copy-text').style.display = 'inline';
                btn.querySelector('.copy-check').style.display = 'none';
            }, 2000);
        });
    });
}

/* ---- Lightbox ---- */
function initLightbox() {
    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');

    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const fullSrc = trigger.dataset.full || trigger.src;
            img.src = fullSrc;
            img.alt = trigger.alt;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        img.src = '';
    }

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    overlay.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
}
