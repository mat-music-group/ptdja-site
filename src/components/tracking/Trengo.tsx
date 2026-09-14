import { TRENGO_KEY } from "@/lib/analytics.config";

/*
 * Trengo: il widget di chat del sito (bolla in basso a destra).
 *
 * Snippet riprodotto verbatim dall'HTML del sito Webflow, dove NON sta nel
 * custom code di sito ma in quello di singola pagina: è presente su home,
 * dj-course, producer-course, mix-mastering-course, pricing-page e
 * play-get-signed, e assente su terms-conditions, terms-conditions-sa,
 * advanced-djs e recess (verificato sull'HTML pubblicato il 2026-09-14).
 *
 * Per questo NON va montato nel layout: lo monta ogni pagina che sul sito lo
 * ha, così la chat compare esattamente dove compare oggi. Matteo il 14/09 ha
 * confermato che la chat serve e resta.
 *
 * Come sul sito, nessun gate sul consenso: lo script parte per tutti.
 */

const TRENGO_SNIPPET = `window.Trengo = window.Trengo || {};
window.Trengo.key = '${TRENGO_KEY}';
(function(d, script, t) {
    script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://static.widget.trengo.eu/embed.js';
    d.getElementsByTagName('head')[0].appendChild(script);
}(document));`;

export function Trengo() {
  return <script dangerouslySetInnerHTML={{ __html: TRENGO_SNIPPET }} />;
}
