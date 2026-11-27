/* TIMIA — configuratore preventivo: rifiuti → quantità → offerta → contatti.
   I dati (rifiuti, prezzi, offerte) arrivano da src/data/*.mjs tramite <script id="timia-data">. */
(function () {
  'use strict';
  var doc = document;
  var dataEl = doc.getElementById('timia-data');
  if (!dataEl) return;
  var D = JSON.parse(dataEl.textContent);
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var track = window.timiaTrack || function () {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var byId = {};
  D.rifiuti.forEach(function (r) { byId[r.id] = r; });
  byId.altro = D.altro;

  var STEPS = ['rifiuti', 'quantita', 'offerta', 'contatti'];
  var STORE = 'timia-preventivo';
  var state = { items: [], offer: null, step: 'rifiuti' }; // items: [{id, qty}]

  /* ---------- utilità ---------- */
  var nf = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 2 });
  function eur(n, dec) {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', minimumFractionDigits: dec ? 2 : 0, maximumFractionDigits: dec ? 2 : 0 }).format(n);
  }
  function unit(r) { return D.unita[r.unita] ? D.unita[r.unita].breve : r.unita; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function stepFor(r) { return r.unita === 't' || r.unita === 'm3' ? 0.5 : 1; }
  function icon(path) { return '<svg class="icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + path + '</svg>'; }
  var I = {
    minus: icon('<path d="M5 12h14"/>'),
    plus: icon('<path d="M12 5v14M5 12h14"/>'),
    trash: icon('<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>'),
    check: icon('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    clock: icon('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    arrow: icon('<path d="M5 12h14M13 6l6 6-6 6"/>')
  };

  function save() { try { sessionStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* storage non disponibile */ } }
  function load() {
    try {
      var s = JSON.parse(sessionStorage.getItem(STORE) || 'null');
      if (s && Array.isArray(s.items)) {
        state.items = s.items.filter(function (it) { return byId[it.id] && it.qty > 0; });
        state.offer = s.offer && D.offerte.some(function (o) { return o.id === s.offer; }) ? s.offer : null;
      }
    } catch (e) { /* ignora */ }
  }

  function has(id) { return state.items.some(function (it) { return it.id === id; }); }
  function add(id) { if (!has(id) && byId[id]) state.items.push({ id: id, qty: byId[id].minimo || 1 }); }
  function remove(id) { state.items = state.items.filter(function (it) { return it.id !== id; }); }

  /* ---------- calcolo prezzi ---------- */
  function lineCost(it) {
    var r = byId[it.id];
    return r.prezzo === null ? null : r.prezzo * it.qty;
  }
  function quote(offer) {
    var subtotal = 0, unknown = false;
    state.items.forEach(function (it) { var c = lineCost(it); if (c === null) unknown = true; else subtotal += c; });
    if (unknown || !state.items.length) return null;
    var total = offer.costoFisso + subtotal * (1 + offer.maggiorazione / 100);
    return Math.max(offer.ordineMinimo || 0, Math.round(total));
  }
  function offerById(id) { return D.offerte.filter(function (o) { return o.id === id; })[0] || null; }

  /* ---------- navigazione tra gli step ---------- */
  var section = $('#preventivo');
  function canReach(step) {
    if (step === 'rifiuti') return true;
    if (!state.items.length) return false;
    if (step === 'quantita' || step === 'offerta') return true;
    if (step === 'contatti') return !!state.offer;
    return false;
  }
  function go(step, opts) {
    opts = opts || {};
    if (step !== 'done' && !canReach(step)) return;
    var prev = state.step;
    state.step = step;
    $$('.step', section).forEach(function (el) { el.classList.toggle('is-active', el.dataset.step === step); });
    if (step === 'quantita') renderQty();
    if (step === 'offerta') renderOffers();
    if (step === 'contatti') updateHidden();
    renderStepper();
    save();
    if (step !== prev) track('form_step', { form_step: step });
    if (!opts.silent) {
      var target = $('#step-' + step);
      var top = $('#stepper').getBoundingClientRect().top + window.scrollY - 90;
      if (opts.scroll !== false && (window.scrollY > top + 40 || window.scrollY < top - window.innerHeight / 2)) {
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
      if (target) target.focus({ preventScroll: true });
    }
  }
  function renderStepper() {
    var idx = STEPS.indexOf(state.step);
    $$('.stepper__btn', section).forEach(function (b, i) {
      var s = b.dataset.goto;
      b.disabled = state.step === 'done' || !canReach(s);
      b.classList.toggle('is-done', idx > i || state.step === 'done');
      if (s === state.step) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
  }

  /* ---------- step 1: scelta rifiuti ---------- */
  var grid = $('#wasteGrid');
  var search = $('#wasteSearch');
  var activeCat = 'all';
  function renderSelection() {
    $$('.waste-card', grid).forEach(function (c) {
      var on = has(c.dataset.id);
      c.classList.toggle('is-selected', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var n = state.items.length;
    $('#selCount').textContent = n ? (n === 1 ? '1 rifiuto selezionato' : n + ' rifiuti selezionati') : 'Nessun rifiuto selezionato';
    $('#toQty').disabled = !n;
    renderStepper();
    renderSummary();
    save();
  }
  function applyFilter() {
    var q = (search.value || '').trim().toLowerCase();
    var visible = 0;
    $$('.waste-card', grid).forEach(function (c) {
      var okCat = activeCat === 'all' || c.dataset.cat === activeCat || c.dataset.id === 'altro';
      var okQ = !q || q.split(/\s+/).every(function (w) { return c.dataset.search.indexOf(w) > -1; }) || c.dataset.id === 'altro';
      var show = okCat && okQ;
      c.hidden = !show;
      if (show && c.dataset.id !== 'altro') visible++;
    });
    $('#wasteEmpty').hidden = visible > 0;
  }
  grid.addEventListener('click', function (e) {
    var c = e.target.closest('.waste-card');
    if (!c) return;
    var id = c.dataset.id;
    if (has(id)) remove(id); else { add(id); if (state.items.length === 1) track('form_start', {}); }
    renderSelection();
  });
  search.addEventListener('input', applyFilter);
  search.addEventListener('keydown', function (e) { if (e.key === 'Enter') e.preventDefault(); });
  $$('.chip[data-filter]', section).forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeCat = chip.dataset.filter;
      $$('.chip[data-filter]', section).forEach(function (c) { var on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      applyFilter();
    });
  });

  /* ---------- step 2: quantità ---------- */
  var qtyList = $('#qtyList');
  function renderQty() {
    qtyList.innerHTML = state.items.map(function (it) {
      var r = byId[it.id];
      var cost = lineCost(it);
      var price = r.prezzo === null ? 'Prezzo su richiesta' : r.prezzo === 0 ? 'Nessun costo di smaltimento' : eur(r.prezzo, r.prezzo < 10) + ' / ' + unit(r);
      return '<li class="qty-item" data-id="' + r.id + '">' +
        '<div class="qty-item__head"><div><p class="qty-item__name">' + esc(r.nome) + '</p><p class="qty-item__meta">' + (r.eer ? 'EER ' + r.eer + ' · ' : '') + price + '</p></div>' +
        '<button type="button" class="icon-btn" data-remove aria-label="Rimuovi ' + esc(r.nome) + '">' + I.trash + '</button></div>' +
        '<div class="qty-item__row">' +
          '<div class="qty"><button type="button" class="qty__btn" data-dec aria-label="Diminuisci">' + I.minus + '</button>' +
          '<label class="visually-hidden" for="q-' + r.id + '">Quantità di ' + esc(r.nome) + ' in ' + (D.unita[r.unita] ? D.unita[r.unita].lungo : r.unita) + '</label>' +
          '<input id="q-' + r.id + '" class="qty__input" type="number" inputmode="decimal" min="' + stepFor(r) + '" step="' + stepFor(r) + '" value="' + it.qty + '">' +
          '<span class="qty__unit">' + unit(r) + '</span>' +
          '<button type="button" class="qty__btn" data-inc aria-label="Aumenta">' + I.plus + '</button></div>' +
          (r.passi.length ? '<div class="qty-presets">' + r.passi.map(function (p) { return '<button type="button" class="chip chip--sm' + (p === it.qty ? ' is-active' : '') + '" data-set="' + p + '">' + nf.format(p) + ' ' + unit(r) + '</button>'; }).join('') + '</div>' : '') +
          '<p class="qty-item__cost">' + (cost === null ? 'Da quotare' : eur(cost, cost < 100)) + '</p>' +
        '</div>' +
        (r.id === 'altro' ? '<p class="qty-item__note">Descrivi il rifiuto nelle note al passaggio 4.</p>' : '') +
      '</li>';
    }).join('');
  }
  function setQty(id, v) {
    var r = byId[id];
    var it = state.items.filter(function (x) { return x.id === id; })[0];
    if (!it) return;
    v = Math.max(stepFor(r), Math.round(v / stepFor(r)) * stepFor(r));
    it.qty = v;
    save();
  }
  function refreshLine(li) {
    var id = li.dataset.id, r = byId[id];
    var it = state.items.filter(function (x) { return x.id === id; })[0];
    var c = lineCost(it);
    $('.qty-item__cost', li).textContent = c === null ? 'Da quotare' : eur(c, c < 100);
    $$('[data-set]', li).forEach(function (b) { b.classList.toggle('is-active', Number(b.dataset.set) === it.qty); });
    renderSummary();
    void r;
  }
  qtyList.addEventListener('click', function (e) {
    var li = e.target.closest('.qty-item');
    if (!li) return;
    var id = li.dataset.id, r = byId[id], input = $('.qty__input', li);
    var cur = Number(input.value) || 0;
    if (e.target.closest('[data-remove]')) {
      remove(id); renderSelection();
      if (!state.items.length) go('rifiuti'); else renderQty();
      return;
    }
    if (e.target.closest('[data-inc]')) setQty(id, cur + stepFor(r));
    else if (e.target.closest('[data-dec]')) setQty(id, cur - stepFor(r));
    else if (e.target.closest('[data-set]')) setQty(id, Number(e.target.closest('[data-set]').dataset.set));
    else return;
    input.value = state.items.filter(function (x) { return x.id === id; })[0].qty;
    refreshLine(li);
  });
  qtyList.addEventListener('input', function (e) {
    if (!e.target.classList.contains('qty__input')) return;
    var li = e.target.closest('.qty-item');
    var v = parseFloat(String(e.target.value).replace(',', '.'));
    if (!isNaN(v) && v > 0) { setQty(li.dataset.id, v); refreshLine(li); }
  });
  qtyList.addEventListener('change', function (e) {
    if (!e.target.classList.contains('qty__input')) return;
    var li = e.target.closest('.qty-item');
    var it = state.items.filter(function (x) { return x.id === li.dataset.id; })[0];
    e.target.value = it.qty;
  });

  /* ---------- step 3: offerte ---------- */
  var offersEl = $('#offers');
  function renderOffers() {
    offersEl.innerHTML = D.offerte.map(function (o) {
      var q = quote(o);
      var sel = state.offer === o.id;
      return '<article class="offer' + (o.consigliata ? ' offer--best' : '') + (sel ? ' is-selected' : '') + '" data-offer="' + o.id + '">' +
        (o.consigliata ? '<p class="offer__badge">La più scelta</p>' : '') +
        '<h4 class="offer__name">' + esc(o.nome) + '</h4>' +
        '<p class="offer__sub">' + esc(o.sottotitolo) + '</p>' +
        '<p class="offer__price">' + (q === null ? '<span class="offer__amount offer__amount--ask">Su richiesta</span><span class="offer__vat">ti inviamo il prezzo esatto</span>' : '<span class="offer__from">Totale stimato</span><span class="offer__amount">' + eur(q) + '</span><span class="offer__vat">IVA esclusa</span>') + '</p>' +
        '<p class="offer__time">' + I.clock + esc(o.tempi) + '</p>' +
        '<ul class="offer__list">' + o.incluso.map(function (x) { return '<li>' + I.check + esc(x) + '</li>'; }).join('') + '</ul>' +
        '<button type="button" class="btn ' + (o.consigliata || sel ? 'btn-primary' : 'btn-outline') + ' btn-block" data-choose="' + o.id + '" aria-pressed="' + sel + '">' + (sel ? I.check + ' Selezionata' : 'Scegli ' + esc(o.nome)) + '</button>' +
      '</article>';
    }).join('');
  }
  offersEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-choose]');
    if (!b) return;
    state.offer = b.dataset.choose;
    var o = offerById(state.offer);
    track('select_offer', { offer: o.id, value: quote(o) || 0 });
    renderSummary();
    go('contatti');
  });

  /* ---------- riepilogo laterale ---------- */
  function renderSummary() {
    var list = $('#sumList');
    if (!state.items.length) {
      list.innerHTML = '<li class="summary__empty">Seleziona uno o più rifiuti per iniziare.</li>';
    } else {
      list.innerHTML = state.items.map(function (it) {
        var r = byId[it.id];
        return '<li><span>' + esc(r.nome) + '<small>' + nf.format(it.qty) + ' ' + unit(r) + '</small></span></li>';
      }).join('');
    }
    var o = state.offer ? offerById(state.offer) : null;
    var offerEl = $('#sumOffer'), totEl = $('#sumTotal');
    offerEl.hidden = !o || !state.items.length;
    totEl.hidden = !state.items.length;
    if (o) offerEl.innerHTML = '<span>Offerta</span><strong>' + esc(o.nome) + '</strong><small>' + esc(o.tempi) + '</small>';
    if (state.items.length) {
      var q, label;
      if (o) { q = quote(o); label = 'Totale stimato'; }
      else {
        var all = D.offerte.map(quote).filter(function (x) { return x !== null; });
        q = all.length ? Math.min.apply(null, all) : null; label = q === null ? 'Prezzo' : 'A partire da';
      }
      totEl.innerHTML = '<span>' + label + '</span><strong>' + (q === null ? 'Su richiesta' : eur(q)) + '</strong><small>IVA esclusa' + (D.prezziDiEsempio ? ' · prezzi di esempio' : '') + '</small>';
    }
  }

  /* ---------- step 4: invio ---------- */
  var form = $('#quoteForm');
  function summaryText() {
    var o = offerById(state.offer);
    var lines = state.items.map(function (it) {
      var r = byId[it.id];
      return '- ' + r.nome + (r.eer ? ' (EER ' + r.eer + ')' : '') + ': ' + nf.format(it.qty) + ' ' + unit(r);
    });
    var q = o ? quote(o) : null;
    return {
      rifiuti: lines.join('\n'),
      offerta: o ? o.nome + ' — ' + o.tempi : '',
      totale: q === null ? 'Su richiesta' : eur(q) + ' IVA esclusa',
      full: 'RIFIUTI\n' + lines.join('\n') + '\n\nOFFERTA\n' + (o ? o.nome + ' — ' + o.tempi : '-') + '\n\nTOTALE STIMATO\n' + (q === null ? 'Su richiesta' : eur(q) + ' IVA esclusa') + (D.prezziDiEsempio ? ' (prezzi di esempio)' : '')
    };
  }
  function origin() {
    try {
      var qs = new URLSearchParams(location.search);
      var utm = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid'].map(function (k) { return qs.get(k) ? k + '=' + qs.get(k) : ''; }).filter(Boolean).join(' ');
      var stored = sessionStorage.getItem('timia-origine');
      if (!stored) { stored = utm || (doc.referrer ? 'referrer=' + doc.referrer : 'diretto'); sessionStorage.setItem('timia-origine', stored); }
      return stored;
    } catch (e) { return ''; }
  }
  origin();
  function updateHidden() {
    var s = summaryText();
    $('#f-rifiuti').value = s.rifiuti;
    $('#f-offerta').value = s.offerta;
    $('#f-totale').value = s.totale;
    $('#f-riepilogo').value = s.full;
    $('#f-origine').value = origin();
    var f = form.elements;
    var body = 'Buongiorno,\nvorrei ricevere un preventivo per lo smaltimento di questi rifiuti.\n\n' + s.full +
      '\n\nDATI DI CONTATTO\nNome: ' + (f.nome.value || '') + '\nAzienda: ' + (f.azienda.value || '') + '\nTelefono: ' + (f.telefono.value || '') +
      '\nComune del ritiro: ' + (f.comune.value || '') + ' ' + (f.cap.value || '') + (f.note.value ? '\n\nNote: ' + f.note.value : '') + '\n\nGrazie';
    $('#mailtoLink').href = 'mailto:' + D.email + '?subject=' + encodeURIComponent('Richiesta offerta smaltimento rifiuti') + '&body=' + encodeURIComponent(body);
  }
  form.addEventListener('input', updateHidden);

  var errEl = $('#formError');
  function fieldError(input, msg) {
    var field = input.closest('.field, .check');
    var id = input.id || input.name;
    var old = field.querySelector('.field-error');
    if (old) old.remove();
    input.removeAttribute('aria-invalid');
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      var p = doc.createElement('p');
      p.className = 'field-error'; p.id = 'err-' + id; p.textContent = msg;
      field.appendChild(p);
      input.setAttribute('aria-describedby', p.id);
    } else input.removeAttribute('aria-describedby');
  }
  function validate() {
    var errors = [];
    var f = form.elements;
    [['nome', 'Inserisci nome e cognome'], ['email', 'Inserisci la tua email'], ['telefono', 'Inserisci un numero di telefono'], ['comune', 'Indica il comune del ritiro']].forEach(function (x) {
      var el = f[x[0]];
      var bad = !el.value.trim();
      if (!bad && x[0] === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) { bad = true; x[1] = 'L’indirizzo email non sembra corretto'; }
      if (!bad && x[0] === 'telefono' && el.value.replace(/\D/g, '').length < 6) { bad = true; x[1] = 'Il numero di telefono non sembra corretto'; }
      fieldError(el, bad ? x[1] : '');
      if (bad) errors.push(el);
    });
    if (f.cap.value && !/^\d{5}$/.test(f.cap.value)) { fieldError(f.cap, 'Il CAP deve avere 5 cifre'); errors.push(f.cap); } else fieldError(f.cap, '');
    var priv = form.querySelector('[name=privacy]');
    fieldError(priv, priv.checked ? '' : 'Per inviare la richiesta serve il consenso alla privacy');
    if (!priv.checked) errors.push(priv);
    return errors;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errEl.hidden = true;
    updateHidden();
    var errors = validate();
    if (errors.length) {
      errEl.textContent = 'Controlla i campi evidenziati.';
      errEl.hidden = false;
      errors[0].focus();
      track('form_error', { error_fields: errors.map(function (x) { return x.name; }).join(',') });
      return;
    }
    var btn = $('#submitBtn');
    btn.disabled = true;
    btn.classList.add('is-loading');
    var body = new URLSearchParams(new FormData(form)).toString();
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }, body: body })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var o = offerById(state.offer);
        track('generate_lead', { form_name: 'richiesta-offerta', offer: o ? o.id : '', items: state.items.length, value: (o && quote(o)) || 0, currency: 'EUR' });
        state.items = []; state.offer = null;
        form.reset();
        renderSelection();
        go('done');
      })
      .catch(function () {
        track('form_submit_error', {});
        errEl.innerHTML = 'Invio non riuscito. Riprova tra poco oppure <a href="' + $('#mailtoLink').getAttribute('href').replace(/"/g, '&quot;') + '">inviaci il riepilogo via email</a>.';
        errEl.hidden = false;
      })
      .then(function () { btn.disabled = false; btn.classList.remove('is-loading'); });
  });

  $('#restart').addEventListener('click', function () { go('rifiuti'); });

  /* ---------- pulsanti di avanzamento e scorciatoie ---------- */
  section.addEventListener('click', function (e) {
    var n = e.target.closest('[data-next], [data-goto]');
    if (n) go(n.dataset.next || n.dataset.goto);
  });
  // Scorciatoie da hero e da "Cosa ritiriamo": aggiungono il rifiuto e portano alla quantità.
  doc.addEventListener('click', function (e) {
    var p = e.target.closest('[data-pick]');
    if (!p) return;
    e.preventDefault();
    add(p.dataset.pick);
    renderSelection();
    go('quantita', { scroll: false });
    scrollToStepper();
  });
  function scrollToStepper() {
    var top = $('#stepper').getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  var hero = $('#heroSearch');
  if (hero) hero.addEventListener('submit', function (e) {
    e.preventDefault();
    search.value = $('#heroQ').value;
    activeCat = 'all';
    applyFilter();
    go('rifiuti', { silent: true });
    scrollToStepper();
    setTimeout(function () { search.focus({ preventScroll: true }); }, reduceMotion ? 0 : 500);
  });

  /* ---------- avvio ---------- */
  load();
  renderSelection();
  applyFilter();
  var startStep = 'rifiuti';
  try { var saved = JSON.parse(sessionStorage.getItem(STORE) || 'null'); if (saved && saved.step && STEPS.indexOf(saved.step) > -1 && canReach(saved.step)) startStep = saved.step; } catch (e) { /* ignora */ }
  go(startStep, { silent: true });
})();
