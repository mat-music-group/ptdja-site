import { MIXPANEL_API_HOST, MIXPANEL_TOKEN } from "@/lib/analytics.config";

/*
 * Mixpanel, la stessa installazione del sito Webflow.
 *
 * Stesso loader ufficiale, stesso token di progetto (PTDJA, regione EU), stessa
 * persistenza su cookie con `cross_subdomain_cookie: true`. Quel flag è il
 * punto: il cookie `mp_*_mixpanel` viene scritto su `.petetong-djacademy.com`,
 * quindi il checkout su cart.* lo legge e i suoi eventi server side si agganciano
 * alla STESSA identità invece di finire su un utente separato. Cambiarlo
 * spezzerebbe in due ogni funnel che attraversa il checkout.
 *
 * UNA differenza voluta rispetto al sito: `debug: false`.
 * Sul Webflow live `debug: true` è rimasto acceso in produzione e scrive nella
 * console di ogni visitatore a ogni chiamata. È l'unico punto in cui questo file
 * non è identico all'originale, è già segnato come "nice to have" in
 * `desiderata.md`, ed è reversibile cambiando una parola.
 *
 * ⚠️ NESSUNA GUARDIA SULL'HOSTNAME, al contrario del repo landing.
 * Là un `if` sul dominio impedisce a localhost e alle anteprime `*.vercel.app`
 * di scrivere nel progetto Mixpanel di produzione. Qui non c'è, perché la fase
 * di test di questo sito vive proprio su `*.vercel.app` e uno dei criteri di
 * successo in `desiderata.md` è che Mixpanel veda gli stessi eventi del sito
 * attuale: con la guardia non si potrebbe verificare niente. Il rovescio della
 * medaglia va saputo: finché siamo su un URL di prova, gli eventi di sviluppo
 * finiscono nel progetto vero, e dentro Mixpanel non si cancellano come nel
 * collector. Decisione da confermare prima di mandare traffico (vedi
 * `handoff.md`).
 *
 * ⚠️ NESSUN EVENTO PARTE DA QUI. Il sito manda i suoi (Page View, CTA Click,
 * Navbar Link Clicked, Pricing Checkout Clicked, Tracked FAQ Opened, Course Card
 * Click, Book Free Call CTA, Trustpilot CTA Clicked, alias su thank you) dal
 * custom code del footer, pagina per pagina: vanno riprodotti con gli stessi
 * nomi e le stesse props insieme alle pagine, attraverso `trackMixpanel` in
 * `src/lib/mixpanel.ts`. Questo componente installa solo la libreria.
 */

const MIXPANEL_STUB =
  '(function (f, b) { if (!b.__SV) { var e, g, i, h; window.mixpanel = b; b._i = []; b.init = function (e, f, c) { function g(a, d) { var b = d.split("."); 2 == b.length && ((a = a[b[0]]), (d = b[1])); a[d] = function () { a.push([d].concat(Array.prototype.slice.call(arguments, 0))); }; } var a = b; "undefined" !== typeof c ? (a = b[c] = []) : (c = "mixpanel"); a.people = a.people || []; a.toString = function (a) { var d = "mixpanel"; "mixpanel" !== c && (d += "." + c); a || (d += " (stub)"); return d; }; a.people.toString = function () { return a.toString(1) + ".people (stub)"; }; i = "disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split( " "); for (h = 0; h < i.length; h++) g(a, i[h]); var j = "set set_once union unset remove delete".split(" "); a.get_group = function () { function b(c) { d[c] = function () { call2_args = arguments; call2 = [c].concat(Array.prototype.slice.call(call2_args, 0)); a.push([e, call2]); }; } for ( var d = {}, e = ["get_group"].concat( Array.prototype.slice.call(arguments, 0)), c = 0; c < j.length; c++) b(j[c]); return d; }; b._i.push([e, f, c]); }; b.__SV = 1.2; e = f.createElement("script"); e.type = "text/javascript"; e.async = !0; e.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === f.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; g = f.getElementsByTagName("script")[0]; g.parentNode.insertBefore(e, g); } })(document, window.mixpanel || []);';

const MIXPANEL_INIT = `mixpanel.init('${MIXPANEL_TOKEN}', {
  api_host: '${MIXPANEL_API_HOST}',
  debug: false,
  persistence: 'cookie',
  cross_subdomain_cookie: true
});`;

export function Mixpanel() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: MIXPANEL_STUB }} />
      <script dangerouslySetInnerHTML={{ __html: MIXPANEL_INIT }} />
    </>
  );
}
