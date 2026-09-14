import Script from "next/script";
import { TOOL, landingSlug } from "@/lib/analytics.config";

/*
 * Il tracciamento proprietario del gruppo: `track.js`, servito da
 * `tool.ptdja.com`. Stessi quattro attributi del sito Webflow.
 *
 * Il file non vive in questo repo ed è deliberato: uno script di tracciamento
 * copiato in cinque progetti diverge in cinque progetti, e la correzione va
 * fatta cinque volte sperando che nessuno la manchi. Servito, si corregge una
 * volta sola. Riferimento: `_conoscenza-condivisa/04-kit-landing.md`.
 *
 * `data-engagement="off"` come sul sito: niente scroll depth né tempo sulla
 * pagina. Sulle landing invece sono accesi. Non è una svista, è la
 * configurazione che il sito ha oggi, e cambiarla cambierebbe i confronti con lo
 * storico.
 *
 * `data-landing`: `sito` solo sul dominio del brand in produzione, `sito-test`
 * ovunque altrove. La logica sta in `analytics.config.ts`, insieme al perché.
 *
 * NON si aggiunge `meta.js` del landing kit, e non è una dimenticanza: il pixel
 * Meta sul sito passa da GTM, quindi un secondo layer manderebbe gli stessi
 * eventi una seconda volta, con un `event_id` diverso e quindi senza nessuna
 * deduplica possibile. Regola scritta in `sito-ptdja/CLAUDE.md`.
 */
export function Acquisition() {
  return (
    <Script
      src={`${TOOL}/tracking/track.js`}
      data-brand="ptdja"
      data-landing={landingSlug()}
      data-endpoint={TOOL}
      data-engagement="off"
      strategy="afterInteractive"
    />
  );
}
