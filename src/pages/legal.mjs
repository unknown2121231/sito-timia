// Privacy policy, cookie policy, pagina di conferma e 404.
// ATTENZIONE: i testi legali sono una base di partenza da far validare al consulente privacy/DPO.
import { site, company } from '../config.mjs';
import { icon } from '../lib/icons.mjs';
import { ph, verify } from '../lib/layout.mjs';

const pageHead = (kicker, title) => `
<section class="page-head">
  <div class="container container--narrow">
    <p class="eyebrow">${kicker}</p>
    <h1>${title}</h1>
    <p class="lede">Ultimo aggiornamento: ${site.policyUpdated}</p>
  </div>
</section>`;

const draftNote = `<p class="legal-draft">${icon('info')}<span>${ph('BOZZA — testo da verificare con il consulente privacy prima della pubblicazione; rimuovere questo avviso')}</span></p>`;

const titolare = `<p><strong>${company.legalName}</strong><br>${company.street}, ${company.postalCode} ${company.city} (${company.province})<br>P.IVA e C.F. ${company.vat} · REA ${company.rea}<br>Email <a href="mailto:${company.email}">${company.email}</a> · PEC <a href="mailto:${company.pec}">${company.pec}</a> · Tel. ${company.phone}</p>`;

const privacy = {
  path: '/privacy-policy/',
  pageType: 'legal',
  title: 'Privacy policy | TIMIA S.r.l.',
  description: 'Informativa sul trattamento dei dati personali degli utenti del sito e di chi invia richieste di preventivo o contatto a TIMIA S.r.l.',
  body: `
${pageHead('Informativa ai sensi degli artt. 13 e 14 del Regolamento (UE) 2016/679', 'Privacy policy')}
<section class="section section--tight">
  <div class="container container--narrow prose legal">
    ${draftNote}

    <h2>1. Titolare del trattamento</h2>
    ${titolare}
    <p>Il Titolare ${ph('indicare se è stato nominato un Responsabile della protezione dei dati (DPO) e i relativi contatti, oppure eliminare questa frase')}.</p>

    <h2>2. Quali dati trattiamo</h2>
    <ul>
      <li><strong>Dati di navigazione</strong>: indirizzi IP, tipo di browser, pagine visitate, data e ora della richiesta. Sono raccolti dai sistemi del sito per il suo funzionamento e la sua sicurezza.</li>
      <li><strong>Dati forniti tramite il modulo di richiesta</strong>: nome e cognome, azienda o ente, email, telefono, comune e CAP del ritiro, rifiuti e quantità indicati, offerta scelta e note.</li>
      <li><strong>Dati inviati via email, PEC o telefono</strong>: i dati che scegli di comunicarci.</li>
      <li><strong>Cookie e strumenti di tracciamento</strong>: vedi la <a href="/cookie-policy/">cookie policy</a>.</li>
    </ul>
    <p>Ti chiediamo di non inserire nelle note dati personali non necessari alla richiesta, in particolare dati di terzi o categorie particolari di dati.</p>

    <h2>3. Finalità, basi giuridiche e tempi di conservazione</h2>
    <div class="table-wrap"><table>
      <caption class="visually-hidden">Finalità del trattamento</caption>
      <thead><tr><th scope="col">Finalità</th><th scope="col">Base giuridica</th><th scope="col">Conservazione</th></tr></thead>
      <tbody>
        <tr><td>Rispondere a richieste di preventivo, consulenza, analisi o ricontatto</td><td>Esecuzione di misure precontrattuali adottate su tua richiesta (art. 6.1.b GDPR)</td><td>${ph('es. 24 mesi dall’ultimo contatto')}; in caso di contratto, per la sua durata e i termini di legge successivi</td></tr>
        <tr><td>Invio di comunicazioni su aggiornamenti normativi, servizi e iniziative</td><td>Consenso, facoltativo e revocabile (art. 6.1.a GDPR)</td><td>Fino alla revoca del consenso, e comunque non oltre ${ph('es. 24 mesi')}</td></tr>
        <tr><td>Adempimento di obblighi di legge, fiscali e contabili</td><td>Obbligo legale (art. 6.1.c GDPR)</td><td>10 anni, come previsto dall’art. 2220 del Codice civile</td></tr>
        <tr><td>Sicurezza del sito, prevenzione di abusi e tutela dei diritti del Titolare</td><td>Legittimo interesse (art. 6.1.f GDPR)</td><td>${ph('es. 6 mesi per i log tecnici')}, salvo necessità di accertamento di illeciti</td></tr>
        <tr><td>Statistiche di navigazione e misurazione delle campagne</td><td>Consenso (art. 6.1.a GDPR), espresso tramite il banner cookie</td><td>Vedi <a href="/cookie-policy/">cookie policy</a></td></tr>
      </tbody>
    </table></div>

    <h2>4. Natura del conferimento</h2>
    <p>I dati contrassegnati come obbligatori nel form sono necessari per rispondere alla richiesta: senza di essi non possiamo darvi seguito. Il consenso alle comunicazioni informative e commerciali è facoltativo e non influisce sulla gestione della richiesta.</p>

    <h2>5. Modalità del trattamento</h2>
    <p>I dati sono trattati con strumenti elettronici e cartacei, da personale autorizzato e con misure tecniche e organizzative adeguate a proteggerli da accessi non autorizzati, perdita o divulgazione. Non effettuiamo processi decisionali automatizzati né profilazione.</p>

    <h2>6. A chi comunichiamo i dati</h2>
    <ul>
      <li>Personale di ${company.legalName} autorizzato al trattamento.</li>
      <li>Fornitori che trattano dati per nostro conto come responsabili del trattamento (art. 28 GDPR): ${ph('fornitore di hosting, es. Netlify Inc. — che riceve anche le richieste inviate dal modulo')}, ${ph('fornitore del servizio email')}, consulenti amministrativi e informatici.</li>
      <li>Laboratori, vettori e impianti partner, solo quando necessario per formulare il preventivo o eseguire il servizio richiesto, e nei limiti di quanto indispensabile.</li>
      <li>Autorità ed enti pubblici, quando previsto dalla legge.</li>
    </ul>
    <p>I dati non sono diffusi.</p>

    <h2>7. Trasferimenti fuori dall’Unione europea</h2>
    <p>Alcuni strumenti attivati solo con il tuo consenso (Google Tag Manager, Google Analytics 4) possono comportare il trasferimento di dati verso gli Stati Uniti. Google LLC aderisce all’EU-U.S. Data Privacy Framework, riconosciuto adeguato dalla Commissione europea con decisione del 10 luglio 2023.</p>

    <h2>8. I tuoi diritti</h2>
    <p>Puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 del GDPR: accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione. Puoi revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento effettuato prima della revoca. Per esercitare i tuoi diritti scrivi a <a href="mailto:${company.email}">${company.email}</a> o a <a href="mailto:${company.pec}">${company.pec}</a>.</p>
    <p>Se ritieni che il trattamento violi la normativa, puoi proporre reclamo al Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" rel="noopener" target="_blank">www.garanteprivacy.it</a>).</p>

    <h2>9. Modifiche</h2>
    <p>Questa informativa può essere aggiornata. La data dell’ultimo aggiornamento è indicata in cima alla pagina.</p>
  </div>
</section>`,
};

const cookie = {
  path: '/cookie-policy/',
  pageType: 'legal',
  title: 'Cookie policy | TIMIA S.r.l.',
  description: 'Informazioni sui cookie e sugli strumenti di tracciamento usati dal sito di TIMIA S.r.l. e su come gestire le tue preferenze.',
  body: `
${pageHead('Cookie e strumenti di tracciamento', 'Cookie policy')}
<section class="section section--tight">
  <div class="container container--narrow prose legal">
    ${draftNote}
    <p>Questa pagina descrive i cookie e gli strumenti di tracciamento usati da questo sito, in conformità al Regolamento (UE) 2016/679, all’art. 122 del D.Lgs. 196/2003 e alle Linee guida del Garante per la protezione dei dati personali del 10 giugno 2021.</p>
    <p><button type="button" class="btn btn-primary" data-cookie-settings>${icon('cookie')} Gestisci le preferenze cookie</button></p>

    <h2>Cosa sono i cookie</h2>
    <p>I cookie sono piccoli file di testo che i siti salvano sul dispositivo dell’utente. Alcuni sono indispensabili al funzionamento del sito; altri, come quelli statistici e di marketing, vengono installati solo con il tuo consenso.</p>

    <h2>Come esprimiamo e gestiamo il consenso</h2>
    <ul>
      <li>Alla prima visita un banner ti permette di <strong>accettare</strong>, <strong>rifiutare</strong> o <strong>personalizzare</strong> i cookie. Chiudendo il banner con la “X” continui la navigazione senza cookie diversi da quelli tecnici.</li>
      <li>Prima del consenso non installiamo cookie statistici o di marketing e non carichiamo Google Tag Manager.</li>
      <li>La tua scelta viene ricordata per 6 mesi; trascorso questo periodo, o se cambiano gli strumenti utilizzati, te la chiederemo di nuovo.</li>
      <li>Puoi modificare la scelta in qualsiasi momento dal link “Preferenze cookie” in fondo a ogni pagina.</li>
    </ul>

    <h2>Cookie utilizzati</h2>
    <h3>Tecnici (necessari)</h3>
    <div class="table-wrap"><table>
      <caption class="visually-hidden">Cookie tecnici</caption>
      <thead><tr><th scope="col">Nome</th><th scope="col">Fornitore</th><th scope="col">Finalità</th><th scope="col">Durata</th></tr></thead>
      <tbody>
        <tr><td><code>timia_consent</code></td><td>${company.legalName} (prima parte)</td><td>Memorizza le tue preferenze sui cookie</td><td>6 mesi</td></tr>
      </tbody>
    </table></div>

    <h3>Statistici (solo con consenso)</h3>
    <div class="table-wrap"><table>
      <caption class="visually-hidden">Cookie statistici</caption>
      <thead><tr><th scope="col">Nome</th><th scope="col">Fornitore</th><th scope="col">Finalità</th><th scope="col">Durata</th></tr></thead>
      <tbody>
        <tr><td><code>_ga</code></td><td>Google (Google Analytics 4)</td><td>Distingue gli utenti a fini statistici</td><td>2 anni</td></tr>
        <tr><td><code>_ga_&lt;ID&gt;</code></td><td>Google (Google Analytics 4)</td><td>Mantiene lo stato della sessione</td><td>2 anni</td></tr>
      </tbody>
    </table></div>

    <h3>Marketing (solo con consenso)</h3>
    <div class="table-wrap"><table>
      <caption class="visually-hidden">Cookie di marketing</caption>
      <thead><tr><th scope="col">Nome</th><th scope="col">Fornitore</th><th scope="col">Finalità</th><th scope="col">Durata</th></tr></thead>
      <tbody>
        <tr><td><code>_gcl_au</code></td><td>Google (Google Ads)</td><td>Misura le conversioni generate dagli annunci</td><td>90 giorni</td></tr>
      </tbody>
    </table></div>
    <p>${verify('elencare solo gli strumenti effettivamente configurati in Google Tag Manager e aggiornare la tabella a ogni modifica')}</p>

    <h2>Contenuti di terze parti</h2>
    <ul>
      <li><strong>Google Maps</strong>: il sito non incorpora mappe; il link “Apri in Google Maps” porta al sito di Google, che applica la propria <a href="https://policies.google.com/privacy?hl=it" rel="noopener" target="_blank">informativa</a>.</li>
      <li><strong>Caratteri tipografici</strong>: i font sono forniti da Bunny Fonts (BunnyWay d.o.o., Slovenia, UE), che non installa cookie. Per il caricamento dei font il tuo indirizzo IP viene comunicato al fornitore. ${ph('eliminare questa voce se i font vengono ospitati direttamente sul sito, come consigliato nel README')}</li>
    </ul>

    <h2>Gestione dal browser</h2>
    <p>Puoi anche bloccare o cancellare i cookie dalle impostazioni del browser. Il blocco dei cookie tecnici può compromettere alcune funzioni del sito.</p>

    <h2>Titolare del trattamento</h2>
    ${titolare}
    <p>Per maggiori informazioni sul trattamento dei dati consulta la <a href="/privacy-policy/">privacy policy</a>.</p>
  </div>
</section>`,
};

const notFound = {
  path: '/404.html',
  pageType: 'error',
  noindex: true,
  title: 'Pagina non trovata | TIMIA',
  description: 'La pagina richiesta non esiste o è stata spostata.',
  body: `
<section class="page-head page-head--center">
  <div class="container container--narrow">
    <p class="eyebrow">Errore 404</p>
    <h1>Questa pagina non esiste</h1>
    <p class="lede">L’indirizzo potrebbe essere sbagliato o la pagina è stata spostata.</p>
    <p><a class="btn btn-primary btn-lg" href="/">Torna alla home</a> <a class="btn btn-ghost btn-lg" href="/#preventivo">Calcola il prezzo</a></p>
  </div>
</section>`,
};

const grazie = {
  path: '/grazie/',
  pageType: 'thanks',
  noindex: true,
  title: 'Richiesta inviata | TIMIA',
  description: 'Grazie per la tua richiesta: ti contatteremo a breve.',
  body: `
<section class="page-head page-head--center">
  <div class="container container--narrow">
    <div class="done-ico">${icon('check')}</div>
    <p class="eyebrow">Richiesta inviata</p>
    <h1>Grazie, abbiamo ricevuto la tua richiesta</h1>
    <p class="lede">Un nostro tecnico ti contatterà ${site.responseTime} per confermare prezzo e data del ritiro. Per urgenze chiamaci al <a href="tel:${company.phoneHref}">${company.phone}</a>.</p>
    <p><a class="btn btn-primary btn-lg" href="/">Torna alla home</a></p>
  </div>
</section>`,
};

export default [privacy, cookie, notFound, grazie];
