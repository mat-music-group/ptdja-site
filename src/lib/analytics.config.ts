/*
 * Gli identificatori del tracciamento, in chiaro e volutamente.
 *
 * Non sono segreti: finiscono tutti nell'HTML servito al browser, esattamente
 * come già fanno nell'HTML del sito Webflow da cui sono stati copiati. Metterli
 * in variabili d'ambiente darebbe l'illusione di proteggere qualcosa e
 * aggiungerebbe env a un progetto che non ne ha nessuna
 * (`_conoscenza-condivisa/04-kit-landing.md`). Vivono qui perché qui si vedono,
 * e perché un valore sbagliato si trova leggendo un file invece che aprendo la
 * dashboard di Vercel.
 *
 * Fonte di ogni valore: il custom code del sito Webflow, letto dall'HTML
 * pubblicato il 2026-09-14.
 */

/** Il tool centrale del gruppo: tracciamento proprietario e landing kit. */
export const TOOL = "https://tool.ptdja.com";

/** Container GTM web del sito. Serve solo al `<noscript>`: lo script vero passa
 *  dal loader Stape qui sotto, che porta lo stesso container offuscato. */
export const GTM_CONTAINER_ID = "GTM-WLFQB5G";

/** Host del server GTM (Stape) su sottodominio del brand. */
export const STAPE_HOST = "https://sgtm.petetong-djacademy.com";

/** Progetto Mixpanel PTDJA, regione EU. */
export const MIXPANEL_TOKEN = "4e4bed2fb5993428b67208cffda63ae3";
export const MIXPANEL_API_HOST = "https://api-eu.mixpanel.com";

/** Progetto Microsoft Clarity, lo stesso del checkout: il funnel si legge intero. */
export const CLARITY_PROJECT_ID = "qgyx8qgz1i";

/** Quiz del Virtual Tour servito dal landing kit. */
export const VT_QUIZ_DESTINATION = "https://start.petetong-djacademy.com/virtualtour-form";

/** Il dominio di produzione del sito. */
export const PRODUCTION_HOST = "petetong-djacademy.com";

/**
 * Lo slug `data-landing` del tracciamento proprietario.
 *
 * `sito` è la chiave con cui si filtra in dashboard lo storico del sito vero, ed
 * è quella che il Webflow live manda oggi. Mandarla da un ambiente di prova
 * significa mescolare dati di test con dati reali in una tabella che nessuno
 * ripulisce a posteriori, quindi finché non siamo sul dominio del brand si manda
 * `sito-test` (regola in `sito-ptdja/CLAUDE.md`).
 *
 * Due condizioni, entrambe necessarie per dire `sito`:
 *
 * 1. `VERCEL_ENV === "production"`. Anteprime e sviluppo locale sono sempre di
 *    prova.
 * 2. il dominio di produzione del progetto è quello del brand. Serve perché la
 *    prima fase vive su un URL `*.vercel.app`, dove `VERCEL_ENV` vale comunque
 *    `production`: senza questo secondo controllo il deployment di test
 *    scriverebbe sotto lo slug del sito vero dal primo giorno.
 *
 * Si legge da env di build e non dall'header `host` della richiesta di
 * proposito: `headers()` renderebbe dinamica ogni pagina del sito, e un sito
 * vetrina che rinuncia alla prerenderizzazione per scegliere una stringa
 * costante paga un prezzo sproporzionato. `VERCEL_PROJECT_PRODUCTION_URL` è il
 * dominio di produzione del progetto, che è esattamente ciò che la condizione 2
 * vuole sapere, e Vercel lo fornisce da sé sia in build sia a runtime.
 */
export function landingSlug(): "sito" | "sito-test" {
  if (process.env.VERCEL_ENV !== "production") return "sito-test";

  const host = (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "").toLowerCase();
  const isBrandHost = host === PRODUCTION_HOST || host.endsWith(`.${PRODUCTION_HOST}`);

  return isBrandHost ? "sito" : "sito-test";
}
