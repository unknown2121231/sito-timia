/* TIMIA — script comune: menu mobile, header allo scroll, tracciamento eventi, consenso cookie. */
(function () {
  'use strict';
  var doc = document;
  var CFG = window.TIMIA || {};
  var $ = function (sel, ctx) { return (ctx || doc).querySelector(sel); };

  /* Tracciamento: tutti gli eventi passano da dataLayer (letti da GTM). Nessun dato personale. */
  function track(event, params) {
    var o = { event: event };
    for (var k in params || {}) o[k] = params[k];
    window.dataLayer.push(o);
  }
  window.timiaTrack = track;

  doc.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) track('click_to_call', { link_location: a.closest('header,footer,section') ? a.closest('header,footer,section').id || a.closest('header,footer,section').tagName.toLowerCase() : '' });
    else if (href.indexOf('mailto:') === 0) track('click_email', {});
    if (a.dataset.cta) track('cta_click', { cta_location: a.dataset.cta, cta_text: a.textContent.trim() });
  });

  /* Header con ombra allo scroll */
  var header = $('#header');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Menu mobile */
  var menuBtn = $('#menuBtn');
  var nav = $('#mainNav');
  function setMenu(open) {
    doc.body.classList.toggle('menu-open', open);
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); menuBtn.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu'); }
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { setMenu(!doc.body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && doc.body.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); } });
    window.matchMedia('(min-width: 1001px)').addEventListener('change', function (mq) { if (mq.matches) setMenu(false); });
  }

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
