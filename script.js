document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Fade In ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.project-card, .art-item, .archive-item');

    sections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    cards.forEach(card => {
        card.classList.add('fade-in-card');
        observer.observe(card);
    });

    // --- Glitch Effect Intensify on Hover ---
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        glitchTitle.addEventListener('mouseenter', () => {
            glitchTitle.style.animationDuration = '0.5s'; // Faster glitch
        });
        glitchTitle.addEventListener('mouseleave', () => {
            glitchTitle.style.animationDuration = ''; // Reset to CSS default
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Theme Switcher Logic ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        body.classList.add(`theme-${savedTheme}`);
    } else {
        // Default theme is Yellow
        body.classList.add('theme-yellow');
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');

            // Remove all theme classes
            body.className = ''; // Be careful if body has other classes, here it's fine or use regex
            // Re-add necessary base classes if any (none currently)

            if (theme !== 'default') {
                body.classList.add(`theme-${theme}`);
            }

            // Save preference
            localStorage.setItem('selectedTheme', theme);
        });
    });

    // --- Internationalization (i18n) Logic ---
    const langBtns = document.querySelectorAll('.lang-btn');
    const defaultLang = 'fr';
    let currentLang = localStorage.getItem('selectedLang') || defaultLang;

    async function loadLanguage(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            const translations = await response.json();
            applyTranslations(translations);
            document.documentElement.lang = lang;
            localStorage.setItem('selectedLang', lang);
            updateActiveLangBtn(lang);
        } catch (error) {
            console.error('Error loading language:', error);
        }
    }

    function applyTranslations(translations) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const value = getNestedValue(translations, key);
            if (value) {
                if (el.tagName === 'META') {
                    el.setAttribute('content', value);
                } else {
                    el.innerHTML = value; // Use innerHTML to support HTML tags in JSON (e.g. spans)
                }
            }
        });
    }

    function getNestedValue(obj, key) {
        return key.split('.').reduce((o, i) => (o ? o[i] : null), obj);
    }

    function updateActiveLangBtn(lang) {
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.style.textDecoration = 'underline';
                btn.style.fontWeight = 'bold';
            } else {
                btn.style.textDecoration = 'none';
                btn.style.fontWeight = 'normal';
            }
        });
    }

    // Initial Load
    loadLanguage(currentLang);

    // Event Listeners
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            loadLanguage(lang);
        });
    });
});
