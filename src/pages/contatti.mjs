import { site, company, mapsQuery } from '../config.mjs';
import { icon } from '../lib/icons.mjs';
import { pageHero, breadcrumbLd, abs, orgRef, chapterHead, btn, infoList } from '../lib/html.mjs';
import { contactChapter } from '../lib/quote-form.mjs';

const crumbs = [{ name: 'Contatti e preventivi', path: '/contatti/' }];

export default [
  {
    path: '/contatti/',
    pageType: 'contact',
    scripts: ['form.js'],
    title: 'Contatti e richiesta preventivo gratuito | TIMIA Foligno',
    description:
      'Preventivo gratuito per smaltimento rifiuti, analisi, amianto, consulenza e bonifiche. TIMIA S.r.l., Via delle Industrie 78, Foligno (PG). Tel. 0742 391253.',
    jsonld: [
      breadcrumbLd(crumbs),
      { '@type': 'ContactPage', name: 'Contatti e preventivi', url: abs('/contatti/'), about: orgRef() },
    ],
    body: `
${pageHero({
  crumbs,
  kicker: 'Contatti e preventivi',
  title: 'Richiedi un <em>preventivo gratuito.</em>',
  lede: `Tre passaggi, circa due minuti. Più dettagli ci dai, più preciso sarà il preventivo. Rispondiamo ${site.responseTime}.`,
  ghost: 'Contatti',
  compact: true,
})}

${contactChapter({
  id: 'modulo',
  kicker: 'Modulo di richiesta',
  title: 'Parliamo dei <em>tuoi rifiuti.</em>',
  lede: 'Compila il modulo oppure contattaci direttamente: un tecnico esamina la richiesta e ti ricontatta.',
})}

<section class="section t-light spot" data-theme="light" aria-labelledby="dove-title">
  <div class="container">
    ${chapterHead({ kicker: 'Dove siamo', title: 'La sede <em>di Foligno.</em>', id: 'dove-title', lede: `${company.street}, ${company.postalCode} ${company.city} (${company.province}). ${company.hoursLabel}.` })}
    <div class="map reveal" data-map="https://www.google.com/maps?q=${mapsQuery}&amp;output=embed">
      <div class="map__ph">
        <span class="map__pin" aria-hidden="true">${icon('pin')}</span>
        <p class="map__addr"><strong>${company.street}</strong><br>${company.postalCode} ${company.city} (${company.province})</p>
        <p class="map__note">La mappa è fornita da Google Maps: caricandola, Google può raccogliere dati di navigazione. <a href="/cookie-policy/">Cookie policy</a></p>
        <div class="hero-actions">
          <button type="button" class="btn" data-map-load><span>Carica la mappa</span>${icon('map')}</button>
          <a class="btn" href="https://www.google.com/maps/search/?api=1&amp;query=${mapsQuery}" target="_blank" rel="noopener"><span>Apri in Google Maps</span>${icon('external')}</a>
        </div>
      </div>
    </div>
  </div>
</section>
`,
  },
  {
    // Pagina di conferma per l'invio senza JavaScript (redirect dal gestore PHP).
    path: '/contatti/grazie/',
    pageType: 'thankyou',
    noindex: true,
    title: 'Richiesta inviata | TIMIA',
    description: 'Conferma di invio della richiesta di preventivo o consulenza a TIMIA S.r.l.',
    body: `
${pageHero({
  crumbs: [...crumbs, { name: 'Richiesta inviata', path: '/contatti/grazie/' }],
  kicker: 'Richiesta inviata',
  title: 'Grazie, abbiamo <em>ricevuto la richiesta.</em>',
  lede: `Un tecnico la esamina e ti contatta ${site.responseTime} (lunedì–venerdì, 9:00–17:00). Per urgenze chiama il ${company.phone}.`,
  ctas: `${btn('/', 'Torna alla home', { variant: 'primary' })}${btn('/servizi/', 'Scopri i servizi')}`,
  ghost: 'Grazie',
})}`,
  },
];
