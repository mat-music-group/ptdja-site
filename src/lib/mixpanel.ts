"use client";

/*
 * L'unico punto da cui questo repo manda eventi a Mixpanel.
 *
 * È il gemello tipato della `trackMixpanel` che il footer del sito Webflow
 * definisce in linea:
 *
 *     function trackMixpanel(eventName, data = {}) {
 *       if (typeof mixpanel !== 'undefined') {
 *         data.page = window.location.pathname;
 *         mixpanel.track(eventName, data);
 *         console.log('[Mixpanel]', eventName, data);
 *       } else {
 *         console.warn('Mixpanel not available');
 *       }
 *     }
 *
 * Due differenze, entrambe volute:
 *
 * 1. `data` non viene mutata. Là l'oggetto passato dal chiamante si ritrova una
 *    chiave `page` in più dopo la chiamata: qui si costruisce un oggetto nuovo,
 *    perché mutare un argomento è il tipo di effetto che si scopre quando due
 *    eventi diversi condividono lo stesso oggetto di props.
 * 2. Niente `console.log` a ogni evento. Sul sito quella riga scrive nella
 *    console di ogni visitatore, insieme al `debug: true` dell'init. È la stessa
 *    differenza dichiarata in `Mixpanel.tsx`, e si annulla nello stesso modo.
 *
 * `page` resta `window.location.pathname`, identico al sito: è la proprietà con
 * cui i report esistenti segmentano, e cambiarla (per esempio in href completo)
 * spezzerebbe lo storico.
 */

type MixpanelApi = {
  track: (event: string, props?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    mixpanel?: MixpanelApi;
  }
}

/**
 * Manda un evento a Mixpanel aggiungendo `page` come fa il sito Webflow.
 *
 * Non lancia mai: se `mixpanel` non è in pagina (render sul server, script non
 * ancora arrivato, adblock) la chiamata è un'operazione nulla. Un evento perso
 * non deve diventare un errore sullo schermo di chi sta leggendo la pagina.
 */
export function trackMixpanel(eventName: string, data: Record<string, unknown> = {}): void {
  invia(eventName, { ...data, page: window.location.pathname });
}

/**
 * Manda un evento **senza** `page`.
 *
 * Non è una scorciatoia né una semplificazione: sul sito Webflow tre eventi non
 * passano dalla utility `trackMixpanel` del footer ma chiamano `mixpanel.track`
 * a mano, e quindi arrivano a Mixpanel senza la proprietà `page`:
 *
 *   - `Pricing Checkout Clicked` (blocco "PRICING CHECKOUT BUTTONS TRACKING"),
 *     che porta invece `page_url` con l'href completo;
 *   - `Buy Now Menu` e `Buy Now Header`, che non portano nessuna proprietà.
 *
 * Aggiungere `page` anche a loro renderebbe il repo *più coerente* del sito e
 * per questo sbagliato: i report e i filtri costruiti su quegli eventi non la
 * conoscono, e una proprietà che compare dal nulla a metà storico è un dato che
 * nessuno sa più leggere. Si riproduce l'asimmetria, non la si corregge.
 */
export function trackMixpanelSenzaPage(
  eventName: string,
  data?: Record<string, unknown>
): void {
  invia(eventName, data);
}

/**
 * L'unico punto che tocca davvero `window.mixpanel`.
 *
 * Non lancia mai: se `mixpanel` non è in pagina (render sul server, script non
 * ancora arrivato, adblock) la chiamata è un'operazione nulla. Un evento perso
 * non deve diventare un errore sullo schermo di chi sta leggendo la pagina.
 */
function invia(eventName: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const mixpanel = window.mixpanel;
  if (!mixpanel) return;

  if (data === undefined) {
    mixpanel.track(eventName);
    return;
  }
  mixpanel.track(eventName, data);
}
