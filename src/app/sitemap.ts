import type { MetadataRoute } from "next";

/*
 * La sitemap: le 10 pagine statiche della fase 1.
 *
 * Sono esattamente le pagine che Webflow mette nella sua sitemap live
 * (`docs/inventario-webflow.md`, "Sitemap live (18 URL)"): 10 statiche più 8
 * articoli del blog. Gli articoli NON sono qui perché il blog è fase 2
 * (`tasks/todo.md`): dichiarare URL che questo repo non serve significa
 * mandare Google su una 404. Quando il blog arriverà, i suoi URL si
 * aggiungono qui.
 *
 * Gli URL sono assoluti sul dominio vero, non su quello di test: una sitemap
 * serve a dire dove sta il contenuto quando sarà pubblicato, e `metadataBase`
 * (in `layout.tsx`) punta allo stesso posto.
 *
 * ⚠️ `lastModified` è omesso di proposito. Webflow non ci ha dato le date di
 * ultima modifica e `new Date()` scriverebbe "modificata oggi" a ogni build,
 * su tutte le pagine, per sempre: un segnale falso, che Google impara a
 * ignorare. Meglio nessuna data che una data inventata. Le date vere possono
 * arrivare dalla sitemap di Webflow (`<lastmod>`) al momento del passaggio.
 *
 * ⚠️ Finché `robots.ts` dice `Disallow: /` questa sitemap non viene letta da
 * nessuno: le due cose si aprono insieme, al cambio dominio.
 *
 * Nessun `priority` e nessun `changeFrequency`: Google li ignora da anni e la
 * sitemap di Webflow non li dichiara.
 */

const DOMINIO = "https://www.petetong-djacademy.com";

/* Nell'ordine in cui le pagine compaiono nel perimetro di fase 1
   (`docs/webflow/README.md`). La home è il dominio nudo, come il suo
   canonical in `docs/webflow/meta/home.json`. */
const PERCORSI = [
  "",
  "/dj-course",
  "/producer-course",
  "/mix-mastering-course",
  "/pricing-page",
  "/play-get-signed",
  "/advanced-djs",
  "/recess",
  "/terms-conditions",
  "/terms-conditions-sa",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PERCORSI.map((percorso) => ({ url: `${DOMINIO}${percorso}` }));
}
