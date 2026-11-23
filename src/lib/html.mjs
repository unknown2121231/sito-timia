// Helper di markup condivisi da tutte le pagine (stile "a capitoli").
import { icon } from './icons.mjs';
import { site, company } from '../config.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const stripTags = (s = '') => String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export const abs = (path) => site.url + path;

export const pad2 = (n) => String(n).padStart(2, '0');

// Segnaposto testuali ben visibili: da sostituire prima della pubblicazione.
export const ph = (text) => `<span class="ph">[DA INSERIRE: ${text}]</span>`;
export const verify = (text) => `<span class="ph">[DA VERIFICARE: ${text}]</span>`;

// Link al form con parametri di precompilazione.
export function quoteUrl({ tipo = 'preventivo', servizio } = {}) {
  const q = new URLSearchParams({ tipo });
  if (servizio) q.set('servizio', servizio);
  return `/contatti/?${q.toString()}#richiesta`;
}

export const telLink = (cls = '', label = company.phone, where = '') =>
  `<a class="${cls}" href="tel:${company.phoneHref}"${where ? ` data-cta="${where}"` : ''}>${label}</a>`;

/**
 * Fotografia o segnaposto "FOTO REALE DA INSERIRE".
 * Quando la foto è disponibile basta passare `src` (e idealmente width/height reali):
 * viene generato un <img> con lazy loading.
 */
export function photo({ desc, ratio = '4 / 5', src, alt, width, height, className = '', eager = false }) {
  if (src) {
    const dims = width && height ? ` width="${width}" height="${height}"` : '';
    return `<figure class="photo ${className}" style="--ratio:${ratio}"><img src="${src}" alt="${esc(alt || desc)}"${dims} loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}></figure>`;
  }
  return `<figure class="photo photo--ph ${className}" style="--ratio:${ratio}">
    <div class="photo__ph" role="img" aria-label="Segnaposto fotografia da inserire: ${esc(desc)}">
      ${icon('camera')}
      <span class="photo__tag">Foto reale da inserire</span>
      <span class="photo__desc">${esc(desc)}</span>
    </div>
  </figure>`;
}

export const eyebrow = (text) => `<p class="eyebrow">${text}</p>`;

// Titolo grande maiuscolo con le parole che salgono (classe .split gestita da main.js).
// Usare <em>…</em> per evidenziare parole con il colore d'accento.
export function display(tag, html, { id = '', cls = '', split = true } = {}) {
  return `<${tag} class="display${split ? ' split' : ''}${cls ? ' ' + cls : ''}"${id ? ` id="${id}"` : ''}>${html}</${tag}>`;
}

export function btn(href, label, { variant = '', ico = 'arrow', cta = '', extra = '' } = {}) {
  const cls = ['btn', variant ? `btn-${variant}` : ''].filter(Boolean).join(' ');
  const trk = cta ? ` data-cta="${cta}"` : '';
  return `<a class="${cls}" href="${href}"${trk}${extra}><span>${label}</span>${ico ? icon(ico) : ''}</a>`;
}

export const linkArrow = (href, label, cta = '') =>
  `<a class="link-arrow" href="${href}"${cta ? ` data-cta="${cta}"` : ''}><span>${label}</span>${icon('arrow')}</a>`;

// Intestazione di capitolo: occhiello + titolo a sinistra, testo introduttivo a destra.
export function chapterHead({ kicker, title, lede = '', id = '', tag = 'h2', aside = '' }) {
  return `<header class="chapter-head">
    <div>
      ${kicker ? eyebrow(kicker) : ''}
      ${display(tag, title, { id })}
    </div>
    ${lede ? `<p class="lede reveal">${lede}</p>` : aside}
  </header>`;
}

// Breadcrumb visibile + dati strutturati BreadcrumbList.
export function breadcrumbs(items) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  const li = all
    .map((it, i) =>
      i === all.length - 1
        ? `<li><span aria-current="page">${esc(it.name)}</span></li>`
        : `<li><a href="${it.path}">${esc(it.name)}</a></li>`
    )
    .join('');
  return `<nav class="crumbs" aria-label="Percorso di navigazione"><ol>${li}</ol></nav>`;
}

export function breadcrumbLd(items) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqBlock(items) {
  return `<div class="faq">${items
    .map(
      (f, i) => `<details class="faq__item reveal" style="--d:${i * 60}ms">
        <summary class="faq__q"><span class="faq__num">${pad2(i + 1)}</span><span class="faq__text">${f.q}</span><span class="faq__icon" aria-hidden="true"></span></summary>
        <div class="faq__a">${f.a}</div>
      </details>`
    )
    .join('')}</div>`;
}

export function faqLd(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: stripTags(f.q),
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    })),
  };
}

/**
 * Apertura delle pagine interne: fondo scuro, testo fantasma sullo sfondo,
 * titolo maiuscolo e, a destra, un dato o un riepilogo.
 */
export function pageHero({ crumbs, kicker, title, lede, ctas = '', ghost = '', aside = '', compact = false }) {
  return `<section class="page-hero t-dark spot${compact ? ' page-hero--compact' : ''}" data-theme="dark">
    ${ghost ? `<span class="ghost" aria-hidden="true">${ghost}</span>` : ''}
    <div class="container">
      ${crumbs ? breadcrumbs(crumbs) : ''}
      <div class="page-hero-grid${aside ? ' has-aside' : ''}">
        <div class="page-hero-main">
          ${kicker ? eyebrow(kicker) : ''}
          ${display('h1', title)}
          ${lede ? `<p class="lede reveal">${lede}</p>` : ''}
          ${ctas ? `<div class="hero-actions reveal" style="--d:120ms">${ctas}</div>` : ''}
        </div>
        ${aside ? `<aside class="page-hero-aside reveal" style="--d:200ms">${aside}</aside>` : ''}
      </div>
    </div>
  </section>`;
}

// Capitolo finale d'invito all'azione, sul colore del marchio.
export function ctaBand({
  kicker = 'Preventivo gratuito',
  title = 'Hai un rifiuto da gestire? <em>Parliamone.</em>',
  text = `Descrivici tipologia, quantità e luogo di ritiro: ti inviamo un preventivo gratuito e senza impegno. Rispondiamo ${site.responseTime}.`,
  href = quoteUrl(),
  label = 'Richiedi un preventivo',
  where = 'cta-band',
  ghost = 'Preventivo',
} = {}) {
  return `<section class="cta t-brand spot" data-theme="dark" aria-labelledby="cta-${where}">
    <span class="ghost" aria-hidden="true">${ghost}</span>
    <div class="container cta-grid">
      <div>
        ${eyebrow(kicker)}
        ${display('h2', title, { id: `cta-${where}` })}
        <p class="lede reveal">${text}</p>
      </div>
      <div class="cta-actions reveal" style="--d:150ms">
        ${btn(href, label, { variant: 'primary', cta: where })}
        <a class="cta-tel" href="tel:${company.phoneHref}" data-cta="${where}-tel"><small>Oppure chiama</small><strong>${company.phone}</strong>${icon('phone')}</a>
      </div>
    </div>
  </section>`;
}

// Nodo LocalBusiness/Organization riutilizzato nei dati strutturati.
export function orgNode() {
  const sameAs = Object.values(company.social).filter(Boolean);
  return {
    '@type': ['LocalBusiness', 'Organization'],
    '@id': abs('/#organization'),
    name: 'TIMIA',
    legalName: company.legalName,
    url: abs('/'),
    logo: abs('/assets/img/logo-timia.png'),
    image: abs('/assets/img/logo-timia.png'),
    description:
      'Gestione, recupero e smaltimento di rifiuti industriali e urbani, pericolosi e non pericolosi; analisi dei rifiuti, consulenza ambientale, gestione rifiuti da bonifiche amianto e siti contaminati, prodotti End of Waste.',
    telephone: company.phone,
    email: company.email,
    vatID: `IT${company.vat}`,
    taxID: company.vat,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.province,
      addressCountry: company.country,
    },
    areaServed: { '@type': 'Country', name: 'Italia' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: company.hours.days,
        opens: company.hours.opens,
        closes: company.hours.closes,
      },
    ],
    priceRange: 'Preventivo gratuito',
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export const orgRef = () => ({ '@id': abs('/#organization') });

// Elenco numerato a righe (01, 02, …) con filetti, come le liste dei capitoli.
export function numberedList(items, cls = '') {
  return `<ol class="numlist ${cls}">${items.map((i, k) => `<li class="reveal" style="--d:${k * 50}ms"><b>${pad2(k + 1)}</b><span>${i}</span></li>`).join('')}</ol>`;
}

export function checklist(items, cls = '') {
  return `<ul class="checklist ${cls}">${items.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}</ul>`;
}

// Coppie etichetta / valore su righe (dati societari, normativa, riepiloghi).
export function infoList(rows, cls = '') {
  return `<ul class="info ${cls}">${rows.map(([k, v]) => `<li><span>${k}</span><span>${v}</span></li>`).join('')}</ul>`;
}

export const formatDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
