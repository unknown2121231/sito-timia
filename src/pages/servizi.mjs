import { site, company } from '../config.mjs';
import { icon, bigIcon } from '../lib/icons.mjs';
import {
  btn, quoteUrl, eyebrow, display, chapterHead, photo, ctaBand, pageHero, breadcrumbLd, faqBlock, faqLd, abs, orgRef, telLink, numberedList, linkArrow,
} from '../lib/html.mjs';
import { serviceRows, steps, rows, normList, summaryBox, method } from '../lib/components.mjs';
import { services, serviceBySlug, serviceUrl } from '../data/services.mjs';
import { sectors, sectorUrl } from '../data/sectors.mjs';

const indexCrumbs = [{ name: 'Servizi', path: '/servizi/' }];

const index = {
  path: '/servizi/',
  pageType: 'services',
  title: 'Servizi di gestione rifiuti, consulenza e bonifiche | TIMIA',
  description:
    'Smaltimento e recupero rifiuti speciali, analisi, amianto, consulenza ambientale, bonifica siti contaminati e prodotti End of Waste. Un solo referente.',
  jsonld: [
    breadcrumbLd(indexCrumbs),
    {
      '@type': 'ItemList',
      name: 'Servizi TIMIA',
      itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(serviceUrl(s)), name: s.name })),
    },
  ],
  body: `
${pageHero({
  crumbs: indexCrumbs,
  kicker: 'Servizi',
  title: 'Sei servizi. <em>Un unico referente.</em>',
  lede: 'Sei servizi integrati per coprire l’intero ciclo dei rifiuti speciali e dei materiali da bonifica. Puoi attivarne uno solo o affidarci tutto il percorso: in entrambi i casi hai un unico referente.',
  ctas: `${btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: 'services-hero' })}${btn(quoteUrl({ tipo: 'ricontatto' }), 'Parla con un tecnico', { ico: 'phone', cta: 'services-hero-tecnico' })}`,
  ghost: 'Servizi',
})}

<section class="section t-dark spot" data-theme="dark" aria-labelledby="elenco-title">
  <div class="container">
    ${chapterHead({ kicker: '01 — Elenco dei servizi', title: 'Cosa possiamo <em>fare per te.</em>', id: 'elenco-title' })}
    ${serviceRows(services, { long: true })}
  </div>
</section>

<section class="section t-light spot" data-theme="light" aria-labelledby="ciclo-title">
  <div class="container">
    ${chapterHead({
      kicker: '02 — Come si combinano',
      title: 'Un percorso unico, <em>dalla consulenza al destino finale.</em>',
      id: 'ciclo-title',
      lede: 'I servizi seguono le fasi reali della gestione di un rifiuto. Ognuna produce un risultato concreto che ricevi e conservi.',
    })}
    ${method()}
    <div class="helpbox reveal">
      <div>
        <h2 class="helpbox__title">Non sai quale servizio ti serve?</h2>
        <p>Descrivici la situazione: un tecnico ti richiama, capisce di cosa hai bisogno e ti propone il percorso più semplice. Oppure chiamaci al ${telLink('', company.phone, 'services-help-tel')}.</p>
      </div>
      ${btn(quoteUrl({ tipo: 'ricontatto' }), 'Richiedi un ricontatto', { variant: 'primary', cta: 'services-help' })}
    </div>
  </div>
</section>

${ctaBand({ where: 'services-final' })}
`,
};

function servicePage(s) {
  const crumbs = [
    { name: 'Servizi', path: '/servizi/' },
    { name: s.name, path: serviceUrl(s) },
  ];
  const quote = quoteUrl({ servizio: s.slug });
  const related = s.related.map((slug) => serviceBySlug[slug]);
  const relSectors = sectors.filter((sec) => sec.services.includes(s.slug));
  const ghostWord = { rifiuti: 'Rifiuti', analisi: 'Analisi', amianto: 'Amianto', consulenza: 'Consulenza', bonifica: 'Bonifiche', eow: 'End of Waste' }[s.icon];

  const matrix = s.matrix
    ? `<section class="section t-dark spot" data-theme="dark" aria-labelledby="matrici-title">
      <div class="container">
        ${chapterHead({ kicker: 'Compatto o friabile', title: 'Due materiali, <em>due procedure diverse.</em>', id: 'matrici-title' })}
        <div class="matrix">
          ${s.matrix
            .map(
              (m, i) => `<div class="matrix__col reveal" style="--d:${i * 100}ms">
            <h3>${m.name}</h3>
            <p class="matrix__def">${m.def}</p>
            <p class="matrix__label">Esempi</p>
            <ul>${m.examples.map((e) => `<li>${e}</li>`).join('')}</ul>
            <p class="matrix__label">Codice EER tipico</p>
            <p><span class="eer eer--haz">${m.eer[0]}</span> ${m.eer[1]}</p>
            <p class="matrix__label">Chi può rimuoverlo</p>
            <p>${m.cat}</p>
          </div>`
            )
            .join('')}
        </div>
        <p class="note reveal">Il codice EER corretto va sempre verificato in base all’origine del rifiuto.</p>
      </div>
    </section>`
    : '';

  const rnd = s.rnd
    ? `<section class="highlight t-brand spot" data-theme="dark" aria-labelledby="rnd-title">
      <span class="ghost" aria-hidden="true">R&amp;S</span>
      <div class="container highlight-grid">
        <div>
          ${eyebrow('Ricerca e sviluppo')}
          ${display('h2', 'Dallo scarto <em>alla risorsa.</em>', { id: 'rnd-title' })}
          <p class="lede reveal">${s.rnd.text}</p>
        </div>
        ${numberedList(s.rnd.steps, 'numlist--light')}
      </div>
    </section>`
    : '';

  const segments = s.segments
    ? `<section class="section t-dark spot" data-theme="dark" aria-labelledby="segmenti-title">
      <div class="container">
        ${chapterHead({ kicker: 'Per chi', title: 'Prodotti costruiti <em>sul tuo processo.</em>', id: 'segmenti-title' })}
        ${rows(s.segments.map(([t, d]) => [t, d]))}
        ${s.productsNote ? `<p class="note reveal">${s.productsNote}</p>` : ''}
      </div>
    </section>`
    : '';

  return {
    path: serviceUrl(s),
    pageType: 'service',
    title: s.title,
    description: s.description,
    jsonld: [
      breadcrumbLd(crumbs),
      {
        '@type': 'Service',
        '@id': abs(serviceUrl(s)) + '#service',
        name: s.name,
        serviceType: s.h1,
        description: s.description,
        url: abs(serviceUrl(s)),
        provider: orgRef(),
        areaServed: { '@type': 'Country', name: 'Italia' },
        audience: { '@type': 'BusinessAudience', audienceType: 'Aziende, imprese ed enti pubblici' },
      },
      faqLd(s.faq),
    ],
    body: `
${pageHero({
  crumbs,
  kicker: `Servizio ${s.num} — ${s.tag}`,
  title: s.h1,
  lede: s.lead,
  ctas: `${btn(quote, 'Richiedi un preventivo gratuito', { variant: 'primary', cta: `service-hero-${s.slug}` })}${btn(`tel:${company.phoneHref}`, company.phone, { ico: 'phone', cta: `service-hero-tel-${s.slug}` })}`,
  ghost: ghostWord,
  aside: `<span class="page-hero-num">${s.num}<small>/ 06</small></span>${summaryBox(s.summary)}`,
})}

<section class="section t-light spot" data-theme="light" aria-labelledby="problema-title">
  <div class="container">
    ${chapterHead({ kicker: '01 — Il problema', title: 'Cosa rende difficile <em>la gestione, oggi.</em>', id: 'problema-title' })}
    ${rows(s.problems)}
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="cosa-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        ${eyebrow('02 — Cosa facciamo')}
        ${display('h2', 'Ce ne occupiamo noi, <em>dall’inizio alla fine.</em>', { id: 'cosa-title' })}
        <p class="reveal">${s.whatIntro}</p>
        ${numberedList(s.what)}
      </div>
      <div class="about-media reveal">
        ${photo({ desc: s.photo, ratio: '4 / 5' })}
      </div>
    </div>
  </div>
</section>

${matrix}
${segments}

<section class="section t-light spot" data-theme="light" aria-labelledby="come-title">
  <div class="container">
    ${chapterHead({ kicker: '03 — Come funziona', title: 'Il percorso, <em>passo dopo passo.</em>', id: 'come-title' })}
    ${steps(s.how)}
    <div class="section-foot reveal">${btn(quote, 'Inizia dal preventivo gratuito', { variant: 'primary', cta: `service-steps-${s.slug}` })}</div>
  </div>
</section>

${rnd}

<section class="section t-dark spot" data-theme="dark" aria-labelledby="norme-title">
  <div class="container">
    ${chapterHead({
      kicker: '04 — Normativa di riferimento',
      title: 'Le regole che <em>applichiamo ogni giorno.</em>',
      id: 'norme-title',
      lede: 'Riferimenti principali, non esaustivi. La normativa ambientale è in continua evoluzione: verifichiamo sempre le disposizioni vigenti al momento dell’intervento.',
    })}
    ${normList(s.norms)}
  </div>
</section>

<section class="section t-light spot" data-theme="light" aria-labelledby="faq-title">
  <div class="container">
    ${chapterHead({
      kicker: '05 — Domande frequenti',
      title: 'Le risposte alle <em>domande più comuni.</em>',
      id: 'faq-title',
      lede: `Non trovi la tua domanda? <a href="${quoteUrl({ tipo: 'consulenza', servizio: s.slug })}">Scrivici</a> o chiama il ${telLink('', company.phone, `service-faq-tel-${s.slug}`)}.`,
    })}
    ${faqBlock(s.faq)}
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="correlati-title">
  <div class="container">
    ${chapterHead({ kicker: '06 — Servizi correlati', title: 'Spesso <em>richiesti insieme.</em>', id: 'correlati-title' })}
    ${serviceRows(related)}
    ${
      relSectors.length
        ? `<p class="sector-links reveal"><span>Settori</span>${relSectors.map((sec) => `<a href="${sectorUrl(sec)}">${sec.name}</a>`).join('')}</p>`
        : ''
    }
  </div>
</section>

${ctaBand({
  kicker: 'Preventivo gratuito',
  title: 'Parliamo del <em>tuo caso.</em>',
  text: `Descrivici il tuo caso e allega analisi, foto o schede se le hai: ricevi un preventivo gratuito e senza impegno. Rispondiamo ${site.responseTime}.`,
  href: quote,
  where: `service-final-${s.slug}`,
  ghost: ghostWord,
})}
`,
  };
}

export default [index, ...services.map(servicePage)];
