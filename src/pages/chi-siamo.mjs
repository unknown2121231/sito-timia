import { company } from '../config.mjs';
import { icon } from '../lib/icons.mjs';
import { btn, quoteUrl, eyebrow, display, chapterHead, photo, ph, ctaBand, pageHero, breadcrumbLd, abs, linkArrow, numberedList } from '../lib/html.mjs';
import { method, rows, stats } from '../lib/components.mjs';

const crumbs = [{ name: 'Chi siamo', path: '/chi-siamo/' }];

const milestones = [
  [ph('anno'), 'Fondazione di TIMIA a Foligno', ph('breve descrizione delle origini')],
  [ph('anno'), 'Estensione dei servizi a tutto il territorio nazionale', ph('descrizione')],
  [ph('anno'), 'Certificazioni ISO 9001 e ISO 14001', ph('descrizione')],
  [ph('anno'), 'Avvio del commercio di prodotti End of Waste', ph('descrizione')],
];

const partners = [
  ['Laboratori di analisi', 'Campionamento, analisi di classificazione, test di cessione e analisi merceologiche.'],
  ['Vettori autorizzati', 'Trasporto di rifiuti pericolosi e non pericolosi, anche in regime ADR.'],
  ['Impianti di recupero', 'Recupero di materia e produzione di materiali End of Waste.'],
  ['Impianti di smaltimento', 'Destinazioni autorizzate per i rifiuti non recuperabili.'],
  ['Aziende di bonifica', 'Imprese qualificate per la rimozione dell’amianto e la bonifica di siti contaminati.'],
];

const values = [
  ['Impegno', 'Seguiamo ogni pratica fino alla chiusura documentale, anche quando richiede più passaggi del previsto.'],
  ['Competenza', 'Conoscenze tecniche e normative aggiornate, per scegliere la soluzione corretta e spiegarla con chiarezza.'],
  ['Rapidità', 'Risposte veloci e ritiri pianificati sui tempi della produzione e del cantiere.'],
  ['Conformità', 'Ogni scelta è verificata rispetto alla normativa, alle autorizzazioni e alla responsabilità del produttore.'],
  ['Trasparenza', 'Preventivi gratuiti e dettagliati, con destino del rifiuto e costi dichiarati prima di iniziare.'],
];

export default {
  path: '/chi-siamo/',
  pageType: 'about',
  title: 'Chi siamo | TIMIA, oltre 30 anni di gestione rifiuti',
  description:
    'TIMIA S.r.l., Foligno: oltre 30 anni nella gestione dei rifiuti speciali. Un unico interlocutore per tutto il ciclo, con una rete di partner qualificati.',
  jsonld: [breadcrumbLd(crumbs), { '@type': 'AboutPage', name: 'Chi siamo', url: abs('/chi-siamo/') }],
  body: `
${pageHero({
  crumbs,
  kicker: 'Chi siamo',
  title: `Oltre ${company.yearsExperience} anni nei <em>rifiuti speciali.</em>`,
  lede: 'TIMIA nasce a Foligno e lavora con aziende ed enti in tutta Italia. Il nostro compito è semplice da dire e impegnativo da fare: essere l’unico interlocutore per l’intero ciclo dei rifiuti dei nostri clienti.',
  ctas: `${btn(quoteUrl(), 'Richiedi un preventivo gratuito', { variant: 'primary', cta: 'about-hero' })}${btn('/team/', 'Conosci il team')}`,
  ghost: 'Chi siamo',
  aside: stats([[`${company.yearsExperience}+`, 'Anni di esperienza', company.yearsExperience]]),
})}

<section class="section t-light spot" data-theme="light" aria-labelledby="storia-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        ${eyebrow('01 — La nostra storia')}
        ${display('h2', 'Dall’Umbria a <em>tutta Italia.</em>', { id: 'storia-title' })}
        <p class="reveal">${ph('testo sulla storia aziendale: anno e contesto di fondazione, fondatori, evoluzione dei servizi, crescita territoriale. 2–3 paragrafi brevi')}</p>
        <p class="reveal">Da oltre ${company.yearsExperience} anni ci occupiamo di rifiuti speciali, pericolosi e non pericolosi. Nel tempo abbiamo esteso i servizi dalla gestione e dal trasporto alla consulenza, alle analisi, alle bonifiche e al commercio di prodotti End of Waste, costruendo una rete di partner che ci permette di operare in tutta Italia.</p>
      </div>
      <ol class="milestones">
        ${milestones.map(([y, t, d], i) => `<li class="reveal" style="--d:${i * 80}ms"><span class="milestone-year">${y}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}
      </ol>
    </div>
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="approccio-title">
  <div class="container">
    ${chapterHead({
      kicker: '02 — Il nostro approccio',
      title: 'Un unico interlocutore, <em>dall’analisi al destino finale.</em>',
      id: 'approccio-title',
      lede: 'Chi produce rifiuti non dovrebbe coordinare cinque fornitori diversi. Ci occupiamo noi di ogni fase e ti restituiamo una pratica completa.',
    })}
    ${method()}
  </div>
</section>

<section class="section t-light spot" data-theme="light" aria-labelledby="rete-title">
  <div class="container">
    <div class="about">
      <div class="about-copy">
        ${eyebrow('03 — Rete di partner')}
        ${display('h2', 'Una rete di aziende <em>leader nel settore.</em>', { id: 'rete-title' })}
        <p class="reveal">Lavoriamo in rete con aziende partner qualificate. Per te significa più destinazioni disponibili, tempi più rapidi e costi competitivi, con un unico contratto.</p>
        <p class="reveal">${ph('eventuali loghi o nomi dei partner principali, se autorizzati alla pubblicazione')}</p>
      </div>
      ${rows(partners)}
    </div>
  </div>
</section>

<section class="section t-dark spot" data-theme="dark" aria-labelledby="team-comp-title">
  <div class="container">
    <div class="about">
      <div class="about-media reveal">
        ${photo({ desc: 'Il team TIMIA in riunione tecnica, con documenti e planimetrie sul tavolo', ratio: '4 / 5' })}
      </div>
      <div class="about-copy">
        ${eyebrow('04 — Il team')}
        ${display('h2', 'Competenze tecniche e <em>legali, insieme.</em>', { id: 'team-comp-title' })}
        <p class="reveal">Il nostro team tecnico-commerciale unisce la conoscenza dei processi industriali e dei cantieri a quella della normativa ambientale.</p>
        ${numberedList([
          'Classificazione dei rifiuti e codici EER',
          'Normativa su rifiuti, bonifiche e amianto',
          'Adempimenti: RENTRI, registri, formulari, MUD',
          'Logistica e coordinamento di vettori e impianti',
          'Valutazione tecnica ed economica delle soluzioni di recupero',
        ])}
        <div class="section-foot reveal">${linkArrow('/team/', 'Conosci il team')}</div>
      </div>
    </div>
  </div>
</section>

<section class="section t-light spot" data-theme="light" aria-labelledby="valori-title">
  <div class="container">
    ${chapterHead({ kicker: '05 — I nostri valori', title: 'Cinque impegni <em>concreti.</em>', id: 'valori-title' })}
    ${rows(values)}
  </div>
</section>

${ctaBand({ where: 'about-final' })}
`,
};
