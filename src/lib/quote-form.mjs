// Modulo di richiesta preventivo multi-step + capitolo "Contatti" (usati in home e in /contatti/).
// La logica è in assets/js/form.js: mantenere id, classi e attributi data-* qui usati.
import { site, company, mapsQuery } from '../config.mjs';
import { icon } from './icons.mjs';
import { eyebrow, display, infoList } from './html.mjs';
import { services } from '../data/services.mjs';
import { provinces } from '../data/provinces.mjs';

const requestTypes = [
  ['preventivo', 'Preventivo', 'Ritiro, trasporto, recupero o smaltimento', 'file'],
  ['consulenza', 'Consulenza', 'Adempimenti, classificazione, recupero scarti', 'scale'],
  ['analisi', 'Analisi', 'Campionamento, caratterizzazione, codice EER', 'flask'],
  ['ricontatto', 'Ricontatto', 'Un tecnico ti richiama', 'phone'],
];

const wasteTypes = [
  'Rifiuti industriali non pericolosi',
  'Rifiuti industriali pericolosi',
  'Amianto in matrice compatta',
  'Amianto in matrice friabile',
  'Rifiuti da costruzione e demolizione',
  'Terre e rocce da scavo / materiali da bonifica',
  'Imballaggi',
  'Fanghi',
  'Oli, emulsioni e rifiuti liquidi',
  'RAEE e apparecchiature fuori uso',
  'Rifiuti urbani',
  'Fornitura di prodotti End of Waste',
  'Altro / non so',
];

const req = (types) => ` data-req="${types}"`;

export const quoteForm = () => `
<form class="qform" id="qform" name="preventivo" action="${site.formEndpoint}" method="post" enctype="multipart/form-data" novalidate data-netlify="true" netlify-honeypot="website" data-response-time="${site.responseTime}">
  <input type="hidden" name="form-name" value="preventivo">
  <ol class="qform__progress" aria-label="Avanzamento della richiesta">
    <li data-ind="1"><span class="qform__dot">1</span><span class="qform__lbl">Richiesta</span></li>
    <li data-ind="2"><span class="qform__dot">2</span><span class="qform__lbl">Rifiuto</span></li>
    <li data-ind="3"><span class="qform__dot">3</span><span class="qform__lbl">Dati azienda</span></li>
  </ol>

  <div class="qform__summary" id="qform-errors" role="alert" tabindex="-1" hidden></div>

  <fieldset class="qstep" data-step="1">
    <legend class="qstep__legend"><span class="qstep__count">Passo 1 di 3</span>Di cosa hai bisogno?</legend>
    <div class="choices" role="radiogroup" aria-required="true" aria-describedby="err-tipo">
      ${requestTypes
        .map(
          ([v, t, d, ic]) => `<label class="choice">
        <input type="radio" name="tipo" value="${v}" required>
        <span class="choice__box">
          <span class="choice__icon">${icon(ic)}</span>
          <span class="choice__txt"><strong>${t}</strong><small>${d}</small></span>
          <span class="choice__check" aria-hidden="true">${icon('check')}</span>
        </span>
      </label>`
        )
        .join('')}
    </div>
    <p class="field__error" id="err-tipo" hidden></p>
    <div class="field">
      <label for="servizio">Servizio di interesse <span class="opt">(facoltativo)</span></label>
      <select id="servizio" name="servizio">
        <option value="">Seleziona un servizio</option>
        ${services.map((s) => `<option value="${s.slug}">${s.name}</option>`).join('')}
        <option value="non-so">Non lo so, consigliatemi voi</option>
      </select>
    </div>
    <div class="qstep__nav">
      <button type="button" class="btn btn-primary" data-next><span>Avanti</span>${icon('arrow')}</button>
    </div>
  </fieldset>

  <fieldset class="qstep" data-step="2" data-skip-for="ricontatto">
    <legend class="qstep__legend"><span class="qstep__count">Passo 2 di 3</span>Il rifiuto</legend>
    <p class="qstep__hint">Più dettagli ci dai, più il preventivo sarà preciso. Se non conosci un dato, lascialo vuoto: ti aiutiamo noi.</p>

    <div class="field"${req('preventivo analisi')}>
      <label for="tipologia">Tipologia di rifiuto <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
      <select id="tipologia" name="tipologia" aria-describedby="err-tipologia">
        <option value="">Seleziona la tipologia</option>
        ${wasteTypes.map((w) => `<option>${w}</option>`).join('')}
      </select>
      <p class="field__error" id="err-tipologia" hidden></p>
    </div>

    <div class="field">
      <label for="descrizione">Descrizione del rifiuto <span class="opt">(facoltativo)</span></label>
      <textarea id="descrizione" name="descrizione" rows="3" maxlength="1500" aria-describedby="hint-descrizione"></textarea>
      <p class="field__hint" id="hint-descrizione">Es. processo di origine, confezionamento (big bag, fusti, cassoni), accessibilità del luogo di ritiro.</p>
    </div>

    <div class="field-row">
      <div class="field">
        <label for="eer">Codice EER, se noto <span class="opt">(facoltativo)</span></label>
        <input id="eer" name="eer" type="text" inputmode="numeric" autocomplete="off" maxlength="12" aria-describedby="hint-eer err-eer" placeholder="es. 17 06 05*">
        <p class="field__hint" id="hint-eer">Sei cifre, con asterisco se pericoloso.</p>
        <p class="field__error" id="err-eer" hidden></p>
      </div>
      <div class="field">
        <label for="stato">Stato fisico <span class="opt">(facoltativo)</span></label>
        <select id="stato" name="stato">
          <option value="">Seleziona</option>
          <option>Solido</option><option>Solido polverulento</option><option>Fangoso</option><option>Liquido</option><option>Misto / non so</option>
        </select>
      </div>
    </div>

    <div class="field-row field-row--qty">
      <div class="field"${req('preventivo')}>
        <label for="quantita">Quantità stimata <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
        <input id="quantita" name="quantita" type="text" inputmode="decimal" autocomplete="off" maxlength="12" placeholder="es. 12,5" aria-describedby="err-quantita">
        <p class="field__error" id="err-quantita" hidden></p>
      </div>
      <div class="field"${req('preventivo')}>
        <label for="unita">Unità di misura <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
        <select id="unita" name="unita" aria-describedby="err-unita">
          <option value="">Seleziona</option>
          <option value="kg">kg</option><option value="t">tonnellate</option><option value="m3">m³</option><option value="litri">litri</option><option value="colli">pezzi / colli</option>
        </select>
        <p class="field__error" id="err-unita" hidden></p>
      </div>
    </div>

    <fieldset class="field field--group"${req('preventivo')} aria-describedby="err-frequenza">
      <legend>Frequenza <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></legend>
      <div class="radios">
        <label class="radio"><input type="radio" name="frequenza" value="una tantum"><span>Una tantum</span></label>
        <label class="radio"><input type="radio" name="frequenza" value="periodica"><span>Periodica</span></label>
      </div>
      <p class="field__error" id="err-frequenza" hidden></p>
    </fieldset>
    <div class="field" data-show-if="frequenza=periodica" hidden>
      <label for="periodicita">Ogni quanto? <span class="opt">(facoltativo)</span></label>
      <select id="periodicita" name="periodicita">
        <option value="">Seleziona</option>
        <option>Settimanale</option><option>Quindicinale</option><option>Mensile</option><option>Trimestrale</option><option>Su chiamata</option>
      </select>
    </div>

    <div class="field"${req('preventivo analisi')}>
      <label for="provincia">Provincia di ritiro <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
      <select id="provincia" name="provincia" autocomplete="off" aria-describedby="err-provincia">
        <option value="">Seleziona la provincia</option>
        <optgroup label="Umbria">
          <option value="PG">Perugia (PG)</option>
          <option value="TR">Terni (TR)</option>
        </optgroup>
        <optgroup label="Tutte le province">
          ${provinces.filter(([s]) => s !== 'PG' && s !== 'TR').map(([s, n]) => `<option value="${s}">${n} (${s})</option>`).join('')}
        </optgroup>
      </select>
      <p class="field__error" id="err-provincia" hidden></p>
    </div>

    <div class="field">
      <span class="field__label" id="allegati-label">Allegati <span class="opt">(facoltativi)</span></span>
      <div class="dropzone" data-dropzone>
        <input class="dropzone__input" type="file" id="allegati" name="allegato1" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx" aria-labelledby="allegati-label allegati-cta" aria-describedby="hint-allegati err-allegati">
        <label class="dropzone__label" for="allegati">
          ${icon('upload')}
          <span id="allegati-cta"><strong>Trascina qui i file</strong> oppure <span class="u">sfoglia</span></span>
          <small id="hint-allegati">Schede di caratterizzazione, analisi, schede di sicurezza, foto. PDF, JPG, PNG, DOC, XLS · max 5 file, 8 MB in totale.</small>
        </label>
        <div hidden>${[2, 3, 4, 5].map((n) => `<input type="file" name="allegato${n}" tabindex="-1" aria-hidden="true">`).join('')}</div>
      </div>
      <ul class="filelist" data-filelist aria-live="polite"></ul>
      <p class="field__error" id="err-allegati" hidden></p>
    </div>

    <div class="qstep__nav">
      <button type="button" class="btn btn-back" data-prev>${icon('arrow')}<span>Indietro</span></button>
      <button type="button" class="btn btn-primary" data-next><span>Avanti</span>${icon('arrow')}</button>
    </div>
  </fieldset>

  <fieldset class="qstep" data-step="3">
    <legend class="qstep__legend"><span class="qstep__count">Passo 3 di 3</span>I tuoi dati</legend>
    <div class="field-row">
      <div class="field" data-req="all">
        <label for="ragione_sociale">Ragione sociale <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
        <input id="ragione_sociale" name="ragione_sociale" type="text" autocomplete="organization" maxlength="150" aria-describedby="err-ragione_sociale">
        <p class="field__error" id="err-ragione_sociale" hidden></p>
      </div>
      <div class="field">
        <label for="piva">Partita IVA <span class="opt">(facoltativo)</span></label>
        <input id="piva" name="piva" type="text" inputmode="numeric" maxlength="16" autocomplete="off">
      </div>
    </div>
    <div class="field-row">
      <div class="field" data-req="all">
        <label for="referente">Nome e cognome del referente <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
        <input id="referente" name="referente" type="text" autocomplete="name" maxlength="120" aria-describedby="err-referente">
        <p class="field__error" id="err-referente" hidden></p>
      </div>
      <div class="field">
        <label for="ruolo">Ruolo in azienda <span class="opt">(facoltativo)</span></label>
        <input id="ruolo" name="ruolo" type="text" autocomplete="organization-title" maxlength="120" placeholder="es. Responsabile HSE">
      </div>
    </div>
    <div class="field-row">
      <div class="field" data-req="all">
        <label for="telefono">Telefono <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
        <input id="telefono" name="telefono" type="tel" autocomplete="tel" maxlength="30" aria-describedby="err-telefono">
        <p class="field__error" id="err-telefono" hidden></p>
      </div>
      <div class="field" data-req="all">
        <label for="email">Email <span class="req-mark" aria-hidden="true">*</span><span class="opt opt-cond">(facoltativo)</span></label>
        <input id="email" name="email" type="email" autocomplete="email" maxlength="150" aria-describedby="err-email">
        <p class="field__error" id="err-email" hidden></p>
      </div>
    </div>
    <div class="field" data-show-if="tipo=ricontatto" hidden>
      <label for="fascia">Quando preferisci essere richiamato? <span class="opt">(facoltativo)</span></label>
      <select id="fascia" name="fascia">
        <option value="">Indifferente</option>
        <option>Mattina (9:00–13:00)</option>
        <option>Pomeriggio (14:00–17:00)</option>
      </select>
    </div>
    <div class="field">
      <label for="note">Note o richieste specifiche <span class="opt">(facoltativo)</span></label>
      <textarea id="note" name="note" rows="3" maxlength="2000"></textarea>
    </div>

    <div class="consents">
      <div class="consent" data-req="all">
        <input type="checkbox" id="privacy" name="privacy" value="si" aria-describedby="err-privacy">
        <label for="privacy">Ho letto l’<a href="/privacy-policy/" target="_blank" rel="noopener">informativa privacy<span class="visually-hidden"> (si apre in una nuova scheda)</span></a> e acconsento al trattamento dei miei dati per la gestione di questa richiesta. <span class="req-mark">*</span></label>
        <p class="field__error" id="err-privacy" hidden></p>
      </div>
      <div class="consent">
        <input type="checkbox" id="marketing" name="marketing" value="si">
        <label for="marketing">Acconsento a ricevere comunicazioni su aggiornamenti normativi, servizi e iniziative di TIMIA. <span class="opt">Facoltativo, revocabile in qualsiasi momento.</span></label>
      </div>
    </div>

    <div class="hp" aria-hidden="true">
      <label for="website">Non compilare questo campo</label>
      <input type="text" id="website" name="website" tabindex="-1" autocomplete="off">
    </div>
    <input type="hidden" name="ts" value="">
    <input type="hidden" name="ref" value="">
    <input type="hidden" name="origine" value="">

    <div class="qstep__nav">
      <button type="button" class="btn btn-back" data-prev>${icon('arrow')}<span>Indietro</span></button>
      <button type="submit" class="btn btn-primary btn--submit"><span>Invia la richiesta</span>${icon('arrow')}</button>
    </div>
    <p class="qform__foot">${icon('clock')}<span>Rispondiamo ${site.responseTime}, dal lunedì al venerdì dalle 9:00 alle 17:00. I campi con <span class="req-mark">*</span> sono obbligatori.</span></p>
  </fieldset>
</form>

<div class="qdone" id="qdone" tabindex="-1" hidden>
  <span class="qdone__icon">${icon('check')}</span>
  <h2 class="qdone__title">Richiesta inviata</h2>
  <p class="qdone__lead">Grazie<span data-done-name></span>, abbiamo ricevuto la tua richiesta.</p>
  <p class="qdone__ref">Codice richiesta: <strong data-done-ref></strong></p>
  <h3 class="qdone__h">Cosa succede ora</h3>
  <ol class="qdone__next">
    <li>Un tecnico esamina la richiesta e gli eventuali allegati.</li>
    <li>Ti contattiamo <strong>${site.responseTime}</strong> (lunedì–venerdì, 9:00–17:00) per confermare i dettagli.</li>
    <li>Ricevi il preventivo gratuito, o la proposta di consulenza, via email.</li>
  </ol>
  <p class="qdone__urgent">${icon('phone')}<span>Per urgenze chiama il <a href="tel:${company.phoneHref}" data-cta="form-done-tel">${company.phone}</a> citando il codice richiesta.</span></p>
</div>`;


export function contactChapter({ id = 'contatti', kicker = 'Contatti e preventivi', title = 'Parliamo dei <em>tuoi rifiuti.</em>', tag = 'h2', lede = '' } = {}) {
  return `<section class="section t-dark spot contact" id="${id}" data-theme="dark" aria-labelledby="${id}-title">
  <div class="container">
    ${eyebrow(kicker)}
    ${display(tag, title, { id: `${id}-title` })}
    <p class="lede reveal">${lede || `Richiedi un preventivo gratuito, una consulenza o un ricontatto: compila il modulo oppure chiamaci. Rispondiamo ${site.responseTime}.`}</p>
    <div class="contact-grid">
      <div class="contact-side reveal">
        <div class="quick">
          <a href="tel:${company.phoneHref}" data-cta="${id}-quick-tel"><span><small>Chiama</small><strong>${company.phone}</strong></span>${icon('phone')}</a>
          <a href="mailto:${company.email}"><span><small>Scrivi</small><strong>${company.email}</strong></span>${icon('mail')}</a>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=${mapsQuery}" target="_blank" rel="noopener"><span><small>Vieni a trovarci</small><strong>${company.street.replace(',', '')}, ${company.city}</strong></span>${icon('pin')}<span class="visually-hidden"> (si apre Google Maps in una nuova scheda)</span></a>
        </div>
        ${infoList([
          ['Ragione sociale', company.legalName],
          ['Sede', `${company.street}, ${company.postalCode} ${company.city} (${company.province})`],
          ['Orario', company.hoursLabel],
          ['PEC', `<a href="mailto:${company.pec}">${company.pec}</a>`],
          ['REA', company.rea],
          ['P.IVA / C.F.', company.vat],
        ])}
        <div class="tips">
          <p class="tips__title">Per un preventivo più rapido</p>
          <ul>
            <li>Codice EER, se lo conosci</li>
            <li>Quantità stimata e frequenza</li>
            <li>Foto del rifiuto e del luogo di deposito</li>
            <li>Analisi o schede di sicurezza disponibili</li>
          </ul>
        </div>
      </div>
      <div class="form qform-wrap reveal" style="--d:120ms" id="richiesta" tabindex="-1">
        <p class="form-title" id="richiesta-title"><span class="form-title__main">Richiedi un preventivo</span><span>Gratuito</span></p>
        ${quoteForm()}
      </div>
    </div>
  </div>
</section>`;
}
