import type { MetadataRoute } from "next";

/*
 * Indicizzazione chiusa, e per ora è la scelta giusta.
 *
 * Questo repo vive su un URL di test (`*.vercel.app` fino al cambio dominio) e
 * ricostruisce pagina per pagina un sito che è già online e già indicizzato. Due
 * copie dello stesso contenuto, con gli stessi testi, sotto due domini diversi,
 * sono contenuto duplicato che fa concorrenza al sito vero: il danno non lo
 * prende la copia, lo prende l'originale.
 *
 * ⚠️ DA APRIRE AL CAMBIO DOMINIO. Quando questo repo diventerà
 * `www.petetong-djacademy.com`, questo file va sostituito con l'equivalente del
 * `robots.txt` del sito Webflow (piano, sezione 4) e la sitemap va dichiarata.
 * Se resta com'è, il sito nuovo entra in produzione invisibile ai motori e alle
 * anteprime dei modelli, e il calo di organico arriva settimane dopo, quando è
 * difficile collegarlo a questa riga.
 *
 * `Disallow: /` impedisce la scansione, non l'indicizzazione: un URL può
 * comparire lo stesso se qualcuno lo linka. Per questo le pagine segnaposto
 * dichiarano anche `noindex` nei loro metadati. Le due cose servono insieme.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
  };
}
