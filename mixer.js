/* ============================================================
   ANANASDAY.COM — mixer.js
   Mixer multi-pistes interactif — Web Audio API
   Config dynamique via data/tracks.json (1–8 pistes)
   Sébastien CoRhino © 2026

   ARCHITECTURE AUDIO :
   AudioBuffer (par piste)
     → BufferSource
       → GainNode (volume piste)
         → AnalyserNode (VU-mètre)
           → GainNode (master)
             → AudioContext.destination
   ============================================================ */

class CoRhinoMixer {
    constructor() {
        this.ctx        = null;   // AudioContext
        this.master     = null;   // GainNode master
        this.config     = null;   // tracks.json
        this.tracks     = {};     // { id: { gain, analyser, buffer, muted, vol } }
        this.sources    = {};     // { id: BufferSource } — recréés à chaque play
        this.playing    = false;
        this.looping    = false;
        this.startedAt  = 0;      // ctx.currentTime au moment du play
        this.pausedAt   = 0;      // secondes écoulées au moment du pause
        this.duration   = 0;      // durée max des buffers
        this.lang       = localStorage.getItem('cr-lang') || 'fr';
        this.released   = false;  // true après la date de sortie
    }

    /* ---- INIT ---- */
    async init() {
        this.config = await this._fetchConfig();
        if (!this.config) return this._fatal('Impossible de charger data/tracks.json');

        this.released = Date.now() >= new Date(this.config.meta.releaseDate).getTime();

        this._renderLockOverlay();

        if (this.released) {
            this._buildUI();
            this.ctx    = new (window.AudioContext || window.webkitAudioContext)();
            this.master = this.ctx.createGain();
            this.master.connect(this.ctx.destination);
            await this._loadAll();
            this._bindControls();
            this._startTimeDisplay();
            this._startVU();
        } else {
            this._lockConsole();
            this._startLockCountdown();
        }
    }

    /* ---- FETCH CONFIG ---- */
    async _fetchConfig() {
        try {
            const r = await fetch('data/tracks.json');
            return r.ok ? r.json() : null;
        } catch { return null; }
    }

    /* ---- OVERLAY VERROUILLÉ ---- */
    _renderLockOverlay() {
        const el = document.getElementById('mixerLock');
        if (el) el.style.display = this.released ? 'none' : 'block';
    }

    _lockConsole() {
        const el = document.getElementById('mixerConsole');
        if (el) el.classList.add('locked');
    }

    _startLockCountdown() {
        const el  = document.getElementById('lockCountdown');
        if (!el) return;
        const target = new Date(this.config.meta.releaseDate);

        const tick = () => {
            const diff = target - Date.now();
            if (diff <= 0) { location.reload(); return; }
            const d = Math.floor(diff / 86400000);
            const h = Math.floor(diff % 86400000 / 3600000);
            const m = Math.floor(diff % 3600000  / 60000);
            el.textContent = `Dans ${d}j ${h}h ${m}m`;
            setTimeout(tick, 60000);
        };
        tick();
    }

    /* ---- BUILD UI (pistes dynamiques) ---- */
    _buildUI() {
        const container = document.getElementById('mixerTracks');
        if (!container) return;

        this.config.tracks.forEach(t => {
            const label = this.lang === 'fr' ? t.labelFr : t.labelEn;
            const row   = document.createElement('div');
            row.className   = 'track';
            row.dataset.id  = t.id;
            row.innerHTML   = `
                <div class="track-id">
                    <span class="track-emoji" aria-hidden="true">${t.emoji}</span>
                    <span class="track-name">${label}</span>
                </div>
                <input type="range" class="track-fader" id="fader-${t.id}"
                    min="0" max="100" value="${t.defaultVolume}"
                    aria-label="Volume ${label}" data-id="${t.id}">
                <span class="track-vol" id="vol-${t.id}" aria-live="polite">${t.defaultVolume}</span>
                <button class="mute-btn" id="mute-${t.id}" data-id="${t.id}"
                    aria-label="Mute ${label}" aria-pressed="false">M</button>
            `;
            container.appendChild(row);

            this.tracks[t.id] = {
                gain: null, analyser: null, buffer: null,
                muted: false, vol: t.defaultVolume,
            };
        });
    }

    /* ---- CHARGEMENT AUDIO ---- */
    async _loadAll() {
        const loadingEl = document.createElement('p');
        loadingEl.id = '_loading';
        loadingEl.style.cssText = 'text-align:center;font-family:var(--font-mono);color:var(--muted);padding:1rem;';
        loadingEl.textContent = '// Chargement des pistes…';
        document.getElementById('mixerTracks')?.before(loadingEl);

        await Promise.all(this.config.tracks.map(t => this._loadTrack(t)));

        document.getElementById('_loading')?.remove();
    }

    async _loadTrack(t) {
        try {
            const res    = await fetch(t.file);
            if (!res.ok) throw new Error(`404: ${t.file}`);
            const buf    = await this.ctx.decodeAudioData(await res.arrayBuffer());

            const gain   = this.ctx.createGain();
            const anlsr  = this.ctx.createAnalyser();
            anlsr.fftSize = 256;
            gain.gain.value = t.defaultVolume / 100;
            gain.connect(anlsr);
            anlsr.connect(this.master);

            if (buf.duration > this.duration) this.duration = buf.duration;

            this.tracks[t.id].gain     = gain;
            this.tracks[t.id].analyser = anlsr;
            this.tracks[t.id].buffer   = buf;

        } catch (err) {
            console.warn(`[Mixer] Piste manquante: ${t.file}`, err);
            this._markTrackUnavailable(t.id);
        }
    }

    _markTrackUnavailable(id) {
        const row  = document.querySelector(`.track[data-id="${id}"]`);
        const name = document.querySelector(`.track[data-id="${id}"] .track-name`);
        if (row)  row.style.opacity = '.3';
        if (name) name.textContent += ' (N/D)';
    }

    /* ---- CONTRÔLES ---- */
    _bindControls() {
        // Faders de piste
        document.querySelectorAll('.track-fader[data-id]').forEach(f => {
            f.addEventListener('input', () => {
                const id  = f.dataset.id;
                const val = +f.value;
                if (this.tracks[id]?.gain) this.tracks[id].gain.gain.value = this.tracks[id].muted ? 0 : val / 100;
                this.tracks[id].vol = val;
                const volEl = document.getElementById(`vol-${id}`);
                if (volEl) volEl.textContent = val;
            });
        });

        // Master
        const mf = document.getElementById('masterFader');
        mf?.addEventListener('input', () => {
            if (this.master) this.master.gain.value = mf.value / 100;
            const mv = document.getElementById('masterVol');
            if (mv) mv.textContent = mf.value;
        });

        // Boutons Mute
        document.querySelectorAll('.mute-btn[data-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id  = btn.dataset.id;
                const trk = this.tracks[id];
                if (!trk) return;
                trk.muted = !trk.muted;
                if (trk.gain) trk.gain.gain.value = trk.muted ? 0 : trk.vol / 100;
                btn.classList.toggle('on', trk.muted);
                btn.setAttribute('aria-pressed', String(trk.muted));
                document.querySelector(`.track[data-id="${id}"]`)?.classList.toggle('muted', trk.muted);
            });
        });

        // Transport
        document.getElementById('btnPlay')?.addEventListener('click', () => this._togglePlay());
        document.getElementById('btnStop')?.addEventListener('click', () => this._stop());
        document.getElementById('btnRewind')?.addEventListener('click', () => this._rewind());
        document.getElementById('btnLoop')?.addEventListener('click', () => {
            this.looping = !this.looping;
            document.getElementById('btnLoop')?.classList.toggle('active', this.looping);
        });

        // Raccourcis clavier
        document.addEventListener('keydown', e => {
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
            if (e.code === 'Space') { e.preventDefault(); this._togglePlay(); }
            if (e.code === 'KeyR')  this._rewind();
            if (e.code === 'KeyL')  document.getElementById('btnLoop')?.click();
        });
    }

    /* ---- TRANSPORT ---- */
    _createSources() {
        this.config.tracks.forEach(t => {
            const trk = this.tracks[t.id];
            if (!trk?.buffer) return;
            const src = this.ctx.createBufferSource();
            src.buffer = trk.buffer;
            src.loop   = this.looping;
            src.connect(trk.gain);
            this.sources[t.id] = src;
        });
    }

    _togglePlay() {
        this.playing ? this._pause() : this._play();
    }

    _play() {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        this._createSources();
        Object.values(this.sources).forEach(s => s.start(0, this.pausedAt));
        this.startedAt = this.ctx.currentTime - this.pausedAt;
        this.playing   = true;
        const btn = document.getElementById('btnPlay');
        if (btn) { btn.textContent = '⏸'; btn.classList.add('active'); }
    }

    _pause() {
        this.pausedAt = this.ctx.currentTime - this.startedAt;
        Object.values(this.sources).forEach(s => { try { s.stop(); } catch {} });
        this.sources  = {};
        this.playing  = false;
        const btn = document.getElementById('btnPlay');
        if (btn) { btn.textContent = '▶'; btn.classList.remove('active'); }
    }

    _stop() {
        this._pause();
        this.pausedAt = 0;
        const t = document.getElementById('mixerTime');
        if (t) t.textContent = '0:00';
    }

    _rewind() {
        const wasPlaying = this.playing;
        this._stop();
        if (wasPlaying) this._play();
    }

    /* ---- AFFICHAGE DU TEMPS ---- */
    _startTimeDisplay() {
        const el = document.getElementById('mixerTime');
        if (!el) return;
        setInterval(() => {
            if (!this.playing) return;
            const s = this.ctx.currentTime - this.startedAt;
            el.textContent = `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
        }, 250);
    }

    /* ---- VU-MÈTRES ---- */
    _startVU() {
        // Les VU-mètres sont dessinés via CSS animé sur les sliders
        // (extension possible : canvas par piste si souhaité)
    }

    /* ---- ERREUR FATALE ---- */
    _fatal(msg) {
        console.error('[Mixer]', msg);
        const w = document.getElementById('mixerConsole');
        if (w) w.innerHTML = `<p style="color:var(--danger);font-family:var(--font-mono);padding:1rem;">[ERREUR] ${msg}</p>`;
    }
}

/* ---- DÉMARRAGE ---- */
document.addEventListener('DOMContentLoaded', () => {
    window._mixer = new CoRhinoMixer();
    window._mixer.init();
});
