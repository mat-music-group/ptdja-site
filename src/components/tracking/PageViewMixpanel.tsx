"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { tracciaPageView } from "@/lib/eventi-mixpanel";

/*
 * L'evento `Page View`, uno per pagina vista.
 *
 * Sul sito Webflow il blocco è questo, dentro il `DOMContentLoaded` del footer:
 *
 *     if (!window.location.href.includes("thank-you")) {
 *       trackMixpanel('Page View', { title: document.title,
 *                                    url: window.location.href,
 *                                    timestamp: new Date().toISOString() });
 *     }
 *
 * ── PERCHÉ SERVE UN COMPONENTE E NON BASTA UNO SCRIPT ───────────────────
 * Su Webflow ogni voce di menu è un caricamento pieno del documento, quindi
 * `DOMContentLoaded` scatta a ogni pagina e l'evento parte a ogni pagina. Qui la
 * navigazione è client side: il documento si carica una volta sola e poi cambia
 * solo la rotta. Uno script inline manderebbe un `Page View` per sessione invece
 * che uno per pagina, e il conteggio del nuovo sito varrebbe una frazione di
 * quello del vecchio senza che nessun errore lo segnali.
 *
 * Perciò l'effetto è agganciato a `usePathname()`: parte al montaggio e a ogni
 * cambio di percorso, che è esattamente l'insieme dei momenti in cui il sito
 * Webflow ricaricava.
 *
 * ── DUE DETTAGLI DA SAPERE ──────────────────────────────────────────────
 * 1. La dipendenza è il solo `pathname`, non la query. `useSearchParams` in un
 *    componente client obbliga tutte le pagine che lo contengono a rinunciare
 *    alla prerenderizzazione, e su un sito vetrina è un prezzo sproporzionato
 *    per un caso che qui non esiste: nessuna navigazione interna cambia solo i
 *    parametri. La query finisce comunque dentro `url`, che è letto da
 *    `window.location.href` al momento dell'invio.
 * 2. `document.title` viene letto dentro l'effetto, cioè dopo che Next ha
 *    applicato i metadati della rotta: leggerlo prima darebbe il titolo della
 *    pagina precedente.
 *
 * ── UN EVENTO PER PAGINA, ANCHE IN SVILUPPO ─────────────────────────────
 * `ultimoTracciato` non è una cautela generica: in sviluppo React monta i
 * componenti due volte (StrictMode, acceso di default in Next), e senza guardia
 * ogni caricamento locale manderebbe DUE `Page View`. In produzione non
 * succede, ma è proprio in locale che si verifica il tracciamento, e una
 * verifica che conta il doppio degli eventi non serve a niente. La guardia è
 * sul percorso e non un semplice "una volta sola": un cambio di rotta deve
 * comunque produrre il suo evento, come su Webflow produceva un caricamento.
 */
export function PageViewMixpanel() {
  const percorso = usePathname();
  const ultimoTracciato = useRef<string | null>(null);

  useEffect(() => {
    if (ultimoTracciato.current === percorso) return;
    ultimoTracciato.current = percorso;
    tracciaPageView();
  }, [percorso]);

  return null;
}
