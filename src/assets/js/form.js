/* TIMIA — form preventivo multi-step
   Senza JavaScript il form resta un unico modulo inviabile (progressive enhancement). */
(function () {
  'use strict';

  var doc = document;
  var form = doc.getElementById('qform');
  if (!form) return;

  var track = window.timiaTrack || function () {};
  var steps = Array.prototype.slice.call(form.querySelectorAll('.qstep'));
  var indicators = Array.prototype.slice.call(form.querySelectorAll('.qform__progress [data-ind]'));
  var summary = doc.getElementById('qform-errors');
  var wrap = doc.getElementById('richiesta');
  var done = doc.getElementById('qdone');
  var current = 0;
  var started = false;

  var MAX_FILES = 5;
  var MAX_TOTAL = 8 * 1024 * 1024; // limite di Netlify Forms per singolo invio
  var ALLOWED = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'xls', 'xlsx'];

  var MSG = {
    tipo: 'Seleziona il tipo di richiesta.',
    tipologia: 'Seleziona la tipologia di rifiuto.',
    quantita: 'Indica la quantità stimata.',
    unita: 'Seleziona l’unità di misura.',
    frequenza: 'Indica se il servizio è una tantum o periodico.',
    provincia: 'Seleziona la provincia di ritiro.',
    ragione_sociale: 'Inserisci la ragione sociale.',
    referente: 'Inserisci nome e cognome del referente.',
    telefono: 'Inserisci un numero di telefono valido.',
    email: 'Inserisci un indirizzo email valido.',
    privacy: 'Per inviare la richiesta è necessario accettare l’informativa privacy.'
  };
  var LABEL = {
    tipo: 'Tipo di richiesta', tipologia: 'Tipologia di rifiuto', quantita: 'Quantità', unita: 'Unità di misura',
    frequenza: 'Frequenza', provincia: 'Provincia', eer: 'Codice EER', allegati: 'Allegati',
    ragione_sociale: 'Ragione sociale', referente: 'Referente', telefono: 'Telefono', email: 'Email', privacy: 'Privacy'
  };

  doc.documentElement.classList.add('js-form');
  form.querySelector('[name="ts"]').value = String(Date.now());

  /* ---------- Utilità ---------- */
  function tipo() {
    var r = form.querySelector('input[name="tipo"]:checked');
    return r ? r.value : '';
  }
  function isSkipped(step) {
    var skip = step.getAttribute('data-skip-for');
    return !!skip && skip.split(' ').indexOf(tipo()) !== -1;
  }
  function activeIndexes() {
    return steps.map(function (s, i) { return i; }).filter(function (i) { return !isSkipped(steps[i]); });
  }
  function controlsOf(el) {
    return Array.prototype.slice.call(el.querySelectorAll('input:not([type="hidden"]), select, textarea'));
  }
  function isVisible(el) { return !el.closest('[hidden]'); }

  /* ---------- Requisiti dinamici in base al tipo di richiesta ---------- */
  function applyRequirements() {
    var t = tipo();
    form.querySelectorAll('[data-req]').forEach(function (box) {
      var types = box.getAttribute('data-req').split(' ');
      var req = types.indexOf('all') !== -1 || (t && types.indexOf(t) !== -1);
      box.classList.toggle('is-required', req);
      controlsOf(box).forEach(function (c) { c.required = req; });
    });
    form.querySelectorAll('[data-show-if]').forEach(function (el) {
      var p = el.getAttribute('data-show-if').split('=');
      var checked = form.querySelector('input[name="' + p[0] + '"]:checked');
      el.hidden = !(checked && checked.value === p[1]);
    });
    updateProgress();
  }

  function updateProgress() {
    var act = activeIndexes();
    indicators.forEach(function (li, i) {
      var skipped = act.indexOf(i) === -1;
      li.classList.toggle('is-skipped', skipped);
      li.classList.toggle('is-current', i === current);
      li.classList.toggle('is-done', i < current && !skipped);
      if (i === current) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
  }

  function showStep(i, focus) {
    current = i;
    steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    updateProgress();
    if (focus) {
      var st = steps[i];
      st.setAttribute('tabindex', '-1');
      st.focus({ preventScroll: true });
      scrollToForm();
    }
  }

  function scrollToForm() {
    var header = doc.querySelector('.site-header');
    var offset = (header ? header.offsetHeight : 0) + 16;
    var top = wrap.getBoundingClientRect().top + window.scrollY - offset;
    if (window.scrollY > top || wrap.getBoundingClientRect().top < 0) window.scrollTo({ top: top, behavior: 'smooth' });
  }

  /* ---------- Validazione ---------- */
  function setError(name, msg) {
    var err = doc.getElementById('err-' + name);
    var ctrls = form.querySelectorAll('[name="' + name + '"]');
    var box = ctrls[0] && (ctrls[0].closest('.field, .consent, .field--group'));
    if (err) { err.textContent = msg || ''; err.hidden = !msg; }
    if (box) box.classList.toggle('is-invalid', !!msg);
    ctrls.forEach(function (c) { if (msg) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid'); });
  }

  function validEer(v) { return /^\s*\d{2}\s?\d{2}\s?\d{2}\s?\*?\s*$/.test(v); }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function validPhone(v) { var d = v.replace(/\D/g, ''); return d.length >= 6 && d.length <= 15 && /^[0-9+()\s./-]+$/.test(v); }

  function validateStep(step) {
    var errors = [];
    var seen = {};
    controlsOf(step).forEach(function (c) {
      var name = c.name;
      if (!name || seen[name] || !isVisible(c) || name === 'website') return;
      seen[name] = true;
      var msg = '';
      if (c.type === 'file') { setError('allegati', fileError); return; }
      if (c.type === 'radio') {
        var any = form.querySelector('input[name="' + name + '"]:checked');
        if (c.required && !any) msg = MSG[name] || 'Campo obbligatorio.';
      } else if (c.type === 'checkbox') {
        if (c.required && !c.checked) msg = MSG[name] || 'Campo obbligatorio.';
      } else if (c.type === 'file') {
        msg = fileError;
      } else {
        var v = (c.value || '').trim();
        if (c.required && !v) msg = MSG[name] || 'Campo obbligatorio.';
        else if (v && name === 'eer' && !validEer(v)) msg = 'Il codice EER ha 6 cifre, ad esempio 17 06 05 oppure 17 06 05*.';
        else if (v && name === 'email' && !validEmail(v)) msg = MSG.email;
        else if (v && name === 'telefono' && !validPhone(v)) msg = MSG.telefono;
        else if (v && name === 'quantita' && !(/^\d+([.,]\d+)?$/.test(v) && parseFloat(v.replace(',', '.')) > 0)) msg = 'Inserisci un numero maggiore di zero, ad esempio 12 oppure 12,5.';
      }
      var errName = name.replace('[]', '');
      setError(errName, msg);
      if (msg) errors.push({ name: errName, id: (c.type === 'radio' ? form.querySelector('input[name="' + name + '"]').id || '' : c.id), el: c, msg: msg });
    });
    renderSummary(errors);
    return errors.length === 0;
  }

  function renderSummary(errors) {
    if (!errors.length) { summary.hidden = true; summary.innerHTML = ''; return; }
    var html = '<p>' + (errors.length === 1 ? 'Controlla questo campo:' : 'Controlla questi ' + errors.length + ' campi:') + '</p><ul>';
    errors.forEach(function (e, i) {
      html += '<li><a href="#" data-err="' + i + '">' + (LABEL[e.name] || e.name) + ': ' + e.msg + '</a></li>';
    });
    summary.innerHTML = html + '</ul>';
    summary.hidden = false;
    summary.querySelectorAll('[data-err]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var t = errors[+a.getAttribute('data-err')].el;
        t.focus();
      });
    });
    summary.focus();
    track('form_error', { form_step: current + 1, error_fields: errors.map(function (e) { return e.name; }).join(',') });
  }

  /* ---------- Navigazione tra i passi ---------- */
  form.addEventListener('click', function (e) {
    var next = e.target.closest('[data-next]');
    var prev = e.target.closest('[data-prev]');
    if (!next && !prev) return;
    var act = activeIndexes();
    var pos = act.indexOf(current);
    if (next) {
      if (!validateStep(steps[current])) return;
      if (pos < act.length - 1) {
        showStep(act[pos + 1], true);
        track('form_step', { form_step: act[pos + 1] + 1, request_type: tipo() });
      }
    } else if (pos > 0) {
      renderSummary([]);
      showStep(act[pos - 1], true);
    }
  });

  form.addEventListener('change', function (e) {
    if (!started) { started = true; track('form_start', { request_type: tipo() || 'n/d' }); }
    var n = e.target.name;
    if (n === 'tipo' || n === 'frequenza') applyRequirements();
    if (n === 'tipo') setError('tipo', '');
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.type !== 'file') setError(n, '');
  });

  // Invio con Enter nei campi dei passi intermedi: passa al passo successivo invece di inviare.
  form.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' || e.target.tagName === 'TEXTAREA' || e.target.type === 'submit') return;
    var act = activeIndexes();
    if (act.indexOf(current) < act.length - 1) {
      e.preventDefault();
      var btn = steps[current].querySelector('[data-next]');
      if (btn) btn.click();
    }
  });

  /* ---------- Allegati ---------- */
  var fileInput = doc.getElementById('allegati');
  var fileList = form.querySelector('[data-filelist]');
  var dropzone = form.querySelector('[data-dropzone]');
  var store = [];
  var fileError = '';
  var canSet = (function () { try { return !!new DataTransfer(); } catch (e) { return false; } })();

  function fmtSize(b) { return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
  function syncInput() {
    if (!canSet) return;
    var dt = new DataTransfer();
    store.forEach(function (f) { dt.items.add(f); });
    fileInput.files = dt.files;
  }
  function renderFiles() {
    fileList.innerHTML = '';
    store.forEach(function (f, i) {
      var li = doc.createElement('li');
      li.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>';
      var name = doc.createElement('span'); name.className = 'fname'; name.textContent = f.name;
      var size = doc.createElement('span'); size.className = 'fsize'; size.textContent = fmtSize(f.size);
      li.appendChild(name); li.appendChild(size);
      if (canSet) {
        var rm = doc.createElement('button');
        rm.type = 'button';
        rm.setAttribute('aria-label', 'Rimuovi ' + f.name);
        rm.innerHTML = '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
        rm.addEventListener('click', function () { store.splice(i, 1); fileError = ''; setError('allegati', ''); syncInput(); renderFiles(); fileInput.focus(); });
        li.appendChild(rm);
      }
      fileList.appendChild(li);
    });
  }
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      var incoming = Array.prototype.slice.call(fileInput.files || []);
      var problems = [];
      if (!canSet) store = [];
      incoming.forEach(function (f) {
        var ext = (f.name.split('.').pop() || '').toLowerCase();
        if (ALLOWED.indexOf(ext) === -1) { problems.push('formato non supportato per ' + f.name); return; }
        if (store.some(function (s) { return s.name === f.name && s.size === f.size; })) return;
        if (store.length >= MAX_FILES) { problems.push('massimo ' + MAX_FILES + ' file'); return; }
        var total = store.reduce(function (a, s) { return a + s.size; }, 0) + f.size;
        if (total > MAX_TOTAL) { problems.push(f.name + ' supera il limite di 8 MB complessivi'); return; }
        store.push(f);
      });
      fileError = problems.length ? 'Alcuni file non sono stati aggiunti: ' + problems.join('; ') + '.' : '';
      if (!canSet && problems.length) { store = []; fileInput.value = ''; }
      setError('allegati', fileError);
      syncInput();
      renderFiles();
      fileError = ''; // l'avviso non blocca l'avanzamento: i file non validi sono già stati esclusi
    });
    ['dragenter', 'dragover'].forEach(function (ev) { dropzone.addEventListener(ev, function () { dropzone.classList.add('is-over'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { dropzone.addEventListener(ev, function () { dropzone.classList.remove('is-over'); }); });
  }

  /* ---------- Invio ---------- */
  function makeRef() {
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, '0'); };
    return 'TIM-' + String(d.getFullYear()).slice(2) + p(d.getMonth() + 1) + p(d.getDate()) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var act = activeIndexes();
    for (var k = 0; k < act.length; k++) {
      if (!validateStep(steps[act[k]])) { if (act[k] !== current) { showStep(act[k], false); validateStep(steps[act[k]]); } return; }
    }
    var btn = form.querySelector('.btn--submit');
    var ref = makeRef();
    form.querySelector('[name="ref"]').value = ref;
    try { form.querySelector('[name="origine"]').value = sessionStorage.getItem('timia_origin') || ''; } catch (err) { /* */ }

    var fd = new FormData(form);
    if (isSkipped(steps[1])) {
      controlsOf(steps[1]).forEach(function (c) { fd.delete(c.name); });
    }
    // Netlify Forms accetta un file per campo: gli allegati vanno in allegato1…allegato5.
    for (var n = 1; n <= MAX_FILES; n++) fd.delete('allegato' + n);
    if (!isSkipped(steps[1])) store.forEach(function (f, i) { fd.append('allegato' + (i + 1), f, f.name); });
    btn.setAttribute('aria-busy', 'true');
    btn.querySelector('span').textContent = 'Invio in corso…';

    fetch(form.getAttribute('action'), { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
      // Netlify Forms risponde con la pagina di conferma (HTML): conta lo stato HTTP.
      // Un gestore che risponde in JSON può invece restituire { ok, message, ref }.
      .then(function (r) { return r.json().catch(function () { return { ok: r.ok, message: r.ok ? '' : 'Errore di invio (' + r.status + ').' }; }).then(function (j) { j.status = r.status; return j; }); })
      .then(function (res) {
        if (!res.ok) throw new Error(res.message || 'Errore di invio');
        track('generate_lead', {
          form_name: 'richiesta_preventivo',
          request_type: tipo(),
          waste_category: (form.querySelector('[name="tipologia"]') || {}).value || 'n/d',
          province: (form.querySelector('[name="provincia"]') || {}).value || 'n/d',
          has_attachments: store.length > 0
        });
        var nome = (form.querySelector('[name="referente"]').value || '').trim().split(' ')[0];
        done.querySelector('[data-done-name]').textContent = nome ? ' ' + nome : '';
        done.querySelector('[data-done-ref]').textContent = res.ref || ref;
        form.hidden = true;
        done.hidden = false;
        done.focus({ preventScroll: true });
        scrollToForm();
      })
      .catch(function (err) {
        btn.removeAttribute('aria-busy');
        btn.querySelector('span').textContent = 'Invia la richiesta';
        summary.innerHTML = '<p>Non è stato possibile inviare la richiesta.</p><ul><li>' +
          (err && err.message && err.message !== 'Failed to fetch' ? err.message.replace(/[<>]/g, '') : 'Controlla la connessione e riprova.') +
          '</li><li>In alternativa chiamaci al <a href="tel:+390742391253">+39 0742 391253</a> o scrivi a <a href="mailto:info@timia.it">info@timia.it</a>.</li></ul>';
        summary.hidden = false;
        summary.focus();
        track('form_submit_error');
      });
  });

  /* ---------- Precompilazione da URL: ?tipo=…&servizio=… ---------- */
  var params = new URLSearchParams(location.search);
  var pTipo = params.get('tipo');
  var pServ = params.get('servizio');
  if (pTipo) {
    var radio = form.querySelector('input[name="tipo"][value="' + pTipo.replace(/[^a-z]/g, '') + '"]');
    if (radio) radio.checked = true;
  }
  if (pServ) {
    var sel = form.querySelector('select[name="servizio"]');
    var slug = pServ.replace(/[^a-z-]/g, '');
    if (sel && sel.querySelector('option[value="' + slug + '"]')) sel.value = slug;
    var map = { 'smaltimento-amianto': 'Amianto in matrice compatta', 'prodotti-end-of-waste': 'Fornitura di prodotti End of Waste', 'bonifica-siti-contaminati': 'Terre e rocce da scavo / materiali da bonifica' };
    var tip = form.querySelector('select[name="tipologia"]');
    if (map[slug] && tip) tip.value = map[slug];
  }

  applyRequirements();
  showStep(0, false);
})();
