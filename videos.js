/* ============================================================
   VIDÉOS — videos.js
   Bandeau de vignettes déroulant (TITRE / IMAGE / CRÉDITS) +
   grand lecteur en dessous. Embed chargé au clic = zéro cookie avant.
   Par défaut : une vidéo au hasard (randomizer).
   Données : data/videos.json
   Sébastien CoRhino © 2026
   ============================================================ */
(function () {
    const banner = document.getElementById('vbanner');
    const stage  = document.getElementById('vstage');
    if (!banner || !stage) return;

    const esc = (s) => String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    fetch('data/videos.json')
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(list => {
            if (!Array.isArray(list) || !list.length) {
                banner.innerHTML = '<p class="vempty">Aucune vidéo pour l\'instant.</p>';
                return;
            }

            banner.innerHTML = '';   // retire le placeholder « Chargement… » avant d'ajouter les vignettes

            list.forEach((v, i) => {
                const btn = document.createElement('button');
                btn.className = 'vthumb';
                btn.type = 'button';
                btn.setAttribute('aria-label', v.title || ('Vidéo ' + (i + 1)));
                const media = v.thumb
                    ? `<img src="${esc(v.thumb)}" alt="" loading="lazy">`
                    : `<div class="vthumb-ph">${v.type === 'image' ? '🖼' : '▶'}</div>`;
                btn.innerHTML =
                    `<span class="vthumb-title">${esc(v.title)}</span>` +
                    `<span class="vthumb-img">${media}</span>` +
                    `<span class="vthumb-credits">${esc(v.credits)}</span>`;
                btn.addEventListener('click', () => select(i, true));
                banner.appendChild(btn);
            });

            // Par défaut : au hasard
            select(Math.floor(Math.random() * list.length), false);

            function select(i, userClick) {
                Array.from(banner.children).forEach((c, ci) => {
                    const on = ci === i;
                    c.classList.toggle('active', on);
                    if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
                });
                const v = list[i];
                stage.innerHTML = stageHtml(v);
                const frame   = stage.querySelector('.vstage-frame');
                const playBtn = stage.querySelector('.vstage-play');
                if (playBtn && frame) playBtn.addEventListener('click', () => loadEmbed(frame, v));
                if (banner.children[i]) {
                    banner.children[i].scrollIntoView({ inline: 'center', block: 'nearest', behavior: userClick ? 'smooth' : 'auto' });
                }
            }

            function stageHtml(v) {
                const noVid = (v.type === 'youtube' && !v.ytid) || (v.type === 'vimeo' && !v.vimeoid) || (v.type === 'facebook' && !v.url);
                let media;
                if (v.type === 'image') {
                    media = `<img src="${esc(v.src)}" alt="${esc(v.title)}">`;
                } else if (noVid) {
                    media = `<div class="vstage-soon">Vidéo à venir 🍍</div>`;
                } else {
                    const poster = v.thumb ? `<img src="${esc(v.thumb)}" alt="${esc(v.title)}">` : '';
                    media = poster + `<button class="vstage-play" type="button" aria-label="Lire ${esc(v.title)}">▶</button>`;
                }
                return `<div class="vstage-frame">${media}</div>` +
                       `<div class="vstage-meta"><h2>${esc(v.title)}</h2><p>${esc(v.credits)}</p></div>`;
            }

            function loadEmbed(frame, v) {
                const src = v.type === 'vimeo'
                    ? `https://player.vimeo.com/video/${encodeURIComponent(v.vimeoid)}?autoplay=1&color=F4E800`
                    : v.type === 'facebook'
                    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v.url)}&show_text=false&autoplay=true`
                    : `https://www.youtube.com/embed/${encodeURIComponent(v.ytid)}?autoplay=1&rel=0`;
                frame.innerHTML = `<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
            }
        })
        .catch(() => {
            banner.innerHTML = '<p class="vempty">// vidéos indisponibles — servir le site en http (fetch JSON).</p>';
        });
})();
