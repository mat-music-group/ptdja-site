import { CLARITY_PROJECT_ID } from "@/lib/analytics.config";

/*
 * Microsoft Clarity: heatmap e registrazione delle sessioni.
 *
 * Snippet ufficiale, riprodotto verbatim dall'HTML del sito, con lo stesso
 * progetto `qgyx8qgz1i`, che è anche quello del checkout: una persona che passa
 * dal sito al pagamento si vede come UNA sessione sola.
 *
 * ⚠️ DUE COSE DA SAPERE, ed entrambe sono difetti del sito che riproduciamo
 * invece di correggere in silenzio (regola numero uno di `CLAUDE.md`). Segnalate
 * anche in `handoff.md`.
 *
 * 1. NESSUN GATE SUL CONSENSO. Sul repo landing Clarity non viene nemmeno
 *    caricato finché la finalità 4 (Misurazione) non è concessa, perché è il tag
 *    più invasivo installato: registra ciò che la persona fa a schermo. Sul sito
 *    Webflow lo snippet sta nell'`<head>` senza nessun gate, e l'autoblocking di
 *    Iubenda non è caricato, quindi parte per tutti, UE compresa. Qui è
 *    riprodotto com'è. Per gattarlo basta il pattern `useConsentedScript` del
 *    repo landing, ma è una modifica al comportamento del sito e va decisa, non
 *    fatta di straforo.
 *
 * 2. IL SITO NE CARICA DUE. `gqhhopgpjt` e `qgyx8qgz1i`: ogni visita al sito
 *    Webflow è registrata due volte, in due progetti diversi. Qui ne è stato
 *    portato uno solo, quello condiviso col checkout, perché due registrazioni
 *    della stessa sessione non sono un dato in più, sono lo stesso dato pagato
 *    due volte. È una divergenza dichiarata, non una dimenticanza: se qualcuno
 *    legge numeri su `gqhhopgpjt` va saputo prima.
 */

const CLARITY_SNIPPET = `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`;

export function Clarity() {
  return <script dangerouslySetInnerHTML={{ __html: CLARITY_SNIPPET }} />;
}
