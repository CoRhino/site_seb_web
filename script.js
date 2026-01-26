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
    let lastScrollTime = 0;
    let isScrolling = false;
    let idleTimer = null;
    let animationId = null;

    if (floatingBall) {
        // Initial position
        floatingBall.style.transform = `translate(${ballPosition.x}vw, ${ballPosition.y}vh) scale(0.5)`;
        floatingBall.style.opacity = '0.8';

        // Animation loop with improved physics
        function animateBall() {
            const now = performance.now();
            const deltaTime = now - (animationId || now);

            // Calculate distance to target
            const dx = targetPosition.x - ballPosition.x;
            const dy = targetPosition.y - ballPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Improved physics with spring-like behavior
            const springStrength = 0.008;
            const damping = 0.92;
            
            // Spring force (Hooke's law: F = -kx)
            const springForceX = dx * springStrength;
            const springForceY = dy * springStrength;

            // Update velocity
            ballVelocity.x += springForceX;
            ballVelocity.y += springForceY;

            // Apply damping (friction)
            ballVelocity.x *= Math.pow(damping, deltaTime * 0.06);
            ballVelocity.y *= Math.pow(damping, deltaTime * 0.06);

            // Update position
            ballPosition.x += ballVelocity.x;
            ballPosition.y += ballVelocity.y;

            // Add subtle organic movement when idle
            if (!isScrolling && distance < 5) {
                // Gentle breathing motion
                const breathAmount = Math.sin(now * 0.002) * 0.5;
                ballPosition.y += breathAmount * 0.1;
                
                // Occasional small random movements
                if (Math.random() > 0.98) {
                    ballVelocity.x += (Math.random() - 0.5) * 0.2;
                    ballVelocity.y += (Math.random() - 0.5) * 0.1;
                }
            }

            // Apply to element with improved scale and rotation
            const speed = Math.sqrt(ballVelocity.x * ballVelocity.x + ballVelocity.y * ballVelocity.y);
            const scale = 0.5 + Math.min(speed * 0.2, 0.5); // Scale based on speed
            const rotation = Math.atan2(ballVelocity.y, ballVelocity.x) * 5; // Subtle rotation based on direction
            
            floatingBall.style.transform = `translate(${ballPosition.x}vw, ${ballPosition.y}vh) scale(${scale}) rotate(${rotation}deg)`;

            // Continue animation
            animationId = requestAnimationFrame(animateBall);
        }

        // Start animation
        animateBall();

        // Improved scroll handling - simpler and more reliable
        window.addEventListener('scroll', () => {
            const now = performance.now();
            isScrolling = true;
            
            // Clear any existing idle timer
            if (idleTimer) {
                clearTimeout(idleTimer);
            }
            
            // Set new idle timer
            idleTimer = setTimeout(() => {
                isScrolling = false;
            }, 200);

            const scrollY = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercentage = scrollY / scrollHeight;

            // Direct scroll following - no anticipation needed
            targetPosition.y = 100 - (scrollPercentage * 100);
            
            // Add gentle organic movement based on scroll position
            targetPosition.x = Math.sin(scrollPercentage * Math.PI * 2) * 6; // Gentle side-to-side movement
            
            // Store current scroll position for velocity calculation
            lastScrollY = scrollY;
            lastScrollTime = now;
        });

        // Improved mouse interaction
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth * 100; // Convert to vw
            const mouseY = e.clientY / window.innerHeight * 100; // Convert to vh
            
            // Calculate distance from mouse to ball
            const mouseDx = mouseX - ballPosition.x;
            const mouseDy = mouseY - ballPosition.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            
            // Ball is gently attracted to mouse when close
            if (mouseDistance < 30) {
                const attractionStrength = Math.min(0.005, 0.02 / (mouseDistance + 1));
                targetPosition.x += mouseDx * attractionStrength;
                targetPosition.y += mouseDy * attractionStrength;
            }
        });

        // Add touch support for mobile
        window.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].clientX / window.innerWidth * 100;
            const touchY = e.touches[0].clientY / window.innerHeight * 100;
            
            targetPosition.x += (touchX - targetPosition.x) * 0.02;
            targetPosition.y += (touchY - targetPosition.y) * 0.02;
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

    // --- Top Left Hamburger Menu Toggle ---
    const topHamburgerMenu = document.querySelector('.top-hamburger-menu');
    const scrollingMobileMenu = document.querySelector('.scrolling-mobile-menu');
    const scrollingHamburgerMenu = document.querySelector('.scrolling-hamburger-menu');

    if (topHamburgerMenu && scrollingMobileMenu) {
        topHamburgerMenu.addEventListener('click', () => {
            topHamburgerMenu.classList.toggle('active');
            scrollingMobileMenu.classList.toggle('active');
        });

        // Close scrolling menu when clicking on the hamburger inside it
        if (scrollingHamburgerMenu) {
            scrollingHamburgerMenu.addEventListener('click', () => {
                topHamburgerMenu.classList.remove('active');
                scrollingMobileMenu.classList.remove('active');
            });
        }

        // Close scrolling menu when clicking on a link
        const scrollingMenuLinks = document.querySelectorAll('.scrolling-nav-links a');
        scrollingMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                topHamburgerMenu.classList.remove('active');
                scrollingMobileMenu.classList.remove('active');
            });
        });
    }

    // --- Original Hamburger Menu Toggle (for mobile) ---
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

    // Add event listeners for scrolling menu language buttons
    const scrollingLangBtns = document.querySelectorAll('.scrolling-lang-options .lang-btn');
    scrollingLangBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            loadLanguage(lang);
            
            // Close scrolling menu after language change
            if (topHamburgerMenu && scrollingMobileMenu) {
                topHamburgerMenu.classList.remove('active');
                scrollingMobileMenu.classList.remove('active');
            }
        });
    });
});
