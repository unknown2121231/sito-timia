// Struttura comune delle pagine: <head>, header, footer, banner cookie.
import { site, company } from '../config.mjs';
import { icon } from './icons.mjs';

const FONTS = 'https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700,800&display=swap';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const ph = (text) => `<span class="ph">[DA INSERIRE: ${text}]</span>`;
export const verify = (text) => `<span class="ph">[DA VERIFICARE: ${text}]</span>`;
export const abs = (path) => site.url + path;

const NAV = [
  ['/#preventivo', 'Calcola il prezzo'],
  ['/#come-funziona', 'Come funziona'],
  ['/#rifiuti', 'Cosa ritiriamo'],
  ['/#faq', 'Domande frequenti'],
  ['/#contatti', 'Contatti'],
];

const logo = (name, loading = 'eager', alt = 'TIMIA S.r.l. — Ambiente & Energia, torna alla home') =>
  `<picture><source srcset="/assets/img/${name}.webp" type="image/webp"><img src="/assets/img/${name}.png" alt="${esc(alt)}" width="520" height="188" loading="${loading}" decoding="async"></picture>`;

function header() {
  return `
<a class="skip-link" href="#main">Vai al contenuto principale</a>
<header class="site-header" id="header">
  <div class="container header-inner">
    <a class="brand" href="/">${logo('logo-timia')}</a>
    <nav class="main-nav" id="mainNav" aria-label="Menu principale">
      ${NAV.map(([h, l]) => `<a href="${h}">${l}</a>`).join('')}
      <a class="nav-phone" href="tel:${company.phoneHref}">${icon('phone')}${company.phone}</a>
    </nav>
    <div class="header-actions">
      <a class="header-phone" href="tel:${company.phoneHref}" aria-label="Chiama ${company.phone}">${icon('phone')}<span>${company.phone}</span></a>
      <a class="btn btn-primary btn-sm" href="/#preventivo" data-cta="header">Preventivo gratuito</a>
      <button class="menu-btn" id="menuBtn" type="button" aria-expanded="false" aria-controls="mainNav" aria-label="Apri il menu">${icon('menu')}</button>
    </div>
  </div>
</header>`;
}

function footer() {
  const year = new Date().getFullYear();
  return `
<footer class="site-footer" id="contatti">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="footer-logo">${logo('logo-timia-light', 'lazy')}</a>
        <p>Raccolta, trasporto, recupero e smaltimento di rifiuti speciali per aziende, cantieri ed enti. Da oltre ${company.yearsExperience} anni, da Foligno a tutta Italia.</p>
      </div>
      <div class="footer-col">
        <h2>Contatti</h2>
        <ul>
          <li><a href="tel:${company.phoneHref}">${icon('phone')}${company.phone}</a></li>
          <li><a href="mailto:${company.email}">${icon('mail')}${company.email}</a></li>
          <li><a href="mailto:${company.pec}">${icon('pec')}${company.pec}</a></li>
          <li><span>${icon('clock')}${company.hoursLabel}</span></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Sede</h2>
        <ul>
          <li><span>${icon('pin')}${company.street}<br>${company.postalCode} ${company.city} (${company.province})</span></li>
          <li><a href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(`${company.legalName} ${company.street} ${company.city}`)}" rel="noopener" target="_blank">${icon('map')}Apri in Google Maps<span class="visually-hidden"> (si apre in una nuova scheda)</span></a></li>
          ${company.social.instagram ? `<li><a href="${company.social.instagram}" rel="noopener" target="_blank">${icon('instagram')}Instagram<span class="visually-hidden"> (si apre in una nuova scheda)</span></a></li>` : ''}
          ${company.social.facebook ? `<li><a href="${company.social.facebook}" rel="noopener" target="_blank">${icon('facebook')}Facebook<span class="visually-hidden"> (si apre in una nuova scheda)</span></a></li>` : ''}
        </ul>
      </div>
      <div class="footer-col">
        <h2>Link utili</h2>
        <ul>
          <li><a href="/#preventivo">Calcola il prezzo</a></li>
          <li><a href="/#come-funziona">Come funziona</a></li>
          <li><a href="/#faq">Domande frequenti</a></li>
          <li><a href="/privacy-policy/">Privacy policy</a></li>
          <li><a href="/cookie-policy/">Cookie policy</a></li>
          <li><button type="button" class="linklike" data-cookie-settings>Preferenze cookie</button></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${year} ${company.legalName} · P.IVA/C.F. ${company.vat} · REA ${company.rea} · Capitale sociale ${company.shareCapital || ph('capitale sociale')}</p>
    </div>
  </div>
</footer>`;
}

function cookieUi() {
  return `
<div class="cc" id="cc-banner" role="region" aria-labelledby="cc-title" hidden>
  <button class="cc__close" type="button" data-cc="reject" aria-label="Chiudi: continua senza accettare i cookie non necessari">${icon('x')}</button>
  <p class="cc__title" id="cc-title">${icon('cookie')} Rispettiamo la tua privacy</p>
  <p class="cc__text">Usiamo cookie tecnici necessari al funzionamento del sito. Con il tuo consenso useremo anche cookie statistici e di marketing. Puoi accettare, rifiutare o scegliere, e cambiare idea quando vuoi. <a href="/cookie-policy/">Cookie policy</a>.</p>
  <div class="cc__actions">
    <button class="btn btn-ghost btn-sm" type="button" data-cc="reject">Rifiuta</button>
    <button class="btn btn-ghost btn-sm" type="button" data-cc="customize">Personalizza</button>
    <button class="btn btn-ghost btn-sm" type="button" data-cc="accept">Accetta tutti</button>
  </div>
</div>
<dialog class="cc-dialog" id="cc-dialog" aria-labelledby="cc-dialog-title">
  <form method="dialog">
    <div class="cc-dialog__head">
      <h2 id="cc-dialog-title">Preferenze cookie</h2>
      <button class="cc__close" type="button" data-cc="close-dialog" aria-label="Chiudi senza salvare">${icon('x')}</button>
    </div>
    <div class="cc-opt"><div><h3>Necessari</h3><p>Ricordano le tue scelte e garantiscono il funzionamento del sito.</p></div><span class="cc-opt__always">Sempre attivi</span></div>
    <div class="cc-opt"><div><h3 id="cc-an-l">Statistici</h3><p id="cc-an-d">Ci aiutano a capire come viene usato il sito (Google Analytics 4), in forma aggregata.</p></div><input class="switch" type="checkbox" id="cc-analytics" role="switch" aria-labelledby="cc-an-l" aria-describedby="cc-an-d"></div>
    <div class="cc-opt"><div><h3 id="cc-mk-l">Marketing</h3><p id="cc-mk-d">Misurano l’efficacia delle campagne pubblicitarie.</p></div><input class="switch" type="checkbox" id="cc-marketing" role="switch" aria-labelledby="cc-mk-l" aria-describedby="cc-mk-d"></div>
    <div class="cc-dialog__actions">
      <button class="btn btn-ghost btn-sm" type="button" data-cc="reject">Rifiuta tutti</button>
      <button class="btn btn-ghost btn-sm" type="button" data-cc="save">Salva</button>
      <button class="btn btn-primary btn-sm" type="button" data-cc="accept">Accetta tutti</button>
    </div>
  </form>
</dialog>`;
}

function orgLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': abs('/#organization'),
    name: company.legalName,
    url: site.url,
    logo: abs('/assets/img/logo-timia.png'),
    image: abs('/assets/img/logo-timia.png'),
    telephone: company.phone,
    email: company.email,
    vatID: `IT${company.vat}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.province,
      addressCountry: company.country,
    },
    areaServed: 'IT',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: company.hours.days,
      opens: company.hours.opens,
      closes: company.hours.closes,
    },
    sameAs: Object.values(company.social).filter(Boolean),
  };
}

export function layout(page, ctx) {
  const { path, title, description, body, jsonld = [], noindex = false, scripts = [], pageType = 'page', data = null } = page;
  const canonical = abs(path);
  const og = site.ogImage ? `<meta property="og:image" content="${abs(site.ogImage)}">` : '';
  const runtime = { gtmId: site.gtmId, consentVersion: site.consentVersion, pageType };
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${canonical}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="TIMIA S.r.l.">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
${og}
<meta name="theme-color" content="#ffffff">
<link rel="icon" href="/assets/img/favicon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/assets/img/favicon-192.png" sizes="192x192" type="image/png">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/assets/css/main.css?v=${ctx.versions['main.css']}">
<script>
document.documentElement.classList.add('js');
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted'});
window.TIMIA=${JSON.stringify(runtime)};
</script>
${data ? `<script id="timia-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : ''}
<script src="/assets/js/main.js?v=${ctx.versions['main.js']}" defer></script>
${scripts.map((s) => `<script src="/assets/js/${s}?v=${ctx.versions[s]}" defer></script>`).join('\n')}
<script type="application/ld+json">${JSON.stringify([orgLd(), ...jsonld])}</script>
</head>
<body class="page-${pageType}">
${header()}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${cookieUi()}
</body>
</html>
`;
}
