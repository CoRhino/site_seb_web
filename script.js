/* ============================================================
   ANANASDAY.COM — script.js
   Core JS : thèmes, i18n, nav, animations
   Sébastien CoRhino © 2026
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------
    // THÈME
    // --------------------------------------------------------
    const body = document.body;
    const THEMES = ['yellow', 'red', 'green', 'magenta', 'rainbow', 'bw', 'cyan'];
    let savedTheme = localStorage.getItem('cr-theme');
    if (!THEMES.includes(savedTheme)) savedTheme = 'yellow';   // migre l'ancien 'orange' → jaune
    // Le script inline en <body> a déjà posé la classe (anti-flash). Idempotent ici.
    body.classList.add(`theme-${savedTheme}`);

    const themeBtns = document.querySelectorAll('.theme-btn');
    const markActive = (theme) =>
        themeBtns.forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
    markActive(savedTheme);

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            body.className = body.className.replace(/theme-\S+/g, '').trim();
            body.classList.add(`theme-${theme}`);
            localStorage.setItem('cr-theme', theme);
            markActive(theme);
        });
    });

    // --------------------------------------------------------
    // i18n
    // --------------------------------------------------------
    const defaultLang = 'fr';
    let currentLang = localStorage.getItem('cr-lang') || defaultLang;
    loadLang(currentLang);

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            loadLang(btn.dataset.lang);
            closeNav();
        });
    });

    async function loadLang(lang) {
        try {
            const res = await fetch(`locales/${lang}.json`);
            if (!res.ok) return;
            const t = await res.json();
            applyT(t);
            document.documentElement.lang = lang;
            currentLang = lang;
            localStorage.setItem('cr-lang', lang);
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === lang);
            });
        } catch (e) { /* fallback HTML statique */ }
    }

    function applyT(t) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const v = getVal(t, el.dataset.i18n);
            if (!v) return;
            if (el.tagName === 'META') el.setAttribute('content', v);
            else el.innerHTML = v;
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const v = getVal(t, el.dataset.i18nPh);
            if (v) el.placeholder = v;
        });
    }

    function getVal(obj, key) {
        return key.split('.').reduce((o, k) => (o ? o[k] : null), obj);
    }

    // --------------------------------------------------------
    // NAVIGATION MOBILE
    // --------------------------------------------------------
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileNav = document.querySelector('.nav-mobile');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const open = hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open', open);
            body.style.overflow = open ? 'hidden' : '';
        });
        mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    }

    function closeNav() {
        hamburger?.classList.remove('open');
        mobileNav?.classList.remove('open');
        body.style.overflow = '';
    }

    // --------------------------------------------------------
    // SCROLL — fade in
    // --------------------------------------------------------
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.07 });
    document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

    // --------------------------------------------------------
    // FLOATING BALL (physique ressort)
    // --------------------------------------------------------
    const ball = document.querySelector('.floating-ball');
    if (ball) {
        let px = 8, py = 80, vx = 0, vy = 0, tx = 8, ty = 80;

        const animate = () => {
            vx = vx * 0.88 + (tx - px) * 0.007;
            vy = vy * 0.88 + (ty - py) * 0.007;
            px += vx; py += vy;
            const speed = Math.hypot(vx, vy);
            const scale = 0.55 + Math.min(speed * 0.12, 0.55);
            ball.style.left      = `${px}vw`;
            ball.style.top       = `${py}vh`;
            ball.style.transform = `scale(${scale})`;
            requestAnimationFrame(animate);
        };
        animate();

        window.addEventListener('scroll', () => {
            const pct = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
            ty = 88 - pct * 78;
            tx = 6 + Math.sin(pct * Math.PI * 3) * 7;
        }, { passive: true });

        window.addEventListener('mousemove', e => {
            const mx = e.clientX / window.innerWidth  * 100;
            const my = e.clientY / window.innerHeight * 100;
            if (Math.hypot(mx - px, my - py) < 22) {
                tx += (mx - px) * 0.004;
                ty += (my - py) * 0.004;
            }
        });
    }

    // --------------------------------------------------------
    // COMPTEUR DE VISITEURS old-school
    // --------------------------------------------------------
    (async () => {
        const el = document.getElementById('fc-num');
        if (!el) return;
        try {
            const r = await fetch('/api/counter.php');
            if (!r.ok) return;
            const d = await r.json();
            const n = String(d.n).padStart(6, '0');
            el.querySelectorAll('span').forEach((s, i) => { s.textContent = n[i]; });
        } catch (_) { /* local dev sans PHP — silencieux */ }
    })();

    // --------------------------------------------------------
    // EMBEDS VIDÉO LITE (charge iframe au clic seulement = zéro cookie avant)
    // --------------------------------------------------------
    document.querySelectorAll('.vid-lite').forEach(el => {
        el.addEventListener('click', () => {
            const ytId    = el.dataset.yt;
            const vimeoId = el.dataset.vimeo;
            if (!ytId && !vimeoId) return;
            const src = vimeoId
                ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&color=F4E800`
                : `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
            el.innerHTML = `<iframe src="${src}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;"></iframe>`;
        });
    });

    // --------------------------------------------------------
    // SMOOTH SCROLL sur ancres
    // --------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // --------------------------------------------------------
    // GLITCH — intensifier au survol
    // --------------------------------------------------------
    document.querySelectorAll('.hero-title').forEach(el => {
        el.addEventListener('mouseenter', () => el.style.animationDuration = '0.25s');
        el.addEventListener('mouseleave', () => el.style.animationDuration = '');
    });

    // --------------------------------------------------------
    // NEWSLETTER — collecte réelle (data/newsletter.txt), en attendant Cyberimpact
    // --------------------------------------------------------
    document.querySelectorAll('.newsletter-form').forEach(form => {
        const btn   = form.querySelector('button');
        const input = form.querySelector('input[type="email"]');
        if (!btn || !input) return;

        btn.addEventListener('click', async () => {
            if (!input.value.includes('@')) {
                input.style.borderColor = 'var(--danger)';
                input.focus();
                return;
            }
            const email = input.value;
            btn.disabled = true;
            const label = btn.textContent;
            btn.textContent = '…';
            try {
                const r = await fetch('/api/newsletter.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const d = await r.json();
                if (!d.ok) throw new Error(d.error || 'fail');
                btn.textContent = '🍍 À bientôt!';
                input.disabled = true;
                input.style.borderColor = 'var(--accent2)';
            } catch (_) {
                btn.textContent = label;
                btn.disabled = false;
                input.style.borderColor = 'var(--danger)';
            }
        });

        input.addEventListener('input', () => input.style.borderColor = '');
    });

    // --------------------------------------------------------
    // NUDGE BANDCAMP — toast discret après quelques visites
    // (localStorage seulement, pas de cookie, pas de bannière)
    // --------------------------------------------------------
    (() => {
        const THRESHOLDS = [3, 8, 15];
        const visits = (parseInt(localStorage.getItem('cr-visits') || '0', 10) || 0) + 1;
        localStorage.setItem('cr-visits', visits);

        const lastNudge = parseInt(localStorage.getItem('cr-nudge-last') || '0', 10) || 0;
        const due = THRESHOLDS.find(t => visits >= t && lastNudge < t);
        if (!due) return;
        localStorage.setItem('cr-nudge-last', due);

        const toast = document.createElement('div');
        toast.className = 'bc-nudge';
        toast.innerHTML =
            '<button class="bc-nudge-close" type="button" aria-label="Fermer">×</button>' +
            '<p>🎵 Psst — t’as déjà écouté le dernier titre sur Bandcamp&nbsp;?</p>' +
            '<a href="https://corhino.bandcamp.com" target="_blank" rel="noopener" class="btn">Écouter →</a>';
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));

        const close = () => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); };
        toast.querySelector('.bc-nudge-close').addEventListener('click', close);
        setTimeout(close, 12000);
    })();

});
