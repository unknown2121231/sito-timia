import { btn, quoteUrl, eyebrow, display, chapterHead, photo, ctaBand, pageHero, breadcrumbLd, abs, numberedList } from '../lib/html.mjs';
import { eerTable, rows, serviceRows, sectorCards, summaryBox } from '../lib/components.mjs';
import { sectors, sectorUrl } from '../data/sectors.mjs';
import { serviceBySlug } from '../data/services.mjs';

const indexCrumbs = [{ name: 'Settori', path: '/settori/' }];

const audience = [
  'Responsabili HSE e ambiente',
  'Uffici tecnici',
  'Imprese edili e di demolizione',
  'Aziende manifatturiere',
  'Studi tecnici e di ingegneria',
  'Enti pubblici',
  'Cementifici e laterifici',
  'Impianti di biogas',
];

const index = {
  path: '/settori/',
  pageType: 'sectors',
  title: 'Settori serviti: industria, edilizia, PA, energia | TIMIA',
  description:
    'Gestione rifiuti e servizi ambientali per industria e manifattura, edilizia e demolizioni, pubblica amministrazione, energia e biogas. In tutta Italia.',
  jsonld: [breadcrumbLd(indexCrumbs)],
  body: `
${pageHero({
  crumbs: indexCrumbs,
  kicker: 'Settori serviti',
  title: 'Industria, edilizia, <em>enti ed energia.</em>',
  lede: 'Ogni settore ha i suoi rifiuti, i suoi tempi e i suoi vincoli. Conoscerli ci permette di proporre soluzioni pratiche, conformi e sostenibili nei costi.',
  ctas: btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: 'sectors-hero' }),
  ghost: 'Settori',
})}

<section class="section t-light spot" data-theme="light" aria-labelledby="settori-list-title">
  <div class="container">
    ${chapterHead({ kicker: '01 — I settori', title: 'Quattro mondi, <em>un metodo.</em>', id: 'settori-list-title' })}
    ${sectorCards(sectors)}
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="clienti-title">
  <div class="container">
    ${chapterHead({
      kicker: '02 — Con chi lavoriamo',
      title: 'Le figure che ci <em>contattano più spesso.</em>',
      id: 'clienti-title',
      lede: 'Persone che cercano affidabilità, conformità normativa e tempi rapidi.',
    })}
    ${numberedList(audience, 'numlist--cols')}
  </div>
</section>

${ctaBand({ where: 'sectors-final' })}
`,
};

function sectorPage(s) {
  const crumbs = [
    { name: 'Settori', path: '/settori/' },
    { name: s.name, path: sectorUrl(s) },
  ];
  const svc = s.services.map((slug) => serviceBySlug[slug]);
  const ghostWord = { industria: 'Industria', edilizia: 'Edilizia', pa: 'Enti', energia: 'Energia' }[s.icon];
  return {
    path: sectorUrl(s),
    pageType: 'sector',
    title: s.title,
    description: s.description,
    jsonld: [
      breadcrumbLd(crumbs),
      {
        '@type': 'WebPage',
        name: s.h1,
        url: abs(sectorUrl(s)),
        about: s.name,
        audience: { '@type': 'BusinessAudience', audienceType: s.audience.join(', ') },
      },
    ],
    body: `
${pageHero({
  crumbs,
  kicker: `Settore — ${s.name}`,
  title: s.h1,
  lede: s.lead,
  ctas: `${btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: `sector-hero-${s.slug}` })}${btn(quoteUrl({ tipo: 'ricontatto' }), 'Parla con un tecnico', { ico: 'phone', cta: `sector-hero-tecnico-${s.slug}` })}`,
  ghost: ghostWord,
  aside: summaryBox(s.audience.map((a, i) => [String(i + 1).padStart(2, '0'), a]), 'Per chi'),
})}

<section class="section t-light spot" data-theme="light" aria-labelledby="esigenze-title">
  <div class="container">
    ${chapterHead({ kicker: '01 — Le esigenze', title: 'Cosa ci chiedono <em>più spesso.</em>', id: 'esigenze-title' })}
    ${rows(s.needs)}
    ${s.note ? `<p class="note reveal">${s.note}</p>` : ''}
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="servizi-sett-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        ${eyebrow('02 — Servizi più richiesti')}
        ${display('h2', 'Come <em>ti aiutiamo.</em>', { id: 'servizi-sett-title' })}
      </div>
      <div class="about-media reveal">${photo({ desc: s.photo, ratio: '16 / 10' })}</div>
    </div>
    ${serviceRows(svc)}
  </div>
</section>

<section class="section t-light spot" data-theme="light" aria-labelledby="eer-title">
  <div class="container">
    ${chapterHead({
      kicker: '03 — Rifiuti tipici',
      title: 'Alcuni dei rifiuti <em>che gestiamo.</em>',
      id: 'eer-title',
      lede: 'Esempi indicativi: il codice EER corretto dipende dal processo che genera il rifiuto e va verificato caso per caso. I codici con asterisco indicano rifiuti pericolosi.',
    })}
    ${eerTable(s.waste, `Esempi di codici EER — ${s.name}`)}
    <p class="note reveal">Codice incerto? Con il servizio di <a href="/servizi/analisi-rifiuti/">analisi e caratterizzazione</a> ti aiutiamo ad attribuire quello corretto.</p>
  </div>
</section>

${ctaBand({ where: `sector-final-${s.slug}`, ghost: ghostWord })}
`,
  };
}

export default [index, ...sectors.map(sectorPage)];
