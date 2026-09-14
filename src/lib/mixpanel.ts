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
  if (typeof window === "undefined") return;
  const mixpanel = window.mixpanel;
  if (!mixpanel) return;

  mixpanel.track(eventName, { ...data, page: window.location.pathname });
}
