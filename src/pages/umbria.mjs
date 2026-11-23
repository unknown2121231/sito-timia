// Landing page locale per le ricerche "smaltimento rifiuti Umbria / Foligno / Perugia".
import { site, company } from '../config.mjs';
import { btn, quoteUrl, eyebrow, display, chapterHead, ctaBand, pageHero, breadcrumbLd, faqBlock, faqLd, abs, orgRef, photo } from '../lib/html.mjs';
import { serviceRows, stats } from '../lib/components.mjs';
import { services } from '../data/services.mjs';

const crumbs = [{ name: 'Smaltimento rifiuti in Umbria', path: '/smaltimento-rifiuti-umbria/' }];

const towns = ['Foligno', 'Perugia', 'Terni', 'Spoleto', 'Città di Castello', 'Gubbio', 'Assisi', 'Bastia Umbra', 'Todi', 'Orvieto', 'Narni', 'Marsciano', 'Umbertide', 'Trevi', 'Spello', 'Montefalco'];

const faq = [
  {
    q: 'Dove si trova TIMIA?',
    a: `<p>La sede è a Foligno (PG), in ${company.street}. Da qui seguiamo i clienti di tutta l’Umbria e coordiniamo i servizi nel resto d’Italia.</p>`,
  },
  {
    q: 'Ritirate rifiuti speciali in tutta l’Umbria?',
    a: '<p>Sì, nelle province di Perugia e di Terni, sia per ritiri una tantum sia per servizi programmati. Organizziamo il trasporto con vettori autorizzati e il conferimento a impianti autorizzati.</p>',
  },
  {
    q: 'Gestite anche l’amianto in Umbria?',
    a: '<p>Sì. Coordiniamo imprese di bonifica qualificate e gestiamo i rifiuti contenenti amianto fino al conferimento in impianti autorizzati. Il piano di lavoro viene presentato dall’impresa esecutrice all’organo di vigilanza competente per territorio.</p>',
  },
  {
    q: 'Posso avere un sopralluogo?',
    a: '<p>Sì, quando serve per valutare correttamente il rifiuto o il sito. Indicalo nella richiesta di preventivo: ti ricontattiamo per fissare un appuntamento.</p>',
  },
];

export default {
  path: '/smaltimento-rifiuti-umbria/',
  pageType: 'local',
  title: 'Smaltimento rifiuti speciali in Umbria: Foligno e Perugia | TIMIA',
  description:
    'Smaltimento e recupero di rifiuti speciali in Umbria: Foligno, Perugia, Terni e provincia. Amianto, analisi, consulenza e bonifiche. Preventivo gratuito.',
  jsonld: [breadcrumbLd(crumbs), faqLd(faq), { '@type': 'WebPage', name: 'Smaltimento rifiuti in Umbria', url: abs(crumbs[0].path), about: orgRef(), spatialCoverage: { '@type': 'Place', name: 'Umbria, Italia' } }],
  body: `
${pageHero({
  crumbs,
  kicker: 'Umbria · Foligno · Perugia · Terni',
  title: 'Smaltimento rifiuti speciali <em>in Umbria.</em>',
  lede: `Siamo a Foligno da oltre ${company.yearsExperience} anni. Per le aziende e gli enti umbri significa un referente vicino, sopralluoghi rapidi e ritiri pianificati in tutta la regione, con la stessa rete di impianti che usiamo in tutta Italia.`,
  ctas: `${btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: 'umbria-hero' })}${btn(`tel:${company.phoneHref}`, company.phone, { ico: 'phone', cta: 'umbria-hero-tel' })}`,
  ghost: 'Umbria',
  aside: stats([['PG', 'Provincia di Perugia'], ['TR', 'Provincia di Terni']]),
})}

<section class="section t-dark spot" data-theme="dark" aria-labelledby="umbria-servizi-title">
  <div class="container">
    ${chapterHead({
      kicker: '01 — Servizi in Umbria',
      title: 'Tutti i nostri servizi, <em>a pochi chilometri.</em>',
      id: 'umbria-servizi-title',
      lede: 'Dalla classificazione al destino finale, per rifiuti industriali, da cantiere, amianto e materiali da bonifica.',
    })}
    ${serviceRows(services)}
  </div>
</section>

<section class="section t-light spot" data-theme="light" aria-labelledby="zone-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        ${eyebrow('02 — Area servita')}
        ${display('h2', 'Province di <em>Perugia e Terni.</em>', { id: 'zone-title' })}
        <p class="reveal">Operiamo in tutti i comuni umbri. Alcune delle località in cui interveniamo più spesso:</p>
        <ul class="chips reveal">${towns.map((t) => `<li>${t}</li>`).join('')}</ul>
        <p class="note reveal">Fuori regione? Operiamo su tutto il territorio nazionale.</p>
      </div>
      <div class="about-media reveal">${photo({ desc: 'Automezzo TIMIA in un’area industriale umbra, con le colline sullo sfondo', ratio: '4 / 5' })}</div>
    </div>
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="umbria-faq-title">
  <div class="container">
    ${chapterHead({ kicker: '03 — Domande frequenti', title: 'Gestione rifiuti <em>in Umbria.</em>', id: 'umbria-faq-title' })}
    ${faqBlock(faq)}
  </div>
</section>

${ctaBand({
  kicker: 'Umbria',
  title: 'Sei in Umbria? <em>Ti rispondiamo subito.</em>',
  text: `Richiedi un preventivo gratuito o chiamaci: rispondiamo ${site.responseTime}.`,
  where: 'umbria-final',
  ghost: 'Foligno',
})}
`,
};
