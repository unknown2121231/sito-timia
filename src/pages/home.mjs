import { site, company } from '../config.mjs';
import { icon } from '../lib/icons.mjs';
import { btn, quoteUrl, eyebrow, display, chapterHead, photo, ph, abs, orgRef, linkArrow, numberedList } from '../lib/html.mjs';
import { serviceRows, sectorTrack, trackControls, method, postRows, stats } from '../lib/components.mjs';
import { contactChapter } from '../lib/quote-form.mjs';
import { services } from '../data/services.mjs';
import { sectors } from '../data/sectors.mjs';
import { team, initials } from '../data/team.mjs';
import { sortedPosts } from '../data/posts.mjs';

const trust = [
  ['ISO 9001:2015', `Sistema di gestione per la qualità · cert. n. ${ph('numero')}`],
  ['ISO 14001:2015', `Sistema di gestione ambientale · cert. n. ${ph('numero')}`],
  ['Albo Gestori Ambientali', `Iscrizione n. ${ph('numero')} · cat. ${ph('categorie')}`],
  ['Tutta Italia', 'Operatività nazionale con una rete di impianti e vettori partner'],
];

const marquee = [
  'Smaltimento rifiuti industriali',
  'Analisi e codici EER',
  'Rifiuti da bonifica amianto',
  'Consulenza ambientale',
  'Bonifica siti contaminati',
  'Prodotti End of Waste',
  'RENTRI e adempimenti',
];

const heroMedia = site.heroImage
  ? `<img src="${site.heroImage}" alt="" width="2400" height="1400" fetchpriority="high" decoding="async">`
  : `<div class="hero-ph" role="img" aria-label="Segnaposto: foto reale di apertura da inserire (mezzi TIMIA in piazzale)"><span class="photo__tag">Foto reale da inserire</span><span>Sfondo di apertura · mezzi TIMIA in piazzale · 2400×1400 px</span></div>`;

export default {
  path: '/',
  pageType: 'home',
  scripts: ['form.js'],
  chapters: [
    ['home', 'Apertura'],
    ['chi-siamo', 'Chi siamo'],
    ['servizi', 'Servizi'],
    ['metodo', 'Metodo'],
    ['settori', 'Settori'],
    ['amianto', 'Amianto'],
    ['approfondimenti', 'News'],
    ['contatti', 'Contatti'],
  ],
  title: 'TIMIA | Smaltimento rifiuti industriali e consulenza ambientale',
  description:
    'Gestione, recupero e smaltimento rifiuti speciali, analisi, consulenza ambientale e bonifiche. Un unico partner per l’intero ciclo dei rifiuti, in tutta Italia.',
  jsonld: [
    { '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: 'TIMIA', inLanguage: 'it-IT', publisher: orgRef() },
  ],
  body: `
<section class="hero t-dark spot" id="home" data-theme="dark">
  <div class="hero-media" id="heroMedia">${heroMedia}</div>
  <div class="hero-inner">
    <div class="hero-head">
      <div>
        ${eyebrow('Capitolo 00 — Rifiuti &amp; ambiente')}
        ${display('h1', 'Un unico partner per l’intero ciclo dei rifiuti, <em>in tutta Italia.</em>')}
        <p class="lede reveal" style="--d:300ms">Dalla classificazione al recupero o smaltimento finale: un solo referente tecnico, documentazione in regola e ritiri pianificati sui tuoi tempi. Da oltre ${company.yearsExperience} anni.</p>
        <div class="hero-actions reveal" style="--d:420ms">
          ${btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: 'hero-preventivo' })}
          ${btn(quoteUrl({ tipo: 'ricontatto' }), 'Parla con un tecnico', { ico: 'phone', cta: 'hero-tecnico' })}
        </div>
      </div>
      <a class="preview-card reveal" style="--d:560ms" href="/certificazioni-autorizzazioni/">
        <span class="preview-card__icon">${icon('badge')}</span>
        <span><small>Anteprima — Certificazioni</small><strong>ISO 9001 · ISO 14001 · Albo Gestori Ambientali</strong></span>
      </a>
    </div>
    <ul class="hero-features" aria-label="Certificazioni e operatività">
      ${trust.map(([t, d], i) => `<li class="reveal" style="--d:${650 + i * 90}ms"><b>${String(i + 1).padStart(2, '0')}</b><h2>${t}</h2><p>${d}</p></li>`).join('')}
    </ul>
  </div>
  <span class="scroll-cue" aria-hidden="true">Scorri</span>
</section>

<div class="marquee t-brand" aria-hidden="true">
  <div class="marquee-track">
    ${[...marquee, ...marquee].map((m) => `<span>${m}</span>`).join('')}
  </div>
</div>

<section class="section t-light spot" id="chi-siamo" data-theme="light" aria-labelledby="chi-siamo-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        ${eyebrow('Capitolo 01 — Chi siamo')}
        ${display('h2', 'Un solo interlocutore. <em>Tutto il ciclo.</em>', { id: 'chi-siamo-title' })}
        <p class="reveal">Con sede a Foligno, in Via delle Industrie 78, <strong>TIMIA S.r.l.</strong> si occupa da oltre ${company.yearsExperience} anni di gestione, recupero e smaltimento di rifiuti urbani e industriali, pericolosi e non pericolosi, su tutto il territorio nazionale.</p>
        <p class="reveal">Seguiamo ogni fase: consulenza, campionamento e analisi, gestione documentale, trasporto e conferimento finale. Lavoriamo in rete con <strong>aziende partner leader nel recupero e nello smaltimento</strong>, così puoi contare su più destinazioni, tempi rapidi e costi competitivi, con un unico contratto.</p>
        <p class="reveal">Il nostro team tecnico-commerciale unisce competenze tecniche e normative: classificazione dei rifiuti, adempimenti RENTRI, bonifiche amianto e siti contaminati, prodotti End of Waste.</p>
        <div class="signature reveal">
          <span class="mono-pair" aria-hidden="true"><span class="mono">IC</span><span class="mono">VC</span></span>
          <div><strong>Ilaria e Veronica Cornacchini</strong><span>Responsabili sviluppo aziendale</span></div>
        </div>
      </div>
      <div class="about-media reveal">
        ${photo({ desc: 'Piazzale della sede TIMIA di Foligno con automezzi e cassoni', ratio: '4 / 5' })}
        <p class="about-caption"><span>Sede operativa di Foligno</span><span>Via delle Industrie 78</span></p>
        <a class="about-badge" href="/certificazioni-autorizzazioni/">
          <strong>ISO</strong>
          <span>9001 · 14001</span>
          <em>Vedi le certificazioni</em>
        </a>
      </div>
    </div>
    ${stats([
      [`${company.yearsExperience}+`, 'Anni di esperienza', company.yearsExperience],
      ['6', 'Servizi, un referente', 6],
      ['Italia', 'Copertura nazionale'],
      [ph('dato'), 'Tonnellate gestite ogni anno'],
    ])}
    <div class="team-strip">
      <div class="team-strip__head">
        <p class="eyebrow">Le persone</p>
        ${linkArrow('/team/', 'Conosci il team')}
      </div>
      <ul>
        ${team.map((p, i) => `<li class="reveal" style="--d:${i * 50}ms"><span class="mono" aria-hidden="true">${initials(p.name)}</span><span><strong>${p.name}</strong><small>${p.role}</small></span></li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="section t-dark spot" id="servizi" data-theme="dark" aria-labelledby="servizi-title">
  <div class="container">
    ${chapterHead({
      kicker: 'Capitolo 02 — Servizi',
      title: 'Sei servizi.<br><em>Un unico referente.</em>',
      id: 'servizi-title',
      lede: 'Dalla classificazione del rifiuto al destino finale: tu hai un referente, noi coordiniamo laboratori, vettori e impianti autorizzati.',
    })}
    ${serviceRows(services)}
    <div class="section-foot reveal">${linkArrow('/servizi/', 'Tutti i servizi')}</div>
  </div>
</section>

<section class="section t-light spot" id="metodo" data-theme="light" aria-labelledby="metodo-title">
  <div class="container">
    ${chapterHead({
      kicker: 'Capitolo 03 — Come lavoriamo',
      title: 'Il ciclo dei rifiuti, <em>dall’inizio alla fine.</em>',
      id: 'metodo-title',
      lede: 'Cinque fasi, un solo punto di contatto. A ogni passaggio sai cosa succede, chi lo fa e quale documento ricevi.',
    })}
    ${method()}
    <p class="method-note reveal">Lavoriamo in rete con laboratori, vettori e impianti partner: <strong>un solo contratto, un solo referente.</strong></p>
  </div>
</section>

<section class="section t-dark spot works" id="settori" data-theme="dark" aria-labelledby="settori-title">
  <div class="container">
    ${chapterHead({
      kicker: 'Capitolo 04 — Settori serviti',
      title: 'Parliamo la lingua <em>del tuo settore.</em>',
      id: 'settori-title',
      aside: trackControls('sectors', sectors.length),
    })}
  </div>
  ${sectorTrack(sectors)}
  <div class="container works-foot">
    <p class="reveal">Responsabili HSE, uffici tecnici, imprese di costruzione e demolizione, enti pubblici, impianti di biogas, cementifici e laterifici: ognuno ha vincoli diversi, e li conosciamo.</p>
    ${linkArrow('/settori/', 'Tutti i settori')}
  </div>
</section>

<section class="highlight t-brand spot" id="amianto" data-theme="dark" aria-labelledby="amianto-title">
  <span class="ghost" aria-hidden="true">Amianto</span>
  <div class="container highlight-grid">
    <div>
      ${eyebrow('Specializzazione — Bonifiche')}
      ${display('h2', 'Rifiuti da bonifica amianto. <em>Compatto e friabile.</em>', { id: 'amianto-title' })}
      <p class="lede reveal">Coordiniamo l’intervento con aziende di bonifica qualificate, iscritte all’Albo in categoria 10, e gestiamo i rifiuti fino al conferimento in impianti autorizzati, con tutta la documentazione.</p>
      <div class="hero-actions reveal" style="--d:120ms">
        ${btn(quoteUrl({ servizio: 'smaltimento-amianto' }), 'Richiedi un sopralluogo', { variant: 'primary', cta: 'home-amianto' })}
        ${btn('/servizi/smaltimento-amianto/', 'Scopri il servizio')}
      </div>
    </div>
    ${numberedList(['Coperture in cemento-amianto', 'Canne fumarie e tubazioni', 'Serbatoi e cisterne', 'Coibentazioni e materiali friabili', 'Trasporto e conferimento autorizzato'], 'numlist--light')}
  </div>
</section>

<section class="section t-light spot" id="approfondimenti" data-theme="light" aria-labelledby="news-title">
  <div class="container">
    ${chapterHead({
      kicker: 'Capitolo 05 — Approfondimenti',
      title: 'Normativa rifiuti, <em>spiegata semplice.</em>',
      id: 'news-title',
      lede: 'RENTRI, codici EER, End of Waste, amianto: guide pratiche scritte dal nostro team tecnico per chi gestisce i rifiuti in azienda.',
    })}
    ${postRows(sortedPosts.slice(0, 4))}
    <div class="section-foot reveal">${linkArrow('/news/', 'Tutti gli articoli')}</div>
  </div>
</section>

${contactChapter({ id: 'contatti', kicker: 'Capitolo 06 — Contatti', title: 'Parliamo dei <em>tuoi rifiuti.</em>' })}
`,
};
