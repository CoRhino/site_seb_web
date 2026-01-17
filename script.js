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

    // --- Floating Ball Animation with Scroll Following ---
    const floatingBall = document.querySelector('.floating-ball');
    let ballPosition = { x: 0, y: 100 };
    let ballVelocity = { x: 0, y: 0 };
    let targetPosition = { x: 0, y: 100 };
    let lastScrollY = 0;
    let animationId = null;

    if (floatingBall) {
        // Initial position
        floatingBall.style.transform = `translate(${ballPosition.x}vw, ${ballPosition.y}vh) scale(0.5)`;
        floatingBall.style.opacity = '0.8';

        // Animation loop
        function animateBall() {
            // Calculate distance to target
            const dx = targetPosition.x - ballPosition.x;
            const dy = targetPosition.y - ballPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply acceleration based on distance (stronger when far away)
            const acceleration = Math.min(distance * 0.01, 0.5);
            ballVelocity.x += dx * acceleration;
            ballVelocity.y += dy * acceleration;

            // Apply friction
            ballVelocity.x *= 0.9;
            ballVelocity.y *= 0.9;

            // Update position
            ballPosition.x += ballVelocity.x;
            ballPosition.y += ballVelocity.y;

            // Apply to element
            const scale = 0.5 + (1 - Math.abs(ballVelocity.y) * 0.1); // Scale based on speed
            floatingBall.style.transform = `translate(${ballPosition.x}vw, ${ballPosition.y}vh) scale(${scale})`;

            // Continue animation
            animationId = requestAnimationFrame(animateBall);
        }

        // Start animation
        animateBall();

        // Update target position on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercentage = scrollY / scrollHeight;

            // Set target position based on scroll
            targetPosition.y = 100 - (scrollPercentage * 100);
            
            // Add some randomness to x position for organic feel
            if (Math.random() > 0.95) {
                targetPosition.x = (Math.random() - 0.5) * 20; // -10 to 10 vw
            }
        });

        // Update target position on mouse move for interactive feel
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth * 100; // Convert to vw
            const mouseY = e.clientY / window.innerHeight * 100; // Convert to vh
            
            // Ball is attracted to mouse but not too strongly
            targetPosition.x += (mouseX - targetPosition.x) * 0.01;
        });
    }

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

    // --- Hamburger Menu Toggle ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavLinks = document.querySelector('.mobile-nav-links');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburgerMenu && mobileNavLinks) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mobileNavLinks.classList.toggle('active');
            
            // Prevent scrolling when mobile menu is open
            if (mobileNavLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a link
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                mobileNavLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
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

    // Also add event listeners for mobile menu language buttons
    const mobileLangBtns = document.querySelectorAll('.mobile-menu .lang-btn');
    mobileLangBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            loadLanguage(lang);
            
            // Close mobile menu after language change
            if (hamburgerMenu && mobileNavLinks) {
                hamburgerMenu.classList.remove('active');
                mobileNavLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});
