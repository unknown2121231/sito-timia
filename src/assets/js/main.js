/* =====================================================================
   TIMIA — script condiviso da tutte le pagine
   Preloader, titoli parola per parola, comparse allo scroll, header,
   capitoli, effetto "riflettore", vetrina orizzontale, menu mobile,
   filtri News, mappa su richiesta, consenso cookie (Consent Mode v2 + GTM),
   tracciamento eventi.
   ===================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); };
  var CFG = window.TIMIA || {};
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.TIMIA_READY = true;

  /* ------------------------------------------------------------------
     Tracciamento: tutti gli eventi passano da dataLayer (letti da GTM)
     ------------------------------------------------------------------ */
  window.dataLayer = window.dataLayer || [];
  function track(event, params) {
    var payload = { event: event };
    if (params) for (var k in params) payload[k] = params[k];
    window.dataLayer.push(payload);
  }
  window.timiaTrack = track;

  // Sorgente di arrivo (UTM / referrer) per attribuire le richieste.
  try {
    if (!sessionStorage.getItem('timia_origin')) {
      var qs = new URLSearchParams(location.search);
      var utm = ['utm_source', 'utm_medium', 'utm_campaign']
        .map(function (k) { return qs.get(k) ? k + '=' + qs.get(k) : ''; })
        .filter(Boolean).join('&');
      var ref = doc.referrer && doc.referrer.indexOf(location.host) === -1 ? doc.referrer : '';
      sessionStorage.setItem('timia_origin', (utm || ref || 'diretto').slice(0, 300) + ' | landing: ' + location.pathname);
    }
  } catch (e) { /* storage non disponibile */ }

  doc.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a, button[data-cta]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var where = a.getAttribute('data-cta') || '';
    if (href.indexOf('tel:') === 0) track('click_to_call', { link_location: where || location.pathname });
    else if (href.indexOf('mailto:') === 0) track('click_email', { link_location: where || location.pathname });
    else if (/\.pdf($|\?)/i.test(href)) track('file_download', { file_name: href.split('/').pop() });
    else if (where) track('cta_click', { cta_location: where, cta_text: (a.textContent || '').trim().slice(0, 60) });
  });

  /* ------------------------------------------------------------------
     Titoli: parola per parola (classe .split)
     ------------------------------------------------------------------ */
  $$('.split').forEach(function (el) {
    var i = 0;
    var out = doc.createDocumentFragment();
    function addWords(text, isEm) {
      text.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { out.appendChild(doc.createTextNode(' ')); return; }
        var w = doc.createElement('span');
        w.className = 'w' + (isEm ? ' em' : '');
        w.style.setProperty('--i', i++);
        var inner = doc.createElement('span');
        inner.textContent = part;
        w.appendChild(inner);
        out.appendChild(w);
      });
    }
    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === 3) addWords(node.textContent, false);
      else if (node.nodeName === 'BR') out.appendChild(doc.createElement('br'));
      else addWords(node.textContent, node.nodeName === 'EM');
    });
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    el.textContent = '';
    el.appendChild(out);
  });

  /* ------------------------------------------------------------------
     Comparse allo scroll
     ------------------------------------------------------------------ */
  function startReveals() {
    var targets = $$('.reveal, .split, .method li');
    if (!('IntersectionObserver' in window) || reduceMotion) {
      targets.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* contatori */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, dur = 1600;
    function step(t) {
      if (!start) start = t;
      var p = Math.min((t - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 4))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var countIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        animateCount(e.target);
        countIO.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { countIO.observe(el); });
  }

  /* ------------------------------------------------------------------
     Preloader (una volta per sessione; deciso dallo script in <head>)
     ------------------------------------------------------------------ */
  var loader = $('#loader');
  if (loader && root.classList.contains('intro')) {
    var bar = $('#loaderBar');
    var count = $('#loaderCount');
    var t0 = null, total = 1400;
    root.style.overflow = 'hidden';
    var tick = function (t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / total, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      count.textContent = ('00' + Math.round(eased * 100)).slice(-3);
      bar.style.transform = 'scaleX(' + eased + ')';
      if (p < 1) { requestAnimationFrame(tick); return; }
      try { sessionStorage.setItem('timia-intro', '1'); } catch (e) { /* */ }
      setTimeout(function () {
        loader.classList.add('is-done');
        root.style.overflow = '';
        startReveals();
        setTimeout(function () { loader.classList.add('is-gone'); root.classList.remove('intro'); }, 1000);
      }, 200);
    };
    requestAnimationFrame(tick);
  } else {
    startReveals();
  }

  /* ------------------------------------------------------------------
     Menu mobile a schermo intero
     ------------------------------------------------------------------ */
  var menuBtn = $('#menuBtn');
  var menuPanel = $('#menuPanel');
  function setMenu(open) {
    doc.body.classList.toggle('menu-open', open);
    if (!menuBtn) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    var lbl = $('.lbl', menuBtn);
    if (lbl) lbl.textContent = open ? 'Chiudi' : 'Menu';
    if (open) { var first = $('a', menuPanel); if (first) setTimeout(function () { first.focus(); }, 50); }
  }
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', function () { setMenu(!doc.body.classList.contains('menu-open')); });
    menuPanel.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && doc.body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
    // il focus resta tra menu e pulsante mentre il menu è aperto
    doc.addEventListener('focusin', function (e) {
      if (!doc.body.classList.contains('menu-open')) return;
      if (!menuPanel.contains(e.target) && e.target !== menuBtn) $('a', menuPanel).focus();
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', function (mq) { if (mq.matches) setMenu(false); });
  }

  /* ------------------------------------------------------------------
     Scroll: header, progresso, capitolo attivo, effetto "riflettore", parallasse
     ------------------------------------------------------------------ */
  var header = $('#header');
  var progress = $('#progress');
  var toTop = $('#toTop');
  var chapters = $('#chapters');
  var heroMedia = $('#heroMedia');
  var spots = $$('.spot');
  var sections = $$('main section[id]');
  var links = $$('[data-link]');
  var ticking = false;

  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight;
    var docH = doc.documentElement.scrollHeight;
    if (header) header.classList.toggle('is-solid', y > 60);
    if (progress) progress.style.transform = 'scaleX(' + Math.min(y / Math.max(docH - vh, 1), 1) + ')';
    if (toTop) toTop.classList.toggle('is-on', y > vh * 1.2);
    if (links.length) {
      var mid = vh / 2, current = null;
      for (var i = 0; i < sections.length; i++) {
        var r = sections[i].getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) { current = sections[i]; break; }
      }
      if (current) {
        links.forEach(function (a) {
          var on = a.getAttribute('data-link') === current.id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
        if (chapters) chapters.classList.toggle('on-light', current.getAttribute('data-theme') === 'light');
      }
    }
    if (!reduceMotion) {
      spots.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        var cover = Math.max(0, Math.min(1, visible / Math.min(vh, rect.height)));
        var light = cover * cover * (3 - 2 * cover);
        el.style.setProperty('--dim', (1 - light).toFixed(3));
      });
      if (heroMedia && y < vh * 1.2) heroMedia.style.transform = 'translate3d(0,' + (y * 0.28).toFixed(1) + 'px,0)';
    }
  }
  function requestUpdate() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();

  /* ------------------------------------------------------------------
     Vetrina orizzontale (settori)
     ------------------------------------------------------------------ */
  $$('.works-track').forEach(function (track) {
    var id = track.id.replace(/Track$/, '');
    var cards = $$('.work', track);
    var prev = $('#' + id + 'Prev'), next = $('#' + id + 'Next'), counter = $('#' + id + 'Count');
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var stepSize = function () { return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth; };
    var refresh = function () {
      var idx = Math.max(0, Math.min(cards.length - 1, Math.round(track.scrollLeft / stepSize())));
      var atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) idx = cards.length - 1;
      if (counter) counter.textContent = pad(idx + 1) + ' / ' + pad(cards.length);
      if (prev) prev.disabled = track.scrollLeft <= 4;
      if (next) next.disabled = atEnd;
    };
    if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -stepSize(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { track.scrollBy({ left: stepSize(), behavior: 'smooth' }); });
    track.addEventListener('scroll', function () { requestAnimationFrame(refresh); }, { passive: true });
    window.addEventListener('resize', refresh);
    refresh();
  });

  /* ------------------------------------------------------------------
     Filtro articoli (pagina News)
     ------------------------------------------------------------------ */
  var filters = $$('.filter[data-filter]');
  if (filters.length) {
    var postsWrap = $('[data-posts]');
    var status = $('#filter-status');
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-filter'), n = 0;
        filters.forEach(function (b) { var on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
        $$('[data-cat]', postsWrap).forEach(function (card) {
          var show = cat === 'all' || card.getAttribute('data-cat') === cat;
          card.hidden = !show;
          if (show) { n++; card.classList.add('is-in'); }
        });
        if (status) status.textContent = n + (n === 1 ? ' articolo mostrato' : ' articoli mostrati');
      });
    });
  }

  /* ------------------------------------------------------------------
     Mappa Google: caricata solo su richiesta esplicita
     ------------------------------------------------------------------ */
  $$('[data-map-load]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var box = btn.closest('[data-map]');
      var iframe = doc.createElement('iframe');
      iframe.src = box.getAttribute('data-map');
      iframe.title = 'Mappa: sede TIMIA S.r.l. a Foligno';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      box.innerHTML = '';
      box.appendChild(iframe);
      track('map_load');
    });
  });

  /* ------------------------------------------------------------------
     Consenso cookie (Linee guida Garante 10/06/2021)
     - nessun cookie non tecnico prima del consenso
     - "X" = rifiuto; Rifiuta e Accetta con pari evidenza
     - scelta valida 6 mesi, poi viene richiesta di nuovo
     ------------------------------------------------------------------ */
  var CONSENT_COOKIE = 'timia_consent';
  var SIX_MONTHS = 60 * 60 * 24 * 182;
  var banner = $('#cc-banner');
  var dialog = $('#cc-dialog');
  var chkAn = $('#cc-analytics');
  var chkMk = $('#cc-marketing');
  var gtmLoaded = false;

  function readConsent() {
    try {
      var m = doc.cookie.match(new RegExp('(?:^|; )' + CONSENT_COOKIE + '=([^;]*)'));
      if (!m) return null;
      var c = JSON.parse(decodeURIComponent(m[1]));
      return c.v === CFG.consentVersion ? c : null;
    } catch (e) { return null; }
  }
  function writeConsent(c) {
    try {
      var secure = location.protocol === 'https:' ? '; Secure' : '';
      doc.cookie = CONSENT_COOKIE + '=' + encodeURIComponent(JSON.stringify(c)) + '; Max-Age=' + SIX_MONTHS + '; Path=/; SameSite=Lax' + secure;
    } catch (e) { /* cookie bloccati */ }
  }
  function loadGtm() {
    if (gtmLoaded || !CFG.gtmId) return;
    gtmLoaded = true;
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = doc.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(CFG.gtmId);
    doc.head.appendChild(s);
  }
  function applyConsent(c) {
    var g = function (v) { return v ? 'granted' : 'denied'; };
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: g(c.analytics),
        ad_storage: g(c.marketing),
        ad_user_data: g(c.marketing),
        ad_personalization: g(c.marketing)
      });
    }
    track('consent_update', { consent_analytics: c.analytics, consent_marketing: c.marketing });
    if (c.analytics || c.marketing) loadGtm();
  }
  function save(analytics, marketing) {
    var c = { v: CFG.consentVersion, ts: Date.now(), analytics: !!analytics, marketing: !!marketing };
    var hadGtm = gtmLoaded;
    writeConsent(c);
    applyConsent(c);
    if (banner) banner.hidden = true;
    if (dialog && dialog.open) dialog.close();
    if (hadGtm && !c.analytics && !c.marketing) location.reload();
  }
  function openDialog() {
    if (!dialog) return;
    var c = readConsent();
    if (chkAn) chkAn.checked = !!(c && c.analytics);
    if (chkMk) chkMk.checked = !!(c && c.marketing);
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  }
  doc.addEventListener('click', function (e) {
    var el = e.target.closest('[data-cc], [data-cookie-settings]');
    if (!el) return;
    if (el.hasAttribute('data-cookie-settings')) { openDialog(); return; }
    var act = el.getAttribute('data-cc');
    if (act === 'accept') save(true, true);
    else if (act === 'reject') save(false, false);
    else if (act === 'customize') openDialog();
    else if (act === 'save') save(chkAn && chkAn.checked, chkMk && chkMk.checked);
    else if (act === 'close-dialog' && dialog) dialog.close();
  });
  var existing = readConsent();
  if (existing) applyConsent(existing);
  else if (banner) banner.hidden = false;
})();
