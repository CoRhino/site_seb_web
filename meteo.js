/* ============================================================
   MÉTÉO DU BIC — meteo.js
   Source : Open-Meteo (gratuit, sans clé API, CORS ok)
   Température affichée en KELVIN — parce que c'est drôle
   Sébastien CoRhino © 2026

   USAGE :
     <div data-meteo data-meteo-skin="card"></div>
     <script src="meteo.js"></script>

   OU via JS :
     new MeteoWidget('#mon-div', 'retro').render();
   ============================================================ */

(function (global) {

/* ---- Config ---- */
const LAT   =  48.383;    // Le Bic, QC
const LON   = -68.708;
const PLACE = 'Le Bic, QC';
const API   = 'https://api.open-meteo.com/v1/forecast';

/* ---- Codes WMO → symbole + libellé ---- */
function wmo(code) {
    if (code === 0)  return { sym: '☀',   fr: 'Ensoleillé', en: 'Clear' };
    if (code <= 2)   return { sym: '⛅',  fr: 'Peu nuageux', en: 'Partly cloudy' };
    if (code === 3)  return { sym: '☁',   fr: 'Couvert',    en: 'Overcast' };
    if (code <= 48)  return { sym: '≈≈',  fr: 'Brouillard', en: 'Fog' };
    if (code <= 55)  return { sym: '.·.', fr: 'Bruine',     en: 'Drizzle' };
    if (code <= 65)  return { sym: '///', fr: 'Pluie',      en: 'Rain' };
    if (code <= 77)  return { sym: '❄',   fr: 'Neige',      en: 'Snow' };
    if (code <= 82)  return { sym: '///', fr: 'Averses',    en: 'Showers' };
    if (code <= 86)  return { sym: '❄~',  fr: 'Neige',      en: 'Snow showers' };
    return                  { sym: '⚡',   fr: 'Orage',      en: 'Thunderstorm' };
}

/* ---- Kelvin (entier, arrondi au plus près — pas de décimales pour l'humain) ---- */
function toK(c) {
    return Math.round(parseFloat(c) + 273.15);
}

/* ---- Vent : km/h -> cm/s (km/h /3.6 = m/s, m/s *100 = cm/s) ----
   1-2 chiffres (< 100 cm/s) : une décimale. 3 chiffres (>= 100) : entier. */
function toCmS(kmh) {
    const cms = parseFloat(kmh) * 100 / 3.6;
    return cms < 100 ? cms.toFixed(1) : String(Math.round(cms));
}

/* ---- Fetch ---- */
async function fetchMeteo() {
    const url = `${API}?latitude=${LAT}&longitude=${LON}` +
        `&current=temperature_2m,weather_code,wind_speed_10m` +
        `&wind_speed_unit=kmh&timezone=America%2FToronto`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    const c = d.current;
    return {
        celsius: c.temperature_2m,
        kelvin:  toK(c.temperature_2m),
        code:    c.weather_code,
        wind:    c.wind_speed_10m,
        windCmS: toCmS(c.wind_speed_10m),
        icon:    wmo(c.weather_code),
        time:    c.time,
    };
}

/* ============================================================
   MeteoWidget
   ============================================================ */
class MeteoWidget {
    constructor(el, skin = 'card') {
        this.el   = typeof el === 'string' ? document.querySelector(el) : el;
        this.skin = skin;
    }

    async render() {
        if (!this.el) return;
        this.el.innerHTML =
            `<div class="mw mw-${this.skin} mw-loading"><span class="mw-blink">// météo…</span></div>`;
        try {
            const d = await fetchMeteo();
            this.el.innerHTML = this._html(d);
        } catch (e) {
            this.el.innerHTML =
                `<div class="mw mw-${this.skin} mw-err">// météo indisponible</div>`;
            console.warn('[MeteoWidget]', e.message);
        }
    }

    _html(d) {
        const lang = document.documentElement.lang || 'fr';
        const cond = lang === 'fr' ? d.icon.fr : d.icon.en;
        const sym  = d.icon.sym;

        switch (this.skin) {

            /* ---- MONO — terminal/monospace ---- */
            case 'mono':
                return `<div class="mw mw-mono">
<div class="mw-hd">// météo · ${PLACE}</div>
<div class="mw-main"><span class="mw-sym">${sym}</span> <span class="mw-k">${d.kelvin}&nbsp;&deg;K</span></div>
<div class="mw-row">&raquo; ${cond}</div>
<div class="mw-row mw-muted">&raquo; vent : ${d.windCmS}&nbsp;cm/s</div>
</div>`;

            /* ---- RETRO — encadré 1998 ---- */
            case 'retro':
                return `<div class="mw mw-retro">
<div class="mw-retro-title">MÉTÉO&nbsp;DU&nbsp;BIC</div>
<div class="mw-main"><span class="mw-sym">${sym}</span><span class="mw-k">${d.kelvin}&nbsp;&deg;K</span></div>
<div class="mw-cond">${cond.toUpperCase()}</div>
<div class="mw-muted">${d.windCmS}&nbsp;cm/s</div>
<div class="mw-retro-foot">open-meteo.com</div>
</div>`;

            /* ---- PILL — horizontal, inline ---- */
            case 'pill':
                return `<div class="mw mw-pill">
<span class="mw-muted">${PLACE}</span>
<span class="mw-sym">${sym}</span>
<span class="mw-cond">${cond}</span>
<span class="mw-sep">|</span>
<span class="mw-k">${d.kelvin}&nbsp;&deg;K</span>
<span class="mw-sep">|</span>
<span class="mw-muted">vents&nbsp;: ${d.windCmS}&nbsp;cm/s</span>
</div>`;

            /* ---- CARD (défaut) ---- */
            default:
                return `<div class="mw mw-card">
<div class="mw-sym">${sym}</div>
<div class="mw-body">
  <div class="mw-k">${d.kelvin}&nbsp;&deg;K</div>
  <div class="mw-cond">${cond}</div>
  <div class="mw-place">${PLACE} <span class="mw-muted"> &middot; ${d.windCmS}&nbsp;cm/s</span></div>
</div>
</div>`;
        }
    }
}

/* ---- Auto-init : tous les [data-meteo] ---- */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-meteo]').forEach(el => {
        new MeteoWidget(el, el.dataset.meteoSkin || 'card').render();
    });
});

/* ---- Export global ---- */
global.MeteoWidget = MeteoWidget;
global.fetchMeteo  = fetchMeteo;

})(window);
