import type { MetadataRoute } from "next";

import { landingSlug } from "@/lib/analytics.config";

/*
 * Indicizzazione legata all'ambiente, non a una riga da ricordarsi di cambiare.
 *
 * Finché il progetto vive su un URL di test (`*.vercel.app`, o un dominio che
 * non è quello del brand) ricostruisce pagina per pagina un sito già online e
 * già indicizzato: due copie dello stesso contenuto sotto due domini fanno
 * concorrenza all'originale, e il danno lo prende il sito vero. Quindi scansione
 * chiusa. `Disallow: /` impedisce la scansione, non l'indicizzazione (un URL può
 * comparire lo stesso se qualcuno lo linka): per questo `next.config.ts` aggiunge
 * anche `X-Robots-Tag: noindex, nofollow` nelle stesse condizioni. Le due cose
 * servono insieme.
 *
 * Quando il dominio di produzione del progetto Vercel sarà quello del brand,
 * `landingSlug()` vale `sito` (stessa condizione usata per il tracciamento) e
 * questo file apre la scansione e dichiara la sitemap, senza modifiche al
 * codice. Vibe Shield, CFG-07.
 */
export default function robots(): MetadataRoute.Robots {
  if (landingSlug() === "sito-test") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.petetong-djacademy.com/sitemap.xml",
  };
}
