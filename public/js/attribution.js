/* ============================================================
   PTDJA ATTRIBUTION + IDENTITY  v2.2  ("cb push v3")

   ⚠️ COPIA VERBATIM del custom code dell'<head> del sito Webflow
   (www.petetong-djacademy.com, blocco fra i commenti
   "AUGUST 2026 cb push v2" e "End cb push", estratto il 2026-09-14).
   NON si tocca la logica: stesse costanti (COOKIE_DOMAIN,
   CHECKOUT_HOSTS, FIELD_MAP, UTM_KEYS), stesse chiavi di storage
   (attr_*), stesso gating sul consenso Iubenda, stesso evento
   `ptdja_identity_ready` nel dataLayer.

   Perché verbatim e non riscritto in TypeScript: le chiavi qui
   dentro sono già scritte nei cookie dei visitatori reali sul
   dominio radice, e il checkout su cart.* le rilegge per riempire
   i campi `cf_*` su Chargebee. Una riscrittura "equivalente" che
   diverge di una lettera non dà nessun errore: dà acquisti senza
   campagna, e ce ne si accorge a mese chiuso.

   CARICAMENTO: `next/script` con strategy="afterInteractive"
   (vedi src/components/tracking/Attribution.tsx). Lo script parte
   quindi a DOM già pronto: `boot()` regge entrambi i casi, perché
   l'ultima riga distingue `document.readyState === 'loading'` dal
   resto e in quel caso chiama `boot()` subito.

   Note originali dell'autore del blocco Webflow:
   Replaces v2.1. Changes: early sessionStorage stash of fbclid/gclid
   at boot (survives A/B tools stripping the query string before
   consent), promotion to persistent storage post-consent, and
   hardened Iubenda detection with cookie fallback.
   Merge of cb-push-v2 (attribution capture, 3-layer storage,
   native cookie bridge) + track.js (first-party UID/external_id,
   consent gating, dual host, cb-app-copy strip, dataLayer).
   Storage keys kept identical to v2 (attr_*) so existing
   visitors keep their saved attribution.
   PREREQUISITE: create cf_ptdja_uid (text, Customer, enabled on
   hosted pages) in Chargebee PTDJA. cf_user_agent optional, see
   FIELD_MAP note.
   ============================================================ */
(function () {
  "use strict";
  // ===== Config =====
  var COOKIE_DOMAIN = '.petetong-djacademy.com';
  var CHECKOUT_HOSTS = ['cart.petetong-djacademy.com', 'petetong-dj-academy.chargebee.com'];
  var COOKIE_DAYS = 90;
  var META_COOKIE_WAIT_MS = 2500, POST_INIT_RETRY_MS = 1500, POLL_MS = 50;

  var UTM_KEYS = ['utm_source', 'utm_campaign', 'utm_medium', 'utm_content'];
  var ID_URL_KEYS = ['gclid', 'fbclid'];
  var META_COOKIES = ['_fbc', '_fbp'];

  var FIELD_MAP = {
    'utm_source': 'cf_utm_source', 'utm_campaign': 'cf_utm_campaign',
    'utm_medium': 'cf_utm_medium', 'utm_content': 'cf_utm_content',
    'gclid': 'cf_goo_gclid', 'fbclid': 'cf_facebook_fbclid',
    '_fbc': 'cf_facebook_fbc', '_fbp': 'cf_facebook_fbp',
    'ptdja_uid': 'cf_ptdja_uid'
    // ,'ua': 'cf_user_agent'  // uncomment after creating cf_user_agent in Chargebee
  };

  // ===== Utils (same storage scheme as v2: attr_* on 3 layers) =====
  function getParam(name) {
    var m = window.location.search.match(new RegExp('[?&]' + name + '=([^&]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function getCookie(name) {
    var esc = name.replace(/[.$?*|{}()[\]\\\/+^]/g, '\\$&');
    var m = document.cookie.match(new RegExp('(?:^|; )' + esc + '=([^;]*)'));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function setRawCookie(name, value) {
    var d = new Date(); d.setTime(d.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) +
      ';expires=' + d.toUTCString() + ';path=/;domain=' + COOKIE_DOMAIN + ';SameSite=Lax;Secure';
  }
  function persist(key, value) {
    if (!value) return;
    try { setRawCookie('attr_' + key, value); } catch (e) {}
    try { localStorage.setItem('attr_' + key, value); } catch (e) {}
    try { sessionStorage.setItem('attr_' + key, value); } catch (e) {}
  }
  function readStored(key) {
    var v = getCookie('attr_' + key);
    if (v) return v;
    try { var ls = localStorage.getItem('attr_' + key); if (ls) return ls; } catch (e) {}
    try { return sessionStorage.getItem('attr_' + key) || ''; } catch (e) { return ''; }
  }
  function waitFor(predicate, timeoutMs, intervalMs) {
    return new Promise(function (resolve) {
      var start = Date.now();
      (function tick() {
        var val = null; try { val = predicate(); } catch (e) {}
        if (val) return resolve(val);
        if (Date.now() - start >= timeoutMs) return resolve(null);
        setTimeout(tick, intervalMs);
      })();
    });
  }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0, v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // ===== Consent (Iubenda) =====
  var consentGiven = false;
  var onConsentQueue = [];
  function whenConsent(fn) { if (consentGiven) { fn(); } else { onConsentQueue.push(fn); } }
  function markConsent() {
    if (consentGiven) return;
    consentGiven = true;
    for (var i = 0; i < onConsentQueue.length; i++) { try { onConsentQueue[i](); } catch (e) {} }
    onConsentQueue = [];
  }
  function iubCookieSaysYes() {
    try {
      var parts = document.cookie.split('; ');
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].indexOf('_iub_cs-') !== 0) continue;
        var val = decodeURIComponent(parts[i].split('=').slice(1).join('='));
        if (val.indexOf('"consent":true') > -1) return true;
        if (/"purposes":\{[^}]*"4":true/.test(val)) return true;
      }
    } catch (e) {}
    return false;
  }
  (function pollConsent(tries) {
    try {
      if (window._iub && _iub.cs && _iub.cs.api && _iub.cs.api.isConsentGiven && _iub.cs.api.isConsentGiven()) {
        return markConsent();
      }
    } catch (e) {}
    if (iubCookieSaysYes()) return markConsent();
    if (tries < 240) setTimeout(function () { pollConsent(tries + 1); }, 500);
  })(0);

  // ===== Identity =====
  function ensureUid() {
    var existing = getCookie('ptdja_uid') || readStored('ptdja_uid');
    if (existing) { persist('ptdja_uid', existing); return existing; }
    if (!consentGiven) return '';
    var id = uuid();
    try { setRawCookie('ptdja_uid', id); } catch (e) {}
    persist('ptdja_uid', id);
    return id;
  }
  function buildFbcFromFbclid(fbclid) {
    if (!fbclid) return null;
    var existingTs = null;
    try { existingTs = localStorage.getItem('attr__fbc_ts'); } catch (e) {}
    var ts = existingTs || String(Math.floor(Date.now() / 1000));
    if (!existingTs) { try { localStorage.setItem('attr__fbc_ts', ts); } catch (e) {} }
    return 'fb.1.' + ts + '.' + fbclid;
  }
  function captureIdsFromUrl() {
    // URL first; if an A/B tool already stripped the query string,
    // fall back to the early boot-time stash in sessionStorage.
    ID_URL_KEYS.forEach(function (k) { persist(k, getParam(k) || readStored(k)); });
  }
  function syncMetaCookies() {
    META_COOKIES.forEach(function (name) { var v = getCookie(name); if (v) persist(name, v); });
  }
  function ensureFbcFallback() {
    var fbclid = readStored('fbclid');
    var fbc = readStored('_fbc');
    if (fbclid && !fbc) { var built = buildFbcFromFbclid(fbclid); if (built) persist('_fbc', built); }
  }
  // bridge recovered values into the NATIVE Meta cookies, never overwriting Meta's own
  function setNativeCookie(name, value) {
    if (!value || getCookie(name)) return;
    var d = new Date(); d.setTime(d.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value +
      ';expires=' + d.toUTCString() + ';path=/;domain=' + COOKIE_DOMAIN + ';SameSite=Lax';
  }
  function ensureNativeMetaCookies() {
    setNativeCookie('_fbc', readStored('_fbc'));
    setNativeCookie('_fbp', readStored('_fbp'));
  }
  function refreshSignals() {
    if (!consentGiven) return;
    captureIdsFromUrl();
    syncMetaCookies();
    ensureFbcFallback();
    ensureNativeMetaCookies();
    ensureUid();
    try { persist('ua', navigator.userAgent); } catch (e) {}
  }

  // ===== UTMs (campaign params, not personal data: always on) =====
  function captureUtms() {
    UTM_KEYS.forEach(function (k) {
      var v = getParam(k);
      if (v && v !== 'cb-app-copy') persist(k, v);
    });
  }

  // ===== Checkout link decoration =====
  function decorate(url) {
    if (!url) return url;
    try {
      var u = new URL(url, window.location.origin);
      if (CHECKOUT_HOSTS.indexOf(u.hostname) === -1) return url;
      // defensive strip of the Chargebee sample value, forever
      if (u.searchParams.get('utm_source') === 'cb-app-copy') u.searchParams.delete('utm_source');
      Object.keys(FIELD_MAP).forEach(function (storageKey) {
        var v = readStored(storageKey);
        if (v) u.searchParams.set('customer[' + FIELD_MAP[storageKey] + ']', v);
      });
      // top-level UTMs too, for Chargebee's own source reporting
      UTM_KEYS.forEach(function (k) {
        var v = readStored(k);
        if (v) u.searchParams.set(k, v);
      });
      return u.toString();
    } catch (e) { return url; }
  }
  function decorateAllLinks() {
    var sel = CHECKOUT_HOSTS.map(function (h) { return 'a[href*="' + h + '"]'; }).join(',');
    document.querySelectorAll(sel).forEach(function (a) { a.href = decorate(a.href); });
  }

  // click in capture phase: refresh signals THEN decorate (catches fast clicks)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !a.href) return;
    var isCheckout = CHECKOUT_HOSTS.some(function (h) { return a.href.indexOf(h) > -1; });
    if (!isCheckout) return;
    refreshSignals();
    var nh = decorate(a.href);
    if (nh !== a.href) a.href = nh;
  }, true);

  // ===== Boot =====
  function boot() {
    // Early stash: fbclid/gclid to sessionStorage ONLY (tab-scoped,
    // ephemeral) the moment we boot, before Optibase/Optimize can
    // strip the query string. Promoted to persistent storage and
    // used only after consent.
    ID_URL_KEYS.forEach(function (k) {
      var v = getParam(k);
      if (v) { try { sessionStorage.setItem('attr_' + k, v); } catch (e) {} }
    });
    captureUtms();
    whenConsent(function () {
      refreshSignals();
      waitFor(function () {
        var fbp = getCookie('_fbp'), fbc = getCookie('_fbc');
        return (fbp || fbc) ? { fbp: fbp, fbc: fbc } : null;
      }, META_COOKIE_WAIT_MS, POLL_MS).then(refreshSignals);
      setTimeout(refreshSignals, POST_INIT_RETRY_MS);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ptdja_identity_ready',
        external_id: ensureUid(),
        fbp: readStored('_fbp') || undefined,
        fbc: readStored('_fbc') || undefined
      });
      decorateAllLinks();
    });
    decorateAllLinks(); // pre-consent pass: strips cb-app-copy + adds UTMs
    try {
      var t; var mo = new MutationObserver(function () {
        clearTimeout(t); t = setTimeout(decorateAllLinks, 300);
      });
      mo.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
