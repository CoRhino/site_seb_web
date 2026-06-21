/* ============================================================
   TR-808 — tr808.js
   Boîte à rythmes fonctionnelle (Web Audio, sons synthétisés),
   séquenceur 16 pas éditable, play/stop/tempo. Esthétique vieux web.
   404 + 404 = 808. Sébastien CoRhino © 2026
   Monte dans #tr808. Aucun fichier audio : tout est synthétisé.
   ============================================================ */
(function () {
    const mount = document.getElementById('tr808');
    if (!mount) return;

    const STEPS = 16;
    const VOICES = [
        { id: 'kick',  name: 'BD', make: kick },
        { id: 'snare', name: 'SN', make: snare },
        { id: 'clap',  name: 'CP', make: clap },
        { id: 'ohat',  name: 'HH', make: openHat },
        { id: 'chat',  name: 'HH', make: closedHat },
        { id: 'cow',   name: 'CB', make: cowbell },
    ];

    // --- motif (voiceId -> 16 booléens) ---
    const pattern = {};
    VOICES.forEach(v => pattern[v.id] = new Array(STEPS).fill(false));
    function setDefault() {
        const on = (id, idxs) => idxs.forEach(i => pattern[id][i] = true);
        on('kick',  [0, 4, 8, 10, 12]);
        on('snare', [4, 12]);
        on('clap',  [4, 12]);
        on('ohat',  [2, 6, 10, 14]);
        on('chat',  [0, 2, 4, 6, 8, 10, 12, 14]);
        on('cow',   [0]);
    }
    setDefault();

    // --- état transport ---
    let ac = null, playing = false, tempo = 120;
    let current = 0, nextNoteTime = 0, timer = null;
    const queue = [];          // {step, time} pour le playhead
    const LOOKAHEAD = 25;      // ms
    const SCHEDULE_AHEAD = 0.1;// s

    // ====================== UI ======================
    const wrap = document.createElement('div');
    wrap.className = 'tr808';
    wrap.innerHTML =
        '<div class="tr-head">' +
            '<button class="tr-play" id="trPlay" type="button" aria-label="Lecture / Stop">▶ PLAY</button>' +
            '<div class="tr-tempo"><label for="trTempo">TEMPO</label>' +
            '<input id="trTempo" type="range" min="50" max="180" value="120"><span id="trBpm">120</span> BPM</div>' +
            '<button class="tr-clear" id="trClear" type="button">CLEAR</button>' +
            '<button class="tr-clear" id="trReset" type="button">DEMO</button>' +
        '</div>' +
        '<div class="tr-grid" id="trGrid"></div>' +
        '<div class="tr-foot"> ···  404 + 404 = 808  ··· </div>';
    mount.appendChild(wrap);

    const grid = wrap.querySelector('#trGrid');
    const cells = {}; // voiceId -> [button]
    VOICES.forEach(v => {
        const row = document.createElement('div');
        row.className = 'tr-row';
        const lbl = document.createElement('span');
        lbl.className = 'tr-name';
        lbl.textContent = v.name;
        row.appendChild(lbl);
        cells[v.id] = [];
        for (let s = 0; s < STEPS; s++) {
            const c = document.createElement('button');
            c.type = 'button';
            c.className = 'tr-cell' + (s % 4 === 0 ? ' tr-beat' : '');
            c.setAttribute('aria-label', v.name + ' pas ' + (s + 1));
            if (pattern[v.id][s]) c.classList.add('on');
            c.addEventListener('click', () => {
                pattern[v.id][s] = !pattern[v.id][s];
                c.classList.toggle('on', pattern[v.id][s]);
                ensureCtx();
                if (pattern[v.id][s]) v.make(ac, ac.currentTime, 0.9); // aperçu sonore
            });
            row.appendChild(c);
            cells[v.id].push(c);
        }
        grid.appendChild(row);
    });

    const playBtn = wrap.querySelector('#trPlay');
    playBtn.addEventListener('click', toggle);
    wrap.querySelector('#trTempo').addEventListener('input', (e) => {
        tempo = +e.target.value;
        wrap.querySelector('#trBpm').textContent = tempo;
    });
    wrap.querySelector('#trClear').addEventListener('click', () => {
        VOICES.forEach(v => pattern[v.id].fill(false));
        refreshCells();
    });
    wrap.querySelector('#trReset').addEventListener('click', () => {
        VOICES.forEach(v => pattern[v.id].fill(false));
        setDefault();
        refreshCells();
    });
    function refreshCells() {
        VOICES.forEach(v => cells[v.id].forEach((c, s) => c.classList.toggle('on', pattern[v.id][s])));
    }

    // ====================== Transport ======================
    function ensureCtx() {
        if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
        if (ac.state === 'suspended') ac.resume();
    }
    function toggle() {
        ensureCtx();
        playing = !playing;
        playBtn.textContent = playing ? '⏹ STOP' : '▶ PLAY';
        playBtn.classList.toggle('on', playing);
        if (playing) {
            current = 0;
            nextNoteTime = ac.currentTime + 0.05;
            scheduler();
            requestAnimationFrame(draw);
        } else {
            clearTimeout(timer);
            cells.kick.forEach((_, s) => setPlayhead(s, false));
        }
    }
    function scheduler() {
        while (nextNoteTime < ac.currentTime + SCHEDULE_AHEAD) {
            VOICES.forEach(v => { if (pattern[v.id][current]) v.make(ac, nextNoteTime, 1); });
            queue.push({ step: current, time: nextNoteTime });
            nextNoteTime += (60 / tempo) / 4;   // double-croches
            current = (current + 1) % STEPS;
        }
        if (playing) timer = setTimeout(scheduler, LOOKAHEAD);
    }
    let lastDrawn = -1;
    function draw() {
        if (!playing) return;
        let step = lastDrawn;
        while (queue.length && queue[0].time < ac.currentTime) { step = queue.shift().step; }
        if (step !== lastDrawn) {
            setPlayhead(lastDrawn, false);
            setPlayhead(step, true);
            lastDrawn = step;
        }
        requestAnimationFrame(draw);
    }
    function setPlayhead(step, on) {
        if (step < 0) return;
        VOICES.forEach(v => { const c = cells[v.id][step]; if (c) c.classList.toggle('playhead', on); });
    }

    // ====================== Synthèse 808 ======================
    let noiseBuf = null;
    function noise(ac) {
        if (!noiseBuf) {
            noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.4, ac.sampleRate);
            const d = noiseBuf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        const s = ac.createBufferSource(); s.buffer = noiseBuf; return s;
    }
    function env(ac, t, a, peak, dec) {
        const g = ac.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(peak, t + a);
        g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
        return g;
    }
    function kick(ac, t, vol) {
        const o = ac.createOscillator(); o.type = 'sine';
        o.frequency.setValueAtTime(150, t);
        o.frequency.exponentialRampToValueAtTime(48, t + 0.12);
        const g = env(ac, t, 0.002, vol, 0.4);
        o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.45);
    }
    function snare(ac, t, vol) {
        const n = noise(ac); const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1500;
        const ng = env(ac, t, 0.001, vol * 0.7, 0.18); n.connect(hp).connect(ng).connect(ac.destination);
        const o = ac.createOscillator(); o.type = 'triangle'; o.frequency.value = 180;
        const og = env(ac, t, 0.001, vol * 0.5, 0.12); o.connect(og).connect(ac.destination);
        n.start(t); n.stop(t + 0.2); o.start(t); o.stop(t + 0.14);
    }
    function clap(ac, t, vol) {
        const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100; bp.Q.value = 1.2;
        bp.connect(ac.destination);
        [0, 0.012, 0.024, 0.05].forEach((off, i) => {
            const n = noise(ac); const g = env(ac, t + off, 0.001, vol * (i === 3 ? 0.5 : 0.35), i === 3 ? 0.15 : 0.03);
            n.connect(g).connect(bp); n.start(t + off); n.stop(t + off + 0.16);
        });
    }
    function closedHat(ac, t, vol) {
        const n = noise(ac); const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
        const g = env(ac, t, 0.001, vol * 0.5, 0.04); n.connect(hp).connect(g).connect(ac.destination);
        n.start(t); n.stop(t + 0.06);
    }
    function openHat(ac, t, vol) {
        const n = noise(ac); const hp = ac.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 6000;
        const g = env(ac, t, 0.001, vol * 0.4, 0.3); n.connect(hp).connect(g).connect(ac.destination);
        n.start(t); n.stop(t + 0.34);
    }
    function cowbell(ac, t, vol) {
        const g = env(ac, t, 0.001, vol * 0.4, 0.2); g.connect(ac.destination);
        [540, 800].forEach(f => { const o = ac.createOscillator(); o.type = 'square'; o.frequency.value = f; o.connect(g); o.start(t); o.stop(t + 0.22); });
    }
})();
