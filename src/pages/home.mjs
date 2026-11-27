// Home: apertura con ricerca, configuratore preventivo (rifiuto → quantità → offerta → contatti),
// come funziona, vantaggi, rifiuti trattati, domande frequenti.
import { site, company } from '../config.mjs';
import { icon } from '../lib/icons.mjs';
import { esc } from '../lib/layout.mjs';
import { categorie, rifiuti, unitaLabel, popolari } from '../data/rifiuti.mjs';
import { offerte } from '../data/offerte.mjs';

const eur = (n) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: n < 1 && n > 0 ? 2 : 0, maximumFractionDigits: 2 }).format(n);
const priceLabel = (r) =>
  r.prezzo === null ? 'Prezzo su richiesta' : r.prezzo === 0 ? 'Ritiro senza costo di smaltimento' : `${eur(r.prezzo)} / ${unitaLabel[r.unita].breve}`;
const catById = Object.fromEntries(categorie.map((c) => [c.id, c]));
const byId = Object.fromEntries(rifiuti.map((r) => [r.id, r]));

const faq = [
  ['Il preventivo è gratuito? Mi impegna a qualcosa?', `<p>È gratuito e senza impegno. Il prezzo che vedi è calcolato sui dati che inserisci: dopo la richiesta lo confermiamo verificando codice EER, quantità effettive e indirizzo di ritiro. Paghi solo se accetti l’offerta definitiva.</p>`],
  ['I prezzi comprendono l’IVA?', '<p>No, tutti i prezzi sono indicati IVA esclusa, come d’uso tra aziende.</p>'],
  ['Chi compila il formulario (FIR) e gli altri documenti?', '<p>Ce ne occupiamo noi: compiliamo il formulario di identificazione del rifiuto, organizziamo trasporto e conferimento in impianti autorizzati e ti inviamo la quarta copia del FIR a smaltimento avvenuto.</p>'],
  ['Il mio rifiuto ha bisogno di analisi?', '<p>Per alcuni rifiuti, in particolare quelli con codice EER “a specchio” o pericolosi (contrassegnati da asterisco), l’impianto richiede un’analisi di caratterizzazione. Se non ne hai una recente possiamo organizzare noi campionamento e analisi di laboratorio: te lo indichiamo nell’offerta definitiva.</p>'],
  ['In quali zone fate il ritiro?', `<p>Siamo a ${company.city} (${company.province}) e lavoriamo in tutta Italia. Il costo del trasporto può variare in base alla distanza e all’accessibilità del luogo di ritiro: per questo ti chiediamo comune e CAP.</p>`],
  ['Non trovo il mio rifiuto nell’elenco. Cosa faccio?', '<p>Nessun problema: scegli “Altro rifiuto” oppure descrivilo nelle note della richiesta, anche con una foto inviata in seguito via email. Gestiamo molte altre tipologie di rifiuti speciali, pericolosi e non pericolosi.</p>'],
  ['Cosa succede dopo che ho inviato la richiesta?', `<p>Ricevi una risposta ${site.responseTime}: un nostro tecnico verifica i dati, conferma il prezzo e concorda con te data e modalità del ritiro.</p>`],
];

const heroArt = `
<svg class="hero-art" viewBox="0 0 520 440" role="img" aria-label="Illustrazione: camion TIMIA con contenitori per la raccolta differenziata">
  <defs>
    <linearGradient id="g-sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E6F2C4"/><stop offset="1" stop-color="#D3E6F5"/></linearGradient>
    <linearGradient id="g-truck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E7D2A"/><stop offset="1" stop-color="#2C5F1E"/></linearGradient>
  </defs>
  <circle cx="270" cy="210" r="200" fill="url(#g-sky)"/>
  <circle cx="420" cy="80" r="26" fill="#FFD166"/>
  <path d="M70 330h400" stroke="#10222A" stroke-opacity=".12" stroke-width="10" stroke-linecap="round"/>
  <g class="art-leaf"><path d="M110 150c0-40 30-70 80-70 0 50-30 76-72 76" fill="#8DBF4A"/><path d="M112 156l50-50" stroke="#2C5F1E" stroke-width="4" stroke-linecap="round"/></g>
  <g class="art-truck">
    <rect x="120" y="200" width="210" height="120" rx="16" fill="url(#g-truck)"/>
    <path d="M330 232h62c8 0 15 4 19 11l26 40c3 4 4 9 4 14v13c0 6-4 10-10 10H330z" fill="#10222A"/>
    <path d="M348 246h44l22 34h-66z" fill="#BFE0F5"/>
    <rect x="140" y="222" width="170" height="10" rx="5" fill="#fff" fill-opacity=".25"/>
    <text x="150" y="285" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="800" font-size="40" fill="#fff" letter-spacing="2">TIMIA</text>
    <circle cx="180" cy="322" r="26" fill="#10222A"/><circle cx="180" cy="322" r="10" fill="#E8EDE4"/>
    <circle cx="385" cy="322" r="26" fill="#10222A"/><circle cx="385" cy="322" r="10" fill="#E8EDE4"/>
  </g>
  <g class="art-bins">
    <g transform="translate(372 120)"><rect width="56" height="70" rx="8" fill="#2D6595"/><rect x="-4" y="-10" width="64" height="14" rx="6" fill="#204C72"/><path d="M18 25l10 10 12-18" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g transform="translate(442 150)"><rect width="46" height="56" rx="8" fill="#F4B942"/><rect x="-4" y="-9" width="54" height="12" rx="5" fill="#D99A1E"/></g>
  </g>
  <g class="art-badge" transform="translate(300 360)">
    <rect width="150" height="64" rx="18" fill="#fff" filter="drop-shadow(0 10px 18px rgba(16,34,42,.15))"/>
    <circle cx="32" cy="32" r="16" fill="#E6F2C4"/><path d="M25 32l5 5 9-10" stroke="#2C5F1E" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="58" y="28" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="12" fill="#5B6B70">Formulario</text>
    <text x="58" y="46" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="700" font-size="15" fill="#10222A">FIR incluso</text>
  </g>
</svg>`;

const wasteCard = (r) => `
<button type="button" class="waste-card" data-id="${r.id}" data-cat="${r.categoria}" data-search="${esc(`${r.nome} ${r.esempi} ${r.eer}`.toLowerCase())}" aria-pressed="false">
  <span class="waste-card__ico">${icon(catById[r.categoria].icona)}</span>
  <span class="waste-card__body">
    <span class="waste-card__name">${esc(r.nome)}</span>
    <span class="waste-card__ex">${esc(r.esempi)}</span>
    <span class="waste-card__meta"><span class="eer${r.eer.includes('*') ? ' eer--haz' : ''}">EER ${r.eer}</span><span class="waste-card__price">${priceLabel(r)}</span></span>
  </span>
  <span class="waste-card__check" aria-hidden="true">${icon('check')}</span>
</button>`;

const steps = [
  ['rifiuti', 'Rifiuti'],
  ['quantita', 'Quantità'],
  ['offerta', 'Offerta'],
  ['contatti', 'Contatti'],
];

const demoNote = site.prezziDiEsempio
  ? `<p class="demo-note">${icon('info')}<span><strong>Prezzi di esempio</strong> — gli importi definitivi sono in aggiornamento. Invia comunque la richiesta: ti confermiamo il prezzo reale.</span></p>`
  : '';

const configurator = `
<section class="section section--soft" id="preventivo" aria-labelledby="cfg-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Preventivo online · gratis e senza impegno</p>
      <h2 id="cfg-title">Calcola il prezzo in <span class="hl">4 semplici passaggi</span></h2>
      <p class="lede">Scegli cosa devi smaltire, indica le quantità e confronta le nostre offerte. Se ti convince, ci invii la richiesta con un clic.</p>
    </div>

    <ol class="stepper" id="stepper" aria-label="Passaggi del preventivo">
      ${steps.map(([id, l], i) => `<li><button type="button" class="stepper__btn" data-goto="${id}"${i ? ' disabled' : ' aria-current="step"'}><span class="stepper__n">${i + 1}</span><span class="stepper__l">${l}</span></button></li>`).join('')}
    </ol>

    <div class="cfg">
      <div class="cfg__main">

        <div class="step is-active" id="step-rifiuti" data-step="rifiuti" tabindex="-1" aria-labelledby="st1">
          <h3 class="step__title" id="st1"><span>1</span> Cosa devi smaltire?</h3>
          <p class="step__hint">Puoi selezionare più rifiuti.</p>
          <div class="search">
            ${icon('search')}
            <label class="visually-hidden" for="wasteSearch">Cerca un rifiuto</label>
            <input type="search" id="wasteSearch" placeholder="Cerca: macerie, pallet, olio, neon, codice EER…" autocomplete="off">
          </div>
          <div class="chips" role="group" aria-label="Filtra per categoria">
            <button type="button" class="chip is-active" data-filter="all" aria-pressed="true">Tutti</button>
            ${categorie.map((c) => `<button type="button" class="chip" data-filter="${c.id}" aria-pressed="false">${icon(c.icona)}${c.nome}</button>`).join('')}
          </div>
          <div class="waste-grid" id="wasteGrid">
            ${rifiuti.map(wasteCard).join('')}
            <button type="button" class="waste-card waste-card--other" data-id="altro" data-cat="altro" data-search="altro rifiuto non in elenco" aria-pressed="false">
              <span class="waste-card__ico">${icon('plus')}</span>
              <span class="waste-card__body"><span class="waste-card__name">Altro rifiuto</span><span class="waste-card__ex">Non è in elenco? Descrivilo tu, lo valutiamo noi</span><span class="waste-card__meta"><span class="waste-card__price">Prezzo su richiesta</span></span></span>
              <span class="waste-card__check" aria-hidden="true">${icon('check')}</span>
            </button>
          </div>
          <p class="empty" id="wasteEmpty" hidden>Nessun rifiuto trovato. Seleziona <button type="button" class="linklike" data-pick="altro">“Altro rifiuto”</button> e descrivilo nella richiesta.</p>
          <div class="step__nav">
            <span class="step__count" id="selCount" aria-live="polite">Nessun rifiuto selezionato</span>
            <button type="button" class="btn btn-primary" data-next="quantita" id="toQty" disabled>Avanti: quantità ${icon('arrow')}</button>
          </div>
        </div>

        <div class="step" id="step-quantita" data-step="quantita" tabindex="-1" aria-labelledby="st2">
          <h3 class="step__title" id="st2"><span>2</span> Quanto ne hai?</h3>
          <p class="step__hint">Una stima va benissimo: le quantità esatte le verifichiamo insieme.</p>
          <ul class="qty-list" id="qtyList"></ul>
          <div class="step__nav">
            <button type="button" class="btn btn-ghost" data-next="rifiuti">${icon('plus')} Aggiungi rifiuti</button>
            <button type="button" class="btn btn-primary" data-next="offerta">Vedi le offerte ${icon('arrow')}</button>
          </div>
        </div>

        <div class="step" id="step-offerta" data-step="offerta" tabindex="-1" aria-labelledby="st3">
          <h3 class="step__title" id="st3"><span>3</span> Le offerte per te</h3>
          <p class="step__hint">Prezzi IVA esclusa, comprensivi di trasporto e smaltimento. Scegli quella che preferisci.</p>
          ${demoNote}
          <div class="offers" id="offers"></div>
          <div class="step__nav">
            <button type="button" class="btn btn-ghost" data-next="quantita">${icon('arrowUp')} Modifica quantità</button>
          </div>
        </div>

        <div class="step" id="step-contatti" data-step="contatti" tabindex="-1" aria-labelledby="st4">
          <h3 class="step__title" id="st4"><span>4</span> Dove ti contattiamo?</h3>
          <p class="step__hint">Ti rispondiamo ${site.responseTime} per confermare prezzo e data del ritiro.</p>
          <form class="form" id="quoteForm" name="${site.formName}" method="POST" action="/grazie/" data-netlify="true" netlify-honeypot="bot-field" novalidate>
            <input type="hidden" name="form-name" value="${site.formName}">
            <p class="visually-hidden"><label>Non compilare questo campo: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
            <input type="hidden" name="rifiuti" id="f-rifiuti">
            <input type="hidden" name="offerta" id="f-offerta">
            <input type="hidden" name="totale_stimato" id="f-totale">
            <input type="hidden" name="riepilogo" id="f-riepilogo">
            <input type="hidden" name="origine" id="f-origine">
            <div class="form-grid">
              <div class="field"><label for="f-nome">Nome e cognome <abbr title="obbligatorio">*</abbr></label><input id="f-nome" name="nome" autocomplete="name" required></div>
              <div class="field"><label for="f-azienda">Azienda / Ente</label><input id="f-azienda" name="azienda" autocomplete="organization"></div>
              <div class="field"><label for="f-email">Email <abbr title="obbligatorio">*</abbr></label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
              <div class="field"><label for="f-tel">Telefono <abbr title="obbligatorio">*</abbr></label><input id="f-tel" name="telefono" type="tel" autocomplete="tel" required></div>
              <div class="field"><label for="f-comune">Comune del ritiro <abbr title="obbligatorio">*</abbr></label><input id="f-comune" name="comune" autocomplete="address-level2" required></div>
              <div class="field"><label for="f-cap">CAP</label><input id="f-cap" name="cap" inputmode="numeric" maxlength="5" autocomplete="postal-code" pattern="[0-9]{5}"></div>
              <div class="field field--full"><label for="f-note">Note <span class="opt">(facoltativo)</span></label><textarea id="f-note" name="note" rows="4" placeholder="Descrivi il rifiuto se hai scelto “Altro”, come è confezionato, accessibilità del luogo, date preferite…"></textarea></div>
            </div>
            <div class="checks">
              <label class="check"><input type="checkbox" name="privacy" value="accettata" required><span>Ho letto la <a href="/privacy-policy/" target="_blank">privacy policy</a> e acconsento al trattamento dei dati per ricevere l’offerta. <abbr title="obbligatorio">*</abbr></span></label>
              <label class="check"><input type="checkbox" name="marketing" value="si"><span>Voglio ricevere aggiornamenti su normative e servizi (facoltativo).</span></label>
            </div>
            <p class="form-error" id="formError" role="alert" hidden></p>
            <div class="step__nav">
              <button type="button" class="btn btn-ghost js-only" data-next="offerta">Cambia offerta</button>
              <button type="submit" class="btn btn-primary btn-lg" id="submitBtn">${icon('mail')} Contatta TIMIA</button>
            </div>
            <p class="form-alt js-only">Preferisci la tua email? <a href="mailto:${company.email}" id="mailtoLink">Invia il riepilogo da Outlook, Gmail o dalla tua app di posta</a>.</p>
          </form>
        </div>

        <div class="step step--done" id="step-done" data-step="done" tabindex="-1">
          <div class="done-ico">${icon('check')}</div>
          <h3>Richiesta inviata, grazie!</h3>
          <p>Abbiamo ricevuto il tuo riepilogo. Un nostro tecnico ti contatterà ${site.responseTime} per confermare prezzo e data del ritiro.</p>
          <p>Per urgenze chiamaci al <a href="tel:${company.phoneHref}">${company.phone}</a>.</p>
          <button type="button" class="btn btn-ghost" id="restart">Nuovo preventivo</button>
        </div>
      </div>

      <aside class="cfg__side" aria-labelledby="sum-title">
        <div class="summary" id="summary">
          <h3 id="sum-title">Il tuo riepilogo</h3>
          <ul class="summary__list" id="sumList"><li class="summary__empty">Seleziona uno o più rifiuti per iniziare.</li></ul>
          <div class="summary__offer" id="sumOffer" hidden></div>
          <div class="summary__total" id="sumTotal" hidden></div>
          <ul class="summary__perks">
            <li>${icon('check')} Gratis e senza impegno</li>
            <li>${icon('check')} Trasporto e FIR inclusi</li>
            <li>${icon('check')} Impianti autorizzati</li>
          </ul>
        </div>
      </aside>
    </div>
    <noscript><p class="demo-note">Per calcolare il prezzo online serve JavaScript. Puoi comunque compilare il modulo qui sopra o chiamarci al ${company.phone}.</p></noscript>
  </div>
</section>`;

const howItWorks = `
<section class="section" id="come-funziona" aria-labelledby="how-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Come funziona</p>
      <h2 id="how-title">Smaltire i rifiuti, <span class="hl">senza pensieri</span></h2>
    </div>
    <ol class="how">
      <li class="how__item"><span class="how__n">1</span><span class="how__ico">${icon('search')}</span><h3>Scegli il rifiuto</h3><p>Cerca nel nostro elenco o descrivici cosa devi smaltire e indica una quantità indicativa.</p></li>
      <li class="how__item"><span class="how__n">2</span><span class="how__ico">${icon('euro')}</span><h3>Confronta le offerte</h3><p>Vedi subito il prezzo delle formule Essenziale, Smart ed Express e scegli quella giusta per te.</p></li>
      <li class="how__item"><span class="how__n">3</span><span class="how__ico">${icon('mail')}</span><h3>Contattaci</h3><p>Con un clic ci invii la richiesta: ti richiamiamo per confermare prezzo e data.</p></li>
      <li class="how__item"><span class="how__n">4</span><span class="how__ico">${icon('truck')}</span><h3>Ritiriamo noi</h3><p>Trasporto, formulario e conferimento in impianto autorizzato: pensiamo a tutto noi.</p></li>
    </ol>
    <p class="center"><a class="btn btn-primary btn-lg" href="#preventivo" data-cta="how">Calcola il prezzo ${icon('arrow')}</a></p>
  </div>
</section>`;

const why = `
<section class="section section--dark" aria-labelledby="why-title">
  <div class="container why">
    <div class="why__intro">
      <p class="eyebrow">Perché TIMIA</p>
      <h2 id="why-title">Un solo partner per tutti i tuoi rifiuti</h2>
      <p>Da oltre ${company.yearsExperience} anni aiutiamo aziende, cantieri ed enti pubblici a gestire i rifiuti speciali in modo corretto, tracciabile e conveniente.</p>
      <a class="btn btn-accent" href="tel:${company.phoneHref}">${icon('phone')} Parla con un tecnico</a>
    </div>
    <div class="why__grid">
      <div class="feat"><span class="feat__ico">${icon('euro')}</span><h3>Prezzi chiari</h3><p>Vedi il costo prima di chiederci il preventivo. Nessuna sorpresa in fattura.</p></div>
      <div class="feat"><span class="feat__ico">${icon('doc')}</span><h3>Burocrazia inclusa</h3><p>FIR, registro di carico e scarico, quarta copia: ce ne occupiamo noi.</p></div>
      <div class="feat"><span class="feat__ico">${icon('shield')}</span><h3>Tutto a norma</h3><p>Trasportatori e impianti autorizzati, nel rispetto del D.Lgs. 152/2006.</p></div>
      <div class="feat"><span class="feat__ico">${icon('recycle')}</span><h3>Prima il recupero</h3><p>Quando possibile avviamo i rifiuti a recupero invece che in discarica.</p></div>
    </div>
  </div>
</section>`;

const wasteTypes = `
<section class="section" id="rifiuti" aria-labelledby="types-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Cosa ritiriamo</p>
      <h2 id="types-title">Rifiuti speciali, <span class="hl">pericolosi e non</span></h2>
      <p class="lede">Ecco le tipologie più richieste. Non trovi la tua? Contattaci comunque: gestiamo molti altri codici EER.</p>
    </div>
    <div class="types">
      ${categorie
        .map(
          (c) => `<article class="type">
        <span class="type__ico">${icon(c.icona)}</span>
        <h3>${c.nome}</h3>
        <ul>${rifiuti
          .filter((r) => r.categoria === c.id)
          .map((r) => `<li><button type="button" class="linklike" data-pick="${r.id}">${esc(r.nome)}</button></li>`)
          .join('')}</ul>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>`;

const faqSection = `
<section class="section section--soft" id="faq" aria-labelledby="faq-title">
  <div class="container container--narrow">
    <div class="section-head">
      <p class="eyebrow">Domande frequenti</p>
      <h2 id="faq-title">Hai qualche dubbio?</h2>
    </div>
    <div class="faq">
      ${faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span class="faq__ico" aria-hidden="true">${icon('plus')}</span></summary><div class="faq__a">${a}</div></details>`).join('')}
    </div>
  </div>
</section>`;

const ctaBand = `
<section class="section section--tight">
  <div class="container">
    <div class="cta-band">
      <div>
        <h2>Preferisci parlare con una persona?</h2>
        <p>Chiamaci ${company.hoursLabel.toLowerCase()} o scrivici: ti aiutiamo a trovare la soluzione giusta.</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn-accent btn-lg" href="tel:${company.phoneHref}">${icon('phone')} ${company.phone}</a>
        <a class="btn btn-ghost-light btn-lg" href="mailto:${company.email}">${icon('mail')} ${company.email}</a>
      </div>
    </div>
  </div>
</section>`;

const hero = `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__inner">
    <div class="hero__text">
      <p class="pill">${icon('spark')} Preventivo online in 2 minuti</p>
      <h1 id="hero-title">Smaltire i rifiuti della tua azienda <span class="hl">non è mai stato così semplice</span></h1>
      <p class="hero__lede">Scegli il rifiuto, indica la quantità e confronta subito i prezzi. Al ritiro, ai documenti e allo smaltimento pensiamo noi.</p>
      <form class="hero-search" id="heroSearch" action="#preventivo" role="search">
        <label class="visually-hidden" for="heroQ">Che rifiuto devi smaltire?</label>
        ${icon('search')}
        <input id="heroQ" type="search" placeholder="Che rifiuto devi smaltire?" autocomplete="off">
        <button class="btn btn-primary" type="submit">Calcola il prezzo</button>
      </form>
      <div class="hero__popular">
        <span>I più richiesti:</span>
        ${popolari.map((id) => `<button type="button" class="chip chip--light" data-pick="${id}">${esc(byId[id].nome)}</button>`).join('')}
      </div>
    </div>
    <div class="hero__visual">${heroArt}</div>
  </div>
  <div class="container">
    <ul class="trust">
      <li><strong>${company.yearsExperience}+ anni</strong><span>di esperienza nei rifiuti speciali</span></li>
      <li><strong>Tutta Italia</strong><span>ritiro con mezzi autorizzati</span></li>
      <li><strong>FIR incluso</strong><span>documenti compilati da noi</span></li>
      <li><strong>0 € di preventivo</strong><span>gratis e senza impegno</span></li>
    </ul>
  </div>
</section>`;

// Dati passati al configuratore nel browser.
const data = {
  rifiuti: rifiuti.map(({ id, nome, eer, unita, prezzo, minimo, passi, categoria }) => ({ id, nome, eer, unita, prezzo, minimo: minimo ?? 1, passi: passi ?? [], categoria })),
  altro: { id: 'altro', nome: 'Altro rifiuto', eer: '', unita: 'kg', prezzo: null, minimo: 1, passi: [], categoria: 'altro' },
  offerte,
  unita: unitaLabel,
  email: company.email,
  prezziDiEsempio: site.prezziDiEsempio,
};

export default {
  path: '/',
  pageType: 'home',
  title: 'Smaltimento rifiuti speciali: prezzo online in 2 minuti | TIMIA',
  description: `Calcola online il prezzo per lo smaltimento dei tuoi rifiuti: scegli il rifiuto, la quantità e confronta le offerte. Ritiro, FIR e smaltimento autorizzato in tutta Italia. ${company.legalName}, Foligno.`,
  scripts: ['configuratore.js'],
  data,
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })),
    },
  ],
  body: hero + configurator + howItWorks + why + wasteTypes + faqSection + ctaBand,
};
