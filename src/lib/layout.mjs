// Struttura comune di pagina: <head>, preloader, header, menu, footer, banner cookie, barra mobile.
import { site, company } from '../config.mjs';
import { icon } from './icons.mjs';
import { esc, abs, quoteUrl, orgNode, btn, pad2 } from './html.mjs';
import { services, serviceUrl } from '../data/services.mjs';

const FONTS = 'https://fonts.bunny.net/css?family=onest:300,400,500,600,700&display=swap';

const NAV = [
  ['/chi-siamo/', 'Chi siamo', ['/chi-siamo/', '/team/']],
  ['/servizi/', 'Servizi', ['/servizi/']],
  ['/settori/', 'Settori', ['/settori/', '/smaltimento-rifiuti-umbria/']],
  ['/certificazioni-autorizzazioni/', 'Certificazioni', ['/certificazioni-autorizzazioni/']],
  ['/news/', 'News', ['/news/']],
  ['/contatti/', 'Contatti', ['/contatti/']],
];

// Logo ufficiale (varianti generate da brand/genera-logo.py).
function logoImg(name, loading, cls = '') {
  return `<picture class="${cls}"><source srcset="/assets/img/${name}.webp" type="image/webp"><img src="/assets/img/${name}.png" alt="${cls === 'logo-color' ? '' : 'TIMIA S.r.l. — Ambiente &amp; Energia, torna alla home'}" width="520" height="188" loading="${loading}" decoding="async"></picture>`;
}

const isActive = (current, prefixes) => prefixes.some((p) => current.startsWith(p));

function loader() {
  return `
<div class="loader" id="loader" aria-hidden="true">
  <div class="loader-top"><span>TIMIA S.r.l.</span><span>Foligno · Italia</span></div>
  <div class="loader-center">${logoImg('logo-timia-light', 'eager')}<p>Rifiuti · Ambiente · Bonifiche</p></div>
  <div class="loader-bottom"><div class="loader-bar"><span id="loaderBar"></span></div><span class="loader-count" id="loaderCount">000</span></div>
</div>`;
}

function header(current) {
  return `
<a class="skip-link" href="#main">Vai al contenuto principale</a>
<header class="site-header" id="header">
  <div class="inner">
    <a class="brand" href="/">
      ${logoImg('logo-timia-light', 'eager', 'logo-white')}
      ${logoImg('logo-timia', 'eager', 'logo-color')}
    </a>
    <nav class="main-nav" aria-label="Menu principale">
      ${NAV.map(([h, l, pre]) => `<a href="${h}"${isActive(current, pre) ? ' class="is-active" aria-current="page"' : ''}>${l}</a>`).join('')}
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${company.phoneHref}" data-cta="header-tel">${icon('phone')}<span>${company.phone}</span></a>
      ${btn(quoteUrl(), 'Preventivo gratuito', { variant: 'primary header-cta', ico: '', cta: 'header' })}
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="menuPanel"><span class="lbl">Menu</span><span class="bars" aria-hidden="true"></span></button>
    </div>
  </div>
  <span class="progress" id="progress" aria-hidden="true"></span>
</header>
<div class="menu-panel" id="menuPanel">
  <nav aria-label="Menu principale (mobile)">
    ${NAV.map(([h, l], i) => `<a href="${h}"><span>${pad2(i + 1)}</span>${l}</a>`).join('')}
  </nav>
  <div class="menu-contacts">
    ${btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: 'mobile-menu' })}
    <a href="tel:${company.phoneHref}" data-cta="mobile-menu-tel">${company.phone}</a>
    <a href="mailto:${company.email}">${company.email}</a>
    <span>${company.hoursLabel}</span>
  </div>
</div>`;
}

function chaptersNav(chapters) {
  if (!chapters || !chapters.length) return '';
  return `<nav class="chapters" id="chapters" aria-label="Capitoli della pagina">
  ${chapters.map(([id, label]) => `<a href="#${id}" data-link="${id}"><span>${label}</span><i></i></a>`).join('')}
</nav>`;
}

function footer() {
  const social = [
    company.social.instagram && `<li><a href="${company.social.instagram}" rel="noopener" target="_blank">Instagram<span class="visually-hidden"> @timiasrl (si apre in una nuova scheda)</span></a></li>`,
    company.social.facebook && `<li><a href="${company.social.facebook}" rel="noopener" target="_blank">Facebook<span class="visually-hidden"> (si apre in una nuova scheda)</span></a></li>`,
  ]
    .filter(Boolean)
    .join('');
  const year = new Date().getFullYear();
  return `
<footer class="site-footer t-deep spot">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="/" class="footer-logo">${logoImg('logo-timia-light', 'lazy')}</a>
        <p>Un unico partner per l’intero ciclo dei rifiuti, in tutta Italia. Consulenza, analisi, gestione documentale, trasporto, smaltimento e recupero.</p>
      </div>
      <div class="footer-col">
        <h2>Azienda</h2>
        <ul>
          <li><a href="/chi-siamo/">Chi siamo</a></li>
          <li><a href="/team/">Team</a></li>
          <li><a href="/certificazioni-autorizzazioni/">Certificazioni</a></li>
          <li><a href="/settori/">Settori serviti</a></li>
          <li><a href="/news/">News e approfondimenti</a></li>
          <li><a href="/smaltimento-rifiuti-umbria/">Rifiuti in Umbria</a></li>
          ${social}
        </ul>
      </div>
      <div class="footer-col">
        <h2>Servizi</h2>
        <ul>${services.map((s) => `<li><a href="${serviceUrl(s)}">${s.name}</a></li>`).join('')}</ul>
      </div>
      <div class="footer-col">
        <h2>Contatti</h2>
        <ul>
          <li><a href="tel:${company.phoneHref}" data-cta="footer-tel">${company.phone}</a></li>
          <li><a href="mailto:${company.email}">${company.email}</a></li>
          <li><a href="mailto:${company.pec}">${company.pec}</a></li>
          <li><span>${company.street}<br>${company.postalCode} ${company.city} (${company.province})</span></li>
          <li><span>${company.hoursLabel}</span></li>
        </ul>
      </div>
    </div>
    <p class="footer-big" aria-hidden="true">TIMIA</p>
    <div class="footer-bottom">
      <p>© ${year} ${company.legalName} — P.IVA/C.F. ${company.vat} — REA ${company.rea} — Capitale sociale ${company.shareCapital || '<span class="ph">[DA INSERIRE]</span>'} — PEC ${company.pec}</p>
      <nav aria-label="Note legali">
        <a href="/privacy-policy/">Privacy policy</a>
        <a href="/cookie-policy/">Cookie policy</a>
        <button type="button" class="linklike" data-cookie-settings>Preferenze cookie</button>
        <a href="/sitemap.xml">Mappa del sito</a>
      </nav>
    </div>
  </div>
</footer>
<button class="to-top" id="toTop" type="button" aria-label="Torna su">${icon('arrowUp')}</button>`;
}

function mobileBar() {
  return `
<div class="mbar" role="region" aria-label="Azioni rapide">
  <a class="mbar__btn mbar__btn--call" href="tel:${company.phoneHref}" data-cta="mbar-call">${icon('phone')}<span>Chiama</span></a>
  <a class="mbar__btn mbar__btn--quote" href="${quoteUrl()}" data-cta="mbar-quote"><span>Preventivo</span>${icon('arrow')}</a>
</div>`;
}

function cookieUi() {
  return `
<div class="cc" id="cc-banner" role="region" aria-labelledby="cc-title" hidden>
  <button class="cc__close" type="button" data-cc="reject" aria-label="Chiudi: continua senza accettare i cookie non necessari">${icon('x')}</button>
  <p class="cc__title" id="cc-title">Rispettiamo la tua privacy</p>
  <p class="cc__text">Usiamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso useremo anche cookie statistici e di marketing, per misurare le visite e l’efficacia delle nostre comunicazioni. Puoi rifiutare, accettare o scegliere quali attivare, e cambiare idea in qualsiasi momento. <a href="/cookie-policy/">Cookie policy</a>.</p>
  <div class="cc__actions">
    <button class="btn" type="button" data-cc="reject">Rifiuta</button>
    <button class="btn btn-text" type="button" data-cc="customize">Personalizza</button>
    <button class="btn" type="button" data-cc="accept">Accetta tutti</button>
  </div>
</div>
<dialog class="cc-dialog" id="cc-dialog" aria-labelledby="cc-dialog-title">
  <form method="dialog" class="cc-dialog__form">
    <div class="cc-dialog__head">
      <h2 id="cc-dialog-title">Preferenze cookie</h2>
      <button class="cc__close" type="button" data-cc="close-dialog" aria-label="Chiudi le preferenze senza salvare">${icon('x')}</button>
    </div>
    <p>Scegli quali categorie di cookie attivare. I cookie necessari non possono essere disattivati perché servono al funzionamento del sito. Dettagli nella <a href="/cookie-policy/">cookie policy</a>.</p>
    <div class="cc-opt">
      <div><h3>Necessari</h3><p>Memorizzano le tue scelte sui cookie e garantiscono il funzionamento e la sicurezza del sito.</p></div>
      <span class="cc-opt__always">Sempre attivi</span>
    </div>
    <div class="cc-opt">
      <div><h3 id="cc-an-l">Statistici</h3><p id="cc-an-d">Ci aiutano a capire come viene usato il sito (Google Analytics 4 tramite Google Tag Manager), in forma aggregata.</p></div>
      <input class="switch" type="checkbox" id="cc-analytics" role="switch" aria-labelledby="cc-an-l" aria-describedby="cc-an-d">
    </div>
    <div class="cc-opt">
      <div><h3 id="cc-mk-l">Marketing</h3><p id="cc-mk-d">Misurano l’efficacia delle campagne pubblicitarie, ad esempio le conversioni da annunci Google.</p></div>
      <input class="switch" type="checkbox" id="cc-marketing" role="switch" aria-labelledby="cc-mk-l" aria-describedby="cc-mk-d">
    </div>
    <div class="cc-dialog__actions">
      <button class="btn" type="button" data-cc="reject">Rifiuta tutti</button>
      <button class="btn" type="button" data-cc="save">Salva preferenze</button>
      <button class="btn btn-primary" type="button" data-cc="accept">Accetta tutti</button>
    </div>
  </form>
</dialog>`;
}

export function layout(page, ctx) {
  const {
    path,
    title,
    description,
    body,
    jsonld = [],
    noindex = false,
    ogType = 'website',
    scripts = [],
    pageType = 'page',
    chapters = null,
  } = page;
  const canonical = abs(path);
  const graph = { '@context': 'https://schema.org', '@graph': [orgNode(), ...jsonld] };
  const og = site.ogImage
    ? `<meta property="og:image" content="${abs(site.ogImage)}">\n<meta name="twitter:image" content="${abs(site.ogImage)}">`
    : '';
  const runtimeCfg = { gtmId: site.gtmId, consentVersion: site.consentVersion, pageType };
  const extraScripts = scripts
    .map((s) => `<script src="/assets/js/${s}?v=${ctx.versions[s]}" defer></script>`)
    .join('\n');

  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="TIMIA S.r.l.">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
${og}
<meta name="theme-color" content="${site.themeColor}">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/img/favicon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/assets/css/main.css?v=${ctx.versions['main.css']}">
<script>
(function(d){var h=d.documentElement;h.classList.add('js');
try{if(!sessionStorage.getItem('timia-intro')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)h.classList.add('intro');}catch(e){}
setTimeout(function(){if(!window.TIMIA_READY)h.classList.add('js-failsafe');},3500);})(document);
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted'});
window.TIMIA=${JSON.stringify(runtimeCfg)};
</script>
<script src="/assets/js/main.js?v=${ctx.versions['main.js']}" defer></script>
${extraScripts}
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body class="page-${pageType}">
${loader()}
${header(path)}
${chaptersNav(chapters)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${mobileBar()}
${cookieUi()}
</body>
</html>
`;
}
