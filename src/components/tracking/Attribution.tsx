import Script from "next/script";

/*
 * Attribuzione e identità: lo script "cb push v2.2" del sito Webflow.
 *
 * Il file è `public/js/attribution.js`, copia VERBATIM del blocco che sul sito
 * vive nell'`<head>` fra i commenti "AUGUST 2026 cb push v2" e "End cb push".
 * Non è stato riscritto in TypeScript e non lo sarà: le chiavi che scrive
 * (`attr_*`, `ptdja_uid`) stanno già nei cookie di visitatori reali sul dominio
 * radice, e il checkout su `cart.petetong-djacademy.com` le rilegge per riempire
 * i campi `customer[cf_*]` su Chargebee. Una riscrittura che diverge di una
 * lettera non dà nessun errore: dà acquisti che arrivano in Chargebee senza
 * campagna.
 *
 * Cosa fa, in breve: cattura UTM e click id dall'URL, li conserva su tre livelli
 * (cookie di dominio radice, localStorage, sessionStorage), ricostruisce `_fbc`
 * dal `fbclid`, assegna un `ptdja_uid`, decora i link verso il carrello con
 * `customer[cf_*]` e spinge `ptdja_identity_ready` nel dataLayer. Tutto ciò che
 * tocca dati personali è dietro il consenso Iubenda, che lo script si legge da
 * sé (`window._iub` più ripiego sul cookie `_iub_cs-*`): non ha bisogno del
 * nostro ponte.
 *
 * SUL MOMENTO IN CUI PARTE. `afterInteractive` lo fa eseguire a DOM già pronto,
 * mentre sul sito Webflow è uno script in linea nell'`<head>` che gira a
 * documento ancora in costruzione. Il `boot()` regge entrambi i casi da sé,
 * senza modifiche: l'ultima riga del file distingue
 * `document.readyState === 'loading'` (attende `DOMContentLoaded`) dal resto
 * (chiama `boot()` subito), e qui ricade sempre nel secondo ramo.
 *
 * L'unica differenza pratica: la cattura anticipata di `fbclid` e `gclid` in
 * sessionStorage avviene qualche decina di millisecondi più tardi. Sul sito
 * quella riga serviva a battere sul tempo Optibase e Webflow Optimize, che
 * riscrivevano la querystring; qui nessuno dei due è installato, quindi la
 * querystring è ancora intatta quando lo script parte. Da riverificare se un
 * giorno si aggiunge uno strumento che tocca l'URL.
 */
export function Attribution() {
  return <Script src="/js/attribution.js" strategy="afterInteractive" />;
}
