import { company } from '../config.mjs';
import { icon } from '../lib/icons.mjs';
import { btn, quoteUrl, chapterHead, ctaBand, pageHero, breadcrumbLd, ph, infoList, pad2 } from '../lib/html.mjs';

const crumbs = [{ name: 'Certificazioni e autorizzazioni', path: '/certificazioni-autorizzazioni/' }];

// I PDF in /documenti sono segnaposto generati dal build: sostituirli con i documenti reali
// mantenendo lo stesso nome file (oppure aggiornare i percorsi qui).
export const documents = [
  {
    icon: 'badge',
    title: 'ISO 9001:2015',
    subtitle: 'Sistema di gestione per la qualità',
    rows: [
      ['Ente di certificazione', ph('ente')],
      ['N. certificato', ph('numero')],
      ['Campo di applicazione', ph('scopo del certificato')],
      ['Scadenza', ph('data')],
    ],
    file: '/documenti/certificato-iso-9001.pdf',
  },
  {
    icon: 'badge',
    title: 'ISO 14001:2015',
    subtitle: 'Sistema di gestione ambientale',
    rows: [
      ['Ente di certificazione', ph('ente')],
      ['N. certificato', ph('numero')],
      ['Campo di applicazione', ph('scopo del certificato')],
      ['Scadenza', ph('data')],
    ],
    file: '/documenti/certificato-iso-14001.pdf',
  },
  {
    icon: 'shield',
    title: 'Albo Nazionale Gestori Ambientali',
    subtitle: 'Iscrizione',
    rows: [
      ['Sezione regionale', ph('sezione')],
      ['N. iscrizione', ph('numero')],
      ['Categorie e classi', ph('categorie e classi di iscrizione')],
      ['Scadenza', ph('data')],
    ],
    file: '/documenti/iscrizione-albo-gestori-ambientali.pdf',
  },
  {
    icon: 'file',
    title: 'Autorizzazioni ambientali',
    subtitle: 'Provvedimenti autorizzativi',
    rows: [
      ['Tipo di autorizzazione', ph('tipo')],
      ['Ente che l’ha rilasciata', ph('ente')],
      ['Estremi del provvedimento', ph('numero e data')],
      ['Scadenza', ph('data')],
    ],
    file: '/documenti/autorizzazioni-ambientali.pdf',
  },
  {
    icon: 'layers',
    title: 'Politica per la qualità e l’ambiente',
    subtitle: 'Documento di sistema',
    rows: [
      ['Revisione', ph('numero revisione')],
      ['Data', ph('data')],
    ],
    file: '/documenti/politica-qualita-ambiente.pdf',
  },
];

export default {
  path: '/certificazioni-autorizzazioni/',
  pageType: 'certifications',
  title: 'Certificazioni e autorizzazioni ISO 9001, ISO 14001 | TIMIA',
  description:
    'Certificazioni ISO 9001 e ISO 14001, iscrizione all’Albo Nazionale Gestori Ambientali e autorizzazioni di TIMIA: numeri di iscrizione e documenti scaricabili.',
  jsonld: [breadcrumbLd(crumbs)],
  body: `
${pageHero({
  crumbs,
  kicker: 'Qualità e conformità',
  title: 'Certificazioni e <em>autorizzazioni.</em>',
  lede: 'Tutti i documenti per le tue verifiche di qualifica fornitori, in un unico posto. Scaricali o chiedici la versione aggiornata: te la inviamo anche via PEC.',
  ghost: 'ISO',
})}

<section class="section t-light spot" data-theme="light" aria-labelledby="docs-title">
  <div class="container">
    ${chapterHead({ kicker: '01 — Documenti', title: 'Certificati, iscrizioni <em>e autorizzazioni.</em>', id: 'docs-title' })}
    <div class="docs">
      ${documents
        .map(
          (d, i) => `<article class="doc reveal" style="--d:${i * 70}ms">
        <p class="doc__num">${pad2(i + 1)}</p>
        <h3 class="doc__title">${d.title}</h3>
        <p class="doc__sub">${d.subtitle}</p>
        ${infoList(d.rows)}
        <a class="link-arrow doc__dl" href="${d.file}" download data-file="${d.file.split('/').pop()}"><span>Scarica PDF<span class="visually-hidden"> — ${d.title}</span></span>${icon('download')}</a>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="riepilogo-title">
  <div class="container">
    ${chapterHead({ kicker: '02 — Riepilogo', title: 'Dati di iscrizione <em>e dati societari.</em>', id: 'riepilogo-title' })}
    ${infoList([
      ['Ragione sociale', company.legalName],
      ['Sede', `${company.street}, ${company.postalCode} ${company.city} (${company.province})`],
      ['P.IVA e C.F.', company.vat],
      ['REA', company.rea],
      ['PEC', `<a href="mailto:${company.pec}">${company.pec}</a>`],
      ['Albo Gestori Ambientali', ph('n. iscrizione, sezione, categorie e classi')],
      ['ISO 9001', ph('n. certificato ed ente')],
      ['ISO 14001', ph('n. certificato ed ente')],
      ['Altre iscrizioni', ph('es. White List prefettizia, elenchi fornitori — solo se presenti')],
    ], 'info--wide')}
    <div class="helpbox reveal">
      <div>
        <h2 class="helpbox__title">Devi qualificarci come fornitore?</h2>
        <p>Scrivici a <a href="mailto:${company.email}">${company.email}</a> o via PEC a <a href="mailto:${company.pec}">${company.pec}</a> indicando i documenti richiesti dal tuo sistema di qualifica: te li inviamo aggiornati.</p>
      </div>
      ${btn(quoteUrl({ tipo: 'ricontatto' }), 'Richiedi documenti', { variant: 'primary', cta: 'cert-docs' })}
    </div>
  </div>
</section>

${ctaBand({ where: 'cert-final' })}
`,
};
